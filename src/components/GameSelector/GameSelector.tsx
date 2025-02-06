import React from "react";

import styles from './GameSelector.module.scss';

// Добавляем типизацию пропсов для компонента
interface GameSelectorProps {
  onSelect: (game: string) => void;
}

const GameSelector: React.FC<GameSelectorProps> = ({ onSelect }) => {
  return (
    <div className={styles["game-selector"]}>
      <button onClick={() => onSelect("questions")}>
        Что бы ты делал, если...
      </button>
      <button onClick={() => onSelect("truth_or_dare")}>
        Правда или действие
      </button>
    </div>
  );
};

export default GameSelector;
