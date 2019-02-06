import React from 'react';
import { Button, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import PlayList from './PlayList';
import Detail from './Detail';
import Me from './Me';

const MainBottomTab = createBottomTabNavigator(
  {
    热映: {
      screen: PlayList,
    },
    找片: {
      screen: PlayList,
    },
    我的: {
      screen: Me,
    } 
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === '热映') {
          return <IconAwesome name="tv" size={20} color={tintColor}/>;
        } else if (routeName === '找片') {
          return <IconAwesome name="eye" size={20} color={tintColor}/>;
        } else if (routeName === '我的') {
          return <IconAwesome name="user" size={20} color={tintColor}/>;
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
        backgroundColor:'#fff'
      },
    }
  }
);


export default createAppContainer(createStackNavigator(
  {
    MainBottomTab: {
      screen: MainBottomTab,
      navigationOptions: {
        header: null
      },
    },
    Detail: Detail
  },
  {
    initialRouteName: 'MainBottomTab',

    // headerMode: 'screen',
  }
));
