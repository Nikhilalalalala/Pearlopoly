import React from 'react';
import { StackedBarChart } from 'react-native-svg-charts';

class GoalProgressBar extends React.Component {
    render() {
        const goalData = [
            {
                expenditure: 75,
                limitLeft: 100 - 75 , //limit-expenditure (i still dk how to )
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