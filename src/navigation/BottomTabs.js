import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Dashboard from '../screens/Dashboard';
import TicTacToe from '../screens/TicTacToe';
import ChessGame from '../screens/ChessGame';
import SnakeGame from '../screens/SnakeGame';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ffcc00',
        tabBarInactiveTintColor: '#ddd',
        tabBarStyle: { backgroundColor: '#0f1724', borderTopColor: '#111' },
        tabBarIcon: ({ color, size }) => {
          let name = 'home';
          if (route.name === 'TicTacToe') name = 'grid';
          if (route.name === 'Chess') name = 'game-controller';
          if (route.name === 'Snake') name = 'game-controller-outline';
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="TicTacToe" component={TicTacToe} options={{ title: 'Tic-Tac-Toe' }} />
      <Tab.Screen name="Chess" component={ChessGame} />
      <Tab.Screen name="Snake" component={SnakeGame} options={{ title: 'Memory' }} />
    </Tab.Navigator>
  );
}