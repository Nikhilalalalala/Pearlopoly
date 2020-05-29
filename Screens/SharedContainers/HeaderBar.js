import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class HeaderBar extends React.Component {

  render () {
    return (
      <View style={topBar.container}>
      </View>
    );
  }
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