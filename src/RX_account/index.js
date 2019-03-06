import React from 'react';
import { Button, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import RecordScreen from './record/RecordScreen';
import AccountScreen from './account/AccountScreen';
import StatisticScreen from './statistic/StatisticScreen';
import MeScreen from './me/MeScreen';

import RecordSelectSreen from './record/record_modals/RecordSelectSreen';
import AddCustomerForm from './record/record_modals/AddCustomerForm';
import AddSupplierForm from './record/record_modals/AddSupplierForm';
import CollectionFromCustomerForm from './record/record_modals/CollectionFromCustomerForm';


const MainBottomTab = createBottomTabNavigator(
  {
    记录: {
      screen: RecordScreen,
    },
    账单: {
      screen: AccountScreen,
    },
    统计: {
      screen: StatisticScreen,
    },
    我: {
      screen: MeScreen,
    }  
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === '记录') {
          const iconName = `watch-later${focused ? '' : ''}`;
          return <IconMaterialIcons name={iconName} size={25} color={tintColor} />;
        }
        if (routeName === '账单') {
          const iconName = `list${focused ? '' : ''}`;
          return <IconEntypo name={iconName} size={25} color={tintColor} />;
        }
        if (routeName === '统计') {
          const iconName = `chart-line${focused ? '' : ''}`;
          return <IconMaterialCommunity name={iconName} size={25} color={tintColor} />;
        }
        if (routeName === '我') {
          const iconName = `account-outline${focused ? '' : ''}`;
          return <IconMaterialCommunity name={iconName} size={25} color={tintColor} />;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#494949',
      inactiveTintColor: '#999999',
      labelStyle: {
        fontSize: 12,
        marginBottom: 5,
      },
      style: {
        borderTopWidth: 1,
        borderTopColor: '#c3c3c3',
        height: 50,
        backgroundColor: '#fff',
      },
    },
  },
);


export default createAppContainer(createStackNavigator(
  {
    MainBottomTab: {
      screen: MainBottomTab,
      navigationOptions: {
        header: null
      },
    },
    RecordSelectSreen: {
      screen: RecordSelectSreen,
      navigationOptions: {
        header: null
      },
    },
    AddCustomerForm: {
      screen: AddCustomerForm,
      navigationOptions: {
        header: null
      },
    },
    AddSupplierForm: {
      screen: AddSupplierForm,
      navigationOptions: {
        header: null
      },
    },
    CollectionFromCustomerForm: {
      screen: CollectionFromCustomerForm,
      navigationOptions: {
        header: null
      },
    },
  },
  {
    initialRouteName: 'MainBottomTab',
  }
));
