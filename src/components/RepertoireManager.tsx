import React from 'react';
import { Repertoire } from '@/utils/Repertoire';
import { Chess, Move } from 'chess.js';
import { useEffect, useState } from 'react';
import MoveSection from './MoveSection';
import ChessBoard from "@/components/ChessBoard";
import _ from "lodash";

function CreateNewRepertoire() {
  const initialRepertoire = new Repertoire;

  const [moveSection, setMoveSection] = useState(initialRepertoire);

  const [game, setGame] = useState(moveSection.currentGame());

  const handlePieceDrop = (move : Move) => {
    console.log(move.san);
      const updatedMoveSection = _.cloneDeep(moveSection); // Create a new instance
      updatedMoveSection.addMove(move.san);
      setMoveSection(updatedMoveSection); // Update state with new instance
  };

  useEffect(() => {
    setGame(moveSection.currentGame());
  }, [moveSection]);

  return (
    <>
      <ChessBoard game={game} setGame={setGame} onPieceDrop={handlePieceDrop} />
      <MoveSection moveSection={moveSection} setMoveSection={setMoveSection} />
      <button onClick={() => {
              const updatedMoveSection = _.cloneDeep(moveSection); // Create a new instance
              updatedMoveSection.previousMove();
              setMoveSection(updatedMoveSection); // Update state with new instance
      }} >previous</button>
    </>
  );
}

export default CreateNewRepertoire;
