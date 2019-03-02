
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

export default class AddCustomerForm extends Component {
  constructor(props) {
    super(props);

    this.ready_to_commit = false;

    this.state = { 
      img_url: [],
      post_text: '',

      customer_name_value: '',
      customer_name_comFlag: false,

      address_value: '',
      address_comFlag: false,

      phone_value: '',
      phone_comFlag: true,

      duration_value: '60',
      duration_comFlag: true,

      total_price_value: '',
      total_price_comFlag: false,

      discount_value: '',
      discount_comFlag: false,

      area_value: '',
      area_comFlag: true,

      sign_date: this._getCurDate(),
    };
  }

  _getCurDate = () => {
    let t = new Date();
    return '' + t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate();
  }

  _submitPost = () => {

    // a=[[5,'df'],[4,'se'],[2,'zr']];
    // a.sort((v1,v2) => {return v1 < v2? 1:-1});
    // alert(a);

    // return;

    if (!this.ready_to_commit)
      return;

    let formData = new FormData();
    formData.append("name", this.state.customer_name_value);
    formData.append("address", this.state.address_value);
    formData.append("sign_date", this.state.sign_date);
    formData.append("duration", this.state.duration_value);
    formData.append("phone", this.state.phone_value);
    formData.append("area", this.state.area_value);
    formData.append("total_price", this.state.total_price_value);
    formData.append("price_discount", this.state.discount_value);
    
    fetch(URL.submit_add_customer,{
      method:'POST',
      body:formData,
    })
    .then((response) => response.text())
    .then((ret)=>{
      if (ret !== 'success')
        alert(ret);
      else
        this.props.navigation.goBack();
    })
    .catch((error)=>{alert(error)});
  }

  _checkComplete = () => {
    keys = Object.keys(this.state);
    for (let i = 0; i < keys.length; i++) 
      if (keys[i].length > 7 && keys[i].slice(-7) === 'comFlag') 
        if (!this.state[keys[i]]) {
          this.ready_to_commit = false;
          return false;
        }
    this.ready_to_commit = true;
    return true;
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.headerContainer}>
          <TouchableHighlight style={styles.cancelBtn}
            onPress={() => this.props.navigation.navigate('MainBottomTab')}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableHighlight>

          <TouchableHighlight style={!this._checkComplete()?styles.btn:styles.activeBtn} onPress={this._submitPost}>
            <Text style={!this._checkComplete()?styles.btnText:styles.activeBtnText}>确认</Text>
          </TouchableHighlight>
        </View>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} style={styles.keyboardAvoiding} enabled>
          <ScrollView contentContainerStyle={styles.ScrollViewStyle}>

            <View style={styles.Canvas}>
              <GeneralInput 
                label='客户名' max_length={64} 
                onEndEditing={(isValid, value) => {
                  this.setState({
                    customer_name_comFlag: isValid,
                    customer_name_value: value,
                  });}} />
              <GeneralInput 
                label='地址' max_length={256} hint='注意：地址提交后不可更改！'
                onEndEditing={(isValid, value) => {
                  this.setState({
                    address_comFlag: isValid,
                    address_value: value,
                  });}} />
              <GeneralInput 
                label='电话' max_length={16} 
                allow_empty={true} 
                content_type='phone'
                onEndEditing={(isValid, value) => {
                  this.setState({
                    phone_comFlag: isValid,
                    phone_value: value,
                  });}} />
              <DateInput 
                label='签单日期' init_date={this.state.sign_date}
                onEndEditing={(date) => {
                  this.setState({
                    sign_date: date,
                  })}}/>      
              <GeneralInput 
                label='工期' placeholder='60' unit='天'
                allow_empty={true} default_value_when_empty='60'
                content_type='integer' value_min={1}
                onEndEditing={(isValid, value) => {
                  this.setState({
                    duration_comFlag: isValid,
                    duration_value: value,
                  });}} />
              <GeneralInput 
                label='总报价' placeholder='0.00' unit='元' 
                content_type='float' value_min={0}
                onEndEditing={(isValid, num) => {
                  this.setState({
                    total_price_comFlag: isValid,
                    total_price_value: num,
                  });}} />
              <GeneralInput 
                label='折扣' placeholder='0.0' unit='' hint='提示：1到10之间' 
                content_type='float' value_min={1} value_max={10}
                onEndEditing={(isValid, num) => {
                  this.setState({
                    discount_comFlag: isValid,
                    discount_value: num,
                  });}} />
              <GeneralInput 
                label='面积' unit='平方'
                allow_empty={true}
                content_type='float' value_min={0}
                onEndEditing={(isValid, value) => {
                  this.setState({
                    area_comFlag: isValid,
                    area_value: value,
                  });}} />
            
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({

  ScrollViewStyle: {
    paddingLeft:15,
    paddingRight:15,
    // flexGrow:1,
  },
  keyboardAvoiding: {
    height:size.height-80,
  },
  Canvas: {
    paddingTop:15,
    paddingBottom:50
  },

  container:{
    padding:15,
    height:size.height,
    backgroundColor: '#F5F5F5',
    justifyContent:'flex-start',
  },
  headerContainer:{
    height:50,
    paddingBottom:15,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  cancelBtn:{
    height:35,
    width:60,
    alignItems:'flex-start',
    justifyContent:"center",
    borderRadius:6,
  },
  btn:{
    height:35,
    width:60,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:6,
    borderColor:"#ccd6dd",
    backgroundColor:'#6699cc',
    borderWidth:1
  },
  activeBtn:{
    height:35,
    width:60,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:6,
    backgroundColor:"#2aa2ef"
  },
  cancelText:{
    color:"#3B3B3B",
    fontSize:18
  },
  text:{
    color:"#ccd6dd",
    fontSize:18
  },
  btnText:{
    color:"#ccd6dd",
    fontSize:14
  },
  activeBtnText:{
    color:"#fff",
    fontSize:14
  },
});