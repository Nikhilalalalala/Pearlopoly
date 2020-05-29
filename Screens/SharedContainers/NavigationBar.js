import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';

class NavigationBar extends React.Component {

  render () {

    return (
      <View style={navBar.container}>
        <TouchableOpacity style={navBar.buttonPlaceholder} >
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navBar.buttonPlaceholder} >
          <Text>Records</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navBar.buttonPlaceholder} >
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navBar.buttonPlaceholder} >
          <Text>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navBar.buttonPlaceholder} >
          <Text>Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const navBar = StyleSheet.create({
  container: {
    width: '100%',
    height: 54,
    flexDirection: 'row',
    backgroundColor: '#FAF3DD'
  },
  buttonPlaceholder: {
    width: '20%',
    height: 54,
    backgroundColor: '#FFBE86',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default NavigationBar;
