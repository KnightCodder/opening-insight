import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { saveRepertoire, getRepertoires } from '../../../services/repertoireService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user as string;

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { startingFen, moves } = req.body;
        if (!startingFen || !moves) {
          return res.status(400).json({ message: 'Invalid data' });
        }
        
        await saveRepertoire(userId, startingFen, moves);
        res.status(200).json({ message: 'Repertoire saved successfully' });
      } catch (error) {
        console.error('Error saving repertoire:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    case 'GET':
      try {
        const repertoires = await getRepertoires(userId);
        res.status(200).json(repertoires);
      } catch (error) {
        console.error('Error fetching repertoires:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
