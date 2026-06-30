import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';
import { GameProvider } from './src/context/GameContext';

function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </GameProvider>
  );
}

registerRootComponent(App);
export default App;
