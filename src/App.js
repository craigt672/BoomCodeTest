import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { MainContent } from './navigation/MainContent';

export const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" animated />
        <MainContent />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
