import React from 'react';
import { Repertoire, Move } from '@/utils/Repertoire';
import { Chess } from 'chess.js';
import { useEffect, useState } from 'react';
import MoveSection from './MoveSection';

const CreateNewRepertoire = () => {
  const initialRepertoire = new Repertoire("hfad");

  const [moveSection, setMoveSection] = useState(initialRepertoire);

  const updateRepertoire = (newMove : string) => {
    const updatedRepertoire = { ...moveSection }; // or use methods from Repertoire to update it properly
    // updatedRepertoire.// Assuming `addMove` is a method in Repertoire
    setMoveSection(updatedRepertoire);
  };

  return (
    <>
      <MoveSection moveSection={moveSection} setMoveSection={setMoveSection}/>
    </>
  );
};

export default CreateNewRepertoire;
