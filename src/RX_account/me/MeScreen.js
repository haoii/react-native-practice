
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import ListItem from '../baseComponent/ListItem';
import {ScreenSize} from '../Config';

export default class MeScreen extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    // this.list_data =

    this.state = { 
    };
  }

  render() {
    return (
      <View style={{width:ScreenSize.width,height:ScreenSize.height-75}}>
        <ListItem icon={<IconIonicons name="ios-add" size={30} color="#222222"/>} />
        <ListItem icon={<IconIonicons name="ios-add" size={30} color="#222222"/>} />
        <ListItem icon={<IconIonicons name="ios-add" size={30} color="#222222"/>} />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});