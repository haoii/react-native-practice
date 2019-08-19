
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, 
        Image } from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceStorage from '../DeviceStorage';

export default class AvatarListItem extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.user_info = null;
    DeviceStorage.get('user_info').then((info) => {
      if (info) {
        this.user_info = info;
        this.setState({user_info_ready:true});
      }
    });

    this.state = { 
      user_info_ready: false,
    };
  }


  render() {

    return (
      <View>
        {this.state.user_info_ready
          ? <TouchableOpacity style={styles.container}>
              <View style={styles.iconView}>
                  <Image source={{uri:URL.static_dir + this.user_info.avatar_url}} style={{width:80,height:80,borderRadius:10}} />
              </View>
      
              <View style={styles.itemContainer}>
                <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                  <Text style={styles.textTitle}>{this.user_info.name}</Text>
                  <Text style={styles.textData}>（{this.user_info.role_name}）</Text>
                </View>
                
                <View style={styles.DataContainer}>
                  
                  <Text style={styles.textData}>查看或编辑个人信息</Text>
                  
                  <View style={styles.iconArrowView}>
                    <IconMaterialCommunityIcons name="chevron-right" size={25}/>
                  </View>
                </View>
                            
              </View>
      
            </TouchableOpacity>
          : <Text>请登录...</Text>}
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    height: 150,
    alignItems:'center',
    backgroundColor:'#fff',
    borderBottomWidth:0.5,
    borderColor:'#c3c3c3',
  },
  iconView:{
    width:120,
    alignItems:'center',
    justifyContent:'center',
  },

  itemContainer: {
    height: 70,
    flex:1,
    // alignItems:'flex-start',
    alignItems: 'stretch',
    justifyContent:'space-between',
  },
  textTitle:{
    fontSize:22,
    color:'#000',
    fontWeight:'bold',
  },

  DataContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  textData:{
    fontSize:16,
  },

  iconArrowView:{
    width:34,
    alignItems:'center',
    justifyContent:'center',
  },
  
});