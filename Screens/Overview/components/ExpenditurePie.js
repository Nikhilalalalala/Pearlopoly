import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import * as firebase from 'firebase';


class ExpenditurePie extends React.Component {
  state = {
    useruid: null,

    expenditure: {
      education: 0,
      food: 0,
      other: 0,
      shopping: 0,
      transport: 0,
      overall: 0,
    }
  }
  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ useruid: useruid });
  }

  constructor(props) {
    super(props);
    let useruid = firebase.auth().currentUser.uid;
    this.subscriber = 
      firebase
        .firestore()
        .collection('users')
        .doc(useruid)
        .collection("statistics")
        .orderBy("beginDate", "desc")
        .onSnapshot( collection => {
          console.log(collection.size)
          collection.forEach(doc => {
            this.setState({
              expenditure: {
                education: doc.data().TotalEducation,
                food: doc.data().TotalFood,
                other: doc.data().TotalOtherSpending,
                shopping: doc.data().TotalShopping,
                transport: doc.data().TotalTransport,
                overall: doc.data().TotalOverall,
              }
            });
          });
        });
  };


  render() {
    console.log('pie chart render called');
      
    //i don't know where we are going to pull the data from yet, so placeholder data!
    //data index corresponds to colour in colorCodes array
    //TODO: index of data don't actually correspond to color => data[5] is displayed in colorCodes[4] instead
      const data = [this.state.expenditure.education, this.state.expenditure.food, this.state.expenditure.other, this.state.expenditure.shopping, this.state.expenditure.transport];
      const colorCodes = ['#FFBE86', '#BCD8C1', '#BB7E5D', '#F4978E', '#75B9BE'];

      //Do I know how this works? No. Absolutely not.
      //But observations: seems to arrange the slices of the chart by descending order
      const pieData = data
        .filter((value) => value > 0)
        .map((value, index) => ({
          value,
          svg: {
            fill: colorCodes[index], 
            onPress: () => console.log('press', index), //this could come in handy for stuff like looking at the details for each slice or something
          },
            key: `pie-${index}`,
        }))

      const totalExpenditure = Number(this.state.expenditure.overall).toFixed(2);

      return (
        <View style={pie.container}>
          <PieChart 
            style = {{ height: pieHeight }} 
            innerRadius = {pieInnerRadius}
            data = {pieData} 
          />
          <Text style={{position: 'absolute', alignSelf: 'center', justifyContent: 'center', fontFamily: 'Lato-Regular'}}>
            Expenditure: ${totalExpenditure}
          </Text>
        </View>
        )
  }
};

const pieHeight = (((Dimensions.get("window").height - 54 - 54 - StatusBar.currentHeight)/2 - 50) * 0.9);
const pieInnerRadius = (pieHeight/2) * 0.65;

const pie = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  }
});

export default ExpenditurePie;