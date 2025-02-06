import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Game from "./pages/Game";

import './styles/app.scss';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>

        <NavButton /> {/* Переместили кнопку сюда */}
      </div>
    </BrowserRouter>
  );
};

// Создаем отдельный компонент для кнопки
const NavButton: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/"); // Переход на главную страницу
  };

  return  (
    <div className="nav-button" onClick={goToHome}>
      <span>На главный экран</span>
    </div>
  );
};

export default App;
