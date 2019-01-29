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

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen }
  },
  {
    initialRouteName: 'Home',

    headerMode: 'none',
    defaultNavigationOptions: {
      headerVisible: false,
    }
  }
);

const ChatStack = createStackNavigator(
  {
    Chat: { screen: ChatScreen }
  }
);

const ActivityStack = createStackNavigator(
  {
    Activity: { screen: ActivityScreen }
  }
);

const MeStack = createStackNavigator(
  {
    Me: { screen: MeScreen }
  }
);

export default createAppContainer(createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Chat: { screen: ChatStack },
    Activity: { screen: ActivityStack },
    Me: { screen: MeStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home${focused ? '' : '-outline'}`;
          return <IconMaterialCommunity name={iconName} size={25} color={tintColor} />;
        } else if (routeName === 'Chat') {
          iconName = `message${focused ? '' : '-outline'}`;
          return <IconMaterialCommunity name={iconName} size={25} color={tintColor} />;
        } else if (routeName === 'Activity') {
          iconName = `search1${focused ? '' : ''}`;
          return <IconAnt name={iconName} size={25} color={tintColor} />;
        } else if (routeName === 'Me') {
          iconName = `person${focused ? '' : '-outline'}`;
          return <IconMaterial name={iconName} size={25} color={tintColor} />;
        }
      },
      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let label;
        if (routeName === 'Home') {
          label = '广场';
        } else if (routeName === 'Chat') {
          label = '聊天';
        } else if (routeName === 'Activity') {
          label = '活动';
        } else if (routeName === 'Me') {
          label = '我';
        }

        return <Text>{label}</Text>;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
));
