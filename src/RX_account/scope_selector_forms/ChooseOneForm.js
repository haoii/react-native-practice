
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
    justifyContent: 'flex-start',

    onEndEditing: null,
    gettingDataUrl: '',
  }

  constructor(props) {
    super(props);
    this.state = { 
      chosen_data: [''],
    };

  }

  _initPicker = () => {
    fetch(this.props.gettingDataUrl, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          Picker.init({
            pickerData: responseJson.data,
            onPickerConfirm: data => {
              this.setState({
                chosen_data:data
              });
              if (this.props.onEndEditing)
                this.props.onEndEditing(data)
            },
            pickerFontSize: 14,
            pickerTextEllipsisLen: 10,
          });
          Picker.show();
        } else if (responseJson.msg === 'not_logged_in') {
          this.props.navigation.navigate('LoginScreen');
        } else {
          alert('出现未知错误');
        }

      }).catch(error => {
        alert('服务器出错了');
      });
    
  }

  _chosenPopup = () => {
    this._initPicker();
  }

  render() {
    return (
      <TouchableHighlight style={[styles.touchableView, {justifyContent: this.props.justifyContent}]} onPress={this._chosenPopup}>
        <View style={[styles.inputItemInnerView, {justifyContent: this.props.justifyContent}]}>
          <Text style={styles.fontMain}>{this.props.label}：</Text>

          <Text style={styles.fontChosen}>{this.state.chosen_data.join(' - ')}</Text>
        </View>
      </TouchableHighlight>);
  }
}

const styles = StyleSheet.create({

  inputItemInnerView: {
    flexDirection:'row',
    alignItems:'center',
  },

  fontMain: {
    fontSize:14,
  },
  fontChosen: {
    fontSize:14,
    backgroundColor:'#d3d3d3',
    borderRadius:5,
  },
  touchableView: {
    minWidth:100,
    flexDirection:'row',
    alignItems:'center',
  },

});