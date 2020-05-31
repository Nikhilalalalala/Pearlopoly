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
} from "react-native";

import firebaseDb from "../../firebaseDb";
import firestore from 'firebase/firestore';


// function RegisterScreen({ navigation }) {

class RegisterScreen extends Component {

  state = {
    name: "",
    password_once: "",
    password: "",
  }

  handleUpdateName = name => this.setState({name})

  handleUpdatePasswordOnce = email => this.setState({password_once})

  handleUpdatePassword = password => this.setState({password})

  handleCreateUser = () => {
    firebaseDb.firestore().collection('users').add({
      name: this.state.name,
      password_once: this.state.email,
      password: this.state.password
    }).then((res) => this.setState({
      name: '',
      password_once: '',
      password: '',
    })).catch(err => console.error(err))
  }

  render() {

    const { name, email, password } = this.state;

    return (
      <KeyboardAvoidingView style={screen.container}>
        <Image
          style={register.title}
          source={require("../../assets/titlewithouticon.png")}
        />

        <TextInput
          style={register.textField}
          placeholder="USERNAME"
          placeholderTextColor="#BB7E5D"
          returnKeyType="next"
          onChangeText={this.handleUpdateName}
          value={name}
        />

        <TextInput
          style={register.textField}
          placeholder="PASSWORD"
          placeholderTextColor="#BB7E5D"
          returnKeyType="done"
          secureTextEntry={true}
          onChangeText={this.handleUpdatePasswordOnce}
          value={email}

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
            onPress={ () => {
              if (name.length && password_once.length && password.length ) {
                if (password_once === password) {
                  this.handleCreateUser()}
                }
            }}   
        >
          <Text style={{ color: "#FFFFFF" }}>REGISTER</Text>
        </TouchableOpacity>

        <Text
          style={register.login}
          // onPress={() => navigation.navigate("Login")}
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
