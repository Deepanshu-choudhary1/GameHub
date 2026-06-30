import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { GameContext } from '../context/GameContext';

const PAIR_VALUES = ['🐶', '🐱', '🦊', '🐻'];

function createDeck() {
  const deck = PAIR_VALUES.flatMap(value => [
    { id: `${value}-a`, value, flipped: false, matched: false },
    { id: `${value}-b`, value, flipped: false, matched: false },
  ]);
  return deck
    .map(card => ({ card, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ card }) => card);
}

export default function SnakeGame() {
  const { incrementGamesPlayed, updateHighScore } = useContext(GameContext);
  const [cards, setCards] = useState(createDeck);
  const [firstIndex, setFirstIndex] = useState(null);
  const [secondIndex, setSecondIndex] = useState(null);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const resetGame = () => {
    setCards(createDeck());
    setFirstIndex(null);
    setSecondIndex(null);
    setMoves(0);
    setMatches(0);
    setBlocked(false);
  };

  const completeGame = nextMatches => {
    incrementGamesPlayed('snake');
    updateHighScore('snake', nextMatches);
    Alert.alert('Memory Complete', `You matched all cards in ${moves} moves!`, [
      { text: 'Play Again', onPress: resetGame },
    ]);
  };

  const flipCard = index => {
    if (blocked) return;
    const card = cards[index];
    if (card.flipped || card.matched || index === firstIndex) return;

    const nextCards = cards.map((item, idx) =>
      idx === index ? { ...item, flipped: true } : item
    );
    setCards(nextCards);

    if (firstIndex === null) {
      setFirstIndex(index);
      return;
    }

    setSecondIndex(index);
    setMoves(prev => prev + 1);
    setBlocked(true);

    timerRef.current = setTimeout(() => {
      const firstCard = nextCards[firstIndex];
      const secondCard = nextCards[index];
      const matched = firstCard.value === secondCard.value;

      setCards(prevCards =>
        prevCards.map((item, idx) => {
          if (idx === firstIndex || idx === index) {
            return {
              ...item,
              matched: matched ? true : item.matched,
              flipped: matched ? true : false,
            };
          }
          return item;
        })
      );

      if (matched) {
        setMatches(prevMatches => {
          const nextMatches = prevMatches + 1;
          if (nextMatches === PAIR_VALUES.length) {
            completeGame(nextMatches);
          }
          return nextMatches;
        });
      }

      setFirstIndex(null);
      setSecondIndex(null);
      setBlocked(false);
    }, 700);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Match</Text>
      <Text style={styles.subtitle}>Matches: {matches} / {PAIR_VALUES.length}</Text>
      <Text style={styles.subtitle}>Moves: {moves}</Text>

      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={card.id}
            onPress={() => flipCard(index)}
            style={[styles.card, card.flipped || card.matched ? styles.cardFlipped : styles.cardHidden]}
            activeOpacity={0.8}
          >
            <Text style={styles.cardText}>{card.flipped || card.matched ? card.value : '❓'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071224',
    alignItems: 'center',
    padding: 20,
    paddingTop: 24,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#b8c1d3',
    fontSize: 16,
    marginBottom: 6,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 18,
  },
  card: {
    width: 72,
    height: 90,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderWidth: 1,
  },
  cardHidden: {
    backgroundColor: '#0f1724',
    borderColor: '#273449',
  },
  cardFlipped: {
    backgroundColor: '#1f2937',
    borderColor: '#7dd3fc',
  },
  cardText: {
    fontSize: 36,
  },
  resetButton: {
    marginTop: 24,
    backgroundColor: '#ffcc00',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  resetText: {
    color: '#071224',
    fontWeight: '800',
  },
});
