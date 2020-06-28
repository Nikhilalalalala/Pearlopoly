import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
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
    },

    category: 'Overall',
    amount: 0,
    
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
            this.setState({
              amount: Number(doc.data().TotalOverall).toFixed(2),
            });
          });
        });
  };


  render() {
      
      const data = [this.state.expenditure.education, this.state.expenditure.food, this.state.expenditure.other, this.state.expenditure.shopping, this.state.expenditure.transport];
      const cat = ['Education', 'Food', 'Other', 'Shopping', 'Transport'];
      const colorCodes = ['#FFBE86', '#BCD8C1', '#BB7E5D', '#F4978E', '#75B9BE'];
      //orange, green, brown, pink, blue

      //Do I know how this works? No. Absolutely not.
      //But observations: seems to arrange the slices of the chart by descending order
      const pieData = data
        .filter((value) => value >= 0)
        .map((value, index) => ({
          value,
          svg: {
            fill: colorCodes[index], 
            onPress: () => {this.setState({ category: cat[index] }); this.setState({ amount: Number(data[index]).toFixed(2) }); }, 
          },
            key: `pie-${index}`,
        }))

      const totalExpenditure = Number(this.state.expenditure.overall).toFixed(2);

      if (totalExpenditure == 0 || isNaN(totalExpenditure)) {
        return(
          <View style={pie.container}>
          <PieChart 
            style = {{ height: pieHeight }} 
            innerRadius = {pieInnerRadius}
            data = {
              [1]
              .filter((value) => value > 0)
              .map((value, index) => ({
                value,
                svg: {
                  fill: '#E1E2DA', 
                   onPress: () => console.log('press', index), 
                },
                   key: `pie-${index}`,
              }))
            }
          />
          <Text style={{position: 'absolute', alignSelf: 'center', justifyContent: 'center', fontFamily: 'Lato-Regular'}}>
            No records Yet :(
          </Text>
        </View>
        );
      }
      else {
        return (
          <View style={pie.container}>
            <PieChart 
              style = {{ height: pieHeight }} 
              innerRadius = {pieInnerRadius}
              data = {pieData} 
            />
            <TouchableOpacity 
              style={{
                height: pieInnerRadius*2,
                width: pieInnerRadius*2,
                borderRadius: pieInnerRadius,
                position: 'absolute', 
                alignSelf: 'center', 
                justifyContent: 'center',
              }} 
              onPress={() => {this.setState({ category: 'Overall' }); this.setState({ amount: Number(this.state.expenditure.overall).toFixed(2) });}}
            >
              <Text style={{position: 'absolute', alignSelf: 'center', fontFamily: 'Lato-Regular'}}>
                {this.state.category}: ${this.state.amount}
              </Text>
            </TouchableOpacity>
          </View>
        )
      };
      
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