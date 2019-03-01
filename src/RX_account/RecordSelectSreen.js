
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { Input } from 'react-native-elements';

import URL from './Config';
import GeneralInput from './forms/GeneralInput';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class RecordSelectSreen extends Component {
  constructor(props) {
    super(props);
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

      price_value: '',
      price_comFlag: false,

      discount_value: '',
      discount_comFlag: false,
    };
  }

  _submitPost = () => {

    if (!this.state.post_text && !this.state.img_url.length) {
      alert('内容不能为空');
      return;
    }

    let formData = new FormData();
    formData.append("post_text", this.state.post_text);
    if (this.state.img_url) {
      // let file = {uri: this.state.img_url, type: 'multipart/form-data', name: 'image.png'};   
      // formData.append("files", file);   

      for(let i = 0; i < this.state.img_url.length; i++){
        let file = {uri: this.state.img_url[i], type: 'multipart/form-data', name: 'image.png'};   
        formData.append('image-'+i, file);  
      }
    }
    
    fetch(URL.submit_post,{
      method:'POST',
      headers:{
          'Content-Type':'multipart/form-data',
      },
      body:formData,
    })
    .then((response) => response.json())
    .then((ret)=>{
      let submit_status = ret.submit_status;
      console.log(submit_status);
      this.props.navigation.goBack();
    })
    .catch((error)=>{console.error(error)});
  }

  _checkComplete = () => {
    keys = Object.keys(this.state);
    for (let i = 0; i < keys.length; i++) 
      if (keys[i].length > 7 && keys[i].slice(-7) === 'comFlag') 
        if (!this.state[keys[i]]) 
          return false;
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableHighlight style={styles.cancelBtn}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableHighlight>

          <TouchableHighlight style={!this._checkComplete()?styles.btn:styles.activeBtn} onPress={this._submitPost}>
            <Text style={!this._checkComplete()?styles.btnText:styles.activeBtnText}>发布</Text>
          </TouchableHighlight>
        </View>

        <ScrollView contentContainerStyle={styles.content}>

          <GeneralInput 
            label='客户名' max_length={64} 
            onEndEditing={(isValid, value) => {
              this.setState({
                customer_name_comFlag: isValid,
                customer_name_value: value,
              });}} />
          <GeneralInput 
            label='地址' max_length={256} 
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
                price_comFlag: isValid,
                price_value: num,
              });}} />
          <GeneralInput 
            label='折扣' placeholder='0.0' unit='' hint='提示：1到10之间' 
            content_type='float' value_min={1} value_max={10}
            onEndEditing={(isValid, num) => {
              this.setState({
                discount_comFlag: isValid,
                discount_value: num,
              });}} />
          <GeneralInput />


        </ScrollView>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({

  content: {
    paddingLeft:15,
    paddingRight:15,
  },

  container:{
    padding:15,
    height:size.height,
    backgroundColor: '#d3d3d3',//"#ffffff",
    justifyContent:'flex-start'
  },
  headerContainer:{
    paddingBottom:30,
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