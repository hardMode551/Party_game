import React, { useState } from "react";

interface Props {
  players: string[];
  truth: string[];
  dare: string[];
}

const TruthOrDareGame: React.FC<Props> = ({ players, truth, dare }) => {
  const [playerIndex, setPlayerIndex] = useState(0);
  const [isTruth, setIsTruth] = useState<boolean | null>(null);
  const [questionIndex, setQuestionIndex] = useState(getRandomIndex(truth.length));

  function getRandomIndex(length: number) {
    return Math.floor(Math.random() * length);
  }

  const nextQuestion = () => {
    setPlayerIndex((prev) => (prev + 1) % players.length);
    setQuestionIndex(isTruth ? getRandomIndex(truth.length) : getRandomIndex(dare.length));
    setIsTruth(null);
  };

  return (
    <div className="game-container">
      {isTruth === null ? (
        <>
          <h2>
            <span>{players[playerIndex]},</span> правда или действие?
          </h2>
          <div className="choice-buttons">
            <button onClick={() => setIsTruth(true)}>Правда</button>
            <button onClick={() => setIsTruth(false)}>Действие</button>
          </div>
        </>
      ) : (
        <>
          <h3>
            {isTruth ? "Правда" : "Действие"} для <span>{players[playerIndex]}</span>:
          </h3>
          <p>{isTruth ? truth[questionIndex] : dare[questionIndex]}</p>
          <button onClick={nextQuestion}>Следующий</button>
        </>
      )}
    </div>
  );
};

export default TruthOrDareGame;
