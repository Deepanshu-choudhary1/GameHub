import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { GameContext } from '../context/GameContext';
import DashboardCard from '../components/DashboardCard';

export default function Dashboard({ navigation }) {
  const { stats } = useContext(GameContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>GameHub</Text>
      <Text style={styles.sub}>Play, compete, and track your best scores.</Text>

      <View style={styles.row}>
        <DashboardCard
          title="Tic-Tac-Toe"
          subtitle={`Played: ${stats.ticTacToe.gamesPlayed} • Last: ${stats.ticTacToe.lastWinner ?? '—'}`}
          accent="#6ee7b7"
          onPress={() => navigation.navigate('TicTacToe')}
        />
        <DashboardCard
          title="Chess"
          subtitle={`Played: ${stats.chess.gamesPlayed} • Last: ${stats.chess.lastWinner ?? '—'}`}
          accent="#7dd3fc"
          onPress={() => navigation.navigate('Chess')}
        />
      </View>

      <View style={styles.row}>
        <DashboardCard
          title="Memory"
          subtitle={`Played: ${stats.snake.gamesPlayed} • High: ${stats.snake.highScore}`}
          accent="#fca5a5"
          onPress={() => navigation.navigate('Snake')}
        />
      </View>

      <View style={styles.stats}>
        <Text style={styles.statTitle}>All-Time Highs</Text>
        <Text style={styles.statLine}>Tic-Tac-Toe: {stats.ticTacToe.highScore}</Text>
        <Text style={styles.statLine}>Chess: {stats.chess.highScore}</Text>
        <Text style={styles.statLine}>Memory: {stats.snake.highScore}</Text>
      </View>

      <TouchableOpacity style={styles.playAll} onPress={() => navigation.navigate('TicTacToe')}>
        <Text style={styles.playAllText}>Play Now →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#071224',
    minHeight: '100%',
  },
  header: { color: '#fff', fontSize: 32, fontWeight: '800', marginTop: 8 },
  sub: { color: '#98a8bf', marginTop: 6, marginBottom: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  stats: {
    marginTop: 20,
    backgroundColor: '#071827',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0f1724',
  },
  statTitle: { color: '#fff', fontWeight: '700', marginBottom: 8 },
  statLine: { color: '#b8c1d3', marginTop: 6 },
  playAll: {
    marginTop: 18,
    backgroundColor: '#ffcc00',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  playAllText: { color: '#071224', fontWeight: '800' },
});
