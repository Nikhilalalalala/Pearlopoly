import React, { useState } from "react";
import { useFonts } from "@use-expo/font";
// import * as Font from 'expo-font';
import { AppLoading } from "expo";

import {
  NavigationContainer,
  // createSwitchNavigator,
  // createAppContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import {
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";

import LoginScreen from "./Screens/Login/LoginScreen";
import RegisterScreen from "./Screens/Register/RegisterScreen";
import OverviewScreen from "./Screens/Overview/OverviewScreen";
import AddRecord from "./Screens/AddRecord";
import Record from "./Screens/Records/Record";
import PlaceholderScreen from "./Screens/PlaceholderScreen";
import LoadingScreen from "./Screens/Loading/LoadingScreen";
import firebaseConfig from "./firebaseConfig";


if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const RootStack = createSwitchNavigator(
  {
    // Home: { screen: HomeScreen },
    // Login: { screen: LoginScreen },
    // Overview: { screen: OverviewScreen },
    // AddRecord: { screen: AddRecord },
    // Record: { screen: Record },
    // Placeholder: { screen: PlaceholderScreen },
    // Loading: { screen: LoadingScreen },

    Login: LoginScreen,
    Register: RegisterScreen,
    Overview: OverviewScreen,
    AddRecord: AddRecord,
    Record: Record,
    Placeholder: PlaceholderScreen,
    Loading: LoadingScreen,
  },

  {
    initialRouteName: "Login",
  }
);
const AppContainer = createAppContainer(RootStack);



export default function App() {
  // const [fontsLoaded, setFontsLoaded] = useState(false);
  let [fontsLoaded] = useFonts({
    'Lato-Light': require('./assets/fonts/Lato/Lato-Light.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),
    'Lato-Thin': require('./assets/fonts/Lato/Lato-Thin.ttf'),

  });

  const Stack = createStackNavigator();

  if(fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Loading'>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Overview' component={OverviewScreen} />
          <Stack.Screen name='Add Record' component={AddRecord} />
          <Stack.Screen name='Record' component={Record} />
          <Stack.Screen name='Placeholder' component={PlaceholderScreen} />
          <Stack.Screen name='Loading' component={LoadingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      // <AppContainer />
    );
  } else {
    return (
      <AppLoading  />
    )
  }

}

