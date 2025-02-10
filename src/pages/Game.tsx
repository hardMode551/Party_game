import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PlayerSetup from "../components/PlayerSetup/PlayerSetup";
import GameWrapper from "../components/GameWrapper/GameWrapper";

const Game: React.FC = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const gameType = searchParams.get("type") || "questions";

  if (players.length === 0 && gameType !== "quiz") {
    return <PlayerSetup onPlayersSet={setPlayers} />;
  }

  return <GameWrapper players={players} gameType={gameType} />;
};

export default Game;
