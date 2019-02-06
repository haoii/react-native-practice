
import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

import SearchInput from './SearchInput';

import PostList from './PostList';

const { width, height } = Dimensions.get('window');

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={{width:width,height:height,paddingTop:25,backgroundColor:'#fff'}}>
        <SearchInput
          city={true}
          // navigation={this.props.navigation}
        />

        <PostList url='http://10.0.2.2:8000/square' navigation={this.props.navigation}/>
      </View>
    );
  }
}