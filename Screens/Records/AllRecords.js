import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import SingleRecord from "./SingleRecord"

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
          id={element.recordID}
          key={element.recordID}
          category={element.category}
          value={element.amount}
          isIncome={isIncome}
          timestamp = {element.Timestamp}
          date={toPrint}
          rating={element.satisfactionRating}
        />
      );
      i++;
    });
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
    // paddingHorizontal: "5%",
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


const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
      flex: 1,
  },
  backTextWhite: {
      color: '#FFF',
  },
  rowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
  },
  rowBack: {
      alignItems: 'center',
      backgroundColor: 'red',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
      height: 60,
  },
  backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
  },
  backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
  },
});