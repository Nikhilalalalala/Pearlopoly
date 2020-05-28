import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import AddRecord from "./Screens/AddRecord";

export default function App() {
  return (
    <View style={styles.container}>
      <AddRecord></AddRecord>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "center",
    justifyContent: "center",
  },
});
