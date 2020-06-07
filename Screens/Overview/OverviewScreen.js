import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import HeaderBar from "../SharedContainers/HeaderBar";
import NavigationBar from "../SharedContainers/NavigationBar";
import ExpenditurePie from "./components/ExpenditurePie";
import GoalProgressBar from "./components/GoalProgressBar";



class OverviewScreen extends Component {
  render() {
    return (
      <SafeAreaView style={screen.container}>
        <HeaderBar currentScreen="Overview" />

        <View style={main.container}>
          <View style={main.line} />

          <View style={main.pieBox}>
            <ExpenditurePie />
          </View>

          <View style={main.goalBox}>
            <Text style={{ fontFamily: "Lato-Regular" }}>Goal Progress</Text>
            <GoalProgressBar />
            <Text style={{ textAlign: "center", fontFamily: "Lato-Regular" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </View>

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
  pieBox: {
    width: "90%",
    height: mainHeight / 2 - 50,
    borderRadius: 31,
    backgroundColor: "#FAF3DD",
    justifyContent: "center",
  },
  goalBox: {
    width: "90%",
    height: mainHeight / 2 - 50,
    borderRadius: 31,
    backgroundColor: "#FAF3DD",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
});

export default OverviewScreen;
