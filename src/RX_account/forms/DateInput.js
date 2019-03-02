
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class GeneralInput extends Component {
  static defaultProps = {
    label: '日期',
    init_date: '2019-3-3',
    hint: '',

    onEndEditing: null,
  }

  constructor(props) {
    super(props);
    this.state = { 
      date:this.props.init_date,
    };
  }


  _innerOnEndEditing = (date) => {
    this.setState({date: date});
    if (this.props.onEndEditing)
      this.props.onEndEditing(date);
  }

  render() {
    return (
      <View style={styles.inputItemOutterView}>
        <View style={styles.inputItemInnerView}>
          <View style={styles.inputItemLabelView}>
            <Text style={styles.fontMain}>{this.props.label}</Text>
          </View>
          <DatePicker
            style={styles.DatePickerStyle}
            date={this.state.date}
            mode="date"
            format="YYYY-MM-DD"
            confirmBtnText="确认"
            cancelBtnText="取消"
            customStyles={{
              dateInput: {
                borderWidth: 0,
              }
            }}
            onDateChange={this._innerOnEndEditing}
          />
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
  DatePickerStyle: {
    width: 150,
  },
  fontMain: {
    fontSize:16,
  },
  fontMinor: {
    fontSize:12,
  },

});