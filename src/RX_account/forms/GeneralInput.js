
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';

export default class GeneralInput extends Component {
  static defaultProps = {
    label: '',
    placeholder: '',
    unit: '',
    hint: '',
    max_length: 64,
    allow_empty: false,
    default_value_when_empty: '',  // valid when allow_empty is true
    onEndEditing: null,

    content_type: 'string',  // 'string', 'float', 'phone', 'integer'

    value_min: -10000000000,  // valid when conten_type is 'float' or 'integer'
    value_max: 10000000000,  // valid when conten_type is 'float' or 'integer'

    exclude_str: '',
  }

  constructor(props) {
    super(props);
    this.state = { 
      input_value:'',
      message:'',
      message_level:'info',
    };
  }

  _getKeyboardType = () => {
    if (this.props.content_type === 'string')
      return 'default';
    else if (this.props.content_type === 'float'
          || this.props.content_type === 'phone'
          || this.props.content_type === 'integer')
      return 'numeric';
  }

  _isNormalInteger = (str) => {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  }

  _validCheck = (value) => {
    if (this.props.content_type === 'float')
      return [(!isNaN(value) 
            && Number(value) < this.props.value_max 
            && Number(value) > this.props.value_min), '']; 
    else if (this.props.content_type === 'string') {
      for (let i=0, ex_str=this.props.exclude_str; i<ex_str.length; i++) {
        if (value.includes(ex_str[i]))
          return [false, '不能含有:'+ex_str];
      }
      return [true, ''];
    }
    else if (this.props.content_type === 'phone')
      return [this._isNormalInteger(value), ''];
    else if (this.props.content_type === 'integer')
      return [(this._isNormalInteger(value) 
           && Number(value) < this.props.value_max 
           && Number(value) > this.props.value_min), ''];      
  }

  _innerOnEndEditing = () => {
    input = this.state.input_value;
    if (input.length === 0) {
      if (this.props.allow_empty) {
        this.setState({
          message:'',
          message_level:'info',
        });
        if (this.props.onEndEditing)
          this.props.onEndEditing(true, this.props.default_value_when_empty);
      } else {
        this.setState({
          message:'必填项',
          message_level:'warnning',
        });
        if (this.props.onEndEditing)
          this.props.onEndEditing(false, '');
      }
    } else {
      let check_ret = this._validCheck(input);
      if (check_ret[0]) {
        this.setState({
          message:'',
          message_level:'info',
        });
        if (this.props.onEndEditing)
          this.props.onEndEditing(true, input);
      } else {
        this.setState({
          message:check_ret[1] || '请输入有效的值',
          message_level:'warnning',
        });
        if (this.props.onEndEditing)
          this.props.onEndEditing(false, '');
      }
    }
  }

  _getMessageColor = (level) => {
    if (level === 'info')
      return {color:'black'};
    else if (level === 'warnning')
      return {color:'red'};
  }

  _getFontColor = () => {
    if (this.props.allow_empty)
      return {color: 'gray'};
  }

  render() {
    return (
      <View style={styles.inputItemOutterView}>
        {this.state.message
          ? <Text style={[styles.fontMinor, this._getMessageColor(this.state.message_level)]}>
              {this.state.message}
            </Text>
          : null}
        <View style={styles.inputItemInnerView}>
          <View style={styles.inputItemLabelView}>
            <Text style={[styles.fontMain, this._getFontColor()]}>{this.props.label}</Text>
          </View>
          <View style={styles.inputItemcontentView}>
            <TextInput 
              style={styles.textInput}
              placeholder={this.props.placeholder} 
              value={this.state.input_value}
              keyboardType={this._getKeyboardType()}
              maxLength={this.props.max_length}
              onChangeText={(text) => this.setState({input_value: text})}
              onEndEditing={this._innerOnEndEditing}/>
            <Text style={[styles.fontMain, this._getFontColor()]}>{this.props.unit}</Text>
          </View>
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
  inputItemcontentView: {
    flexDirection:'row',
    alignItems:'center',
    // todo: 大段文字输入的处理
    maxWidth: 200,
  },
  fontMain: {
    fontSize:16,
  },
  fontMinor: {
    fontSize:12,
  },
  textInput: {
    minWidth:100, 
    textAlign:'right',
    // backgroundColor:'red',
    
  },

});