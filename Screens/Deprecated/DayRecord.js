import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SingleRecord from "./SingleRecord";

const DayRecord = (props) => {
  return (
    <View style={[stylesDayRecord.container, props.style]}>
      <Text>{props.date}</Text>
      <SingleRecord category="Education" value="5.00">
        Buying Stationary
      </SingleRecord>
      <SingleRecord category="Education" value="5.00">
        Buying Stationary
      </SingleRecord>
    </View>
  );
};

export default DayRecord;

const stylesDayRecord = StyleSheet.create({
  container: {
    backgroundColor: "#FAF3DD",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  date: {
    paddingVertical: 5,
    fontFamily: "Lato-Regular",
  },
});
