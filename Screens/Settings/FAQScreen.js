import React, { Component } from "react";
import { StyleSheet } from "react-native";

class FAQScreen extends Component {

  render() {
    return (
      <View style={screen.container}>
        <View style={main.line} />

        <View style={main.line} />
      </View>
    );
  }
}

const screen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "flex-start",
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

const styles = StyleSheet.create({});

export default FAQScreen;
