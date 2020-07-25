import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";

import Tutorial from '../components/Tutorial';
import ExpenditurePie from "../components/ExpenditurePie";
import GoalProgressBar from "../components/GoalProgressBar";
import tipsArray from './tipsArray.js';
import * as firebase from 'firebase';

//* props contains user, get useruid from there,
//* see LoadingScreen

class OverviewScreen extends Component { 

  state = {
    tip: '',
    viewUserGuideFirstTime: true,
  }

  componentDidMount() {
    let randomNum = Math.round(Math.random() * (tipsArray.length - 1))
    this.setState({tip: tipsArray[randomNum]})
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ currentUserUid: useruid });
    firebase
      .firestore()
      .collection("users")
      .doc(`${useruid}`)
      .get()
      .then((doc) => {
        let docData = doc.data();
        this.setState({ viewUserGuideFirstTime: docData.viewUserGuideFirstTime });
        if (!docData.viewUserGuideFirstTime) {
          firebase.firestore().collection("users")
          .doc(`${useruid}`).set({viewUserGuideFirstTime: true}, {merge:true})
        }
      });
  }

  render() {
    return (
      <SafeAreaView style={screen.container}>
        <Tutorial visibility={!this.state.viewUserGuideFirstTime} />
        <View style={main.line} />

        <View style={main.pieBox}>
          <ExpenditurePie />
        </View>

        <View style={main.goalBox}>
          <Text style={{ fontFamily: "Lato-Regular", }}>Goal Progress</Text>
          <GoalProgressBar />
          <Text style={{ textAlign: "center", fontFamily: "Lato-Regular", padding:10 }}> {this.state.tip}</Text>
        </View>

        <View style={main.line} />
        
      </SafeAreaView>
    );
  }
}

const mainHeight = Dimensions.get('window').height - 54 - 54 - StatusBar.currentHeight;


const screen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const main = StyleSheet.create({
  line: {
    width: "100%",
    height: 3,
    backgroundColor: "#FAF3DD",
  },
  pieBox: {
    width: "90%",
    height: mainHeight / 2 - 50,
    borderRadius: 31,
    backgroundColor: "#FAF3DD",
    justifyContent: "center",
  },
  goalBox: {
    width: "90%",
    height: mainHeight / 2 - 50,
    borderRadius: 31,
    backgroundColor: "#FAF3DD",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
});

export default OverviewScreen;
