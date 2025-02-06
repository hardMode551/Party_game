import React from "react";
import { useSearchParams } from "react-router-dom";
import WhatIfGame from "../WhatIfGame/WhatIfGame";
import TruthOrDareGame from "../TruthOrDareGame/TruthOrDareGame";
import { questionsByGameType } from "../../data/questions";

interface Props {
  players: string[];
}

const GameWrapper: React.FC<Props> = ({ players }) => {
  const [searchParams] = useSearchParams();
  const gameType = searchParams.get("type") || "questions";

  if (gameType === "truth_or_dare") {
    return (
        <TruthOrDareGame
        players={players}
        truth={questionsByGameType.truth_or_dare.truth || []}
        dare={questionsByGameType.truth_or_dare.dare || []}
      />
      
    );
  }

  return <WhatIfGame players={players} questions={questionsByGameType.questions.questions || []} />
  ;
};

export default GameWrapper;
