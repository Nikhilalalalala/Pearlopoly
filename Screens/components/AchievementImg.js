import React from 'react';
import { Image } from 'react-native';

import * as firebase from 'firebase';

function getData(uid) {
  firebase
    .firestore()
    .collection('users')
    .doc(`${uid}`)
    .collection('pearls')
    .get()
    .then(data => {
      return(data.size);
    })
};

function achievements(pearls) {
  let milestoneList = [1, 3, 5, 8, 11, 15, 19, 24, 29, 35, 41, 48, 55, 63, 71, 80, 90, 100];
  if(pearls != 0) {
    for(var i=0; pearls>=milestoneList[i]; i++) {
    };
    return(i+1);
  }
  else {
    return(0);
  }
};

const AchievementImg = () => {

  let useruid = firebase.auth().currentUser.uid;
  let pearls = getData(useruid);
  let num = achievements(pearls);
 
  switch(num) {
    case 0:
      return(
        <Image source={require('../../assets/A0.png')} />
      );
      break;
    case 1:
      return(
        <Image source={require('../../assets/A1.png')} />
      );
      break;
    case 2:
      return(
        <Image source={require('../../assets/A2.png')} />
      );
      break;
    case 3:
      return(
        <Image source={require('../../assets/A3.png')} />
      );
      break;
    case 4:
      return(
        <Image source={require('../../assets/A4.png')} />
      );
      break;
    case 5:
      return(
        <Image source={require('../../assets/A5.png')} />
      );
      break;
    case 6:
      return(
        <Image source={require('../../assets/A6.png')} />
      );
      break;
    case 7:
      return(
        <Image source={require('../../assets/A7.png')} />
      );
      break;
    case 8:
      return(
        <Image source={require('../../assets/A8.png')} />
      );
      break;
    case 9:
      return(
        <Image source={require('../../assets/A9.png')} />
      );
      break;
    case 10:
      return(
        <Image source={require('../../assets/A10.png')} />
      );
      break;
    case 11: 
      return(
        <Image source={require('../../assets/A11.png')} />
      );
      break;
    case 12:
      return(
        <Image source={require('../../assets/A12.png')} />
      );
      break;
    case 13:
      return(
        <Image source={require('../../assets/A13.png')} />
      );
      break;
    case 14:
      return(
        <Image source={require('../../assets/A14.png')} />
      );
      break;
    case 15:
      return(
        <Image source={require('../../assets/A15.png')} />
      );
      break;
    case 16:
      return(
        <Image source={require('../../assets/A16.png')} />
      );
      break;
    case 17:
      return(
        <Image source={require('../../assets/A17.png')} />
      );
      break;
    case 18:
      return(
        <Image source={require('../../assets/A18.png')} />
      );
      break;			
  };
}

export default AchievementImg;