import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import BottomTabs from "./navigation/BottomTabs";
import { GameProvider } from "./context/GameContext";

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </GameProvider>
  );
}