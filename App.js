import React, { useState } from "react";
import { StatusBar, StyleSheet } from 'react-native';
import { Icon } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as firebase from "firebase";
import LoginScreen from "./Screens/Login/LoginScreen";
import RegisterScreen from "./Screens/Register/RegisterScreen";
import OverviewScreen from "./Screens/Overview/OverviewScreen";
import AddRecord from "./Screens/AddRecord";
import AllRecordsScreen from "./Screens/Records/AllRecords";
import GoalScreen from "./Screens/Goals/GoalScreen";
import PlaceholderScreen from "./Screens/PlaceholderScreen";
import LoadingScreen from "./Screens/Loading/LoadingScreen";
import SettingsScreen from './Screens/Settings/SettingsScreen'
import firebaseConfig from "./firebaseConfig";

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default function App() {
  
  let [fontsLoaded] = useFonts({
    "Lato-Light": require("./assets/fonts/Lato/Lato-Light.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato/Lato-Bold.ttf"),
    "Lato-Thin": require("./assets/fonts/Lato/Lato-Thin.ttf"),
  });

  const Stack = createStackNavigator();
  if(fontsLoaded) {
    return (
      <NavigationContainer >
        <Stack.Navigator  initialRouteName='Loading'  >
          <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}}/>
          <Stack.Screen name='Loading' component={LoadingScreen} options={{headerShown: false}}/>

          <Stack.Screen name='NavBarScreens' component={NavBarScreens}
            options = {({ route }) => ({
              headerStyle: {
                backgroundColor: '#FFBE86',
                height: headerHeight,
                elevation: 0,
                },
                headerTitle: getHeaderTitle(route),
                headerTitleStyle: {
                  fontFamily: 'Lato-Regular'
                },
                headerTitleAlign: 'center',
                headerLeft: null,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <AppLoading />;
  }

};


const NavBar = createBottomTabNavigator();

function NavBarScreens () {
  return (
    <NavBar.Navigator 
      tabBarOptions = {{ 
        style: {
          height: 54,
          backgroundColor: '#FFBE86'},
      activeTintColor: '#BB7E5D',
      inactiveTintColor: '#FAF3DD',
      }}
    >
      <NavBar.Screen 
        name='Overview' 
        component={OverviewScreen} 
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home" color={color} />
          )
        }}
      />
      <NavBar.Screen 
        name='Record' 
        component={AllRecordsScreen} 
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="bar-chart" type="font-awesome" color={color} />
          )
        }}
      />
      <NavBar.Screen 
        name='Add Record' 
        component={AddRecord} 
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="plus" type="font-awesome" color={color} />
          )
        }}
      />
      <NavBar.Screen 
        name='Goals' 
        component={GoalScreen} 
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="crosshairs" type="font-awesome" color={color} />
          )
        }}
      />
      <NavBar.Screen 
        name='Settings' 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="settings" color={color} />
          )
        }}
      />
    </NavBar.Navigator>
  );
}

const headerHeight = StatusBar.currentHeight + 54;

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Overview'

  switch (routeName) {
    case 'Overview':
      return 'Overview'
    case 'Record':
      return 'Record'
    case 'Add Record':
      return 'New Record'
    case 'Goals':
      return 'Goals'
    case 'Settings':
      return 'Settings'
  }
}
