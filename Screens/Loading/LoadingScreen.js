import React, { Component } from "react";
import { Text, View } from "react-native";
import firebase from "firebase";

class LoadingScreen extends Component {

    // componentDidMount() {
    //     this.checkifLoggedIn();
    // }

    // checkifLoggedIn = () => {
    //     firebase.auth().onAuthStateChanged( (user) => {
    //         if (user) {
    //           console.log("hello")
    //             this.props.navigation.navigate('OverviewScreen')
    //         } else {
    //             this.props.navigation.navigate('LoginScreen')
    //         }
    //     })
    // }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Wait ah</Text>
      </View>
    );
  }
}

export default LoadingScreen;
