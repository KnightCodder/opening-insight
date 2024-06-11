import React, { useState, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Move } from 'chess.js';

const ChessBoard: React.FC = () => {
    const [game, setGame] = useState(new Chess());

    function safeGameMutate(modify: (game: Chess) => void): void {
        setGame((g) => {
            const update = new Chess(g.fen());
            modify(update);
            return update;
        });
    }

    function onDrop(sourceSquare: string, targetSquare: string, piece: string): Move | null {
        const gameCopy = new Chess(game.fen());
        const move = gameCopy.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: piece[1]?.toLowerCase() ?? "q",
        });
        if (move) {
            setGame(gameCopy);
        }
        return move;
    }

    // const pieces = [
    //     "wP",
    //     "wN",
    //     "wB",
    //     "wR",
    //     "wQ",
    //     "wK",
    //     "bP",
    //     "bN",
    //     "bB",
    //     "bR",
    //     "bQ",
    //     "bK",
    // ];

    // const customPieces: any = useMemo(() => {
    //     const pieceComponents: any = {};
    //     pieces.forEach((piece) => {
    //         pieceComponents[piece] = ({ squareWidth }: { squareWidth: number }) => (
    //             <div
    //                 style={{
    //                     width: squareWidth,
    //                     height: squareWidth,
    //                     backgroundImage: `url(/${piece}.png)`,
    //                     backgroundSize: "100%",
    //                 }}
    //             />
    //         );
    //     });
    //     return pieceComponents;
    // }, [pieces]);

    return (
        <div style={boardWrapper}>
            <Chessboard
                id="StyledBoard"
                boardOrientation="white"
                position={game.fen()}
                onPieceDrop={onDrop}
                customBoardStyle={{
                    borderRadius: "4px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                }}
                customDarkSquareStyle={{ backgroundColor: "#779952" }}
                customLightSquareStyle={{ backgroundColor: "#edeed1" }}
                // customPieces={customPieces}
            />
            <button
                style={buttonStyle}
                onClick={() => {
                    safeGameMutate((game) => {
                        game.reset();
                    });
                }}
            >
                reset
            </button>
            <button
                style={buttonStyle}
                onClick={() => {
                    safeGameMutate((game) => {
                        game.undo();
                    });
                }}
            >
                undo
            </button>
        </div>
    );
};

const boardWrapper: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '400px'
};

const buttonStyle: React.CSSProperties = {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
};

export default ChessBoard;
