import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";


export default class LoginScreen extends React.Component {
  state = { email: "", password: "", errorMessage: null };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then(() => {
        // this.props.navigation.navigate("Overview");
        //* it navigates to Overview from App.js not here 
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };
  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <KeyboardAvoidingView 
      style={screen.container}
      >
        <Image
          style={login.title}
          source={require("../../assets/titlewithicon.png")}
        />

        <TextInput
          style={login.textField}
          placeholder="USERNAME"
          placeholderTextColor="#BB7E5D"
          onChangeText={(email) => this.setState({ email })}
          returnKeyType="next"
        />

        <TextInput
          style={login.textField}
          placeholder="PASSWORD"
          placeholderTextColor="#BB7E5D"
          returnKeyType="done"
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
        />

        <TouchableOpacity style={login.button} onPress={this.handleLogin}>
          <Text style={{ color: "#FFFFFF" }}>LOGIN</Text>
        </TouchableOpacity>

        {this.state.errorMessage && (
          <Text style={{ color: "red", paddingVertical: 10, }}>{this.state.errorMessage}</Text>
        )}

        <Text
          style={login.register}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          DON'T HAVE AN ACCOUNT?
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
    justifyContent: "flex-start",
  },
});


const login = StyleSheet.create({
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
  register: {
    marginTop: 100,
    textDecorationLine: "underline",
    fontFamily: "Lato-Regular",
  },
});

// export default LoginScreen;
