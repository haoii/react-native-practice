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

const MainBottomTab = createBottomTabNavigator(
  {
    Hot: {
      screen: PlayList,
      navigationOptions: {
        header: null
      },
    },
    Search: {
      screen: PlayList,
      navigationOptions: {
        header: null
      },
    },
    Me: {
      screen: PlayList,
      navigationOptions: {
        header: null
      },
    } 
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Hot') {
          return <IconAwesome name="tv" size={20} color={tintColor}/>;
        } else if (routeName === 'Search') {
          return <IconAwesome name="eye" size={20} color={tintColor}/>;
        } else if (routeName === 'Me') {
          return <IconAwesome name="user" size={20} color={tintColor}/>;
        }
      },
      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let label;
        if (routeName === 'Hot') {
          label = '热映';
        } else if (routeName === 'Search') {
          label = '找片';
        } else if (routeName === 'Me') {
          label = '我的';
        }
        return <Text>{label}</Text>;
      }
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
    MainBottomTab: MainBottomTab,
    Detail: Detail
  },
  {
    initialRouteName: 'MainBottomTab',

    // headerMode: 'screen',
  }
));