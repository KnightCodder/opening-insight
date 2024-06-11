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
        const newMove = new Move(move, moveNumber, turn, priority);
        this.next.push(newMove);
    }

    // Helper method to convert the move and its subsequent moves to a string
    toString(indentLevel: number = 0): string {
        let indent = ' '.repeat(indentLevel * 2);
        let result = `${indent}Move: ${this.move}, Move Number: ${this.moveNumber}, Turn: ${this.turn}, Priority: ${this.priority}\n`;
        for (const nextMove of this.next) {
            result += nextMove.toString(indentLevel + 1);
        }
        return result;
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

    // Method to convert the repertoire to a string
    public toString(): string {
        let result = `Starting Position: ${this.startingPosition}\n`;
        for (const move of this.firstMoves) {
            result += move.toString(1);
        }
        return result;
    }
}

export { Repertoire, Move };
