import React from 'react';
import { Repertoire , Move } from '@/utils/Repertoire';
import { Chess } from 'chess.js';
import { useEffect } from 'react';

const CreateNewRepertoire = () => {
  useEffect(() => {
    // Create a new chess board
    const chess = new Chess();

    // Make some moves
    chess.move('e4');
    chess.move('e5');
    chess.move('Nf3');
    chess.move('Nc6');
    chess.move('Bb5');

    // Print the current board position to the console
    console.log(chess.ascii());
  }, []);

  return (
    <>

    </>
  );
};

export default CreateNewRepertoire;
