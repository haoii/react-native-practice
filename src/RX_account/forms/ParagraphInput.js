
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';

export default class ParagraphInput extends Component {
  static defaultProps = {
    label: '',
    placeholder: '',
    hint: '',
    max_length: 512,
    allow_empty: false,
    default_value_when_empty: '',  // valid when allow_empty is true
    onEndEditing: null,
  }

  constructor(props) {
    super(props);
    this.state = { 
      input_value:'',
      message:'',
      message_level:'info',
    };
  }

  _innerOnEndEditing = (input) => {
    this.setState({input_value: input})
    // input = this.state.input_value;
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
      this.setState({
        message:'',
        message_level:'info',
      });
      if (this.props.onEndEditing)
        this.props.onEndEditing(true, input);
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

        <Text style={[styles.fontMain, this._getFontColor()]}>{this.props.label}</Text>

        <View style={styles.inputItemInnerView}>

          <TextInput 
            multiline={true}
            style={styles.textInput}
            placeholder={this.props.placeholder} 
            value={this.state.input_value}
            maxLength={this.props.max_length}
            onChangeText={this._innerOnEndEditing}
            // onChangeText={(text) => this.setState({input_value: text})}
            // onEndEditing={this._innerOnEndEditing}
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
    height:100,
    marginBottom:5,
    marginTop:5,
    padding:10,
  },
  inputItemLabelView: {
    flexDirection:'row'
  },

  fontMain: {
    fontSize:16,
    paddingLeft:10,
  },
  fontMinor: {
    fontSize:12,
  },
  textInput: {
    minWidth:200,     
  },

});