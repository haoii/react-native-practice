
import React, {Component} from 'react';
import {Dimensions, View, Text} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

const { width, height } = Dimensions.get('window');

import CustomerList from './display_list/CustomerList';
import SupplierList from './display_list/SupplierList';
import MaterialList from './display_list/MaterialList';

export default class AccountScreen extends Component {

  render() {
    return (
      <View style={{width:width,height:height-30,paddingTop:10,backgroundColor:'#fff'}}>

        <ScrollableTabView 
          renderTabBar={() => <ScrollableTabBar/> } 
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
          <View tabLabel='客户' style={{marginBottom:50}}>
            <CustomerList />
          </View>
          <View tabLabel='材料商' style={{marginBottom:50}}>
            <SupplierList />
          </View>
          <View tabLabel='材料' style={{marginBottom:50}}>
            <MaterialList />
          </View>
          <View tabLabel='工人' style={{marginBottom:50}}>
            <Text>hhh</Text>
          </View>
          <View tabLabel='仓库' style={{marginBottom:50}}>
            <Text>hhh</Text>
          </View>
        </ScrollableTabView>

      </View>
    );
  }
}