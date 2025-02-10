import React from "react";
import WhatIfGame from "../WhatIfGame/WhatIfGame";
import TruthOrDareGame from "../TruthOrDareGame/TruthOrDareGame";
import ClassicQuiz from "../ClassicQuiz/ClassicQuiz";
import { questionsByGameType } from "../../data/questions";
import { categories } from "../../data/quizCategories";

interface Props {
  players: string[];
  gameType: string;
}

interface GameComponentConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FC<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProps: (players: string[]) => any;
}

const gameComponentMap: Record<string, GameComponentConfig> = {
  questions: {
    component: WhatIfGame,
    getProps: (players: string[]) => ({
      players,
      questions: questionsByGameType.questions.questions || []
    })
  },
  truth_or_dare: {
    component: TruthOrDareGame,
    getProps: (players: string[]) => ({
      players,
      truth: questionsByGameType.truth_or_dare.truth || [],
      dare: questionsByGameType.truth_or_dare.dare || []
    })
  },
  quiz: {
    component: ClassicQuiz,
    getProps: () => ({
      categories: categories
    })
  }
};

const GameWrapper: React.FC<Props> = ({ players, gameType }) => {
  const config = gameComponentMap[gameType] || gameComponentMap["questions"];
  const Component = config.component;
  return <Component {...config.getProps(players)} />;
};

export default GameWrapper;
