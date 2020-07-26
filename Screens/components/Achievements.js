import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Modal, Image } from 'react-native';
import { Icon } from 'react-native-elements'; //circle

import * as firebase from 'firebase';
import firebaseDb from '../../firebaseDb';

const achievementsList = [
  'Achievement 1\n1 pearl to achieve',
  'Achievement 2\n3 pearls to achieve',
  'Achievement 3\n5 pearls to achieve',
  'Achievement 4\n8 pearls to achieve',
  'Achievement 5\n11 pearls to achieve',
  'Achievement 6\n15 pearls to achieve',
  'Achievement 7\n19 pearls to achieve',
  'Achievement 8\n24 pearls to achieve',
  'Achievement 9\n29 pearls to achieve',
  'Achievement 10\n35 pearls to achieve',
  'Achievement 11\n41 pearls to achieve',
  'Achievement 12\n48 pearls to achieve',
  'Achievement 13\n55 pearls to achieve',
  'Achievement 14\n63 pearls to achieve',
  'Achievement 15\n71 pearls to achieve',
  'Achievement 16\n80 pearls to achieve',
  'Achievement 17\n90 pearls to achieve',
  'Achievement 18\n100 pearls to achieve',
];

var achievedArr = [];
var unachievedArr = [];

class Achievements extends React.Component {
  state = {
    pearls: 0,

    dates: {
      current: new Date(),
      end: null,
      last: null,
    },

    modalVisibility: false,

    achievements: 0,
  };

  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ useruid: useruid });
    this.getData(useruid);
    this.achievements();
  }

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

  achievements() {
    let milestoneList = [1, 3, 5, 8, 11, 15, 19, 24, 29, 35, 41, 48, 55, 63, 71, 80, 90, 100];
    if(this.state.pearls != 0) {
      for(var i=0; this.state.pearls>=milestoneList[i]; i++) {
      };
      var achievementNumber = i;
      this.setState({ achievements: achievementNumber });
    }
    
    

    for(var j=0; j<achievementNumber; j++) {
      achievedArr.push(achievementsList[j]);
    };

    for(; j<18; j++) {
      unachievedArr.push(achievementsList[j]);
    };

  }

  render() {
    return(
      <View>
        <TouchableOpacity 
          onPress={() => {
            this.setState({ modalVisibility: true });
          }}
        >
          <View style={styles.container}>
            <Text style={styles.text}>Pearls: {this.state.pearls}</Text>
            {/*<Icon>add-circle</Icon>*/}
          </View>
        </TouchableOpacity>

        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisibility}
        >
          <View style={modal.container}>
            <View style={modal.header}>
              <TouchableOpacity 
                style={modal.back}
                onPress={() => {
                  console.log("I've been touched");
                  this.setState({ modalVisibility: false });
                }}
              >
                <Icon
                  name={'arrow-back'}
                  color='#000000'
                />
                <Text style={modal.backText}>Back</Text>
                
              </TouchableOpacity>
              <Text style={modal.title}>Achievements</Text>
            </View>

            <View style={modal.line} />

            <ScrollView style={{flex: 1}}>
              {achievedArr.map((text) => (
                <View style={achieve.container}>
                  <Image
                    source={require('../../assets/pearl.png')}
                  />
                  <View style={achieve.textContainer}>
                    <Text style={achieve.achievedtext}>{text}</Text>
                  </View>
                </View>
              ))}
              {unachievedArr.map((item) => (
                <View style={achieve.container}>
                  <Image
                    style={{opacity: 0.55}}
                    source={require('../../assets/pearl.png')}
                  />
                  <View style={achieve.textContainer}>
                    <Text style={achieve.unachievedtext}>{item}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

          </View>
        </Modal>
      </View>
    );
  }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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
});

const modal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBE86',
  },
  header: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
  },
  back: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingTop: 10,
    paddingLeft: 20,
    position: 'absolute',
  },
  backText: {
    paddingLeft: 5,
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    color: '#000000',
    textDecorationLine: 'underline',
  },
  title: {
    paddingTop: 10,
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    color: '#000000',
    alignSelf: 'center'
  },
  line: {
    width: "100%",
    height: 3,
    backgroundColor: "#FAF3DD",
  },
});

const achieve = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
  },
  pearl: {
    height: 100,
    width: 100,
  },
  textContainer: {
    height: 100,
    width: windowWidth - 100,
    justifyContent: 'center',
  },
  achievedtext: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    color: '#000000',
  },
  unachievedtext: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    color: '#878787',
  }

})

export default Achievements;

// discuss WHERE to check
// isPearlObtained: true ????
// to prevent double/multiple awarding
// or will checking current date > endDate(stats doc) and current date > last pearl date + 7?
