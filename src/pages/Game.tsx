import React, { useState } from "react";
import PlayerSetup from "../components/PlayerSetup/PlayerSetup";
import GameWrapper from "../components/GameWrapper/GameWrapper";

const Game: React.FC = () => {
  const [players, setPlayers] = useState<string[]>([]);

  if (players.length === 0) {
    return <PlayerSetup onPlayersSet={setPlayers} />;
  }

  return <GameWrapper players={players} />;
};

export default Game;
