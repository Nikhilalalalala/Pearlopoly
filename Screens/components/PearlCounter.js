import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Icon } from 'react-native-elements'; //circle

import * as firebase from 'firebase';
import firebaseDb from '../firebaseDb';

class PearlCounter extends Component {
  state = {
    pearls: 0,

    dates: {
      current: new Date(),
      end: null,
      last: null,
    }
  };
/*
  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ useruid: useruid });
    this.getEndDate(useruid);
    this.getData(useruid);
  }

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

  getData(uid) {
      firebase
        .firestore()
        .collection('users')
        .doc(`${uid}`)
        .collection('pearls')
        .orderBy("date")
        .get()
        .then(data => {
          console.log(data.size);

          this.setState({ pearls: data.size });
        })
        
  }
*/
  render() {
    return(
      <View style={styles.container}>
        <Text>{this.state.pearls}</Text>
        <Icon>circle</Icon>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 100,
    backgroundColor: '#FFBE86',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
  }
})

export default PearlCounter;