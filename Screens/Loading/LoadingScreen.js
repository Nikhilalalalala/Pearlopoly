import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase";
import firebaseDb from '../../firebaseDb';

export default class LoadingScreen extends Component {
  state = {
    dates: {
      current: new Date(),
      end: null,
    },
    
    pearlID: '',
    statsID: '',
  }

  componentDidMount() {
    /*if (firebase.auth().currentUser.uid != null) {
      this.pearlCheck(firebase.auth().currentUser.uid);
    }*/

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.pearlCheck(user);

        this.props.navigation.reset({ index: 0, routes: [{ name: "NavBarScreens"}]});
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  }

  pearlCheck(user) {
    console.log('checking pearl')
    //check if pearl for latest stats doc has been retrieved
    const doc = firebase
      .firestore()
      .collection('users')
      .doc(`${user}`)
      .collection('statistics')
      .orderBy('beginDate')
      .limit(1)
      .get()
      .then((collection) => {
        collection.forEach((doc) => {
          console.log('is the pearl claimed?')
          console.log(`pearl is ${doc.data().pearl}`)
          //pearl is unclaimed
          if (typeof (doc.data().pearl) === 'undefined') {
            console.log('unclaimed pearl');
            this.setState({ pearlID: 'unclaimed'});
            //retrive end date
            let beginDate = new Date(doc.data().beginDate);
            let endDate = new Date(
              beginDate.getFullYear(),
              beginDate.getMonth(),
              begineDate.getDate() + 7
            );
            this.setState({ dates: {
              end: endDate,
            }});
            // retrieve latest stats doc id
            this.setState({ statsID: doc.id });

            if(this.state.dates.current >= this.state.dates.end) {
              //the latest stat doc has no pearl redeemed, but the period is over
              //check if pearl should or shouldn't be awarded
              //aka is the spending within the limit (less than or equal to)
              if (doc.data().TotalOverall <= doc.data().OverallLimit) {
                console.log('yes pearl');
                this.awardPearl(true, user);
              }
              else {
                console.log('no pearl');
                this.awardPearl(false, user);
              }
            }

          }
          //pearl has been claimed
          else {
            this.setState({ pearl: 'checked' })
            console.log('pearl has been claimed')
          };

        });


      }); 
  };

  awardPearl(award, user) {
    if (award === true) {
      //add pearl to collection
      firebase
        .firestore()
        .collection('users')
        .doc(`${user}`)
        .collection('pearls')
        .add({
          date: this.state.dates.current,
        })
        .then((doc) => {
          this.setState({ pearlID: doc.id });
        });
      // add pearl id to stats doc to indicate redeemed
      firebase
        .firestore()
        .collection('users')
        .doc(`${user}`)
        .collection('statistics')
        .doc(this.state.statsID)
        .set({ pearlID: pearl }, { merge: true });
    }
    else {
      //pearl not awarded, add pearl field to stats doc to indicate checked
      firebase
        .firestore()
        .collection('users')
        .doc(`${user}`)
        .collection('statistics')
        .doc(this.state.statsID)
        .set({ pearlID: null }, { merge: true });
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
