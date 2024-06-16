import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Move
interface IMove {
  move: string;
  moveNumber: number;
  turn: number;
  priority: number;
  next: IMove[];
}

// Interface for Repertoire
interface IRepertoire extends Document {
  userId: string;
  startingFen: string;
  moves: IMove[];
}

// Move Schema
const MoveSchema: Schema<IMove> = new Schema({
  move: { type: String, required: true },
  moveNumber: { type: Number, required: true },
  turn: { type: Number, required: true },
  priority: { type: Number, required: true },
  next: [{ type: Schema.Types.ObjectId, ref: 'Move' }]
});

// Repertoire Schema
const RepertoireSchema: Schema<IRepertoire> = new Schema({
  userId: { type: String, required: true },
  startingFen: { type: String, required: true },
  moves: { type: [MoveSchema], default: [] }
});

// Model
const Repertoire: Model<IRepertoire> = mongoose.model<IRepertoire>('Repertoire', RepertoireSchema);


export { IMove, IRepertoire, Repertoire };
