
import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

import SquareHeader from './SquareHeader';

import PostList from './PostList';

const { width, height } = Dimensions.get('window');

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={{width:width,height:height,paddingTop:25,paddingBottom:100,backgroundColor:'#fff'}}>
        <SquareHeader navigation={this.props.navigation}/>
        <PostList url='http://10.0.2.2:8000/square' navigation={this.props.navigation}/>
      </View>
    );
  }
}