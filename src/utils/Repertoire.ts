import { Chess } from "chess.js";
import { IMove, IRepertoire } from "@/models/repertoire";

class Move {
    move: string;
    moveNumber: number;
    turn: number;
    priority: number;
    next: Move[];
  
    constructor(move: string, moveNumber: number, turn: number, priority: number, next: Move[] = []) {
      this.move = move;
      this.moveNumber = moveNumber;
      this.turn = turn;
      this.priority = priority;
      this.next = next;
    }
  
    static fromIMove(imove: IMove): Move {
      return new Move(
        imove.move,
        imove.moveNumber,
        imove.turn,
        imove.priority,
        imove.next.map(Move.fromIMove)
      );
    }
  }

class Repertoire {
    startingFen: string = "default pgn";
    moves: Move = new Move("",0,-1,0);
    iterator: number[] = [];

    constructor(startingFen: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", moves : Move | null = null ) {
        this.startingFen = startingFen;

        if (moves)
        {
            this.moves = moves;
        }
    }

    static fromIRepertoire(irepertoire: IRepertoire): Repertoire {
        return new Repertoire(
        
          irepertoire.startingFen,
          Move.fromIMove(irepertoire.moves[0])
        );
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

                const nextMove = this.priorityMove(currentMove, i);
                if (nextMove) {
                    pgn = this.toPgnHelper(pgn, nextMove);
                }
            }
        }
        const nextMove = this.priorityMove(currentMove, 0);
        if (nextMove) {
            pgn = this.toPgnHelper(pgn, nextMove);
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

    addMove(move: string, priority: number | null): void {
        const currentMove = this.iteratingMove();

        if (currentMove) {
            for (const m of currentMove.next) {
                if (m.move == move) {
                    this.iterator.push(m.priority);
                    return;
                }
            }

            if (priority) {
                for (const m of currentMove.next) {
                    if (m.priority >= priority) {
                        m.priority++;
                    }
                }
            }
            else {
                priority = currentMove.next.length;
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

