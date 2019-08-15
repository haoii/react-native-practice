
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

    this.material_class = null;

    this.state = { 
    };
  }

  _onEndChooseClass = (data) => {
    this.material_class = data;
    this.props.onEndEditing(data);
  }

  render() {
    return (
      <View style={{paddingHorizontal:10}}>
        <View style={styles.Line1View}>
          <ChooseOneForm label='类别' 
            onEndEditing={this._onEndChooseClass}
            gettingDataUrl={URL.material_classes}
            navigation={this.props.navigation} />

          <TouchableHighlight>
            <Text>add</Text>
          </TouchableHighlight>
          
        </View>

        <View style={styles.timeSelectView}>
          <Text style={styles.mainFont}>2019年2月1日 - 至今 </Text>
        </View>

      </View>);
  }
}

const styles = StyleSheet.create({
  Line1View: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"space-between",
  },
  timeSelectView:{
    paddingTop:5, 
    flexDirection:'row',
    alignItems:'center',

  },
  mainFont: {
    fontSize:14,
  },
});