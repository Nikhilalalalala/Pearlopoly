import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";


class PlaceholderScreen extends Component {
  render() {
    return (
      <SafeAreaView style={screen.container}>

        <View style={main.line} />

        <Text style={{ fontFamily: "Lato-Bold" }}>Work in Progress!</Text>

        <View style={main.line} />

      </SafeAreaView>
    );
  }
}

const mainHeight =
  Dimensions.get("window").height - 54 - 54 - StatusBar.currentHeight;

const screen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const main = StyleSheet.create({
  line: {
    width: "100%",
    height: 3,
    backgroundColor: "#FAF3DD",
  },
});

export default PlaceholderScreen;
