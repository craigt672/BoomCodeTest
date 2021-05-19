import React from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';


const styleSheet = StyleSheet.create({
  screenTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 60
  }
});

export const ScreenTitle = ({ title }) => {
  return (
    <Text style={styleSheet.screenTitle}>
      {title}
    </Text>
  )
}