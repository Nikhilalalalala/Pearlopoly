import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";

const DayRecord = (props) => {
  return (
    <View style={[stylesDayRecord.container, props.style]}>
      <Text style={stylesDayRecord.date}>{props.date}</Text>
      <SingleRecord category="Education" value="5.00">
        Buying Stationary
      </SingleRecord>
      <SingleRecord category="Education" value="5.00">
        Buying Stationary
      </SingleRecord>
    </View>
  );
};

const SingleRecord = (props) => {
  return (
    <View style={stylesSingleRecord.container}>
      <Text style={stylesSingleRecord.name}>{props.children}</Text>
      <Text style={stylesSingleRecord.category}>{props.category}</Text>
      <Text style={stylesSingleRecord.value}>{props.value}</Text>
    </View>
  );
};

const AllRecordsScreen = (props) => {
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
        style={styleRecord.container}
      >
        <View style={[props.style]}>{records}</View>
      </ScrollView>

      <View style={main.line} />
    </View>
  );
};

export default AllRecordsScreen;

const styleRecord = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
  },
});

const stylesSingleRecord = StyleSheet.create({
  container: {
    backgroundColor: "#E1E2DA",
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    height: 55,
  },
  name: {
    fontFamily: "Lato-Regular",
    textAlign: "left",
    paddingLeft: 5,
    paddingBottom: 5,
  },
  category: {
    fontFamily: "Lato-Regular",
    textAlign: "left",
    paddingLeft: 5,
    paddingBottom: 5,
  },
  value: {
    color: "#ED6A5A",
    fontFamily: "Lato-Regular",
    textAlign: "right",
    bottom: 30,
    paddingRight: 5,
  },
});

const stylesDayRecord = StyleSheet.create({
  container: {
    backgroundColor: "#FAF3DD",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  date: {
    paddingVertical: 5,
    fontFamily: "Lato-Regular",
    textAlign: "center",
  },
});

const screen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});

const main = StyleSheet.create({
  line: {
    width: "100%",
    height: 3,
    backgroundColor: "#FAF3DD",
  },
});
