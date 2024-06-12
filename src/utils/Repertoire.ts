import { Chess } from "chess.js";

class Move {
    move: string;
    moveNumber: number;
    turn: number;
    priority: number;
    next: Move[];

    constructor(move: string = "", moveNumber: number = 0, turn: number = -1, priority: number = 0) {
        this.move = move;
        this.moveNumber = moveNumber;
        this.turn = turn;
        this.priority = priority;
        this.next = [];
    }
}

class Repertoire {
    startingFen: string = "default pgn";
    moves: Move = new Move();
    iterator: number[] = [];

    constructor(startingFen: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    {
        this.startingFen = startingFen;
    }

    private toPgnHelper(pgn: string, currentMove: Move): string {
        pgn += " " + currentMove.move;

        if (currentMove.next.length === 0) {
            pgn += ")";
            return pgn;
        }

        for (let i = 0; i < currentMove.next.length; i++) {
            if (i !== 0) {
                pgn += " (";
            }

            const nextMove = this.priorityMove(currentMove, i);
            if (nextMove) {
                pgn = this.toPgnHelper(pgn, nextMove);
            }
        }

        return pgn;
    }


    private iteratingMove(): Move | null {
        let it = this.moves;

        for (const i of this.iterator) {
            const nextMove = this.priorityMove(it, i);
            if (!nextMove) {
                console.log("invalid iterator");
                return null;
            }
            it = nextMove;
        }

        return it;
    }

    private priorityMove(currentMove: Move, priority: number): Move | null {
        for (const move of currentMove.next) {
            if (move.priority === priority) {
                return move;
            }
        }
        return null;
    }

    currentGame(): Chess {
        let game = new Chess(this.startingFen);

        let it = this.moves;
        for (const i of this.iterator) {
            const nextMove = this.priorityMove(it, i);
            if (!nextMove) {
                console.log("invalid iterator");
                break;
            }
            it = nextMove;
            game.move(it.move);
        }        

        return game;
    }

    nextMove(line: number = 0): boolean {
        const nextMove = this.priorityMove(this.iteratingMove()!, line);
        if (!nextMove) return false;

        this.iterator.push(line);
        return true;
    }

    previousMove(): boolean {
        if (this.iterator.length === 0) return false;

        this.iterator.pop();
        return true;
    }

    deleteMove(): void {
        if (this.iterator.length === 0) return;

        const priority = this.iteratingMove()!.priority;
        this.previousMove();
        const parentMove = this.iteratingMove();

        if (parentMove) {
            parentMove.next = parentMove.next.filter(move => move.priority !== priority);
            for (const move of parentMove.next) {
                if (move.priority > priority) {
                    move.priority--;
                }
            }
        }
    }

    addMove(move: string, priority: number = 0): void {
        const currentMove = this.iteratingMove();

        if (currentMove) {
            for (const m of currentMove.next) {
                if (m.priority >= priority) {
                    m.priority++;
                }
            }

            const currentTurn = -currentMove.turn;
            let currentMoveNumber = currentMove.moveNumber;
            if (currentTurn === 1) {
                currentMoveNumber++;
            }

            currentMove.next.push(new Move(move, currentMoveNumber, currentTurn, priority));
            this.iterator.push(priority);
        }
    }

    toPgn(): string {
        let pgn = this.startingFen + "\n\n";
        const parentMove = this.moves;
        pgn = this.toPgnHelper(pgn, parentMove);
        return pgn;
    }
}

export { Repertoire, Move };
