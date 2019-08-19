
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
          } from 'react-native';

import DeviceStorage from '../DeviceStorage';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class LoginScreen extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = { 
      user_name:'',
      password:'',
      hint:'',
    };
  }

  _logout = () => {
    fetch(URL.logout,{credentials: 'same-origin'})
    .then((response) => response.json())
    .then((ret)=>{
      if (ret.msg === 'success') {
        DeviceStorage.delete('user_info');
        alert('退出成功');
      }
      else 
        alert('出现未知错误');
    })
    .catch((error)=>{alert('服务器出错了')});
  }

  _login = () => {
    if (!this._checkComplete())
      return;

    let formData = new FormData();
    formData.append("name", this.state.user_name);
    formData.append("password", this.state.password);
    
    fetch(URL.login, {
      method:'POST',
      body:formData,
      credentials: 'same-origin' 
    })
    .then((response) => response.json())
    .then((ret)=>{
      if (ret.msg === 'success') {
        this.setState({hint:''});

        // DeviceStorage.save('user_info', {name:ret.data.name, avatar_url: ret.data.avatar_url});
        DeviceStorage.save('user_info', ret.data);

        this.props.navigation.goBack();
        // this.props.navigation.navigate('MainBottomTab', {refreshLoginStatus: true});
      } else if (ret.msg === 'wrong_name_or_password') {
        this.setState({hint:'用户名或密码错误'});
      } else {
        alert('出现未知错误');
        this.setState({hint:''});
      }
    })
    .catch((error)=>{
      this.setState({hint:'服务器出错了'});
    });
  }

  _login_test = () => {

    let formData = new FormData();
    formData.append("name", 'hgf');
    formData.append("password", '1');
    
    fetch('http://localhost:8080/user/login', {
      method:'POST',
      body:formData,
    })
    .then((response) => response.json())
    .then((ret)=>{
      if (ret.msg === 'success') {
        alert('登陆成功');
      } else if (ret.msg === 'wrong_name_or_password') {
        alert('用户名或密码错误');
      } else {
        alert('出现未知错误');
      }
    })
    .catch((error)=>{
      alert('服务器出错了');
    });
  }

  _checkComplete = () => {
    return (this.state.user_name && this.state.password);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:60}}></View>
        <Text style={styles.titleText}>登录</Text>

        {this.state.hint
          ? <Text style={styles.wrongHintText}>{this.state.hint}</Text>
          : null}

        <View style={styles.inputContainer}>
          <Text style={[styles.inputText, styles.inputItemNameView]}>用户名</Text>
          <TextInput 
            style={[styles.inputText, styles.inputView]}
            placeholder='请填写用户名' 
            value={this.state.user_name}
            maxLength={16}
            onChangeText={(value) => this.setState({user_name:value, hint:''})}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.inputText, styles.inputItemNameView]}>密码</Text>
          <TextInput 
            style={[styles.inputText, styles.inputView]}
            placeholder='请填写密码' 
            value={this.state.password}
            maxLength={16}
            onChangeText={(value) => this.setState({password:value, hint:''})}
          />
        </View>

        <View style={[styles.inputContainer, {borderBottomWidth:0}]}>
          <Text style={styles.hintText}>注册账号请联系管理员</Text>
        </View>

        <TouchableHighlight style={!this._checkComplete()?styles.btn:styles.activeBtn} onPress={this._login}>
          <Text style={!this._checkComplete()?styles.btnText:styles.activeBtnText}>登录</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.activeBtn} onPress={this._logout}>
          <Text style={styles.activeBtnText}>退出登录</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
  },
  titleText: {
    fontSize: 28,
    // fontWeight:'bold',
    color:'#000',
    paddingVertical:40
  },

  inputContainer: {
    flexDirection:'row',
    alignItems:'center',
    height:50,
    borderBottomWidth:0.5,
    borderColor:'#c3c3c3',
    
  },
  inputText: {
    fontSize:18,
    color:'#000',
  },
  inputItemNameView: {
    flex:1,
  },
  inputView: {
    flex:2,
  },

  hintText: {
    fontSize:14,
    color:'#2aa2ef',
  },
  wrongHintText: {
    fontSize:14,
    color:'red',
  },

  btn:{
    height:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:6,
    backgroundColor:'#6699cc',
    marginTop:40,
  },
  activeBtn:{
    height:40,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:6,
    backgroundColor:"#2aa2ef",
    marginTop:40,
  },
  btnText:{
    color:"#ccd6dd",
    fontSize:16
  },
  activeBtnText:{
    color:"#fff",
    fontSize:16
  },
});