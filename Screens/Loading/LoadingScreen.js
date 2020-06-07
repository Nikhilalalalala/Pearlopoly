import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase";


export default class LoadingScreen extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user)
            this.props.navigation.navigate('Overview', {
                user: user
            });

        } else {
            console.log ('no user going to login')
            this.props.navigation.navigate("Login");
        }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
