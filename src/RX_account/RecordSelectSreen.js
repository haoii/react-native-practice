
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { Input } from 'react-native-elements';

import URL from './Config';

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

      price_hint_text: '',
      price_hint_level: 'info',
      price_input_text: '',
      price_input_comFlag: 0,
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

  _onPriceInputEnd = () => {

    input = this.state.price_input_text;
    if (isNaN(input) || Number(input) > 1000 || Number(input) < 0)
      this.setState({
        price_hint_text:'请输入有效的值',
        price_hint_level:'warnning',
        price_input_comFlag: 0,
      });
    else 
      this.setState({
        price_hint_text:'',
        price_hint_level:'info',
        price_input_comFlag: 1,
      });
  }

  _getHintColor = (level) => {
    if (level === 'info')
      return {color:'black'};
    else if (level === 'warnning')
      return {color:'red'};
  }

  _renderFloatInputItem = (label, placeholder, unit, hint_state, hint_level_state,
                           input_state, onEndEditingCallback) => {
    return (
      <View style={styles.inputItemOutterView}>
        <View style={styles.inputItemInnerView}>
          <View style={styles.inputItemLabelView}>
            <Text style={styles.fontMain}>{label}</Text>
          </View>
          <View style={styles.inputItemcontentView}>
            <TextInput 
              placeholder={placeholder} 
              value={this.state[input_state]}
              onChangeText={(text) => {
                tmp_state={};
                tmp_state[input_state] = text;
                this.setState(tmp_state);}}
              onEndEditing={onEndEditingCallback}/>
            <Text style={styles.fontMain}>{unit}</Text>
          </View>
        </View>
        {this.state[hint_state]
          ? <Text style={[styles.fontMinor, this._getHintColor(this.state[hint_level_state])]}>
              {this.state[hint_state]}
            </Text>
          : null}
      </View>);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableHighlight style={styles.cancelBtn}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableHighlight>

          <TouchableHighlight style={!this.state.price_input_comFlag?styles.btn:styles.activeBtn} onPress={this._submitPost}>
            <Text style={!this.state.price_input_comFlag?styles.btnText:styles.activeBtnText}>发布</Text>
          </TouchableHighlight>
        </View>

        <ScrollView contentContainerStyle={styles.content}>

          {this._renderFloatInputItem('金额', '0.00', '元', 'price_hint_text', 'price_hint_level', 
                                      'price_input_text', this._onPriceInputEnd)}

          <View style={styles.inputItemOutterView}>
            <View style={styles.inputItemInnerView}>
            </View>
            <Text style={styles.fontMinor}>
              提示：
            </Text>
          </View>

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
  inputItemOutterView: {
    paddingBottom:15,
    alignItems:'stretch',
  },
  inputItemInnerView: {
    backgroundColor:'white',
    borderRadius:5,
    height:50,
    marginBottom:5,
    flexDirection:'row',
    paddingLeft:10,
    paddingRight:10,
    justifyContent:'space-between',
    alignItems:'center',
  },
  inputItemLabelView: {
    flexDirection:'row'
  },
  inputItemcontentView: {
    flexDirection:'row',
    alignItems:'center'
  },
  fontMain: {
    fontSize:16,
  },
  fontMinor: {
    fontSize:12,
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