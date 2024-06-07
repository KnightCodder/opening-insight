
class Move {
    move: string;
    moveNumber: number;
    turn: string;
    priority: number;
    next: Move[];

    constructor(move: string, moveNumber: number, turn: string, priority: number)
    {
        this.move = move;
        this.moveNumber = moveNumber;
        this.turn = turn;
        this.priority = priority;
        this.next = [];
    }

    addMove(move: string, moveNumber: number, turn: string, priority: number): void
    {
        const newMove = new Move(move, moveNumber, turn, priority); // change it in future
        this.next.push(newMove);
    }
}

class Repertoire {
    startingPosition: string;
    firstMoves: Move[];

    constructor(startingPosition: string)
    {
        this.startingPosition = startingPosition;
        this.firstMoves = [];
    }
}

export { Repertoire, Move };
