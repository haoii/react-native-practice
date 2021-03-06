
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';

export default class RecordHeader extends Component {

  _test = () => {
    // this.props.navigation.navigate('LoginScreen');
    alert('待开发');
  }

  render() {
    // const {navigate} = this.props.navigation;
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton} 
          onPress={() => this.props.navigation.navigate('RecordSelectSreen')}>
          <IconIonicons name="ios-add" size={30} color="#222222" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.search} onPress={this._test}>
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
    height: 50,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:10,
    borderBottomWidth: 1, 
    borderBottomColor: '#F5F5F5'
  },
  search: {
    backgroundColor: '#F5F5F5',
    flex:10,
    height:30,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
  },
  addButton: {
    flex:1,
    height:30,
    marginRight:8,
    justifyContent:'center',
    alignItems:'center',

  }
});
