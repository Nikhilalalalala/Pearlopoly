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
} from "react-native";
import { Icon } from "react-native-elements";
import HeaderBar from './SharedContainers/HeaderBar';
import NavigationBar from './SharedContainers/NavigationBar';

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
        <Text style={styles.categoryName}> {cat}</Text>
      </TouchableOpacity>
    );
  }

  category(cat, iconName, type) {
    return (
      <TouchableOpacity>
        <Icon name={iconName} type={type} />
        <Text style={styles.categoryName}> {cat}</Text>
      </TouchableOpacity>
    );
  }

  render() {

    return (
      <SafeAreaView style={screen.container}>
        <HeaderBar currentScreen='New Record' />        

        <View style = {main.container}>

          <View style={main.line} />

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

        </View>

        <NavigationBar />
      </SafeAreaView>
    );
  }
}

const mainHeight = Dimensions.get('window').height - 54 - 54 - StatusBar.currentHeight;

const screen = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

const main = StyleSheet.create({
  container: {
    width: '100%',
    height: mainHeight,
    backgroundColor: '#FFBE86',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    height: 3,
    backgroundColor: '#FAF3DD',
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
