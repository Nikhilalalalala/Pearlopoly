import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  state = { email: "", password: "", errorMessage: null };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then((user) => {
        // this.props.navigation.navigate("Overview");
        //* it navigates to Overview from Loading.js not here
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };
  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <KeyboardAvoidingView style={screen.container}>
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
          autoCapitalize= 'none'
          autoCompleteType='email'
        />

        <TextInput
          style={login.textField}
          placeholder="PASSWORD"
          placeholderTextColor="#BB7E5D"
          returnKeyType="done"
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
          autoCapitalize= 'none'

        />

        <TouchableOpacity
          style={login.button}
          onPress={() => {
            this.handleLogin();
          }}
          //  onPress={)
        >
          <Text style={{ color: "#FFFFFF" }}>LOGIN</Text>
        </TouchableOpacity>

        {this.state.errorMessage && (
          <Text style={{ color: "red", paddingVertical: 10, paddingHorizontal:10 }}>
            {this.state.errorMessage}
          </Text>
        )}

        <TouchableOpacity
          style={login.register}
          underlayColor="white"
          onPress={() => this.props.navigation.navigate("Register")}
        ><Text style={{ textDecorationLine: "underline", }}>
          DON'T HAVE AN ACCOUNT?
        </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const screen = StyleSheet.create({
  container: {
    // marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#FAF3DD",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: '#e1e2da',
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
    marginTop: 85,
    textDecorationLine: "underline",
    fontFamily: "Lato-Regular",
    padding: 15,
  },
});

// export default LoginScreen;
