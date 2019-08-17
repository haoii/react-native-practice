
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { Input } from 'react-native-elements';

import URL from '../../Config';
import GeneralInput from '../../forms/GeneralInput';
import DateInput from '../../forms/DateInput';
import ChooseOneInput from '../../forms/ChooseOneInput';
import InputPlaceholder from '../../forms/InputPlaceholder';
import ParagraphInput from '../../forms/ParagraphInput';
import Label from '../../forms/Label';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class CollectionFromCustomerForm extends Component {
  constructor(props) {
    super(props);

    this.ready_to_commit = false;
    
    this.specified_customer = this.props.navigation.getParam('specified_customer', '');
    let customer_name_comFlag = true;
    if (!this.specified_customer) {
      customer_name_comFlag = false;
      
      this.customers_data = [];
      this._initCustomerNameData();
    }

    this.state = { 

      customer_name_value: this.specified_customer,
      customer_name_comFlag: customer_name_comFlag,

      amount_value: '',
      amount_comFlag: false,

      remark_value: '',
      remark_comFlag: true,

      collect_date: this._getCurDate(),

      customers_data_ready: false,
    };
  }

  _getCurDate = () => {
    return new Date().toISOString().slice(0,10);
  }

  _initCustomerNameData = () => {
    fetch(URL.customers_table_by_date, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          if (responseJson.data.length === 0) {
            alert('还没有客户数据~');
            this.props.navigation.goBack();
          } else {
            this.customers_data = responseJson.data;
            this.setState({customers_data_ready:true});
          }
        } else if (responseJson.msg === 'not_logged_in') {
          alert('您还没有登录~');
          this.props.navigation.goBack();
        } else {
          alert('出现未知错误');
          this.props.navigation.goBack();
        }

      }).catch(error => {
        alert('服务器出错了');
        this.props.navigation.goBack();
      });
  }

  _submitPost = () => {

    if (!this.ready_to_commit)
      return;

    let formData = new FormData();
    formData.append("customer", this.state.customer_name_value);
    formData.append("collect_date", this.state.collect_date);
    formData.append("amount", this.state.amount_value);
    formData.append("remark", this.state.remark_value);
    
    fetch(URL.submit_collect_from_customer,{
      method:'POST',
      body:formData,
      credentials: 'same-origin',
    })
    .then((response) => response.json())
    .then((responseJson)=>{
      if (responseJson.msg === 'success') {
        this.props.navigation.navigate('MainBottomTab');
      }  else if (responseJson.msg === 'not_logged_in') {
        alert('您还没有登录~');
        this.props.navigation.navigate('MainBottomTab');
      } else {
        alert('出现未知错误');
        this.props.navigation.navigate('MainBottomTab');
      }

    }).catch((error) => {
      alert('服务器出错了');
      // this.props.navigation.navigate('MainBottomTab');
    });
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
            onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableHighlight>

          <TouchableHighlight style={!this._checkComplete()?styles.btn:styles.activeBtn} onPress={this._submitPost}>
            <Text style={!this._checkComplete()?styles.btnText:styles.activeBtnText}>确认</Text>
          </TouchableHighlight>
        </View>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} style={styles.keyboardAvoiding} enabled>
          <ScrollView contentContainerStyle={styles.ScrollViewStyle}>
            <View style={styles.Canvas}>

              {/* {!this.state.customers_data_ready
                ? <InputPlaceholder label='客户名' message='正在获取客户列表...' />
                : <ChooseOneInput 
                    label='客户名' 
                    data={this.customers_data}
                    wheelFlex={[2, 1, 8]}
                    showLastData={true}
                    onEndEditing={(num) => {
                      this.setState({
                        customer_name_comFlag: true,
                        customer_name_value: num[2],
                      });}}/>} */}

              {(() => {
                if (this.specified_customer) {
                  return (
                    <Label label={this.specified_customer} />
                  );
                } else {
                  if (!this.state.customers_data_ready) {
                    return (
                      <InputPlaceholder label='客户名' message='正在获取客户列表...' />
                    );
                  } else {
                    return (
                      <ChooseOneInput 
                        label='客户名' 
                        data={this.customers_data}
                        wheelFlex={[2, 1, 8]}
                        showLastData={true}
                        onEndEditing={(num) => {
                          this.setState({
                            customer_name_comFlag: true,
                            customer_name_value: num[2],
                          });}}/>
                    );
                  }
                }
              })()}
              
              <GeneralInput 
                label='金额' placeholder='0.00' unit='元' 
                content_type='float' value_min={0}
                onEndEditing={(isValid, num) => {
                  this.setState({
                    amount_comFlag: isValid,
                    amount_value: num,
                  });}} />

              <DateInput 
                label='收款日期' init_date={this.state.collect_date}
                onEndEditing={(date) => {
                  this.setState({
                    collect_date: date,
                  })}}/> 

              <ParagraphInput 
                label='备注' allow_empty={true}
                onEndEditing={(isValid, num) => {
                  this.setState({
                    remark_comFlag: isValid,
                    remark_value: num,
                  });}} />     

            </View>
          </ScrollView>
        </KeyboardAvoidingView>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  loadding: {
    marginTop: 100
  },

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