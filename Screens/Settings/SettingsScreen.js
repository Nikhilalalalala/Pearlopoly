import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";
import { color } from "react-native-reanimated";

class SettingsScreen extends Component {
  state = {
    currentUserUid: null,
    currentUserData: null,
    currentUserName: "",
    isEditingName: false,
    newUserName: ""
  };
  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ currentUserUid: useruid });
    firebase
      .firestore()
      .collection("users")
      .doc(`${useruid}`)
      .get()
      .then((doc) => {
        let docData = doc.data();
        this.setState({ currentUserName: docData.name });
        this.setState({ newUserName: docData.name });
        this.setState({ currentUserData: docData });
      });
  }
  updateName = () => {
    let newName = this.state.newUserName
    console.log(newName)
    if (newName) {
      firebase.firestore().collection("users").doc(`${this.state.currentUserUid}`).set(
        {
          name: newName,
        },
        { merge: true }
      );
      this.setState({ currentUserName: newName });
    } else {
      Alert.alert(
        "Invalid Username",
        "Please enter a valid name",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  logoutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
        this.setState({ currentUser: null });
      });
  };

  render() {
    return (
      <SafeAreaView style={screen.container}>
        <View style={main.line} />

        <Text style={styles.header}> Name </Text>
        {this.state.isEditing ? (
          <TextInput
            style={styles.item}
            value={this.state.newUserName}
            onChangeText={ (val) => {
              this.setState({ newUserName: val })
            }}
            autoFocus
            onBlur={() => {
              this.setState({ isEditing: false })
              this.updateName()
            }}
          />
        ) : (
          <Text
            style={styles.item}
            onPress={() => this.setState({ isEditing: true })}
          >
            {this.state.currentUserName}
          </Text>
        )}
        <Icon name={"edit"} style={styles.icon} />
        <View style={styles.line} />

        <Text style={styles.header}> Infomation </Text>
        <Text style={styles.item}> About Us </Text>
        <View style={styles.line} />
        <Text style={styles.item}> FAQ </Text>
        <View style={styles.line} />

        <Text style={styles.header}> Account </Text>
        <Text style={styles.item}> Clear All Records </Text>
        <View style={styles.line} />
        <Text style={styles.item} onPress={this.logoutUser}>
          Sign Out
        </Text>
        <View style={styles.line} />

        <View style={main.line} />
      </SafeAreaView>
    );
  }
}

const screen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "flex-start",
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
  header: {
    fontFamily: "Lato-Regular",
    paddingLeft: "5%",
  },
  item: {
    height:50,
    fontFamily: "Lato-Regular",
    paddingLeft: "5%",
  },
  icon: {
    opacity: 0.5,
    color: "#BB7E5D",
    paddingLeft: "5%",
  },
  line: {
    width: "95%",
    height: 3,
    backgroundColor: "#BB7E5D",
    alignSelf: "center",
  },
});

export default SettingsScreen;
