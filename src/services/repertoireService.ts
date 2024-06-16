import connect from '../lib/mongoose/connect';
import { IMove, IRepertoire, Repertoire } from '../models/repertoire';
import { Repertoire as RepertoireClass, Move } from'@/utils/Repertoire'; // Adjust the import path

interface RepertoireInput {
  userId: string;
  repertoire : RepertoireClass;
}

export async function saveRepertoire(userId: string, repertoire : RepertoireClass): Promise<void> {
  await connect();
  const repertoireDoc = repertoireToDict({userId, repertoire});

  await repertoireDoc.save();
}

export async function getRepertoires(userId: string): Promise<RepertoireClass[]> {
  await connect();

  try {
    const repertoires = await Repertoire.find({ userId });
    return repertoires.map(rep => RepertoireClass.fromIRepertoire(rep));
  } catch (error) {
    console.error('Error fetching repertoires:', error);
    throw error;
  }
}

const repertoireToDict = (rep: RepertoireInput) => {
  return {
    userId: rep.userId,
    startingFen: rep.repertoire.startingFen,
    moves: movesToDict(rep.repertoire.moves)
  }
}

const movesToDict = (moves: Move) => {
  return {
    move: moves.move,
    priority: moves.priority,
    next: moves.next.map(movesToDict)
  };
};

