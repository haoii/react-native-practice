
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

    this.state = { 

    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ChooseOneForm label='类别' 
          onEndEditing={this.props.onEndMaterialClassChoose}
          gettingDataUrl={URL.material_classes}
          navigation={this.props.navigation} />

        <View style={styles.dividerView}></View>

        <ChooseOneForm label='仓库' 
          onEndEditing={this.props.onEndWarehouseChoose}
          gettingDataUrl={URL.warehouses}
          navigation={this.props.navigation} />
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