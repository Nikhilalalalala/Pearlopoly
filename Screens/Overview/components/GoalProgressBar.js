import React from 'react';
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
        .onSnapshot( collection => {
          console.log(collection.size)
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
                overall: doc.data().TotalOverall,
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
 
     /* const doc = firebase.firestore().collection('users').doc(`${this.state.useruid}`).collection("statistics").orderBy("beginDate", "desc").limit(1);
      const observer = doc.onSnapshot(docSnapshot => {
        let overallLimit = doc.get('OverallLimit');
        console.log('Received doc snapshot: ' + overallLimit );
      })*/
      render() {
        //this.getData(this.state.useruid);

        const goalData = [
            {
                expenditure: this.state.expenditure.overall,
                limitLeft: this.state.limits.overall - this.state.expenditure.overall,
            }
        ]

        const colors = ['#F4978E', '#BCD8C1'];
        const keys = ['expenditure', 'limitLeft'];

        if (this.state.limits.overall == 0 || isNaN(this.state.limits.overall)) {
          return(
            <StackedBarChart
              style ={{height: 35, width: '100%'}}
              keys = {['noRecords']}
              colors = {['#E1E2DA']}
              data = {[{noRecords: 1}]}
              horizontal = {true}
            />
          )
        }
        else {
          return (
            <StackedBarChart 
              style = {{height: 35, width: '100%'}}
              keys = {keys}
              colors = {colors}
              data = {goalData}
              horizontal = {true}
            />
          )
        };
      }
}

export default GoalProgressBar;