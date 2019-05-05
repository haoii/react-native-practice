
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
          } from 'react-native';

import ChooseOneForm from '../../scope_selector_forms/ChooseOneForm';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class WarehouseHeader extends Component {
  static defaultProps = {
    onEndMaterialClassChoose: null,
    onEndWarehouseChoose: null,
  }

  constructor(props) {
    super(props);

    this.material_class_data = [];
    this._initMaterialClassData();

    this.warehouse_data = [];
    this._initWarehouseData();

    this.state = { 
      material_class_data_ready: false,
      warehouse_data_ready: false,
    };
  }

  _initMaterialClassData = () => {
    fetch(URL.material_classes)
      .then(response => response.json())
      .then(responseJson => {
        this.material_class_data = responseJson.material_classes;
        this.setState({material_class_data_ready: true});

      }).catch(error => {
        alert(error);
      });
  }

  _initWarehouseData = () => {
    fetch(URL.warehouses)
      .then(response => response.json())
      .then(responseJson => {
        this.warehouse_data = responseJson.all_warehouses.map(i => {return i.name;});
        this.setState({warehouse_data_ready: true});

      }).catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.material_class_data_ready
          ? <Text>正在获取材料类别列表...</Text>
          : <ChooseOneForm label='类别' 
              data={this.material_class_data} 
              onEndEditing={this.props.onEndMaterialClassChoose} />}

        <View style={styles.dividerView}></View>

        {!this.state.warehouse_data_ready
          ? <Text>正在获取仓库列表...</Text>
          : <ChooseOneForm label='仓库' 
              data={this.warehouse_data} 
              onEndEditing={this.props.onEndWarehouseChoose} />}
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    height:50,
    paddingHorizontal:10,
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
  dividerView: {
    height:25,
    width:0.5,
    backgroundColor:'#888888',
  },
  mainFont: {
    fontSize:14,
  },
});