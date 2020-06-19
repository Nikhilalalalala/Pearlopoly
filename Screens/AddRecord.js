import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";
import firebaseDb from "../firebaseDb";

class AddRecord extends Component {
  state = {
    name: "",
    amount: "",
    chosenCategory: "",
    useruid: null,
  };

  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ useruid: useruid });
  }

  handleAmount = (amount) => {
    //TODO check if input is number
    this.setState({ amount: amount });
  };
  handleName = (name) => {
    this.setState({ name: name });
  };

  handleCategory = (category) => {
    this.setState({ chosenCategory: category });
    console.log('handle Category', this.state.chosenCategory)
  };

  addDocID = (id) => {
    firebaseDb
      .firestore()
      .collection("users")
      .doc(`${this.state.useruid}`)
      .collection("records")
      .doc(`${id}`)
      .set({ recordID: id }, { merge: true });
  };

  updateStatistics = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${this.state.useruid}`)
      .collection("statistics")
      .orderBy("Timestamp", "desc")
      .limit(1)
      .get()
      .then((data) => {
        //if condition not working
        if (data.exists) {
          console.log('here?)')
          
            let recentDate = new Date(data.Timestamp)
            let nextWeek = Date.parse(new Date(recentDate.getFullYear(), recentDate.getMonth(), recentDate.getDate() + 7));
            let nowDate = new Date()
            let statsID = data.statsID
            let docData = data.data()
            if(nowDate < nextWeek) {
            //check if that data is within a week
            //if not add a new document
            let newData;
            switch (this.state.chosenCategory) {
              case 'Food':
                newData = { TotalFood: this.state.amount + docData.TotalFood};
                break;
              case 'Education':
                newData = { TotalEducation: this.state.amount+ docData.TotalEducation};
                break;
              case 'Transport':
                newData = { TotalTransport: this.state.amount + docData.TotalTransport };
                break;
              case 'Shopping':
                newData = { TotalShopping: this.state.amount + docData.TotaTotalShoppinglFood};
                break;
              case 'Other Spending':
                newData = { TotalOtherSpending: this.state.amount + docData.TotalOtherSpending};
                break;
              case 'Income':
                newData = { TotalIncome: this.state.amount + docData.TotalIncome};
                break;
            }            
            firebase
              .firestore()
              .collection("users")
              .doc(`${this.state.useruid}`)
              .collection("statistics").doc(`${statsID}`)
              .set(newData, {merge: true});
          }
          
        } else {
          firebase
            .firestore()
            .collection("users")
            .doc(`${this.state.useruid}`)
            .collection("statistics")
            .add({
              TotalEducation: 0,
              TotalFood: 0,
              TotalShopping: 0,
              TotalTransport: 0,
              TotalOtherSpending: 0,
              TotalIncome: 0,
              beginDate: Date.now(),
            })
            .then((key) => {
              let newData
              console.log('category ', this.state.chosenCategory)
              switch (this.state.chosenCategory) {
                case 'Food':
                  newData = { TotalFood: this.state.amount, statsID: key.id};
                  break;
                case 'Education':
                  newData = { TotalEducation: this.state.amount, statsID: key.id};
                  break;
                case 'Transport':
                  newData = { TotalTransport: this.state.amount, statsID: key.id};
                  break;
                case 'Shopping':
                  newData = { TotalShopping: this.state.amount, statsID: key.id};
                  break;
                case 'Other Spending':
                  newData = { TotalOtherSpending: this.state.amount, statsID: key.id};
                  break;
                case 'Income':
                  newData = { TotalIncome: this.state.amount, statsID: key.id};
                  break;
              }        
              console.log(key.id) 
              console.log(newData)     
              firebase
                .firestore()
                .collection("users")
                .doc(`${this.state.useruid}`)
                .collection("statistics")
                .doc(key.id)
                .set( newData , { merge: true });
            });
        }
      }).then(() => {
        this.setState({ name:"", amount: "", chosenCategory: "" });
        console.log('resetting Category', this.state.chosenCategory)
      });
  };

  addRecord = () => {
    if (this.state.name && this.state.amount && this.state.chosenCategory) {
      firebaseDb
        .firestore()
        .collection("users")
        .doc(`${this.state.useruid}`)
        .collection("records")
        .add({
          name: this.state.name,
          amount: this.state.amount,
          Timestamp: Date.now(),
          category: this.state.chosenCategory,
        })
        .then((doc) => {
          this.addDocID(doc.id);
          this.updateStatistics()
          this.props.navigation.navigate("Record");
        });
    } else if (!this.state.amount) {
      Alert.alert(
        "Invalid Amount",
        "Please enter a valid amount",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else if (!this.state.chosenCategory) {
      Alert.alert(
        "No Category Chosen",
        "Please choose a suitable category",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else if (!this.state.name) {
      Alert.alert(
        "Invalid Name",
        "Please enter a valid name",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  category(cat, iconName, type, typeOfSpending) {
    return (
      <TouchableOpacity 
      onPress={() => {
          this.setState({ chosenCategory: cat })
      }}>
        <Icon
          name={iconName}
          type={type}
          color={
            this.state.chosenCategory === cat
              ? "#BB7E5D"
              : typeOfSpending === "expense"
              ? "#ed6a5a"
              : "#0081af"
          }
        />
        <Text
          style={
            this.state.chosenCategory === cat
              ? styles.categoryPressed
              : typeOfSpending === "expense"
              ? styles.categoryExpense
              : styles.categoryIncome
          }
        >
          {cat}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SafeAreaView style={screen.container}>
        <View style={main.line} />
        <View style={styles.container}>
        <TextInput
            placeholder="Name"
            onChangeText={this.handleName}
            style={styles.inputAmount}
            // value={this.state.amount}
            keyboardType='default'
            maxLength={7}
          ></TextInput>
          <TextInput
            placeholder="Amount"
            onChangeText={this.handleAmount}
            style={styles.inputAmount}
            // value={this.state.amount}
            keyboardType="numeric"
            maxLength={7}
          ></TextInput>
          <View style={styles.categoryRowOne}>
            {this.category("Education", "school", "", "expense")}
            {this.category(
              "Shopping",
              "shopping-bag",
              "font-awesome",
              "expense"
            )}
            {this.category("Food", "restaurant", "", "expense")}
          </View>
          <View style={styles.categoryRowTwo}>
            {this.category("Transport", "train", "", "expense")}
            {this.category(
              "Other Spending",
              "question-circle-o",
              "font-awesome",
              "expense"
            )}
            {this.category("Income", "usd", "font-awesome", "", "income")}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.addRecord}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontFamily: "Lato-Bold",
            }}
          >
            Add Record
          </Text>
        </TouchableOpacity>

        <View style={main.line} />
      </SafeAreaView>
    );
  }
}

const mainHeight =
  Dimensions.get("window").height - 54 - 54 - StatusBar.currentHeight;

const screen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "center",
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAF3DD",
    alignItems: "center",
    // justifyContent: "flex-end",
    width: 350,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  inputAmount: {
    fontFamily: "Lato-Bold",
    textAlign: "right",
    height: 40,
    marginTop: 10,
    fontSize: 20,
    marginRight: 20,
    alignSelf: "flex-end",
  },
  categoryRowOne: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    width: 325,
    marginTop: 30,
  },
  categoryRowTwo: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    width: 325,
    marginTop: 50,
    marginBottom: 20,
  },
  categoryExpense: {
    color: "#ed6a5a",
    fontFamily: "Lato-Bold",
    paddingTop: 7,
  },
  categoryIncome: {
    color: "#0081af",
    fontFamily: "Lato-Bold",
    paddingTop: 7,
  },
  categoryPressed: {
    color: "#BB7E5D",
    fontFamily: "Lato-Bold",
    paddingTop: 7,
  },
  button: {
    width: 150,
    backgroundColor: "#FAF3DD",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: "center",
  },
  categoryName: {
    fontFamily: "Lato-Bold",
    paddingTop: 7,
  },
});

export default AddRecord;
