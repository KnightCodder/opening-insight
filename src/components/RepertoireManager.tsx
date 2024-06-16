import React, { useEffect, useState } from 'react';
import { Repertoire } from '@/utils/Repertoire';
import { Chess, Move } from 'chess.js';
import MoveSection from './MoveSection';
import ChessBoard from "@/components/ChessBoard";
import _ from "lodash";
import { saveRepertoire } from '@/services/repertoireService';

function CreateNewRepertoire() {
  const initialRepertoire = new Repertoire();
  const [moveSection, setMoveSection] = useState(initialRepertoire);
  const [game, setGame] = useState(moveSection.currentGame());

  const handlePieceDrop = (move: Move) => {
    console.log(move.san);
    const updatedMoveSection = _.cloneDeep(moveSection); // Create a new instance
    updatedMoveSection.addMove(move.san, null);
    setMoveSection(updatedMoveSection); // Update state with new instance
  };

  useEffect(() => {
    setGame(moveSection.currentGame());
  }, [moveSection]);

  const handleSave = async () => {
    try {
      const userId = "user_id_from_context_or_auth"; // Replace with actual user ID retrieval
      await saveRepertoire(userId, moveSection.startingFen, moveSection.moves);
      console.log('Repertoire saved successfully');
    } catch (error) {
      console.error('Error saving repertoire:', error);
    }
  };

  return (
    <>
      <ChessBoard game={game} setGame={setGame} onPieceDrop={handlePieceDrop} />
      <MoveSection moveSection={moveSection} setMoveSection={setMoveSection} />
      <button onClick={() => {
        const updatedMoveSection = _.cloneDeep(moveSection); // Create a new instance
        updatedMoveSection.previousMove();
        setMoveSection(updatedMoveSection); // Update state with new instance
      }}>| previous |</button>
      <button onClick={() => {
        const updatedMoveSection = _.cloneDeep(moveSection); // Create a new instance
        updatedMoveSection.deleteMove();
        setMoveSection(updatedMoveSection); // Update state with new instance
      }}>| delete |</button>
      <button onClick={handleSave}>| save |</button>
    </>
  );
}

export default CreateNewRepertoire;
