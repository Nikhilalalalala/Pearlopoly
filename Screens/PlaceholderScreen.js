import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";

import HeaderBar from "./SharedContainers/HeaderBar";
import NavigationBar from "./SharedContainers/NavigationBar";

class PlaceholderScreen extends Component {
  render() {
    return (
      <SafeAreaView style={screen.container}>
        <HeaderBar currentScreen="Placeholder" />

        <View style={main.container}>
          <View style={main.line} />

          <Text style={{ fontFamily: "Lato-Bold" }}>Work in Progress!</Text>

          <View style={main.line} />
        </View>

        <NavigationBar />
      </SafeAreaView>
    );
  }
}

const mainHeight =
  Dimensions.get("window").height - 54 - 54 - StatusBar.currentHeight;

const screen = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#FAF3DD",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

const main = StyleSheet.create({
  container: {
    width: "100%",
    height: mainHeight,
    backgroundColor: "#FFBE86",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    width: "100%",
    height: 3,
    backgroundColor: "#FAF3DD",
  },
});

export default PlaceholderScreen;