
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { Input } from 'react-native-elements';

import URL from '../../Config';
import GeneralInput from '../../forms/GeneralInput';
import DateInput from '../../forms/DateInput';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class RecordSelectSreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableHighlight style={styles.backIcon}
            onPress={() => this.props.navigation.goBack()}>
            <IconIonicons name='ios-arrow-back' size={25} />
          </TouchableHighlight>
        </View>

        <View style={styles.classContainer}>
          <Text style={styles.classTitleText}>添加</Text>
          <View style={styles.classContentContainer}>
            <View style={styles.classLineContainer}>
              <TouchableHighlight 
                onPress={() => this.props.navigation.navigate('AddCustomerForm')}>
                <View style={styles.itemTouchable}>
                  <IconIonicons name='ios-person-add' size={40} color='#2aa2ef' />
                  <Text>添加客户</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight 
                onPress={() => this.props.navigation.navigate('AddSupplierForm')}>
                <View style={styles.itemTouchable}>
                  <IconEntypo name='shop' size={40} color='#2aa2ef' />
                  <Text>添加材料商</Text>
                </View>
              </TouchableHighlight>
              
            </View>
            <View style={styles.classLineContainer}>
              <TouchableHighlight >
                <View style={styles.itemTouchable}>
                  <IconIonicons name='ios-person-add' size={40} />
                  <Text>添加客户</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight >
                <View style={styles.itemTouchable}>
                  <IconEntypo name='shop' size={40} />
                  <Text>添加材料商</Text>
                </View>
              </TouchableHighlight>
              
            </View>
          </View>
        </View>

        <View style={styles.classContainer}>
          <Text style={styles.classTitleText}>收付款</Text>
          <View style={styles.classContentContainer}>
            <View style={styles.classLineContainer}>
              <TouchableHighlight 
                onPress={() => this.props.navigation.navigate('CollectionFromCustomerForm')}>
                <View style={styles.itemTouchable}>
                  <IconMaterialIcons name='attach-money' size={40} color='#2aa2ef' />
                  <Text>收客户款</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight >
                <View style={styles.itemTouchable}>
                  <IconMaterialIcons name='payment' size={40} />
                  <Text>支付材料商</Text>
                </View>
              </TouchableHighlight>
              
            </View>
          </View>
        </View>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    height:size.height,
    backgroundColor: '#F5F5F5',
    justifyContent:'flex-start'
  },
  headerContainer:{
    height:45,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 6, 
    borderBottomColor: '#F5F5F5'
  },
  backIcon: {
    height:45,
    width:50,
    justifyContent:'center',
    alignItems:'center',
  },

  classContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 6, 
    borderBottomColor: '#F5F5F5'
  },
  classTitleText: {
    fontSize:16,
  },
  classContentContainer: {
  },
  classLineContainer: {
    flexDirection:'row',
    justifyContent:'flex-start',
  },
  itemTouchable: {
    width:(size.width - 30) / 4,
    height:80,
    justifyContent:'center',
    alignItems:'center',
  },
});