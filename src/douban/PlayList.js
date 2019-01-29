
import React, {Component} from 'react';
import {Dimensions, View, Text} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import SearchInput from './SearchInput';
import HotList from './HotList';

const { width, height } = Dimensions.get('window');

export default class Playlist extends Component {
  // static navigationOptions = {
  //   header: null
  // };
  
  render() {
    return (
      <View style={{width:width,height:height,paddingTop:25,backgroundColor:'#fff'}}>
        <SearchInput
          city={true}
          // navigation={this.props.navigation}
        />

        <ScrollableTabView 
          renderTabBar={() => <DefaultTabBar/> } 
          tabBarUnderlineStyle={{
            backgroundColor: '#000',
            height: 2
          }} 
          tabBarBackgroundColor='#FFFFFF' 
          tabBarActiveTextColor='#000' 
          tabBarInactiveTextColor='#959595' 
          tabBarTextStyle={{ fontSize: 14 }}
          locked={false}
        >
          <View tabLabel='正在热映' style={{marginBottom:50}}>
            <HotList url='https://api.douban.com/v2/movie/in_theaters' navigation={this.props.navigation}/>
          </View>
          <View tabLabel='即将上映' style={{marginBottom:50}}>
            <HotList url='https://api.douban.com/v2/movie/coming_soon' navigation={this.props.navigation}/>
          </View>
        </ScrollableTabView>

      </View>
    );
  }
}