import React, { useState } from "react";

import styles from './PlayerSetup.module.scss'

interface Props {
  onPlayersSet: (players: string[]) => void;
}

const PlayerSetup: React.FC<Props> = ({ onPlayersSet }) => {
  const [playerCount, setPlayerCount] = useState(2);
  const [names, setNames] = useState<string[]>(["", ""]);

  const handleChange = (index: number, name: string) => {
    const newNames = [...names];
    newNames[index] = name;
    setNames(newNames);
  };

  const startGame = () => {
    onPlayersSet(names);
  };

  return (
    <div className={styles["player-setup"]}>
      <h2>Введите имена игроков</h2>
      <input
        type="number"
        min="2"
        max="10"
        value={playerCount}
        onChange={(e) => {
          const count = Number(e.target.value);
          setPlayerCount(count);
          setNames(new Array(count).fill(""));
        }}
      />
      {names.map((name, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Игрок ${i + 1}`}
          value={name}
          onChange={(e) => handleChange(i, e.target.value)}
        />
      ))}
      <button onClick={startGame}>Начать</button>
    </div>
  );
};

export default PlayerSetup;
