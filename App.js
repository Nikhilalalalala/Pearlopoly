import React, { useState } from "react";
import { useFonts } from "@use-expo/font";
// import * as Font from 'expo-font';
import { AppLoading } from "expo";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";

import LoginScreen from "./Screens/Login/LoginScreen";
import RegisterScreen from "./Screens/Register/RegisterScreen";
import OverviewScreen from "./Screens/Overview/OverviewScreen";
import AddRecord from "./Screens/AddRecord";
import Record from "./Screens/Records/Record";
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

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Loading"
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Overview" component={OverviewScreen} />
          <Stack.Screen name="Add Record" component={AddRecord} />
          <Stack.Screen name="Record" component={Record} />
          <Stack.Screen name="Placeholder" component={PlaceholderScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <AppLoading />;
  }
}
