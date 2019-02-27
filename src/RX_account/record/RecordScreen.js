
import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

import RecordHeader from './RecordHeader';

// import PostList from './PostList';

const { width, height } = Dimensions.get('window');

export default class RecordScreen extends Component {
  render() {
    return (
      <View style={{width:width,height:height,paddingTop:25,paddingBottom:100,backgroundColor:'#fff'}}>
        <RecordHeader navigation={this.props.navigation}/>
        {/* <PostList navigation={this.props.navigation}/> */}
      </View>
    );
  }
}