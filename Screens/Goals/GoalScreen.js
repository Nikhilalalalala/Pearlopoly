import React from 'react';
import { View, ScrollView, Text, StatusBar, StyleSheet, Dimensions, Modal, TouchableOpacity, Picker } from 'react-native';
import { Icon } from 'react-native-elements';

import GoalProgressBar from "../Overview/components/GoalProgressBar";
import SingleGoal from './SingleGoal';
import { TextInput } from 'react-native-gesture-handler';

class Goals extends React.Component {
  state = {
    modalVisible1: false,
    modalVisible2: false,
    selectedValue: null,
  };
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
                keyboardType='numeric'
                style={{borderWidth: 1, width: 100, paddingHorizontal: 10, marginTop: 20, fontFamily: 'Lato-Regular'}}
              ></TextInput>
              <TouchableOpacity style={modal.button} onPress={() => {this.setState({modalVisible1: false});}}>
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
                selectedValue={this.state.selectedValue}
                style={{ height: 50, width: 185, borderWidth: 1, }}
                mode='dropdown'
                onValueChange={(itemValue, itemIndex) => this.setState({selectedValue: itemValue})}
              >
                <Picker.Item label='Education' value='Education' />
                <Picker.Item label='Shopping' value='Shopping' />
                <Picker.Item label='Food' value='Food' />
                <Picker.Item label='Transport' value='Transport' />
                <Picker.Item label='Other Spending' value='Other Spending' />
              </Picker>
              <TextInput
                placeholder='Limit'
                keyboardType='numeric'
                style={{borderWidth: 1, width: 100, paddingHorizontal: 10, marginTop: 20, fontFamily: 'Lato-Regular'}}
              ></TextInput>
              <TouchableOpacity style={modal.button} onPress={() => {this.setState({modalVisible2: false});}}>
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

