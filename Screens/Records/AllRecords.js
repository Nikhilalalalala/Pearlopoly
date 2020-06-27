import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

const DayRecord = (props) => {
  return (
    <View style={[stylesDayRecord.container, props.style]}>
      <Text style={stylesDayRecord.date}>{props.date}</Text>
      <SingleRecord
        category="Education"
        value="5.00"
        name="Buying Stationary"
      />
      <SingleRecord
        category="Education"
        value="5.00"
        name="Buying Stationary"
      />
    </View>
  );
};

const iconify = (cat) => {
  let nameIcon;
  let type = "";
  switch (cat) {
    case "Food":
      nameIcon = "restaurant";
      break;
    case "Education":
      nameIcon = "school";
      break;
    case "Transport":
      nameIcon = "train";
      break;
    case "Shopping":
      nameIcon = "shopping-bag";
      type = "font-awesome";
      break;
    case "Other Spending":
      nameIcon = "question-circle-o";
      type = "font-awesome";
      break;
    case "Income":
      nameIcon = "usd";
      type = "font-awesome";
      break;
  }
  return (
    <Icon
      style={stylesSingleRecord.categoryIcon}
      name={nameIcon}
      type={type}
      color={cat !== "Income" ? "#ed6a5a" : "#75B9BE"}
    />
  );
};

const SingleRecord = (props) => {
  return (
    <View style={stylesSingleRecord.container}>
      <Text style={stylesSingleRecord.name}>{props.date}</Text>

      <View style={stylesSingleRecord.bottomRow}>
        <View style={stylesSingleRecord.nameAndIcon}>
          {iconify(props.category)}
          <Text style={stylesSingleRecord.name}>{props.name}</Text>
        </View>
        <Text
          style={
            props.isIncome
              ? stylesSingleRecord.incomevalue
              : stylesSingleRecord.expensevalue
          }
        >
          $ {Number(props.value).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

class AllRecordsScreen extends Component {
  state = {
    useruid: null,
    records: null,
    numOfRecords: 0,
  };

  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ useruid: useruid });
    firebase
      .firestore()
      .collection("users")
      .doc(`${useruid}`)
      .collection("records")
      .orderBy("Timestamp", "desc")
      .onSnapshot((querySnapshot) => {
        let records = [];
        querySnapshot.forEach((documentSnapshot) => {
          records.push(documentSnapshot.data());
        });
        this.setState({ records: records });
        this.setState({ numOfRecords: records.length });
      });
  }

  componentDidUpdate() {}

  dailyRecords = () => {
    let date = new Date();
    let records = [];
    let numRecordsToShow = 10;
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
    let i = 0;
    (this.state.records || []).forEach((element) => {
      let date = new Date(element.Timestamp);
      var toPrint =
        JSON.stringify(date.getDate()) + " " + month[date.getMonth()];
      let isIncome;
      if (element.category === "Income") isIncome = true;
      else isIncome = false;

      records.push(
        <SingleRecord
          name={element.name}
          key={i}
          category={element.category}
          value={element.amount}
          isIncome={isIncome}
          date={toPrint}
        />
      );
      i++;
    });
    // for (let i = 0; i < numRecordsToShow; i++) {
    //   var toPrint =
    //     JSON.stringify(date.getDate()) + " " + month[date.getMonth()];
    //   if (i === 0) {
    //     records.push(<DayRecord key={i} date="Today"></DayRecord>);
    //   } else if (i === 1) {
    //     records.push(<DayRecord key={i} date="Yesterday"></DayRecord>);
    //   } else {
    //     records.push(<DayRecord key={i} date={toPrint}></DayRecord>);
    //   }
    //   date = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    // }
    return records;
  };
  render() {
    return (
      <View style={screen.container}>
        <View style={main.line} />
        {this.state.numOfRecords ? (
          <ScrollView
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
            style={styleRecord.container}
          >
            <View>{this.dailyRecords()}</View>
          </ScrollView>
        ) : (
          <View style={styleRecord.emptyState}>
            <View style={styleRecord.emptyStateInside}>
              <Text style={styleRecord.emptyStateText}>No Records Yet :(</Text>
              <TouchableOpacity
                style={styleRecord.emptyStateButton}
                onPress={() => {
                  this.props.navigation.navigate("NavBarScreens", {
                    screen: "Add Record",
                  });
                }}
              >
                <Text style={styleRecord.emptyStateText}>Add Record</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={main.line} />
      </View>
    );
  }
}

export default AllRecordsScreen;

const styleRecord = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
  },
  emptyState: {
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emptyStateButton: {
    padding: 5,
    backgroundColor: "#BB7E5D",
    borderRadius: 5,
    marginTop: 20,
    fontFamily: "Lato-Regular",
    fontSize: 18,
  },
  emptyStateInside: {
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    padding: 10,
    fontFamily: "Lato-Regular",
    fontSize: 18,
  },
});

const stylesSingleRecord = StyleSheet.create({
  container: {
    backgroundColor: "#E1E2DA",
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    height: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  nameAndIcon: {
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width:'100%'
  },
  bottomRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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
  categoryIcon: {
    textAlign: "left",
    paddingLeft: 5,
    paddingBottom: 5,
  },
  incomevalue: {
    color: "#75B9BE",
    fontFamily: "Lato-Regular",
    textAlign: "right",
    bottom: 28,
    paddingRight: 5,
    alignSelf: "flex-end",
  },
  expensevalue: {
    color: "#ED6A5A",
    fontFamily: "Lato-Regular",
    textAlign: "right",
    bottom: 28,
    paddingRight: 5,
    alignSelf: "flex-end",
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
