
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
          } from 'react-native';
import Picker from 'react-native-picker';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class GeneralInput extends Component {
  static defaultProps = {
    label: '',
    hint: '',
    data: [0, 1, 2],

    onEndEditing: null,
  }

  constructor(props) {
    super(props);
    this.state = { 
      chosen_data: '',
    };

    this._initPicker();
  }

  _initPicker = () => {
    Picker.init({
      pickerData: this.props.data,
      onPickerConfirm: data => {
        this.setState({
          chosen_data:data[0]
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

  _chosenPopup2 = () => {
    let data = [];
    for(var i=0;i<100;i++){
        
        data2 = [];
        for (let j=0; j<3; j++) {
          data2.push(j);
        }

        let _data = {};
        _data[i] = data2;
        data.push(_data);
    }

    Picker.init({
        pickerData: data,
        // selectedValue: [59, 1],
        onPickerConfirm: data => {
            this.setState({chosen_data:data[0]});
        },
    });
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
            <Text>{this.state.chosen_data}</Text>
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