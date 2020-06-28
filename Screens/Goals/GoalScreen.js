import React from 'react';
import { View, ScrollView, Text, StatusBar, StyleSheet, Dimensions, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import GoalProgressBar from "../components/GoalProgressBar";
import SingleGoal from './SingleGoal';

class GoalScreen extends React.Component {
  state = {
    modalVisible: false,

    useruid: null,
    
    amount: 0,

    limits: {
      overall: 0,
      education: 0,
      food: 0,
      other: 0,
      shopping: 0,
      transport: 0,
    },
    expenditure: {
      education: 0,
      food: 0,
      other: 0,
      shopping: 0,
      transport: 0,
    },
  };

  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ useruid: useruid });
    this.getData(useruid);      
  }

  getData(uid) {
    this.subscriber =
      firebase
        .firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("statistics")
        .orderBy("beginDate", "desc")
        .onSnapshot( collection => {
          collection.forEach(doc => {
            this.setState({ 
              limits: {
                overall: doc.data().OverallLimit,
                education: doc.data().EducationLimit,
                food: doc.data().FoodLimit,
                other: doc.data().OtherLimit,
                shopping: doc.data().ShoppingLimit,
                transport: doc.data().TransportLimit,
              },
            });
            this.setState({
              expenditure: {
                education: doc.data().TotalEducation,
                food: doc.data().TotalFood,
                other: doc.data().TotalOtherSpending,
                shopping: doc.data().TotalShopping,
                transport: doc.data().TotalTransport,
              },
            });
          });
        });
      }


  updateLimits = (amount) => {
    if (amount > 0) {
      firebase
        .firestore()
        .collection('users')
        .doc(`${this.state.useruid}`)
        .collection('statistics')
        .orderBy('beginDate', 'desc')
        .limit(1)
        .get()
        .then((data) => {
          if (!data.empty) {
            data.forEach(dat => {
              let docData = dat.data()
              let recentDate = new Date(docData.beginDate)
              let nextWeek = new Date(recentDate.getFullYear(), recentDate.getMonth(), recentDate.getDate() + 7);
              let nowDate = new Date()
              let statsID = docData.statsID
              if(nowDate < nextWeek) {
                let newData;
                newData = {OverallLimit: amount};
                
                firebase
                  .firestore()
                  .collection('users')
                  .doc(`${this.state.useruid}`)
                  .collection('statistics').doc(`${statsID}`)
                  .set(newData, {merge: true});
              }
              else {
                firebase
                  .firestore()
                  .collection('users')
                  .doc(`${this.state.useruid}`)
                  .collection('statistics')
                  .add({
                    TotalEducation: 0,
                    TotalFood: 0,
                    TotalShopping: 0,
                    TotalTransport: 0,
                    TotalOtherSpending: 0,
                    TotalIncome: 0,
                    OverallLimit: 0,
                    EducationLimit: 0,
                    FoodLimit: 0,
                    ShoppingLimit: 0,
                    TransportLimit: 0,
                    OtherLimit: 0,
                    beginDate: Date.now(),
                  })
                  .then((key) => {
                    let newData;
                    newData = {OverallLimit: amount, statsID: key.id};
                    firebase
                      .firestore()
                      .collection('users')
                      .doc(`${this.state.useruid}`)
                      .collection('statistics')
                      .doc(key.id)
                      .set( newData, {merge: true});
                    });
              }
            })
          }
        })
    }
  };


  handleAmount = (amount) => {
    if(!isNaN(amount)) {
      let amt = parseFloat(amount, 10);
      console.log(amt)
      if (amt > 0) {
        console.log('itsmore than 0?')
        this.setState({amount: amt});
      } else {
        Alert.alert('Invalid amount', 
        'Please enter a valid amount',
        [{ text: 'OK' }],
        { cancelable: false },
      )
      }
    }
    else {
      Alert.alert('Invalid amount', 
        'Please enter a valid amount',
        [{ text: 'OK' }],
        { cancelable: false },
      )
    }
  };

  render() {
    return (
      <View style={screen.container}>

        <View style={main.line} />

        <View style={main.box1}>
          <View style={main.title1}>
            <Text style={{ fontFamily: 'Lato-Regular' }}>Overall Goal Progress: </Text>
            <Icon 
              name={"edit"} 
              style={main.icon} 
              color="#BB7E5D" 
              onPress={() => {this.setState({modalVisible: true});}}/>
          </View>
          <Text style={{alignSelf: 'center', fontFamily: 'Lato-Regular', marginBottom:5, }}> Current Overall Spending Limit: $ {Number(this.state.limits.overall).toFixed(2)} </Text>
          <TouchableOpacity style={{width:'100%',}}  onPress={() => {this.setState({modalVisible: true})}}>
            <GoalProgressBar />
          </TouchableOpacity> 
        </View>

        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={modal.backgroundDim}>
            <View style={modal.overallEdit}>
              <Text style={{ fontFamily: 'Lato-Regular' }}>Set overall goal limit:</Text>
              <TextInput
                placeholder='Limit'
                onChangeText={this.handleAmount}
                keyboardType='numeric'
                autoFocus={true} 
                onSubmitEditing={() => {this.setState({modalVisible: false}); this.updateLimits(this.state.amount); }}
                style={{borderWidth: 1, width: 100, paddingHorizontal: 10, marginTop: 20, fontFamily: 'Lato-Regular'}}
              ></TextInput>
              <TouchableOpacity style={modal.button} onPress={() => {this.setState({modalVisible: false}); this.updateLimits(this.state.amount); }}>
                <Text style={{ fontFamily: 'Lato-Regular' }}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        <View style={main.box2}>
          <View style={main.title2}>
            <Text style={{ fontFamily: 'Lato-Regular' }}>Sub-goals: </Text>
          </View>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={true} 
          >
            <SingleGoal category='Education' spending={this.state.expenditure.education} limit={this.state.limits.education}/>
            <SingleGoal category='Shopping'spending={this.state.expenditure.shopping} limit={this.state.limits.shopping}/>
            <SingleGoal category='Food' spending={this.state.expenditure.food} limit={this.state.limits.food}/>
            <SingleGoal category='Transport' spending={this.state.expenditure.transport} limit={this.state.limits.transport}/>
            <SingleGoal category='Other Spending' spending={this.state.expenditure.other} limit={this.state.limits.other}/>
          </ScrollView>
        </View>
        
        

        <View style={main.line} />

      </View>
    )
  }
}
// limit={15} spending={13} color={'#BCD8C1'}
export default GoalScreen;

const mainHeight = Dimensions.get('window').height - 54 -54 - StatusBar.currentHeight;
const windowHeight = Dimensions.get('window').height;

const screen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBE86',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const main = StyleSheet.create({
  line: {
    width: '100%',
    height: 3,
    backgroundColor: '#FAF3DD',
  },
  box1: {
    width: '90%',
    height: 200,
    borderRadius: 31,
    backgroundColor: '#FAF3DD',
    padding: 20,
    justifyContent: 'flex-start',
  },
  title1: {
    width: '100%',
    height: '15%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 50,
  },
  box2: {
    width: '90%',
    height: mainHeight - 266,
    borderRadius: 31,
    padding: 20,
    backgroundColor: '#FAF3DD',
  },
  title2: {
    width: '100%',
    height: '15%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icon: {
    opacity: 0.5,
    // color: '#BB7E5D',
  }
});

const modal = StyleSheet.create({
  backgroundDim: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  overallEdit: {
    width: '80%',
    height: windowHeight /4,
    backgroundColor: '#FAF3DD',
    borderRadius: 31,
    padding: 20,
    marginTop: windowHeight / 4,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 30,
    width: 60,
    marginTop: 20,
    backgroundColor: '#BB7E5D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4
  }
})

