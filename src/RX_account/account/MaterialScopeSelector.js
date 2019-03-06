
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
          } from 'react-native';

import ChooseOneInput from '../scope_selector_forms/ChooseOneForm';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class MaterialScopeSelector extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.material_class_data = [];
    this._initMaterialClassData();

    this.state = { 
    };
  }

  _initMaterialClassData = () => {
    fetch(URL.customers)
      .then(response => response.json())
      .then(responseJson => {
        let arrData = responseJson.latest_customers;
        this.customers_data = arrData.map(item => item.name + '(' + item.address + ')')
        this.setState({customers_data_ready:true});

      }).catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ChooseOneInput label='类别' 
          data={[{'瓦工主材': [{'砖类': ['瓷砖', '大理石']}]}, {'木工主材': [{'板材': ['密度板', '胶合板', '细木工板', '刨花板', '颗粒板', '石膏板']}, {'型材': ['木方']}, {'线材': ['指甲线', '外角线', '内角线', '踢脚线', '雕花线']}]}, {'油工主材': [{'无': ['无']}]}, {'水电主材': [{'电线': ['无']}]}, {'瓦工辅材': [{'黏合': ['水泥', '沙子', '石灰']}, {'涂料': ['防水涂料']}]}]} />

        <View style={styles.timeSelectView}>
          <Text style={styles.mainFont}>2019年2月1日 - 至今 </Text>
        </View>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    height:50,
    padding:10,
    borderBottomWidth: 0.5, 
    borderBottomColor: '#888888',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"space-between",
  },
  timeSelectView:{
    paddingLeft:20, 
    height:25,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    borderLeftWidth: 0.5, 
    borderLeftColor: '#888888',
  },
  mainFont: {
    fontSize:14,
  },
});