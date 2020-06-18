import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import DayRecord from "./DayRecord";

const Record = (props) => {
  var date = new Date();
  let records = [];
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
  let numRecordsToShow = 10;
  for (let i = 0; i < numRecordsToShow; i++) {
    var toPrint = JSON.stringify(date.getDate()) + " " + month[date.getMonth()];
    if (i === 0) {
      records.push(<DayRecord key={i} date="Today"></DayRecord>);
    } else if (i === 1) {
      records.push(<DayRecord key={i} date="Yesterday"></DayRecord>);
    } else {
      records.push(<DayRecord key={i} date={toPrint}></DayRecord>);
    }
    date = new Date(date.getTime() - 24 * 60 * 60 * 1000);
  }

  return (
    <View style={screen.container}>

      <View style={main.line} />

      <ScrollView
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, props.style]}>{records}</View>
      </ScrollView>

      <View style={main.line} />
      
    </View>
  );
};
//style={[styles.container, props.style]}
export default Record;

const mainHeight =
  Dimensions.get("window").height - 54 - 54 - StatusBar.currentHeight;

const screen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

const styles = StyleSheet.create({
  container: {
    width:'100%',
    alignItems: 'stretch',
    marginTop: 5,
  },
});

const main = StyleSheet.create({
  line: {
    width: "100%",
    height: 3,
    backgroundColor: "#FAF3DD",
  },
});
