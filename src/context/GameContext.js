import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [ticTacToePlayed, setTicTacToePlayed] = useState(0);
  const [ticTacToeWins, setTicTacToeWins] = useState({ X: 0, O: 0 });
  const [snakePlayed, setSnakePlayed] = useState(0);
  const [snakeHighScore, setSnakeHighScore] = useState(0);
  const [chessPlayed, setChessPlayed] = useState(0);
  const [lastWinners, setLastWinners] = useState({});

  const incrementGamesPlayed = (gameName) => {
    if (gameName === 'ticTacToe') {
      setTicTacToePlayed((prev) => prev + 1);
    } else if (gameName === 'snake') {
      setSnakePlayed((prev) => prev + 1);
    } else if (gameName === 'chess') {
      setChessPlayed((prev) => prev + 1);
    }
  };

  const setLastWinner = (gameName, winner) => {
    setLastWinners((prev) => ({ ...prev, [gameName]: winner }));
  };

  const updateHighScore = (gameName, score) => {
    if (gameName === 'snake') {
      setSnakeHighScore((prev) => Math.max(prev, score));
    }
  };

  const stats = {
    ticTacToe: {
      gamesPlayed: ticTacToePlayed,
      lastWinner: lastWinners.ticTacToe ?? null,
      highScore: ticTacToeWins.X + ticTacToeWins.O,
    },
    snake: {
      gamesPlayed: snakePlayed,
      highScore: snakeHighScore,
      lastWinner: lastWinners.snake ?? null,
    },
    chess: {
      gamesPlayed: chessPlayed,
      lastWinner: lastWinners.chess ?? null,
      highScore: 0,
    },
  };

  const value = {
    ticTacToePlayed,
    setTicTacToePlayed,
    ticTacToeWins,
    setTicTacToeWins,
    snakePlayed,
    setSnakePlayed,
    snakeHighScore,
    setSnakeHighScore,
    chessPlayed,
    setChessPlayed,
    lastWinners,
    stats,
    incrementGamesPlayed,
    setLastWinner,
    updateHighScore,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};