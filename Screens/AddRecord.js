import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";

class AddRecord extends Component {
  state = {
    amount: "",
    chosenCategory: "",
  };

  handleAmount = (amount) => {
    //TODO check if input is number
    this.setState({ amount: amount });
  };
  handleCategory = (category) => {
    this.setState({ chosenCategory: category });
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.topbar}></View>
        <View style={styles.container}>
          <TextInput
            placeholder="Amount"
            onEndEditing={this.handleAmount}
            style={styles.inputAmount}
            // value={this.state.amount}
            keyboardType="numeric"
            maxLength={7}
          ></TextInput>
          <View style={styles.categoryRowOne}>
            <Text>Education</Text>
            <Text>Shopping</Text>
            <Text>Food</Text>
          </View>
          <View style={styles.categoryRowTwo}>
            <Text>Transport</Text>
            <Text>Other Spending</Text>
            <Text>Income</Text>
          </View>
        
        </View>
     
        <TouchableOpacity style={styles.button}>
          <Text style={{ alignSelf: "center", fontSize: 18 }}>Add Record</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

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
    textAlign: "right",
    height: 40,
    marginTop: 10,
    fontSize: 20,
    marginRight: 20,
    alignSelf: "flex-end",
  },
  //* temporary
  topbar: {
    width: "100%",
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFBE86",
  },
  categoryRowOne: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    width: 325,
    marginTop: 50,
  },
  categoryRowTwo: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    width: 325,
    marginTop: 50,
    marginBottom: 20,
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
});

export default AddRecord;
