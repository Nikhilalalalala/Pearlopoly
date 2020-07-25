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

//i'm sick and tired of states not getting updated in time
var endDate, pearl, spending, limit, statsID;

export default class LoadingScreen extends Component {
  state = {
    current: new Date(),
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.pearlCheck(user);

        this.props.navigation.reset({ index: 0, routes: [{ name: "NavBarScreens"}]});
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  }
  //zzz actually so sleepy now i probably shouldn't have stayed up to 4 achieving absolutely nothing

  pearlCheck(user) {
    firebase
    .firestore()
    .collection('users')
    .doc(`${user.uid}`)
    .collection('statistics')
    .orderBy('beginDate', 'desc')
    .limit(1)
    .get()
    .then((collection) => {
      collection.forEach((doc) => {
        let beginDate = new Date(doc.data().beginDate);
        //global
        endDate = new Date(
          beginDate.getFullYear(),
          beginDate.getMonth(),
          beginDate.getDate() + 7
        );
        //global
        statsID = doc.id;
        //global
        pearl = doc.data().pearlID;
        //global
        spending = doc.data().TotalOverall;
        //global
        limit = doc.data().OverallLimit;
        this.claimStatusCheck(user);
      });
    });
  };
  
  claimStatusCheck(user) {
    firebase
      .firestore()
      .collection('users')
      .doc(`${user.uid}`)
      .collection('pearls')
      .orderBy('date', 'desc')
      .limit(1)
      .get()
      .then(collection => {
        collection.forEach(doc => {
          let latestPearl = doc.id;
          // if pearl has already been claimed, the latest pearl claimed should have the same as the pearlID in the latest stat doc
          // in theory, if the latest pearl claimed isn't the same as the pearlID in the latest stat doc, we're just screwed
          // if the stats doc has already been checked but the user cannot claim the pearl (spending > limit), then there's no need to check
          // in theory, as long as there is something there, pearl will be true, but really i'm not sure if !undefined will be true
          if(pearl != latestPearl || pearl != 'checked') {
            //stats doc does not have a pearl
            this.validityCheck(user);
          };
        });
      });
  };
  
  validityCheck(user) {
    //check if a new week has started
    //if a new week has not started and the stats doc is still valid, then we shouldn't be checking whether or not a pearl should be awarded
    if(this.state.currentDate >= endDate) {
      if(limit >= spending) {
        // spending is within the limit
        this.awardPearl(true, user);
      }
      else {
        // spending has exceeded the limit
        this.awardPearl(false, user);
      }
    };
  };
  
  awardPearl(award, user) {
    if(award === true) {
      // spending is within the limit
      firebase
        .firestore()
        .collection('users')
        .doc(`${user.uid}`)
        .collection('pearls')
        .add({
          date: this.state.dates.current,
        })
        .then((doc) => {
          // create a new pearl, and put the pearlID in the corresponding stats doc
          let pearlID = doc.id;
          firebase
            .firestore()
            .collection('users')
            .doc(`${user.uid}`)
            .collection('statistics')
            .doc(statsID)
            .set({ pearlID: pearlID }, { merge: true });
        });
    }
    else {
      // spending has exceeded the limit
      // indicate that the stat doc has already been through checking
      // and that no pearl was awarded
      firebase
        .firestore()
        .collection('users')
        .doc(`${user.uid}`)
        .collection('statistics')
        .doc(this.state.statsID)
        .set({ pearlID: 'checked' }, { merge: true });
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

