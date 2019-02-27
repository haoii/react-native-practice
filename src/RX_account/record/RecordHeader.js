
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';

export default class RecordHeader extends Component {
  render() {
    // const {navigate} = this.props.navigation;
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.city} 
          onPress={() => this.props.navigation.navigate('RecordSelectSreen')}>
          <IconIonicons name="ios-add" size={30} color="#222222" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.search} onPress={() =>alert('SearchIng')}>
          <Text style={{
            textAlign: 'center',
            lineHeight: 25,
            color: '#8B8B8B'
          }}> <Icon name="search" size={10} color="#8B8B8B" /> 搜索</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 35,
    flexDirection:'row',
    paddingLeft:10,
    paddingRight:10,
  },
  search: {
    backgroundColor: '#F5F5F5',
    flex:10,
    height:30,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
  },
  city: {
    flex:1,
    height:30,
    marginRight:8,
    justifyContent:'center',
    alignItems:'center',

  }
});
