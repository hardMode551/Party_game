import React, { useState } from "react";

interface Props {
  players: string[];
  questions: string[];
}

const WhatIfGame: React.FC<Props> = ({ players, questions }) => {
  const [playerIndex, setPlayerIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(getRandomIndex(questions.length));

  function getRandomIndex(length: number) {
    return Math.floor(Math.random() * length);
  }

  const nextQuestion = () => {
    setPlayerIndex((prev) => (prev + 1) % players.length);
    setQuestionIndex(getRandomIndex(questions.length));
  };

  return (
    <div className="game-container">
      <h2>
        <span>{players[playerIndex]},</span> что бы ты сделал(а)?
      </h2>
      <p>{questions[questionIndex]}</p>
      <button onClick={nextQuestion}>Следующий вопрос</button>
    </div>
  );
};

export default WhatIfGame;
