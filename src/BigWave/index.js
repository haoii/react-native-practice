import React from 'react';
import { Button, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import ActivityScreen from './ActivityScreen';
import MeScreen from './MeScreen';

const MainBottomTab = createBottomTabNavigator(
  {
    广场: {
      screen: HomeScreen,
    },
    聊天: {
      screen: ChatScreen,
    },
    活动: {
      screen: ActivityScreen,
    },
    我: {
      screen: MeScreen,
    }  
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === '广场') {
          const iconName = `home${focused ? '' : '-outline'}`;
          return <IconMaterialCommunity name={iconName} size={25} color={tintColor} />;
        }
        if (routeName === '聊天') {
          const iconName = `message${focused ? '' : '-outline'}`;
          return <IconMaterialCommunity name={iconName} size={25} color={tintColor} />;
        }
        if (routeName === '活动') {
          const iconName = `search1${focused ? '' : ''}`;
          return <IconAnt name={iconName} size={25} color={tintColor} />;
        }
        if (routeName === '我') {
          const iconName = `person${focused ? '' : '-outline'}`;
          return <IconMaterial name={iconName} size={25} color={tintColor} />;
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
    }
  },
  {
    initialRouteName: 'MainBottomTab',
  }
));
