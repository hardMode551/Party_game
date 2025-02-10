import React from "react";
import styles from './GameSelector.module.scss';

interface GameSelectorProps {
  onSelect: (game: string) => void;
}

const GameSelector: React.FC<GameSelectorProps> = ({ onSelect }) => {
  return (
    <div className={styles["game-selector"]}>
      <div className={styles["party-game"]}>
        <h1>Для компаний</h1>
        <button onClick={() => onSelect("questions")}>
          Что бы ты делал, если...
        </button>
        <button onClick={() => onSelect("truth_or_dare")}>
          Правда или действие
        </button>
      </div>
      <div className={styles["solo-game"]}>
        <h1>Одиночные игры</h1>
        <button onClick={() => onSelect("quiz")}>
          Квиз по категориям
        </button>
      </div>
    </div>
  );
};

export default GameSelector;
