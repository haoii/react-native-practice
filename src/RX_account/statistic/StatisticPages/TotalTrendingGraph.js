
import React from 'react';
import {
  StyleSheet,
  Text, TouchableHighlight,
  Button, Dimensions,
  View, processColor,
} from 'react-native';
import update from 'immutability-helper';

import {LineChart} from 'react-native-charts-wrapper';

const { width, height } = Dimensions.get('window');

export default class TotalTrendingGraph extends React.Component {

  constructor() {
    super();

    this.state = {
      data: {},

      legend: {
        enabled: true,
        textSize: 12,
        // form: "SQUARE",
        formSize: 12,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true
      },

      xAxis: {
        granularityEnabled: true,
        granularity: 0.1,
      },

    };
  }

  componentDidMount() {

    let total = [{x: 2019.3, y: 120.54}, {x: 2019.4, y: 123.64}, {x: 2019.5, y: 134.65}, {x: 2019.6, y: 97.45}, {x: 2019.7, y: 125.62}, {x: 2019.8, y: 153.49}];
    let rev = [{x: 2019.3, y: 24.55}, {x: 2019.4, y: 32.38}, {x: 2019.5, y: 35.27}, {x: 2019.6, y: 23.65}, {x: 2019.7, y: 31.54}, {x: 2019.8, y: 39.65}];
    let rev_rate = total.map((v, i) => ({x: v.x, y: 100*rev[i].y/v.y}));

    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: total, 
              label: '工程款',
              config: {
                lineWidth: 2,
                // drawCircles: false,
                // drawCubicIntensity: 0.3,
                // drawCubic: true,
                // drawHighlightIndicators: false,
                color: processColor('#a8a8a8'),
                // drawFilled: true,
                // fillColor: COLOR_PURPLE,
                // fillAlpha: 90,

              },
            }, {
              values: rev, 
              label: '盈利',
              config: {
                lineWidth: 2,
                color: processColor('#a0e0a0'),
              },
            }, {
              values: rev_rate, 
              label: '利率    单位：万元、百分比',
              config: {
                lineWidth: 2,
                color: processColor('#F0C0FF8C'),
              },
            }],
          }
        }
      })
    );


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
              <Text style={styles.mainFont}>仅计算完工客户</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={{height:15}}>
        </View>

        <View>

          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            legend={this.state.legend}
            xAxis={this.state.xAxis}       

            // marker={this.state.marker}
            // drawGridBackground={false}
            // borderColor={processColor('teal')}
            // borderWidth={0.5}
            // drawBorders={true}
            // autoScaleMinMaxEnabled={false}
            // touchEnabled={true}
            // dragEnabled={true}
            // scaleEnabled={true}
            // scaleXEnabled={true}
            // scaleYEnabled={true}
            // pinchZoom={true}
            // doubleTapToZoomEnabled={true}
            // highlightPerTapEnabled={true}
            // highlightPerDragEnabled={false}
            
            // legend={this.state.legend}
            // ref="chart"
            // visibleRange={this.state.visibleRange}
            // dragDecelerationEnabled={true}
            // dragDecelerationFrictionCoef={0.99}
            // keepPositionOnRotation={false}

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
