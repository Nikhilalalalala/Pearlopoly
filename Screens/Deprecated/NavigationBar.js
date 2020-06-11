import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import Svg, {Circle} from "react-native-svg";

function NavigationBar () {

 const navigation = useNavigation();
    
  return (
    <View style={navBar.container}>
      <TouchableOpacity style={navBar.buttonPlaceholder} onPress={() => navigation.navigate('Overview')}>
        <Icon name="home" color="#FAF3DD" />
        <Text style={navBar.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={navBar.buttonPlaceholder} onPress={() => navigation.navigate('Record')}>
        <Icon name="bar-chart" type="font-awesome" color="#FAF3DD" />
        <Text style={navBar.text}>Records</Text>
      </TouchableOpacity>

      {/* 
      //*Trying to add a circle but in process
      <View>
      <Svg  height="50%" width="50%" viewBox="0 0 100 100" >
      <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="blue"
          strokeWidth="2.5"
          fill="green"
        /> </Svg>
      </View> */}

      <TouchableOpacity style={navBar.buttonPlaceholder} onPress={() => navigation.navigate('Add Record')}>
        <Icon name="plus" type="font-awesome" color="#FAF3DD" />
        <Text style={navBar.text}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={navBar.buttonPlaceholder} onPress={() => navigation.navigate('Placeholder')}>
        <Icon name="crosshairs" type="font-awesome" color="#FAF3DD" />
        <Text style={navBar.text}>Goals</Text>
      </TouchableOpacity>
      <TouchableOpacity style={navBar.buttonPlaceholder} onPress={() => navigation.navigate('Settings')}>
        <Icon name="settings" color="#FAF3DD" />
        <Text style={navBar.text}>Settings</Text>
      </TouchableOpacity>
    </View>
  ); 
}

const navBar = StyleSheet.create({
  container: {
    width: "100%",
    height: 54,
    flexDirection: "row",
    backgroundColor: "#FAF3DD",
  },
  buttonPlaceholder: {
    width: "20%",
    height: 54,
    backgroundColor: "#FFBE86",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FAF3DD",
    fontFamily: 'Lato-Bold',

  },
});

export default NavigationBar;
