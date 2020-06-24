import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";

import firebaseDb from "../../firebaseDb";
import firestore from "firebase/firestore";
import * as firebase from "firebase";

// function RegisterScreen({ navigation }) {

class RegisterScreen extends Component {
  state = {
    email: "",
    password_once: "",
    password: "",
    errorMessage: null,
  };

  handleUpdateEmail = (email) => {
    this.setState({ email });
  };

  handleUpdatePasswordOnce = (password_once) =>
    this.setState({ password_once });

  handleUpdatePassword = (password) => this.setState({ password });

  alertNewUser = () => {
    Alert.alert(
      "Thank you for signing up",
      "Enjoy learning finance management! :)",
      [{ text: "OK" }],
      { cancelable: false }
    );
  };

  handleCreateUserDoc = (uid, name) => {
    firebaseDb
      .firestore()
      .collection("users")
      .doc(`${uid}`)
      .set({
        name: name,
        email: this.state.email,
        uid: uid,
        createdAt: Date.now(),
      })
      .then(() => {
        // console.log("new user document created");
      });
  };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.email.trim(),
        this.state.password
      )
      .then((result) => {
        let name = result.user.displayName || this.state.email.split("@")[0];
        this.handleCreateUserDoc(result.user.uid, name);
        this.alertNewUser(); //* redirects to Overview and user is signed in
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    const { email, password_once, password, errorMessage } = this.state;

    return (
      <KeyboardAvoidingView style={screen.container}>
        <Image
          style={register.title}
          source={require("../../assets/titlewithouticon.png")}
        />

        <TextInput
          style={register.textField}
          placeholder="EMAIL"
          placeholderTextColor="#BB7E5D"
          returnKeyType="next"
          onChangeText={this.handleUpdateEmail}
          value={email}
        />

        <TextInput
          style={register.textField}
          placeholder="PASSWORD"
          placeholderTextColor="#BB7E5D"
          returnKeyType="done"
          secureTextEntry={true}
          onChangeText={this.handleUpdatePasswordOnce}
          value={password_once}
        />

        <TextInput
          style={register.textField}
          placeholder="RE-ENTER PASSWORD"
          placeholderTextColor="#BB7E5D"
          returnKeyType="done"
          onChangeText={this.handleUpdatePassword}
          value={password}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={register.button}
          // onPress= {() => {
          // this.navigation.navigate("Overview");
          // this.createUser(); }}
          onPress={() => {
            if (password_once === password) {
              this.handleSignUp();
            } else {
              this.setState({
                errorMessage: "Passwords entered do not match.",
              });
            }
          }}
        >
          <Text style={{ color: "#FFFFFF" }}>REGISTER</Text>
        </TouchableOpacity>
        {this.state.errorMessage && (
          <Text style={{ color: "red", paddingVertical: 10, paddingHorizontal:10 }}>
            {this.state.errorMessage}
            Please Try Again
          </Text>
        )}
        <Text
          style={register.login}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          ALREADY HAVE AN ACCOUNT?
        </Text>
      </KeyboardAvoidingView>
    );
  }
}

const screen = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#FAF3DD",
    alignItems: "center",
    justifyContent: "center",
  },
});

const register = StyleSheet.create({
  title: {
    marginBottom: 40,
  },
  textField: {
    height: 45,
    width: "80%",
    borderColor: "#BB7E5D",
    borderWidth: 3,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: "Lato-Regular",
    backgroundColor:'#e1e2da',
  },
  button: {
    height: 30,
    width: 150,
    marginTop: 30,
    backgroundColor: "#75B9BE",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Lato-Regular",
  },
  login: {
    marginTop: 100,
    textDecorationLine: "underline",
    fontFamily: "Lato-Regular",
  },
});

export default RegisterScreen;
