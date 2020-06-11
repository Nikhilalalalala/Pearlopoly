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


function LoginScreen({ navigation }) {

// class LoginScreen extends Component {

  // handleUpdateName = name => this.setState({name})

  // handleUpdatePasswordOnce = email => this.setState({password_once})

  // handleUpdatePassword = password => this.setState({password})

  // handleCreateUser = () => {
  //   firebaseDb.firestore().collection('users').add({
  //     name: this.state.name,
  //     password_once: this.state.email,
  //     password: this.state.password
  //   }).then((res) => this.setState({
  //     name: '',
  //     password_once: '',
  //     password: '',
  //   })).catch(err => console.error(err))
  // }

  verifyUser = () => {
    
  }

  // render() {

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
          returnKeyType="next"
        />
  
        <TextInput
          style={login.textField}
          placeholder="PASSWORD"
          placeholderTextColor="#BB7E5D"
          returnKeyType="done"
          secureTextEntry={true}
        />
  
        <TouchableOpacity
          style={login.button}
          onPress={() => navigation.navigate("NavBarScreens")}
        >
          <Text style={{ color: "#FFFFFF" }}>LOGIN</Text>
        </TouchableOpacity>
  
        <Text
          style={login.register}
          onPress={() => navigation.navigate("Register")}
        >
          DON'T HAVE AN ACCOUNT?
        </Text>
      </KeyboardAvoidingView>
    );
  }
// }

const screen = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
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

export default LoginScreen;
