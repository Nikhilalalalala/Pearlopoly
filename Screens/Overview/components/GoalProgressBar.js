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
      education: 0,
      food: 0,
      other: 0,
      shopping: 0,
      transport: 0,
    },
    TotalSpending: 0,
    LimitBalance: 0,
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
        .get()
        .then( collection => {
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
                education: doc.data().TotalEducation,
                food: doc.data().TotalFood,
                other: doc.data().TotalOtherSpending,
                shopping: doc.data().TotalShopping,
                transport: doc.data().TotalTransport,
              },
            });
            //this.setState({ TotalSpending: (doc.data().TotalEducation + doc.data().TotalFood + doc.data().TotalOtherSpending + doc.data().TotalShopping + doc.data().TotalTransport)});
            
            let totalSpending = doc.data().TotalEducation + doc.data().TotalFood + doc.data().TotalOtherSpending + doc.data().TotalShopping + doc.data().TotalTransport;
            //let totalSpending = this.state.expenditure.education + this.state.expenditure.food + this.state.expenditure.other + this.state.expenditure.shopping + this.state.expenditure.transport;
            console.log('variable: ', totalSpending);
            this.setState({TotalSpending: totalSpending});
            console.log('TotalSpending: ', this.state.totalSpending);
            console.log('OverallLimit: ', this.state.limits.overall);
            let limitBalance = this.state.limits.overall - this.state.TotalSpending;
            this.setState({LimitBalnce: limitBalance});
            console.log('states: ', this.state.TotalSpending, this.state.LimitBalance)
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
        console.log('expenditure: ', this.state.TotalSpending);
        console.log('limit left: ', this.state.LimitBalance);
        const goalData = [
            {
                expenditure: this.state.TotalSpending,
                limitLeft: this.state.LimitBalance,
            }
        ]

        const colors = ['#F4978E', '#BCD8C1'];
        const keys = ['expenditure', 'limitLeft'];

        return (
            <StackedBarChart 
            style = {{height: 35, width: '100%'}}
            keys = {keys}
            colors = {colors}
            data = {goalData}
            horizontal = {true}
            />
        )
      }
}

export default GoalProgressBar;