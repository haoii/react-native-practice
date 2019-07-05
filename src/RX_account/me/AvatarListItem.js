
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, 
        Image } from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class AvatarListItem extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = { 
    };
  }


  render() {
    return (
      <TouchableOpacity style={styles.container}>
        {/*  http://pic.616pic.com/ys_img/00/26/21/E48DIK1mTU.jpg*/}
        <View style={styles.iconView}>
          <Image source={{uri:'http://img.wxcha.com/file/201807/13/9bbc369f6e.jpg'}} style={{width:80,height:80,borderRadius:10}} />
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.textTitle}>郝高峰</Text>

          <View style={styles.DataContainer}>
            
            <Text style={styles.textData}>查看或编辑个人信息</Text>
            <View style={styles.iconArrowView}>
              <IconMaterialCommunityIcons name="chevron-right" size={25}/>
            </View>
          </View>
                      
        </View>

      </TouchableOpacity>);
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