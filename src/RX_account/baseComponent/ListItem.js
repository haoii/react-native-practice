
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, 
          } from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ListItem extends Component {
  static defaultProps = {
    last:false,
    title:'',
    data:'',
  }

  constructor(props) {
    super(props);
    this.state = { 
    };
  }


  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.iconView}>
          {this.props.icon}
        </View>

        <View style={[styles.itemContainer, this.props.last?{borderBottomWidth:0}:null]}>
          <View style={styles.titleDataContainer}>
            <Text style={styles.textTitle}>{this.props.title}</Text>
            <Text style={styles.textData}>{this.props.data}</Text>
          </View>
          
          <View style={[styles.iconView, {width:34}]}>
            <IconMaterialCommunityIcons name="chevron-right" size={25}/>
          </View>
        </View>

      </TouchableOpacity>);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    height: 50,
    alignItems:'center',
    backgroundColor:'#fff',
  },
  iconView:{
    width:50,
    alignItems:'center',
    justifyContent:'center',
  },
  textTitle:{
    fontSize:16,
    color:'#000',
  },
  textData:{
    fontSize:16,
  },

  itemContainer: {
    height: 50,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:0.5,
    borderColor:'#c3c3c3',
  },
  titleDataContainer:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-between',
  },
});