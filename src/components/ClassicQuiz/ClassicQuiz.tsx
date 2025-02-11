import React, { useState, useEffect } from "react";
import { Category } from "../../data/quizCategories";
import styles from "./ClassicQuiz.module.scss";

interface ClassicQuizProps {
  categories: Category[];
}

const TIME_LIMIT = 30;

const ClassicQuiz: React.FC<ClassicQuizProps> = ({ categories }) => {
  const [stage, setStage] = useState<"setup" | "quiz" | "result">("setup");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [timedMode, setTimedMode] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(TIME_LIMIT);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<
    {
      question: string;
      userAnswer: string | null;
      correctAnswer: string;
      options: string[];
    }[]
  >([]);
  const [answersExpanded, setAnswersExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (stage === "quiz" && timedMode && timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (stage === "quiz" && timedMode && timeLeft === 0) {
      handleSubmitAnswer(null);
    }
  }, [timeLeft, stage, timedMode, showFeedback]);

  const startQuiz = () => {
    if (selectedCategory) {
      setStage("quiz");
      setCurrentQuestionIndex(0);
      setScore(0);
      setTimeLeft(TIME_LIMIT);
      setSelectedOption(null);
      setUserAnswers([]);
    }
  };

  const currentQuestion = selectedCategory?.questions[currentQuestionIndex];

   // Перемешивание массива
   const shuffledOptions = React.useMemo(() => {
    if (!currentQuestion) return [];
    return [...currentQuestion.options].sort(() => Math.random() - 0.5);
  }, [currentQuestionIndex, selectedCategory]);

  const handleSubmitAnswer = (option: string | null) => {
    if (!selectedCategory) return;
    const currentQuestion = selectedCategory.questions[currentQuestionIndex];
    const correct = option === currentQuestion.answer;
    if (correct) setScore(score + 1);
    setSelectedOption(option);
    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: option,
        correctAnswer: currentQuestion.answer,
        options: currentQuestion.options,
      },
    ]);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < selectedCategory.questions.length) {
        setCurrentQuestionIndex(nextIndex);
        setTimeLeft(TIME_LIMIT);
        setSelectedOption(null);
      } else {
        setStage("result");
      }
    }, 2000);
  };

  if (stage === "setup") {
    return (
      <div className={styles.quizSetup}>
        <div className={styles.categorySelection}>
          <h1>Выберите категорию:</h1>
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(cat)}
              className={`${styles.categoryButton} ${
                selectedCategory?.name === cat.name ? styles.selected : ""
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className={styles.timeMode}>
          <h2>Режим времени:</h2>
          <label>
            <input
              type="checkbox"
              checked={timedMode}
              onChange={(e) => setTimedMode(e.target.checked)}
            />
            С ограничением по времени ({TIME_LIMIT} секунд)
          </label>
        </div>
        <button
          onClick={startQuiz}
          disabled={!selectedCategory}
          className={styles.startButton}
        >
          Начать квиз
        </button>
      </div>
    );
  }

  if (stage === "quiz" && selectedCategory) {
    const currentQuestion = selectedCategory.questions[currentQuestionIndex];
    return (
      <div className={styles.quizContainer}>
        <div className={styles.progressContainer}>
          <span className={styles.questionCounter}>
            {currentQuestionIndex + 1} из {selectedCategory.questions.length}
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{
                width: `${
                  ((currentQuestionIndex + 1) /
                    selectedCategory.questions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        <h2>{currentQuestion.question}</h2>
        <div className={styles.options}>
          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSubmitAnswer(option)}
              className={`${styles.optionButton} ${
                selectedOption === option
                  ? option === currentQuestion.answer
                    ? styles.correct
                    : styles.incorrect
                  : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {timedMode && (
          <div className={styles.timerContainer}>
            <div
              className={styles.timerBar}
              style={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }}
            />
          </div>
        )}
        {showFeedback && (
          <div
            className={`${styles.feedback} ${
              selectedOption === currentQuestion.answer
                ? styles.feedbackCorrect
                : styles.feedbackIncorrect
            }`}
          >
            {selectedOption === currentQuestion.answer ? "Верно!" : "Неверно!"}
          </div>
        )}
      </div>
    );
  }

  if (stage === "result" && selectedCategory) {
    return (
      <div className={styles.quizResult}>
        <h2>Результаты квиза:</h2>
        <p>
          Вы ответили правильно на {score} из{" "}
          {selectedCategory.questions.length} вопросов.
        </p>
        <button
          onClick={() => setStage("setup")}
          className={styles.retryButton}
        >
          Попробовать снова
        </button>
        {/* Кнопка для раскрытия списка */}
        <button
          className={styles.expandButton}
          onClick={() => setAnswersExpanded(!answersExpanded)}
        >
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 1024 1024"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            style={{
              transform: answersExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M917.333333 364.8L851.2 298.666667 512 637.866667 172.8 298.666667 106.666667 364.8 512 768z"
                fill="#2196F3"
              ></path>
            </g>
          </svg>
          {answersExpanded ? "Скрыть ответы" : "Показать подробные ответы"}
        </button>

        {/* Разворачиваемый список ответов */}
        {answersExpanded && (
          <div className={styles.answerList}>
            {userAnswers.map((entry, index) => (
              <div key={index} className={styles.answerItem}>
                <h3>{entry.question}</h3>
                <ul>
                  {entry.options.map((option, i) => {
                    const isCorrect = option === entry.correctAnswer;
                    const isUserAnswer = option === entry.userAnswer;
                    const isCorrectAndSelected = isCorrect && isUserAnswer;

                    return (
                      <li
                        key={i}
                        className={`
          ${styles.answerOption} 
          ${isCorrectAndSelected ? styles.correctAndSelectedAnswer : ""}
          ${!isCorrectAndSelected && isCorrect ? styles.correctAnswer : ""}
          ${!isCorrectAndSelected && isUserAnswer ? styles.selectedAnswer : ""}
        `}
                      >
                        {option}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default ClassicQuiz;
