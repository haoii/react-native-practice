
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class DateTimeInput extends Component {
  static defaultProps = {
    label: '时间',
    init_datetime: '2019-3-3 13:23:56',
    hint: '',

    onEndEditing: null,
  }

  constructor(props) {
    super(props);
    this.state = { 
      datetime:this.props.init_datetime,
    };
  }


  _innerOnEndEditing = (datetime) => {
    this.setState({datetime: datetime});
    if (this.props.onEndEditing)
      this.props.onEndEditing(datetime);
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
            date={this.state.datetime}
            mode="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            androidMode='spinner'
            // is24Hour={true}
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
    width: 200,
  },
  fontMain: {
    fontSize:16,
  },
  fontMinor: {
    fontSize:12,
  },

});