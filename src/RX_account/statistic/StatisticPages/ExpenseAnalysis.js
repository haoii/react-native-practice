
import React from 'react';
import {
  StyleSheet,
  Text,
  View, Dimensions,
  processColor,TouchableHighlight,
} from 'react-native';

import {PieChart} from 'react-native-charts-wrapper';
const { width, height } = Dimensions.get('window');

class ExpenseAnalysis extends React.Component {

  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: 'CIRCLE',

        horizontalAlignment: "RIGHT",
        verticalAlignment: "CENTER",
        orientation: "VERTICAL",
        wordWrapEnabled: true
      },

      data: {
        dataSets: [{
          values: [{value: 35.4, label: '材料'},
            {value: 18.5, label: '人工        '},
            {value: 15.4, label: '管理'},
            {value: 21.7, label: '盈利'}],
          label: '',
          config: {
            colors: [processColor('#FFD08C'), processColor('#FFF78C'), processColor('#C0FF8C'), processColor('#8CEAFF')],
            valueTextSize: 14,
            valueTextColor: processColor('#666'),
            sliceSpace: 5,
            selectionShift: 13,
            // xValuePosition: "OUTSIDE_SLICE",
            // yValuePosition: "OUTSIDE_SLICE",
            valueFormatter: "#.#'%'",
            // valueLineColor: processColor('green'),
            // valueLinePart1Length: 0.5
          }
        }],
      },

      data_material: {
        dataSets: [{
          values: [{value: 15.4, label: '瓦工材料'},
            {value: 13.5, label: '木工材料'},
            {value: 10.4, label: '油工材料'},
            {value: 11.7, label: '水电材料'},
            {value: 11.4, label: '电器'},
            {value: 8.6, label: '家具'}],
          label: '',
          config: {
            colors: [processColor('#EFE08C'), processColor('#EFF79C'), processColor('#C0EF9C'), processColor('#9CEAEF'), processColor('#E0CF9C'), processColor('#6CFAFF')],
            valueTextSize: 14,
            valueTextColor: processColor('#666'),
            sliceSpace: 5,
            selectionShift: 13,
            valueFormatter: "#.#'%'",
          }
        }],
      },

      highlights: [{x:2}],

      description: {
        text: '总成本分析',
        textSize: 14,
        textColor: processColor('#666'),
      },
      description_material: {
        text: '材料成本分析',
        textSize: 14,
        textColor: processColor('#666'),
      }
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
              <Text style={styles.mainFont}>仅计算完工客户</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={{height:15}}>
        </View>

        <View>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            chartDescription={this.state.description}
            data={this.state.data}
            legend={this.state.legend}
            entryLabelColor={processColor('#666')}

            // chartBackgroundColor={processColor('pink')}
            // highlights={this.state.highlights}

            // entryLabelColor={processColor('green')}
            // entryLabelTextSize={20}
            // drawEntryLabels={true}

            // rotationEnabled={true}
            // rotationAngle={45}
            // usePercentValues={true}
            // styledCenterText={{text:'Pie center text!', color: processColor('pink'), size: 20}}
            // centerTextRadiusPercent={100}
            // holeRadius={40}
            // holeColor={processColor('#f0f0f0')}
            // transparentCircleRadius={45}
            // transparentCircleColor={processColor('#f0f0f088')}
            // maxAngle={350}
            // onSelect={this.handleSelect.bind(this)}
            // onChange={(event) => console.log(event.nativeEvent)}
          />

          <PieChart
            style={styles.chart}
            logEnabled={true}
            chartDescription={this.state.description_material}
            data={this.state.data_material}
            legend={this.state.legend}
            entryLabelColor={processColor('#666')}
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
    height:((height-180)/2),
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

export default ExpenseAnalysis;