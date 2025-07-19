import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // 🔄 Dark Mode toggle
  const [scoreX, setScoreX] = useState(() => {
    return Number(localStorage.getItem("scoreX")) || 0;
  });
  const [scoreO, setScoreO] = useState(() => {
    return Number(localStorage.getItem("scoreO")) || 0;
  });

  const handleStart = () => {
    if (playerX.trim() && playerO.trim()) {
      setStartGame(true);
    }
  };

  const handleResetScores = () => {
    setScoreX(0);
    setScoreO(0);
    localStorage.setItem("scoreX", 0);
    localStorage.setItem("scoreO", 0);
  };

  useEffect(() => {
    localStorage.setItem("scoreX", scoreX);
  }, [scoreX]);

  useEffect(() => {
    localStorage.setItem("scoreO", scoreO);
  }, [scoreO]);

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="toggle-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          <span className="slider round"></span>
        </label>
        <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
      </div>

      <h1>Tic Tac Toe Game</h1>

      {!startGame ? (
        <div className="player-form">
          <input
            type="text"
            placeholder="Enter Player X Name"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Player O Name"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
          />
          <button onClick={handleStart}>Start Game</button>
        </div>
      ) : (
        <>
          <div className="score-board">
            <h3>Score</h3>
            <p>{playerX || "Player X"} (X): {scoreX}</p>
            <p>{playerO || "Player O"} (O): {scoreO}</p>
            <button className="reset-score" onClick={handleResetScores}>
              Reset Scores
            </button>
          </div>

          <Board
            playerX={playerX}
            playerO={playerO}
            scoreX={scoreX}
            scoreO={scoreO}
            setScoreX={setScoreX}
            setScoreO={setScoreO}
          />
        </>
      )}
    </div>
  );
}

export default App;
