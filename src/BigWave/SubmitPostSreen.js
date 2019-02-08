
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, Image, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

import URL from './Config';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class PublishPostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      img_url: '',
      post_text: '',
    };
  }

  _pickImage = () => {
    const options = {
      title: '选择照片',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {    
        this.setState({
          img_url: response.uri
        });
      }
    });
  }

  _submitPost = () => {

    if (!this.state.post_text && !this.state.img_url) {
      alert('内容不能为空');
      return;
    }

    let formData = new FormData();
    formData.append("post_text", this.state.post_text);
    if (this.state.img_url) {
      let file = {uri: this.state.img_url, type: 'multipart/form-data', name: 'image.png'};   
      formData.append("files", file);   
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

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.iconContainer}>
            <TouchableHighlight style={styles.cancelBtn}>
              <Text style={styles.cancelText}>取消</Text>
            </TouchableHighlight>

            <TouchableHighlight style={false?styles.btn:styles.activeBtn} onPress={this._submitPost}>
              <Text style={false?styles.btnText:styles.activeBtnText}>发布</Text>
            </TouchableHighlight>
          </View>
          <TextInput 
            ref="textarea"
            style={styles.textArea}
            maxLength={140}
            multiline={true}
            placeholder="有什么新鲜事？"
            selectionColor="#2aa2ef"
            placeholderTextColor="#ced8de"
            onChangeText={(post_text) => this.setState({post_text})}
          ></TextInput>
          <Image source={{uri:this.state.img_url}} style={{width:120,height:120,borderRadius:10, marginLeft:30}} />
        </View>

        {/* <FunctionView numOfText={140}></FunctionView> */}

        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={styles.functionIconContainer}>
            <Icon name="ios-pin" size={35} color="#8899a5" style={styles.functionIcon}></Icon>
            <Icon name="md-camera" size={35} color="#8899a5" style={styles.functionIcon}></Icon>
            <TouchableHighlight onPress={this._pickImage}>
              <Icon name="md-image" size={35} color="#8899a5" style={styles.functionIcon}></Icon>
            </TouchableHighlight>
            <Icon name="md-pie" size={35} color="#8899a5" style={styles.functionIcon}></Icon>
          </View>
        </KeyboardAvoidingView>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    paddingTop:30,
    height:size.height,
    backgroundColor: "#ffffff",
    justifyContent:'space-between'
  },
  icon:{
    width:30,
    height:30,
    borderRadius:5,
  },
  iconContainer:{
    paddingLeft:15,
    paddingRight:15,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  textArea:{
    height:120,
    padding:30,
    fontSize:20,
    textAlignVertical: 'top'
  },
  functionContainer:{
    height:275,
    width:375,
    position:"absolute",
    bottom:0,
    left:0,
    borderTopWidth:1,
    borderTopColor:"#a0adb7"
  },
  functionIconContainer:{
    height:50,
    paddingLeft:30,
    paddingRight:30,
    paddingBottom:40,
    alignItems:"center",
    justifyContent:"flex-start",
    flexDirection:"row",
    borderBottomWidth:1,
    borderBottomColor:"#ccd6dd"
  },
  functionIcon:{
    paddingRight:20
  },
  functionBtn:{
    width:110,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
  },
  cancelBtn:{
    height:35,
    width:60,
    alignItems:"center",
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
  imageGrid:{
    flexDirection:"row",
    flexWrap:"wrap"
  },
  imageIcon:{
    width: size.width/3,
    height:113,
    alignItems:"center",
    justifyContent:"center",
    borderRightColor:"#ddd",
    borderBottomColor:"#ddd",
    borderRightWidth:1,
    borderBottomWidth:1
  },
  image:{
    width: size.width/3,
    height:113,
  },
});