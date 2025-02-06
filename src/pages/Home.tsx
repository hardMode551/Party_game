import React from "react";
import { useNavigate } from "react-router-dom";

import GameSelector from "../components/GameSelector/GameSelector";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Функция, которая будет вызываться при выборе игры
  const startGame = (game: string) => {
    navigate(`/game?type=${game}`);
  };

  return (
      <GameSelector onSelect={startGame} />
  );
};

export default Home;
