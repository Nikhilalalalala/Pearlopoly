import React from 'react';
import { View, Text } from 'react-native';
import { StackedBarChart } from 'react-native-svg-charts';
import * as firebase from 'firebase';

class GoalProgressBar extends React.Component {
  state = {
    limits: {
      overall: 0,
      education: 0,
      food: 0,
      other: 0,
      shopping: 0,
      transport: 0,
    },
    expenditure: {
      overall: 0,
      education: 0,
      food: 0,
      other: 0,
      shopping: 0,
      transport: 0,
    },
    totalSpending: 0,
    limitBalance: 0,
  };

  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ useruid: useruid });
    this.getData(useruid);
  };

  getData(uid) {
    this.subscriber =
      firebase
        .firestore()
        .collection("users")
        .doc(`${uid}`)
        .collection("statistics")
        .orderBy("beginDate", "desc")
        .limit(1)
        .onSnapshot( collection => {
          collection.forEach(doc => {
            let recentDate = new Date(doc.data().beginDate)
            let nextWeek = new Date(recentDate.getFullYear(), recentDate.getMonth(), recentDate.getDate() + 7);
            let nowDate = new Date()
            if (nowDate < nextWeek) {
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
                  overall: doc.data().TotalOverall,
                  education: doc.data().TotalEducation,
                  food: doc.data().TotalFood,
                  other: doc.data().TotalOtherSpending,
                  shopping: doc.data().TotalShopping,
                  transport: doc.data().TotalTransport,
                },
              });
            }
          });
        });
      }

      render() {
        const limitBalance = Number(this.state.limits.overall - this.state.expenditure.overall).toFixed(2);
        const exceededAmt = Number(-limitBalance).toFixed(2);

        const goalData = [
            {
                expenditure: this.state.expenditure.overall,
                limitLeft: this.state.limits.overall - this.state.expenditure.overall,
            }
        ]

        const colors = ['#F4978E', '#BCD8C1'];
        const keys = ['expenditure', 'limitLeft'];

        if (this.state.limits.overall != 0 && limitBalance < 0) {
          return(
            <View style={{height: 40, width: '100%', display: 'flex', alignItems: 'center', justifyContent:'center', }} >
              <StackedBarChart
                style ={{height: '100%', width: '100%', }}
                keys = {['exceed']}
                colors = {['#F4978E']}
                data = {[{exceed: 1}]}
                horizontal = {true}
              />
              <Text style={{fontFamily: 'Lato-Regular', position: 'absolute', padding: 8.5, alignSelf: 'center'}}>Limit exceeded by: ${exceededAmt}</Text>
            </View>
          )
        }
        else if (this.state.limits.overall == 0 || isNaN(this.state.limits.overall)) {
          return(
            <View style={{height: 40, width: '100%', display: 'flex', alignItems: 'center', justifyContent:'center', }}>
              <StackedBarChart
                style ={{height: '100%', width: '100%'}}
                keys = {['noRecords']}
                colors = {['#E1E2DA']}
                data = {[{noRecords: 1}]}
                horizontal = {true}
              />
              <Text style={{fontFamily: 'Lato-Regular', position: 'absolute', padding: 8.5, alignSelf: 'center'}}>No limit set yet</Text>
            </View>
          )
        }
        else {
          return (
            <View style={{height: 35, width: '100%',}}>
              
              <StackedBarChart 
                style = {{height: '100%', width: '100%'}}
                keys = {keys}
                colors = {colors}
                data = {goalData}
                horizontal = {true}
              />
              <Text style={{fontFamily: 'Lato-Regular', position: 'absolute', padding: 8.5, alignSelf: 'center'}}>Limit Balance: ${limitBalance}</Text>
            </View>
          )
        };
      }
}

export default GoalProgressBar;