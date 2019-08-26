
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text, TouchableHighlight,
  View, processColor, Dimensions
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';

const { width, height } = Dimensions.get('window');

class IncomeExpenseSummary extends React.Component {

  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 12,
        // form: "SQUARE",
        formSize: 12,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true
      },

      data: {
        dataSets: [{
          values: [{
            y:[52.125, 6.120, 25.792, 2.583], 
            // marker: ["row1", "row2", "row3"]
          }, {
            y:[46.363, 12.385, 18.337, 9.248], 
            // marker:"second"
          }, {
            y:[32.519, 25.381, 20.397, 22.239], 
            // marker:["hello", "world","third"]
          }, {
            y:[22.397, 32.338, 27.284, 35.107], 
            // marker:"fourth"
          }],
          label: '',
          config: {
            colors: [processColor('#a0a0e0'), processColor('#e0a0a0'), processColor('#a0e0a0'), processColor('#a8a8a8')],
            stackLabels: ['已支付开销', '未支付开销', '剩余工程款', '未支付工程款    单位：万元']
          }
        }],
      },

      highlights: [{x: 1, stackIndex: 2}, {x: 2, stackIndex: 1}],

      xAxis: {
        valueFormatter: ['18年Q4', '19年Q1', '19年Q2', '19年Q3'],
        granularityEnabled: true,
        granularity: 1

      },

    };
  }

  render() {
    return (

      <View style={styles.container}>

        <View style={{flexDirection:'row', paddingHorizontal:10}}>

          <TouchableHighlight 
            onPress={() => {}}
            style={[styles.touchableView]}>
            <View style={[styles.touchableContentView]}>
              <Text style={styles.mainFont}>2019年2月1日 - 至今 </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={() => {}}
            style={[styles.touchableView]}>
            <View style={[styles.touchableContentView]}>
              <Text style={styles.mainFont}>包含未完工客户</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={{height:15}}>
        </View>

        <View>
          <BarChart
            style={styles.chart}
            xAxis={this.state.xAxis}
            data={this.state.data}
            legend={this.state.legend}
            drawValueAboveBar={true}
            chartDescription={{text: ''}}
            
            // marker={{
            //   enabled: true,
            //   markerColor: processColor('#F0C0FF8C'),
            //   textColor: processColor('white'),
            //   markerFontSize: 14,
            // }}
            // highlights={this.state.highlights}
            // onSelect={this.handleSelect.bind(this)}
            // onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    
  },
  chart: {
    height:height-180,
  },

  mainFont: {
    fontSize:14,
  },

  touchableView: {
    paddingVertical:5,
    flexDirection:'row',
    alignItems:'center',
    paddingRight:10,
  },
  touchableContentView: {
    flexDirection:'row',
    alignItems:'center',
    minWidth:20,
    backgroundColor:'#e0e0e0',
    borderRadius:5,
    height:20,
  },
});


export default IncomeExpenseSummary;