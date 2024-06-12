import { Repertoire, Move } from "@/utils/Repertoire";
import { useState, useEffect } from "react";

interface RepertoireComponentProps {
    moveSection: Repertoire;
    setMoveSection: React.Dispatch<React.SetStateAction<Repertoire>>;
  }

const MoveSection : React.FC<RepertoireComponentProps> = ({ moveSection, setMoveSection}) => {
    
    const [displayString, setDisplayString] = useState<string>(moveSection.toPgn()); 

    useEffect(() => {
        setDisplayString(moveSection.toPgn());
      }, [moveSection]);

    return (
    <>
        <div id="MoveSection">
            Current move section: {displayString}
        </div>
    </>
    );
}

export default MoveSection;