
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

export default class AddSupplierForm extends Component {
  constructor(props) {
    super(props);

    this.form_data = { 
      name_value: '',
      name_comFlag: false,

      address_value: '',
      address_comFlag: false,

      phone_value: '',
      phone_comFlag: true,
    };

    this.state = { 
      ready_to_commit: false,
    };
  }

  _submitPost = () => {

    if (!this.state.ready_to_commit)
      return;

    let formData = new FormData();
    formData.append("name", this.form_data.name_value);
    formData.append("address", this.form_data.address_value);
    formData.append("phone", this.form_data.phone_value);
    
    fetch(URL.submit_add_supplier,{
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
    keys = Object.keys(this.form_data);
    for (let i = 0; i < keys.length; i++) 
      if (keys[i].length > 7 && keys[i].slice(-7) === 'comFlag') 
        if (!this.form_data[keys[i]]) {
          this.setState({
            ready_to_commit: false,
          });
          return false;
        }
    this.setState({
      ready_to_commit: true,
    });
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

          <TouchableHighlight style={!this.state.ready_to_commit?styles.btn:styles.activeBtn} onPress={this._submitPost}>
            <Text style={!this.state.ready_to_commit?styles.btnText:styles.activeBtnText}>确认</Text>
          </TouchableHighlight>
        </View>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} style={styles.keyboardAvoiding} enabled>
          <ScrollView contentContainerStyle={styles.ScrollViewStyle}>

            <View style={styles.Canvas}>
              <GeneralInput 
                label='材料商名' max_length={64} 
                exclude_str=')('
                onEndEditing={(isValid, value) => {
                  this.form_data.name_comFlag = isValid;
                  this.form_data.name_value = value;
                  this._checkComplete();
                }} />
              <GeneralInput 
                label='地址' max_length={256} 
                onEndEditing={(isValid, value) => {
                  this.form_data.address_comFlag = isValid;
                  this.form_data.address_value = value;
                  this._checkComplete();
                }} />
              <GeneralInput 
                label='电话' max_length={16} 
                allow_empty={true} 
                content_type='phone'
                onEndEditing={(isValid, value) => {
                  this.form_data.phone_comFlag = isValid;
                  this.form_data.phone_value = value;
                  this._checkComplete();
                }} />
             
            
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