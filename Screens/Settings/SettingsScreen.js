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
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

class SettingsScreen extends Component {
  state = {
    currentUserUid: null,
    currentUserData: null,
    currentUserName: "",
    isEditingName: false,
    newUserName: "",
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
    let newName = this.state.newUserName;
    console.log(newName);
    if (newName) {
      firebase
        .firestore()
        .collection("users")
        .doc(`${this.state.currentUserUid}`)
        .set(
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
      <View style={screen.container}>
        <View style={main.line} />
        <ScrollView style={{}} horizontal={false}>
          <Text style={styles.header}>Name</Text>
          <View style={styles.username}>
            {this.state.isEditing ? (
              <TextInput
                style={styles.inputField}
                value={this.state.newUserName}
                onChangeText={(val) => {
                  this.setState({ newUserName: val });
                }}
                autoFocus={true}
                onBlur={() => {
                  this.setState({ isEditing: false });
                  this.updateName();
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
            <Icon
              name={"edit"}
              style={styles.icon}
              fontSize={20}
              color="#BB7E5D"
              onPress={() => {
                this.setState({ isEditing: true });
              }}
            />
          </View>
          
          <View style={styles.line} />

          <Text style={styles.header}>Infomation </Text>
          <TouchableOpacity>
            <Text style={styles.item}>About Us </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity>
            <Text style={styles.item}>FAQ </Text>
          </TouchableOpacity>
          
          <View style={styles.line} />

          <Text style={styles.header}>Account </Text>
          <TouchableOpacity>
            <Text style={styles.item}>Clear All Records </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity>
            <Text style={styles.item} onPress={this.logoutUser}>
              Sign Out
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
        </ScrollView>

        <View style={main.line} />
      </View>
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
    width: "100%",
    paddingTop: 30,
    paddingBottom: 10,
    fontFamily: "Lato-Regular",
    paddingLeft: "3%",
  },
  item: {
    width: "90%",
    height: 44,
    fontFamily: "Lato-Regular",
    fontSize: 20,
    paddingLeft: "5%",
    paddingVertical: 10,
  },
  inputField: {
    width: "90%",
    height: 44,
    fontFamily: "Lato-Regular",
    fontSize: 20,
    paddingLeft: "5%",
    paddingVertical: 10,
    // borderColor:"#000000",
    // borderWidth:10,

  },
  icon: {
    opacity: 0.5,
    color: "#BB7E5D",
    fontSize: 20,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  line: {
    width: "90%",
    height: 3,
    backgroundColor: "#BB7E5D",
    alignSelf: "center",
  },
  username: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SettingsScreen;
