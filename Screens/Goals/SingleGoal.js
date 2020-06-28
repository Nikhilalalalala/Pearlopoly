import React from 'react';
import { StyleSheet, Text, View, Modal, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';

// if goal for xxx category isn't set, can insert message: 'goal for xxx category not set'
class SingleGoal extends React.Component {
  state = {
    useruid: null,
    modalVisible: false,
    amount: 0,
  }

  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ useruid: useruid });    
  }

  updateLimits = (amount, selectedCategory) => {
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
          let needToCreatNewStats = false
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
                needToCreatNewStats = true
              }
            })
          } else {
            needToCreatNewStats = true
          }
          if (needToCreatNewStats) {
            firebase
                  .firestore()
                  .collection('users')
                  .doc(`${this.state.useruid}`)
                  .collection('statistics')
                  .add({
                    TotalOverall: 0,
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
  };

  handleAmount = (amount) => {
    if(!isNaN(amount)) {
      let amt = parseFloat(amount, 10);
      if (amt > 0) {
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
    var spending = this.props.spending;
    var limit = this.props.limit;
    var category = this.props.category;

    var spendingPrint = Number(spending).toFixed(2);
    var limitPrint = Number(limit).toFixed(2);

    //if limit is 0, there is effectively no limit set
    if (limit == 0 || limit == null) {

      //gray
      return(
        <View style={styles.container}>
          <Text style={{ fontFamily: 'Lato-Regular' }}>{category}</Text>
          <TouchableOpacity style={styles.goalGray} onPress={() => {this.setState({modalVisible: true});}}>
            <Text style={{ fontFamily: 'Lato-Regular', color: '#878787' }}>limit not set</Text>
          </TouchableOpacity>

          <Modal
            animationType='slide'
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={modal.backgroundDim}>
              <View style={modal.overallEdit}>
                <Text style={{ fontFamily: 'Lato-Regular', paddingTop:5, }}>Set {category} goal limit:</Text>
                <TextInput
                  placeholder='Limit'
                  onChangeText={this.handleAmount}
                  keyboardType='numeric'
                  autoFocus={true}
                  onSubmitEditing={() =>  {this.setState({modalVisible: false}); this.updateLimits(this.state.amount, category); } }
                  style={{borderWidth: 1, borderColor:'#BB7E5D', width: 100, paddingHorizontal: 10, marginTop: 20, fontFamily: 'Lato-Regular'}}
                ></TextInput>
                <TouchableOpacity style={modal.button} onPress={() => {this.setState({modalVisible: false}); this.updateLimits(this.state.amount, category); }}>
                  <Text style={{ fontFamily: 'Lato-Regular' }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      
      );
    }
    else if (spending < limit) {

      //green/blue
      return(
        <View style={styles.container}>
          <Text style={{ fontFamily: 'Lato-Regular' }}>{category}</Text>
          <TouchableOpacity style={styles.goalGreen} onPress={() => {this.setState({modalVisible: true});}}>
            <Text style={{ fontFamily: 'Lato-Regular' }}>${spendingPrint} / ${limitPrint}</Text>
          </TouchableOpacity>

          <Modal
            animationType='slide'
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={modal.backgroundDim}>
              <View style={modal.overallEdit}>
                <Text style={{ fontFamily: 'Lato-Regular', paddingTop:5, }}>Set {category} goal limit:</Text>
                <TextInput
                  placeholder='Limit'
                  onChangeText={this.handleAmount}
                  keyboardType='numeric'
                  autoFocus={true}
                  onSubmitEditing={() =>  {this.setState({modalVisible: false}); this.updateLimits(this.state.amount, category); } }
                  style={{borderWidth: 1, borderColor:'#BB7E5D', width: 100, paddingHorizontal: 10, marginTop: 20, fontFamily: 'Lato-Regular'}}
                ></TextInput>
                <TouchableOpacity style={modal.button} onPress={() => {this.setState({modalVisible: false}); this.updateLimits(this.state.amount, category); }}>
                  <Text style={{ fontFamily: 'Lato-Regular' }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
    else if (spending == limit) {

      //orange/brown idk
      return(
        <View style={styles.container}>
          <Text style={{ fontFamily: 'Lato-Regular' }}>{category}</Text>
          <TouchableOpacity style={styles.goalOrange} onPress={() => {this.setState({modalVisible: true});}}>
            <Text style={{ fontFamily: 'Lato-Regular' }}>${spendingPrint} / ${limitPrint}</Text>
          </TouchableOpacity>

          <Modal
            animationType='slide'
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={modal.backgroundDim}>
              <View style={modal.overallEdit}>
                <Text style={{ fontFamily: 'Lato-Regular', paddingTop:5, }}>Set {category} goal limit:</Text>
                <TextInput
                  placeholder='Limit'
                  onChangeText={this.handleAmount}
                  keyboardType='numeric'
                  autoFocus={true}
                  onSubmitEditing={() =>  {this.setState({modalVisible: false}); this.updateLimits(this.state.amount, category); } }
                  style={{borderWidth: 1, borderColor:'#BB7E5D', width: 100, paddingHorizontal: 10, marginTop: 20, fontFamily: 'Lato-Regular'}}
                ></TextInput>
                <TouchableOpacity style={modal.button} onPress={() => {this.setState({modalVisible: false}); this.updateLimits(this.state.amount, category); }}>
                  <Text style={{ fontFamily: 'Lato-Regular' }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
    else {
      //red/pink

      return(
        <View style={styles.container}>
          <Text style={{ fontFamily: 'Lato-Regular' }}>{category}</Text>
          <TouchableOpacity style={styles.goalRed} onPress={() => {this.setState({modalVisible: true});}}>
            <Text style={{ fontFamily: 'Lato-Regular' }}>${spendingPrint} / ${limitPrint}</Text>
          </TouchableOpacity>

          <Modal
            animationType='slide'
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={modal.backgroundDim}>
              <View style={modal.overallEdit}>
                <Text style={{ fontFamily: 'Lato-Regular', paddingTop:5, }}>Set {category} goal limit:</Text>
                <TextInput
                  placeholder='Limit'
                  onChangeText={this.handleAmount}
                  keyboardType='numeric'
                  autoFocus={true}
                  onSubmitEditing={() =>  {this.setState({modalVisible: false}); this.updateLimits(this.state.amount, category); } }
                  style={{borderWidth: 1, borderColor:'#BB7E5D', width: 100, paddingHorizontal: 10, marginTop: 20, fontFamily: 'Lato-Regular'}}
                ></TextInput>
                <TouchableOpacity style={modal.button} onPress={() => {this.setState({modalVisible: false}); this.updateLimits(this.state.amount, category); }}>
                  <Text style={{ fontFamily: 'Lato-Regular' }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        
      );
    }
  }  
};



export default SingleGoal;



//container height can be changed
//only important bit is that marginBottom be at least 30, else the bottom will get cut off
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  goalGray: {
    backgroundColor: '#E1E2DA',
    borderRadius: 20,
    width: '40%',
    height: 40,
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute'
  },
  goalGreen: {
    backgroundColor: '#BCD8C1',
    borderRadius: 20,
    width: '40%',
    height: 40,
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute'
  },
  goalOrange: {
    backgroundColor: '#FFBE86',
    borderRadius: 20,
    width: '40%',
    height: 40,
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute'
  },
  goalRed: {
    backgroundColor: '#F4978E',
    borderRadius: 20,
    width: '40%',
    height: 40,
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute'
  }

})

const windowHeight = Dimensions.get('window').height;

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
    height: 35,
    width: 70,
    marginTop: 20,
    backgroundColor: '#BB7E5D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:4
  }
})

/*
function EditModal() {
  
  return(
    
    <View style={{flex: 1}}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.state.modalVisible}
      >
        <View style={modal.backgroundDim}>
          <View style={modal.overallEdit}>
            <Text style={{ fontFamily: 'Lato-Regular', paddingTop:5, }}>Set {this.state.category} goal limit:</Text>
            <TextInput
              placeholder='Limit'
              onChangeText={this.handleAmount}
              keyboardType='numeric'
              style={{borderWidth: 1, borderColor:'#BB7E5D', width: 100, paddingHorizontal: 10, marginTop: 20, fontFamily: 'Lato-Regular'}}
            ></TextInput>
            <TouchableOpacity style={modal.button} onPress={() => {this.setState({modalVisible: false}); this.updateLimits(state.amount, this.state.selectedCategory); }}>
              <Text style={{ fontFamily: 'Lato-Regular' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
*/

//check if a goal for each category is set
//if not set either don't display or display as 'goal not set'

/*
pseudocode ish thing to check:
1) is limit set
2) is spending under the limit
3) has spending reached the limit
4) has spending exceeded the limit

function limitStatus(category, spending, limit) {
  //  if no limit set
  //    gray
    var color;
    if (spending < limit) {
      //green/blue
      color='#BCD8C1';
    }
    else if (spending == limit)
      //orange/brown idk
      color='#FFBE86';
    else {
      //red/pink
      color='#F4978E';
    }
    return(
      <View style={styles.container}>
          <Text>{category}</Text>
          <View style={styles.goal}>
            <Text>{spending} / {limit}</Text>
          </View>
      </View>
    )
  };
*/

