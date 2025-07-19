import React, { useState, useEffect } from 'react';
import Square from './Square';

const clickSound = new Audio("/sounds/click.wav");
const winSound = new Audio("/sounds/win.mp3");
const drawSound = new Audio("/sounds/Draw.wav");


const Board = ({ playerX, playerO, scoreX, scoreO, setScoreX, setScoreO }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  const checkWinner = (board) => {
    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    for (let [a,b,c] of winPatterns) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: [a, b, c] };
      }
    }
    return { winner: null, line: [] };
  };

  // useEffect(() => {
  //   const result = checkWinner(squares);
  //   if (result.winner) {
  //     setWinner(result.winner);
  //     setWinningLine(result.line);
  //     winSound.play();
  //     if (result.winner === "X") setScoreX(scoreX + 1);
  //     else if (result.winner === "O") setScoreO(scoreO + 1);
  //   } else if (squares.every(Boolean)) {
  //     drawSound.play();
  //   }
  // }, [squares]);

  useEffect(() => {
  // Don’t run if there’s already a winner
  if (winner) return;

  const result = checkWinner(squares);
  if (result.winner) {
    setWinner(result.winner);
    setWinningLine(result.line);
    winSound.play();

    if (result.winner === "X") {
      setScoreX(prev => prev + 1);
    } else if (result.winner === "O") {
      setScoreO(prev => prev + 1);
    }
  } else if (squares.every(Boolean)) {
    drawSound.play();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [squares]);


  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = [...squares];
    newSquares[index] = isXTurn ? "X" : "O";
    setSquares(newSquares);
    setIsXTurn(!isXTurn);
    clickSound.play();
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setWinningLine([]);
  };

  const getCurrentPlayer = () => isXTurn ? playerX : playerO;
  const getWinnerName = () => winner === "X" ? playerX : playerO;

  return (
    <div>
      <div className="board">
        {squares.map((val, idx) => (
          <Square
            key={idx}
            value={val}
            onClick={() => handleClick(idx)}
            isWinning={winningLine.includes(idx)}
          />
        ))}
      </div>
      <h2>
        {winner
          ? `🏆 Winner: ${getWinnerName()}`
          : squares.every(Boolean)
            ? "Draw!"
            : `Next Turn: ${getCurrentPlayer()}`}
      </h2>
      <button onClick={resetGame}>Restart Round</button>
    </div>
  );
};

export default Board;
