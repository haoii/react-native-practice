
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import SearchIng from './SearchIng';

export default class SearchInput extends Component {
  static defaultProps={
    city:true
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    // const {navigate} = this.props.navigation;
    return (
        <View style={styles.header}>
          {this.props.city&&
            <TouchableOpacity style={styles.city} onPress={()=>alert('hello')}>
              <Text>上海 <Icon name="chevron-down" size={10} color="#222222" /></Text>
            </TouchableOpacity>
          }

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
    paddingLeft:20,
    paddingRight:20,
  },
  search: {
    backgroundColor: '#F5F5F5',
    flex:6,
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
