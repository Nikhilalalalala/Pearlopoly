import React from 'react';
import { View, ScrollView, Text, StatusBar, StyleSheet, Dimensions, Modal, TouchableOpacity, Picker, TextInput, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import firebaseDb from '../../firebaseDb';
import GoalProgressBar from "../Overview/components/GoalProgressBar";
import SingleGoal from './SingleGoal';

class Goals extends React.Component {
  state = {
    modalVisible1: false,
    modalVisible2: false,
    selectedCategory: 'Education',
    
    useruid: null,
    limits: null,
    amount: 0,
  };

  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ useruid: useruid });
  };

  updateLimits = (amount, selectedCategory) => {
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
              switch(selectedCategory) {
                case 'Overall':
                  newData = {OverallLimit: amount};
                  break;
                case 'Food':
                  newData = {FoodLimit: amount};
                  break;
                case 'Education':
                  newData = {EducationLimit: amount};
                  break;
                case 'Transport':
                  newData = {TransportLimit: amount};
                  break;
                case 'Shopping':
                  newData = {ShoppingLimit: amount};
                  break;
                case 'Other Spending':
                  newData = {OtherLimit: amount};
                  break;
              }
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
                  switch (selectedCategory) {
                    case 'Overall':
                      newData = {OverallLimit: amount, statsID: key.id};
                      break;
                    case 'Food':
                      newData = {FoodLimit: amount, statsID: key.id};
                      break;
                    case 'Education':
                      newData = {EducationLimit: amount, statsID: key.id};
                      break;
                    case 'Transport':
                      newData = {TransportLimit: amount, statsID: key.id};
                      break;
                    case 'Shopping':
                      newData = {ShoppingLimit: amount, statsID: key.id};
                      break;
                    case 'Other Spending':
                      newData = {OtherLimit: amount, statsID: key.id};
                      break;
                  }
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
  };


  handleAmount = (amount) => {
    if(!isNaN(amount)) {
      let amt = parseFloat(amount, 10);
      this.setState({amount: amt});
      console.log('amount entered is ' + amt);
    }
    else {
      Alert.alert('Invalid amount', 
        'Please enter a valid amount',
        [{ text: 'OK' }],
        { cancelable: false },
      )
    }
  };

  handleCategory = (itemValue) => {
    this.setState({selectedValue: itemValue});
    console.log('category chosen is ' + itemValue);
  }

  render() {
    return (
      <View style={screen.container}>

        <View style={main.line} />

        <View style={main.box1}>
          <View style={main.title1}>
            <Text style={{ fontFamily: 'Lato-Regular' }}>Overall Goal Progress: </Text>
            <Icon name={"edit"} style={main.icon} onPress={() => {this.setState({modalVisible1: true});}}/>
          </View>
          <GoalProgressBar />
        </View>

        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible1}
        >
          <View style={modal.backgroundDim}>
            <View style={modal.overallEdit}>
              <Text style={{ fontFamily: 'Lato-Regular' }}>Set overall goal limit:</Text>
              <TextInput
                placeholder='Limit'
                onChangeText={this.handleAmount}
                keyboardType='numeric'
                style={{borderWidth: 1, width: 100, paddingHorizontal: 10, marginTop: 20, fontFamily: 'Lato-Regular'}}
              ></TextInput>
              <TouchableOpacity style={modal.button} onPress={() => {this.setState({modalVisible1: false}); this.updateLimits(this.state.amount, 'Overall'); }}>
                <Text style={{ fontFamily: 'Lato-Regular' }}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        <View style={main.box2}>
          <View style={main.title2}>
            <Text style={{ fontFamily: 'Lato-Regular' }}>Sub-goals: </Text>
            <Icon name={"edit"} style={main.icon} onPress={() => {this.setState({modalVisible2: true});}}/>
          </View>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={true} 
          >
            <SingleGoal category='Education' spending={15} limit={20}/>
            <SingleGoal category='Shopping'spending={10} limit={5}/>
            <SingleGoal category='Food' spending={8.5} limit={15}/>
            <SingleGoal category='Transport' spending={5} limit={5}/>
            <SingleGoal category='Other Spending' spending={7.5} limit={0}/>
          </ScrollView>
        </View>
        
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible2}
        >
          <View style={modal.backgroundDim}>
            <View style={modal.overallEdit}>
              <Text style={{ fontFamily: 'Lato-Regular' }}>Set category goal limit:</Text>
              <Picker
                selectedValue={this.state.selectedCategory}
                style={{ height: 50, width: 185, }}
                mode='dropdown'
                onValueChange={(itemValue, itemIndex) => {this.setState({selectedCategory: itemValue}); console.log('selected category is ' + this.state.selectedCategory)}}
              >
                <Picker.Item label='Education' value='Education' />
                <Picker.Item label='Shopping' value='Shopping' />
                <Picker.Item label='Food' value='Food' />
                <Picker.Item label='Transport' value='Transport' />
                <Picker.Item label='Other Spending' value='Other Spending' />
              </Picker>
              <TextInput
                placeholder='Limit'
                onChangeText={this.handleAmount}
                keyboardType='numeric'
                style={{borderWidth: 1, width: 100, paddingHorizontal: 10, marginTop: 20, fontFamily: 'Lato-Regular'}}
              ></TextInput>
              <TouchableOpacity style={modal.button} onPress={() => {this.setState({modalVisible2: false}); this.updateLimits(this.state.amount, this.state.selectedCategory); }}>
                <Text style={{ fontFamily: 'Lato-Regular' }}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={main.line} />

      </View>
    )
  }
}
// limit={15} spending={13} color={'#BCD8C1'}
export default Goals;

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
    color: '#BB7E5D',
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

