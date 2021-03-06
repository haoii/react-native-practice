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
import SupplierDetail from './account/detail_modals/SupplierDetail';
import MaterialOrderDetail from './account/detail_modals/MaterialOrderDetail';
import PlaceOrderForm from './record/record_modals/PlaceOrderForm';
import AddOrderDemandItemForm from './record/record_modals/AddOrderDemandItemForm';
import AddOrderPurchaseItemForm from './record/record_modals/AddOrderPurchaseItemForm';
import CustomerDetail from './account/detail_modals/CustomerDetail';
import OrderReceiptsGenerator from './record/record_modals/OrderReceiptsGenerator';
import MaterialOrderReceiptsDetail from './account/detail_modals/MaterialOrderReceiptsDetail';

import AddClass1Form from './account/display_list/MaterialClassesManage/AddClass1Form';
import AddClass2Form from './account/display_list/MaterialClassesManage/AddClass2Form';
import AddClass3Form from './account/display_list/MaterialClassesManage/AddClass3Form';
import AddMaterial from './account/display_list/MaterialManage/AddMaterial';
import AddMaterialInSupplier from './account/display_list/SupplierManage/AddMaterialInSupplier';

import AddMemo from './record/record_modals/AddMemo';
import AddBuildRecord from './account/display_list/CustomerManage/AddBuildRecord';


import LoginScreen from './me/LoginScreen';

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
          const iconName = `chart-donut${focused ? '' : ''}`;
          return <IconMaterialCommunity name={iconName} size={25} color={tintColor} />;
        }
        if (routeName === '账单') {
          const iconName = `list${focused ? '' : ''}`;
          return <IconEntypo name={iconName} size={28} color={tintColor} />;
        }
        if (routeName === '统计') {
          const iconName = `barschart${focused ? '' : ''}`;
          return <IconAnt name={iconName} size={26} color={tintColor} />;
        }
        if (routeName === '我') {
          const iconName = `user${focused ? '' : ''}`;
          return <IconAnt name={iconName} size={25} color={tintColor} />;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#039BE5',
      inactiveTintColor: '#000',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        borderTopWidth: 0.5,
        borderTopColor: '#c3c3c3',
        height: 55,
        backgroundColor: '#f8f8f8',
        paddingVertical:4,
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
    PlaceOrderForm: {
      screen: PlaceOrderForm,
      navigationOptions: {
        header: null
      },
    },
    AddOrderDemandItemForm: {
      screen: AddOrderDemandItemForm,
      navigationOptions: {
        header: null
      },
    },
    AddOrderPurchaseItemForm: {
      screen: AddOrderPurchaseItemForm,
      navigationOptions: {
        header: null
      },
    },
    
    SupplierDetail: {
      screen: SupplierDetail,
      navigationOptions: {
        header: null
      },
    },
    MaterialOrderDetail: {
      screen: MaterialOrderDetail,
      navigationOptions: {
        header: null
      },
    },
    CustomerDetail: {
      screen: CustomerDetail,
      navigationOptions: {
        header: null
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      },
    },
    OrderReceiptsGenerator: {
      screen: OrderReceiptsGenerator,
      navigationOptions: {
        header: null
      },
    },
    MaterialOrderReceiptsDetail: {
      screen: MaterialOrderReceiptsDetail,
      navigationOptions: {
        header: null
      },
    },
    AddClass1Form: {
      screen: AddClass1Form,
      navigationOptions: {
        header: null
      },
    },
    AddClass2Form: {
      screen: AddClass2Form,
      navigationOptions: {
        header: null
      },
    },
    AddClass3Form: {
      screen: AddClass3Form,
      navigationOptions: {
        header: null
      },
    },
    AddMaterial: {
      screen: AddMaterial,
      navigationOptions: {
        header: null
      },
    },
    AddMaterialInSupplier: {
      screen: AddMaterialInSupplier,
      navigationOptions: {
        header: null
      },
    },
    AddMemo: {
      screen: AddMemo,
      navigationOptions: {
        header: null
      },
    },
    AddBuildRecord: {
      screen: AddBuildRecord,
      navigationOptions: {
        header: null
      },
    },
  },
  {
    initialRouteName: 'MainBottomTab',
    defaultNavigationOptions: {
      headerStyle: {
        height: 45,
      },
      headerTitleStyle: {
        fontSize: 16,
      },
    },
  }
));
