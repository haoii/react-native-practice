
import React, {Component} from 'react';
import {Dimensions, View, Text} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

const { width, height } = Dimensions.get('window');

import CustomerList from './display_list/CustomerList';
import SupplierList from './display_list/SupplierList';
import MaterialList from './display_list/MaterialList';
import MaterialOrderList from './display_list/MaterialOrderList';
import WarehouseList from './display_list/WarehouseList';

export default class AccountScreen extends Component {

  render() {
    return (
      <View style={{width:width,height:height-75}}>

        <ScrollableTabView 
          renderTabBar={() => <ScrollableTabBar style={{borderWidth:0}}/> } 
          tabBarUnderlineStyle={{
            backgroundColor: '#E4572E',
            height: 2,
            // width: 50,
            // alignItems:'center',
            // justifyContent: 'center',
          }} 
          tabBarBackgroundColor='#fff' 
          tabBarActiveTextColor='#E4572E' 
          tabBarInactiveTextColor='#1b1725' 
          tabBarTextStyle={{ fontSize: 14 }}
          locked={false}
        >
          <View tabLabel='客户' style={{backgroundColor:'#f4f4f4'}}>
            <CustomerList navigation={this.props.navigation} />
          </View>
          <View tabLabel='材料商' style={{backgroundColor:'#f4f4f4'}}>
            <SupplierList navigation={this.props.navigation} />
          </View>
          <View tabLabel='材料' style={{backgroundColor:'#f4f4f4'}}>
            <MaterialList navigation={this.props.navigation} />
          </View>
          <View tabLabel='材料订单' style={{backgroundColor:'#f4f4f4'}}>
            <MaterialOrderList navigation={this.props.navigation} />
          </View>
          <View tabLabel='工人' style={{marginBottom:50}}>
            <Text>hhh</Text>
          </View>
          <View tabLabel='仓库' style={{backgroundColor:'#f4f4f4'}}>
            <WarehouseList navigation={this.props.navigation} />
          </View>
        </ScrollableTabView>

      </View>
    );
  }
}