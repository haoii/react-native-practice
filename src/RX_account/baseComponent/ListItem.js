
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, 
          } from 'react-native';


export default class ListItem extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = { 
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconView}>{this.props.icon}</View>
        <View style={styles.itemContainer}>
          <Text>title</Text>
          <Text>data</Text>
          <Text>></Text>
        </View>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    height: 50,
    alignItems:'center',
    justifyContent:'space-between',
  },
  iconView:{
    width:50,
  },

  itemContainer: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
});