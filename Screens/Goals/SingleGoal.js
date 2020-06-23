import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

// if goal for xxx category isn't set, can insert message: 'goal for xxx category not set'
class SingleGoal extends React.Component {
  
  render() {
    var spending = this.props.spending;
    var limit = this.props.limit;
    var category = this.props.category;

    var spendingPrint = Number(spending).toFixed(2);
    var limitPrint = Number(limit).toFixed(2);

    //if limit is 0, there is effectively no limit set
    if (limit == 0) {

      //gray
      return(
        <View style={styles.container}>
          <Text style={{ fontFamily: 'Lato-Regular' }}>{category}</Text>
          <View style={styles.goalGray}>
            <Text style={{ fontFamily: 'Lato-Regular', color: '#878787' }}>limit not set</Text>
          </View>
        </View>
      
      );
    }
    else if (spending < limit) {

      //green/blue
      return(
        <View style={styles.container}>
          <Text style={{ fontFamily: 'Lato-Regular' }}>{category}</Text>
          <View style={styles.goalGreen}>
            <Text style={{ fontFamily: 'Lato-Regular' }}>${spendingPrint} / ${limitPrint}</Text>
          </View>
        </View>
      );
    }
    else if (spending == limit) {

      //orange/brown idk
      return(
        <View style={styles.container}>
          <Text style={{ fontFamily: 'Lato-Regular' }}>{category}</Text>
          <View style={styles.goalOrange}>
            <Text style={{ fontFamily: 'Lato-Regular' }}>${spendingPrint} / ${limitPrint}</Text>
          </View>
        </View>
      );
    }
    else {
      //red/pink

      return(
        <View style={styles.container}>
          <Text style={{ fontFamily: 'Lato-Regular' }}>{category}</Text>
          <View style={styles.goalRed}>
            <Text style={{ fontFamily: 'Lato-Regular' }}>${spendingPrint} / ${limitPrint}</Text>
          </View>
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

