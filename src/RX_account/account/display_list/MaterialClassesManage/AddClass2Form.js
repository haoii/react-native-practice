import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { Input } from 'react-native-elements';

import URL from '../../../Config';
import GeneralInput from '../../../forms/GeneralInput';
import DateInput from '../../../forms/DateInput';
import ParagraphInput from '../../../forms/ParagraphInput';
import Label from '../../../forms/Label';


import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class AddClass2Form extends Component {
  constructor(props) {
    super(props);

    this.class1_name = this.props.navigation.getParam('class1_name');
     
    this.form_data = { 
      name_value: '',
      name_comFlag: false,

      description_value: '',
      description_comFlag: true,

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
    formData.append("class1_name", this.class1_name);
    formData.append("description", this.form_data.description_value);
    
    fetch(URL.add_material_class2,{
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
      } else if (responseJson.msg === 'class_already_exist') {
        alert(responseJson.data);
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
    keys = Object.keys(this.form_data);
    for (let i = 0; i < keys.length; i++) 
      if (keys[i].length > 7 && keys[i].slice(-7) === 'comFlag') 
        if (!this.form_data[keys[i]]) {
          this.setState({
            ready_to_commit: false,
          });
          return;
        }
    this.setState({
      ready_to_commit: true,
    });
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

              <Label label={this.class1_name} />

              <GeneralInput 
                label='二级类别名' max_length={64} 
                exclude_str=')(#'
                onEndEditing={(isValid, value) => {
                  this.form_data.name_comFlag = isValid;
                  this.form_data.name_value = value;
                  this._checkComplete();
                }} />

              <ParagraphInput 
                label='描述' allow_empty={true}
                onEndEditing={(isValid, value) => {
                  this.form_data.description_comFlag = isValid;
                  this.form_data.description_value = value;
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