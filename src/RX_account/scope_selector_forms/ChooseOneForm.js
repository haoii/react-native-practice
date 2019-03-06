
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
          } from 'react-native';
import Picker from 'react-native-picker';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class ChooseOneInput extends Component {
  static defaultProps = {
    label: '',
    data: [0, 1, 2],

    onEndEditing: null,
  }

  constructor(props) {
    super(props);
    this.state = { 
      chosen_data: [''],
    };

    this._initPicker();
  }

  _initPicker = () => {
    Picker.init({
      pickerData: this.props.data,
      onPickerConfirm: data => {
        this.setState({
          chosen_data:data
        });
        if (this.props.onEndEditing)
          this.props.onEndEditing(data[0])
      },
      pickerFontSize: 14,
      pickerTextEllipsisLen: 10,
    });
  }

  _chosenPopup = () => {
    Picker.show();
  }

  render() {
    return (
      <TouchableHighlight style={styles.touchableView} onPress={this._chosenPopup}>
        <View style={styles.inputItemInnerView}>
          <Text style={styles.fontMain}>{this.props.label}：</Text>

          <Text style={styles.fontChosen}>{this.state.chosen_data.join(' - ')}</Text>
        </View>
      </TouchableHighlight>);
  }
}

const styles = StyleSheet.create({

  inputItemInnerView: {
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },

  fontMain: {
    fontSize:14,
  },
  fontChosen: {
    fontSize:14,
    backgroundColor:'#efefef',
    borderRadius:5,
  },
  touchableView: {
    minWidth:80,
    height:25,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },

});