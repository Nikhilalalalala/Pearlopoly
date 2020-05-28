import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";

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

  category(cat, iconName) {
    return (
      <TouchableOpacity>
        <Icon name={iconName} />
        <Text> {cat}</Text>
      </TouchableOpacity>
    );
  }

  category(cat, iconName, type) {
    return (
      <TouchableOpacity>
        <Icon name={iconName} type={type} />
        <Text> {cat}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SafeAreaView>
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
            {this.category("Education", "school")}
            {this.category("Shopping", "shopping-bag", "font-awesome")}
            {this.category("Food", "restaurant")}
          </View>
          <View style={styles.categoryRowTwo}>
            {this.category("Transport", "train")}
            {this.category(
              "Other Spending",
              "question-circle-o",
              "font-awesome"
            )}
            {this.category("Income", "usd", "font-awesome")}
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
