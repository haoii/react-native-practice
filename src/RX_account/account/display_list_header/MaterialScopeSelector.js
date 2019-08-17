
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
          } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

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
      <View style={{paddingHorizontal:10, paddingVertical:5}}>
        <View style={styles.Line1View}>
          <ChooseOneForm label='类别' 
            onEndEditing={this._onEndChooseClass}
            gettingDataUrl={URL.material_classes}
            navigation={this.props.navigation} />

          <TouchableHighlight 
            onPress={() => {
              if (this.material_class) 
                this.props.navigation.navigate('AddMaterial', {
                  material_class: this.material_class,
                });
            }}
            style={[styles.touchableView, {paddingHorizontal:10, justifyContent:'center'}]}>
            <View style={[styles.touchableContentView, {justifyContent:'center'}]}>
              <IconIonicons name="ios-add" size={20} />
            </View>
          </TouchableHighlight>
          
        </View>

        <TouchableHighlight 
          onPress={() => {}}
          style={[styles.touchableView]}>
          <View style={[styles.touchableContentView]}>
            <Text style={styles.mainFont}>2019年2月1日 - 至今 </Text>
          </View>
        </TouchableHighlight>


      </View>);
  }
}

const styles = StyleSheet.create({
  Line1View: {
    flexDirection:'row',
    alignItems:'center',
  },
  timeSelectView:{
    paddingVertical:5, 
    flexDirection:'row',
    alignItems:'center',

  },
  mainFont: {
    fontSize:14,
  },

  touchableView: {
    paddingVertical:5,
    flexDirection:'row',
    alignItems:'center',
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