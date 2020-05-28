import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AddRecord from "./Screens/AddRecord";
import { useFonts } from '@use-expo/font';
// import * as Font from 'expo-font';
import { AppLoading } from 'expo';

export default function App() {
  // const [fontsLoaded, setFontsLoaded] = useState(false);
  let [fontsLoaded] = useFonts({
    'Lato-Light': require('./assets/fonts/Lato/Lato-Light.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),
    'Lato-Thin': require('./assets/fonts/Lato/Lato-Thin.ttf'),

  });


  if(fontsLoaded) {
    return (
      <View style={styles.container}>
        <AddRecord></AddRecord>
      </View>
    );
  } else {
    return (
      <AppLoading  />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "center",
    justifyContent: "center",
  },
});
