import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Icon } from 'react-native-elements'; //circle

import * as firebase from 'firebase';
import firebaseDb from '../../firebaseDb';

class PearlCounter extends React.Component {
  state = {
    pearls: 0,

    dates: {
      current: new Date(),
      end: null,
      last: null,
    }
  };

  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ useruid: useruid });
    this.getData(useruid);
  }
/*
  getEndDate(uid) {
    firebase
      .firestore()
      .collection('users')
      .doc(`${uid}`)
      .collection('statistics')
      .orderBy('beginDate')
      .limit(1)
      .get()
      .then((data => {
        data.forEach((doc) => {
          let docData = doc.data();
          let beginDate = new Date(docData.beginDate);
          let endDate = new Date(
            beginDate.getFullYear(),
            beginDate.getMonth(),
            beginDate.getDate() + 7
          );
          this.setState({ dates: {
            end: endDate,
          }})
        })
      }))
  }

  getLastPearlDate(uid) {
    firebase
      .firestore()
      .collection('users')
      .doc(`${uid}`)
      .collection('pearls')
      .orderBy('date')
      .limit(1)
      .get()
      .then((data => {
        data.forEach((doc) => {
          let docData = doc.data();
          this.setState({ dates: {
            last: new Date(docData.date),
          }})
        })
      }))
  }
  */

  getData(uid) {
      firebase
        .firestore()
        .collection('users')
        .doc(`${uid}`)
        .collection('pearls')
        .get()
        .then(data => {
          this.setState({ pearls: data.size });
        })
        
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Pearls: {this.state.pearls}</Text>
        <Icon>add-circle</Icon>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '90%',
    paddingLeft: '5%',
    paddingVertical: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Lato-Regular',
  }
})

export default PearlCounter;

// discuss WHERE to check
// isPearlObtained: true ????
// to prevent double/multiple awarding
// or will checking current date > endDate(stats doc) and current date > last pearl date + 7?
