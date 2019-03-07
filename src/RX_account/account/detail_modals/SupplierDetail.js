
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
          } from 'react-native';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class ScopeSelector extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = { 
    };
  }


  render() {
    return (
      <View>
       
      </View>);
  }
}

const styles = StyleSheet.create({

});