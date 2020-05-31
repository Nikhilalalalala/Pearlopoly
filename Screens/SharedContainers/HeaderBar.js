import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const HeaderBar = (props) => {
  return (
    <View style={topBar.container}>
      <Text>{props.currentScreen}</Text>
    </View>
  );
}

const topBar = StyleSheet.create({
  container: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFBE86'
  },
});

export default HeaderBar;