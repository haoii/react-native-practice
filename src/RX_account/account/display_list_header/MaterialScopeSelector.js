
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
          } from 'react-native';

import ChooseOneForm from '../../scope_selector_forms/ChooseOneForm';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class MaterialScopeSelector extends Component {
  static defaultProps = {
    onEndEditing: null,
  }

  constructor(props) {
    super(props);

    this.material_class_data = [];
    this._initMaterialClassData();

    this.state = { 
      material_class_data_ready: false,
    };
  }

  _initMaterialClassData = () => {
    fetch(URL.material_classes, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(responseJson => {
        this.material_class_data = responseJson.data;
        this.setState({material_class_data_ready: true});

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
              onEndEditing={this.props.onEndEditing} />}

        <View style={styles.timeSelectView}>
          <Text style={styles.mainFont}>2019年2月1日 - 至今 </Text>
        </View>
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
  mainFont: {
    fontSize:14,
  },
});