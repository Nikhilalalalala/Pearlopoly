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
  
  handleCategory = (category) => {
    this.setState({ chosenCategory: category });
  };

  addRecord = () => {
    if (this.state.amount && this.state.chosenCategory) {
      firebaseDb
        .firestore()
        .collection("users")
        .doc(`${this.state.useruid}`)
        .collection("records")
        .add({
          amount: this.state.amount,
          Timestamp: Date.now(),
          category: this.state.chosenCategory,
        }).then(() => {
          this.setState({amount: '', chosenCategory: ''})
          this.props.navigation.navigate('Record')
        })
    } else if (!this.state.amount) {
      Alert.alert( 'Invalid Amount',
      'Please enter a valid amount',
      [{ text: "OK", }],
      { cancelable: false })
    } else if (!this.state.chosenCategory) {
        Alert.alert( 'No Category Chosen',
        'Please choose a suitable category',
        [{ text: "OK", }],
        { cancelable: false })
    }
  };

  category(cat, iconName, type, typeOfSpending) {
    return (
      <TouchableOpacity onPress={() => this.setState({ chosenCategory: cat })}>
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
