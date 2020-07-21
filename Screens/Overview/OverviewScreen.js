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

import ExpenditurePie from "../components/ExpenditurePie";
import GoalProgressBar from "../components/GoalProgressBar";

import * as firebase from 'firebase';

//* props contains user, get useruid from there,
//* see LoadingScreen

class OverviewScreen extends Component { 

  state = {
    tip: '',
  }

  componentDidMount() {
    this.getRandomTip()
  }

  
  getRandomTip = () => {
    firebase
      .firestore()
      .collection("education")
      .get()
      .then(collection => {
        let randomNum = Math.round(Math.random() * (collection.size - 1))
        console.log(randomNum)
        let i = 0
        collection.forEach(each => {
          i ++ 
          if ( i === randomNum) {
            this.setState({tip: each.data()})
          }
        })
      })
    
  }

  render() {
    return (
      <SafeAreaView style={screen.container}>

        <View style={main.line} />

        <View style={main.pieBox}>
          <ExpenditurePie />
        </View>

        <View style={main.goalBox}>
          <Text style={{ fontFamily: "Lato-Regular", }}>Goal Progress</Text>
          <GoalProgressBar />
<<<<<<< HEAD
          <Text style={{ textAlign: "center", fontFamily: "Lato-Regular", padding:10 }}>
            <Text  style={{ textDecorationLine:'underline', paddingBottom: 10,}}>
              Follow the 50-30-20 budget rule!{'\n'}
            </Text>
            From your allowance, spend 50% on essentials, 
            spend 30% on your wants, and save the remaining 20%
          </Text>
=======
          <Text style={{ textAlign: "center", fontFamily: "Lato-Regular", padding:10 }}> {this.state.tip.tip}</Text>
>>>>>>> master
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
