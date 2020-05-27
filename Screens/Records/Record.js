import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
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
  for (let i = 0; i < 10; i++) {
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
    <ScrollView
      alwaysBounceVertical={true}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.container, props.style]}>{records}</View>
    </ScrollView>
  );
};
//style={[styles.container, props.style]}
export default Record;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 5,
  },
});
