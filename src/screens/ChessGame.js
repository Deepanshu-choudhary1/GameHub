import React, { useEffect, useState, useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Chess } from 'chess.js';
import { GameContext } from '../context/GameContext';

const PIECE_UNICODE = {
  p: { w: '♙', b: '♟' },
  r: { w: '♖', b: '♜' },
  n: { w: '♘', b: '♞' },
  b: { w: '♗', b: '♝' },
  q: { w: '♕', b: '♛' },
  k: { w: '♔', b: '♚' },
};

export default function ChessGame() {
  const { incrementGamesPlayed, setLastWinner } = useContext(GameContext);
  const [chess] = useState(() => new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [selected, setSelected] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

  useEffect(() => {
    setFen(chess.fen());
    if (chess.isGameOver()) {
      incrementGamesPlayed('chess');
      let winner = 'Draw';
      if (chess.isCheckmate()) {
        winner = chess.turn() === 'w' ? 'Black' : 'White';
      }
      setLastWinner('chess', winner);
      Alert.alert('Game Over', `${winner} — ${chess.isCheckmate() ? 'Checkmate' : 'Game Over'}`);
    }
  }, [fen]);

  const board = useMemo(() => chess.board(), [fen]);

  function resetBoard() {
    chess.reset();
    setFen(chess.fen());
    setSelected(null);
    setLegalMoves([]);
  }

  function onSquarePress(file, rank) {
    const square = `${file}${rank}`;
    const piece = chess.get(square);
    if (selected) {
      // attempt move
      const move = chess.move({ from: selected, to: square, promotion: 'q' });
      setSelected(null);
      setLegalMoves([]);
      if (move) {
        setFen(chess.fen());
      } else {
        // invalid: maybe pick another
        if (piece && piece.color === chess.turn()) {
          setSelected(square);
          const moves = chess.moves({ square, verbose: true }).map(m => m.to);
          setLegalMoves(moves);
        }
      }
      return;
    }

    if (piece && piece.color === chess.turn()) {
      setSelected(square);
      const moves = chess.moves({ square, verbose: true }).map(m => m.to);
      setLegalMoves(moves);
    }
  }

  function renderSquare(file, rank, rIndex, cIndex) {
    const square = `${file}${rank}`;
    const piece = chess.get(square);
    const isLight = (rIndex + cIndex) % 2 === 0;
    const isSelected = selected === square;
    const isLegal = legalMoves.includes(square);
    return (
      <TouchableOpacity
        key={square}
        onPress={() => onSquarePress(file, rank)}
        style={[
          styles.square,
          { backgroundColor: isSelected ? '#ffd666' : isLegal ? '#6ee7b7' : isLight ? '#e6e6e6' : '#2b3948' },
        ]}
      >
        <Text style={[styles.piece, { color: piece?.color === 'w' ? '#071224' : '#fff' }]}> 
          {piece ? PIECE_UNICODE[piece.type][piece.color] : ''}
        </Text>
      </TouchableOpacity>
    );
  }

  // board is array of ranks starting from 8 -> 1
  const files = ['a','b','c','d','e','f','g','h'];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chess</Text>
      <Text style={styles.turn}>Turn: {chess.turn() === 'w' ? 'White' : 'Black'}</Text>

      <View style={styles.board}>
        {board.map((rankArr, rIdx) => {
          const rank = 8 - rIdx;
          return (
            <View key={rank} style={styles.row}>
              {files.map((file, cIdx) => renderSquare(file, rank, rIdx, cIdx))}
            </View>
          );
        })}
      </View>

      <View style={styles.rowControls}>
        <TouchableOpacity style={styles.controlBtn} onPress={() => { resetBoard(); }}>
          <Text style={styles.controlText}>Reset Board</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071224', padding: 16, alignItems: 'center' },
  title: { color: '#fff', fontSize: 26, fontWeight: '800', marginTop: 8 },
  turn: { color: '#c3d0e0', marginTop: 6 },
  board: {
    marginTop: 16,
    backgroundColor: '#071224',
    padding: 6,
    borderRadius: 8,
  },
  row: { flexDirection: 'row' },
  square: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    borderRadius: 4,
  },
  piece: { fontSize: 22 },
  rowControls: { flexDirection: 'row', marginTop: 16 },
  controlBtn: {
    backgroundColor: '#ffcc00',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  controlText: { fontWeight: '800', color: '#071224' },
});