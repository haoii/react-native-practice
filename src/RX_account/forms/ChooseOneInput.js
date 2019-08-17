
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
    hint: '',
    data: [0, 1, 2],
    pickerTitleText: '选择',
    wheelFlex: [1,1,1],
    showLastData: false,

    onEndEditing: null,
  }

  constructor(props) {
    super(props);
    this.state = { 
      chosen_data: [''],
    };
  }

  _initPicker = () => {
    Picker.init({
      pickerData: this.props.data,
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: this.props.pickerTitleText,
      wheelFlex: this.props.wheelFlex,
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
  }

  _chosenPopup = () => {
    this._initPicker();
    Picker.show();
  }

  render() {
    return (
      <View style={styles.inputItemOutterView}>
        <View style={styles.inputItemInnerView}>
          <View style={styles.inputItemLabelView}>
            <Text style={styles.fontMain}>{this.props.label}</Text>
          </View>

          <TouchableHighlight style={styles.touchableView} onPress={this._chosenPopup}>
            <Text>{(() => {
              if (this.props.showLastData)
                return this.state.chosen_data[2];
              else
                return this.state.chosen_data.join(' - ');
            })()}</Text>
          </TouchableHighlight>

        </View>
        {this.props.hint
          ? <Text style={styles.fontMinor}>{this.props.hint}</Text>
          : null}
      </View>);
  }
}

const styles = StyleSheet.create({


  inputItemOutterView: {
    paddingBottom:10,
    alignItems:'stretch',
  },
  inputItemInnerView: {
    backgroundColor:'white',
    borderRadius:5,
    height:50,
    marginBottom:5,
    marginTop:5,
    flexDirection:'row',
    paddingLeft:10,
    paddingRight:10,
    justifyContent:'space-between',
    alignItems:'center',
  },
  inputItemLabelView: {
    flexDirection:'row'
  },
  fontMain: {
    fontSize:16,
  },
  fontMinor: {
    fontSize:12,
  },

  touchableView: {
    maxWidth:200,
    minWidth:100,
    height:50,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
  },

});