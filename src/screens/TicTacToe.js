import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GameContext } from '../context/GameContext';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const { setTicTacToePlayed, setTicTacToeWins } = useContext(GameContext);

  const checkWinner = (currentBoard) => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;

      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        setWinner(currentBoard[a]);
        setGameOver(true);
        return currentBoard[a];
      }
    }

    if (!currentBoard.includes(null)) {
      setIsDraw(true);
      setGameOver(true);
      return 'draw';
    }

    return null;
  };

  useEffect(() => {
    if (!gameOver) return;

    setTicTacToePlayed((prev) => prev + 1);

    if (winner === 'X') {
      setTicTacToeWins((prev) => ({ ...prev, X: prev.X + 1 }));
    }

    if (winner === 'O') {
      setTicTacToeWins((prev) => ({ ...prev, O: prev.O + 1 }));
    }
  }, [gameOver, winner, setTicTacToePlayed, setTicTacToeWins]);

  const handlePress = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);
    checkWinner(newBoard);

    if (!gameOver) {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
    setGameOver(false);
  };

  const renderSquare = (index) => (
    <TouchableOpacity
      key={index}
      style={styles.square}
      onPress={() => handlePress(index)}
      activeOpacity={0.8}
    >
      <Text style={[styles.squareText, board[index] === 'X' ? styles.xText : styles.oText]}>
        {board[index]}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❌ Tic Tac Toe</Text>

      <Text style={styles.turn}>
        {winner ? `🎉 Winner : ${winner}` : isDraw ? '🤝 Match Draw' : `Current Turn : ${currentPlayer}`}
      </Text>

      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>

        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>

        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>🔄 Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#00E5FF',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  turn: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 25,
  },
  board: {
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 20,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.35)',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 95,
    height: 95,
    margin: 4,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  squareText: {
    fontSize: 44,
    fontWeight: 'bold',
  },
  xText: {
    color: '#00E5FF',
  },
  oText: {
    color: '#FF5C8D',
  },
  resetButton: {
    marginTop: 30,
    backgroundColor: '#00E5FF',
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 15,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
  },
  resetText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
});