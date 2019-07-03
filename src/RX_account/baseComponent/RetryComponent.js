
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        Button } from 'react-native';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class RetryComponent extends Component {
  static defaultProps = {
    hint: '出错了~',
    retryFunc: null,
    style:null,
  }

  constructor(props) {
    super(props);
    this.state = { 
    };
  }


  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.hintText}>{this.props.hint}</Text>
        
        <View style={styles.buttonStyle}>
          <Button 
            onPress={this.props.retryFunc} 
            title='刷新重试'/>
        </View>
        
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintText: {
    // backgroundColor:'blue'
    margin:20,
  },
  buttonStyle: {
    // width: 100,
    // height:30,
    margin:20,
  }
});