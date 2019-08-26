
import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

const { width, height } = Dimensions.get('window');

import TotalTrendingGraph from './StatisticPages/TotalTrendingGraph';
import IncomeExpenseSummary from './StatisticPages/IncomeExpenseSummary';
import ExpenseAnalysis from './StatisticPages/ExpenseAnalysis';

export default class StatisticScreen extends Component {
  render() {
    return (
      <View style={{width:width,height:height-75,backgroundColor:'#F5FCFF'}}>

        <ScrollableTabView 
          renderTabBar={() => <ScrollableTabBar style={{borderWidth:0}}/> } 
          tabBarUnderlineStyle={{
            backgroundColor: '#E4572E',
            height: 2,
          }} 
          tabBarBackgroundColor='#fff' 
          tabBarActiveTextColor='#E4572E' 
          tabBarInactiveTextColor='#1b1725' 
          tabBarTextStyle={{ fontSize: 14 }}
          locked={false}
        >
          
          <View tabLabel='收支汇总'>
            <IncomeExpenseSummary navigation={this.props.navigation} />
          </View>
          <View tabLabel='成本分析'>
            <ExpenseAnalysis navigation={this.props.navigation} />
          </View>
          <View tabLabel='盈利走势'>
            <TotalTrendingGraph navigation={this.props.navigation} />
          </View>

        </ScrollableTabView>

      </View>
    );
  }
}



// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   Button,
//   View, processColor
// } from 'react-native';
// import update from 'immutability-helper';

// import {LineChart} from 'react-native-charts-wrapper';

// class LineChartScreen extends React.Component {

//   constructor() {
//     super();

//     this.state = {
//       data: {},

//       marker: {
//         enabled: true,
//         digits: 2,
//         backgroundTint: processColor('teal'),
//         markerColor: processColor('#F0C0FF8C'),
//         textColor: processColor('white'),
//       },
//       xAxis: {
//         granularityEnabled: true,
//         granularity: 1,
//       },
//       // visibleRange: {x: {min: 1, max: 2}}
//     };
//   }

//   componentDidMount() {

//     this.setState(
//       update(this.state, {
//         data: {
//           $set: {
//             dataSets: [{
//               values: [{x: 4, y: 135}, {x: 5, y: 0.88}, {x: 6, y: 0.77}, {x: 7, y: 105}], label: 'A',
//             }, {
//               values: [{x: 4, y: 105}, {x: 5, y: 90}, {x: 6, y: 130}, {x: 7, y: 100}], label: 'B',
//             }, {
//               values: [{x: 4, y: 110}, {x: 5, y: 110}, {x: 6, y: 105}, {x: 7, y: 115}], label: 'C',
//             }],
//           }
//         }
//       })
//     );


//   }

//   onPressLearnMore() {

//     this.refs.chart.setDataAndLockIndex({
//       dataSets: [{
//         values: [
//           {x: 1, y: 0.88},
//           {x: 2, y: 0.77},
//           {x: 3, y: 105},
//           {x: 4, y: 135},
//           {x: 5, y: 0.88},
//           {x: 6, y: 0.77},
//           {x: 7, y: 105},
//           {x: 8, y: 135}
//         ],
//         label: 'A',
//       }, {
//         values: [
//           {x: 1, y: 90},
//           {x: 2, y: 130},
//           {x: 3, y: 100},
//           {x: 4, y: 105},
//           {x: 5, y: 90},
//           {x: 6, y: 130},
//           {x: 7, y: 100},
//           {x: 8, y: 105}
//         ],
//         label: 'B',
//       }, {
//         values: [
//           {x: 1, y: 110},
//           {x: 2, y: 105},
//           {x: 3, y: 115},
//           {x: 4, y: 110},
//           {x: 5, y: 110},
//           {x: 6, y: 105},
//           {x: 7, y: 115},
//           {x: 8, y: 110}],
//         label: 'C',
//       }],
//     })
//   }

//   handleSelect(event) {
//     let entry = event.nativeEvent
//     if (entry == null) {
//       this.setState({...this.state, selectedEntry: null})
//     } else {
//       this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
//     }

//     console.log(event.nativeEvent)
//   }

//   render() {
//     return (
//       <View style={{flex: 1}}>

//         <Button onPress={this.onPressLearnMore.bind(this)} title="Press to load more"/>

//         <View style={{height: 80}}>
//           <Text> selected entry</Text>
//           <Text> {this.state.selectedEntry}</Text>
//         </View>

//         <View style={styles.container}>
//           <LineChart
//             style={styles.chart}
//             data={this.state.data}
//             chartDescription={{text: ''}}
//             legend={this.state.legend}
//             marker={this.state.marker}
//             xAxis={this.state.xAxis}            
//             drawGridBackground={false}
//             borderColor={processColor('teal')}
//             borderWidth={1}
//             drawBorders={true}
//             autoScaleMinMaxEnabled={false}
//             touchEnabled={true}
//             dragEnabled={true}
//             scaleEnabled={true}
//             scaleXEnabled={true}
//             scaleYEnabled={true}
//             pinchZoom={true}
//             doubleTapToZoomEnabled={true}
//             highlightPerTapEnabled={true}
//             highlightPerDragEnabled={false}
//             // visibleRange={this.state.visibleRange}
//             dragDecelerationEnabled={true}
//             dragDecelerationFrictionCoef={0.99}
//             ref="chart"
//             keepPositionOnRotation={false}
//             onSelect={this.handleSelect.bind(this)}
//             onChange={(event) => console.log(event.nativeEvent)}
//           />
//         </View>

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF'
//   },
//   chart: {
//     flex: 1
//   }
// });

// export default LineChartScreen;