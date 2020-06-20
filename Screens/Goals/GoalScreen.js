import React from 'react';
import { View, ScrollView, Text, StatusBar, StyleSheet, Dimensions, } from 'react-native';

import GoalProgressBar from "../Overview/components/GoalProgressBar";
import SingleGoal from './SingleGoal';

class Goals extends React.Component {

  render() {
    return (
      <View style={screen.container}>
        <View style={main.line} />
        <View style={main.box1}>
          <Text style={{ fontFamily: 'Lato-Regular' }}>Overall Goal Progress</Text>
          <GoalProgressBar />
        </View>
        <View style={main.box2}>
            <ScrollView 
              contentContainerStyle={{flex: 1, padding: 25,}}
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={true} 
            >
              <SingleGoal category='Education' spending={15.00} limit={20.00}/>
              <SingleGoal category='Shopping'spending={10.00} limit={5.00}/>
              <SingleGoal category='Food' spending={8.50} limit={15.00}/>
              <SingleGoal category='Transport' spending={5.00} limit={5.00}/>
              <SingleGoal category='Other Spending' spending={7.50} limit={null}/>
            </ScrollView>
        </View>
        <View style={main.line} />
      </View>
    )
  }
}
// limit={15} spending={13} color={'#BCD8C1'}
export default Goals;

const mainHeight = Dimensions.get('window').height - 54 -54 - StatusBar.currentHeight;

const screen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBE86',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    justifyContent: 'space-around',
  },
  box2: {
    width: '90%',
    height: mainHeight - 266,
    borderRadius: 31,
    backgroundColor: '#FAF3DD',
  },
});

