import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';


class ExpenditurePie extends React.Component {
  render() {
      
    //i don't know where we are going to pull the data from yet, so placeholder data!
    //data index corresponds to colour in colorCodes array
    //TODO: index of data don't actually correspond to color => data[5] is displayed in colorCodes[4] instead
      const total = 75;
      const data = [20, 10, 30, 10, 5];
      const colorCodes = ['#FFBE86', '#BCD8C1', '#BB7E5D', '#F4978E', '#75B9BE'];

      //Do I know how this works? No. Absolutely not.
      //But observations: seems to arrange the slices of the chart by descending order
      const pieData = data
        .filter((value) => value > 0)
        .map((value, index) => ({
          value,
          svg: {
            fill: colorCodes[index], //i wonder what is so difficult about actually just picking unique random colours
            onPress: () => console.log('press', index), //this could come in handy for stuff like looking at the details for each slice or something
          },
            key: `pie-${index}`,
        }))

      return (
        <View style={pie.container}>
          <PieChart 
            style = {{ height: 250 }} 
            innerRadius = {80}
            data = {pieData} 
          />
          <Text style={{position: 'absolute', alignSelf: 'center', justifyContent: 'center'}}>
            Expenditure
          </Text>
        </View>
        )
  }
}

const pie = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  }
})

export default ExpenditurePie;