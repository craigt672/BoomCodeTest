import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 150,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressText: {
    position: 'absolute',
    right: 40,
    top: 80,
    bottom: 0,
    fontSize: 20
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const Container = ({ progress, isLoading, children }) => {
  const _renderProgressText = () => {
    return progress && (
      <Text style={styleSheet.progressText}>
        {progress}
      </Text>
    )
  }

  const _renderLoader = () => {
    return isLoading && (
      <View style={styleSheet.loading}>
        <ActivityIndicator size='large' color="#1876D1" />
      </View>
    )
  }

  return (
    <View style={styleSheet.container}>
      {_renderProgressText()}
      {_renderLoader()}
      {children}
    </View>
  );
}
