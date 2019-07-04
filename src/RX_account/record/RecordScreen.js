
import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import RecordHeader from './RecordHeader';
import CollectionList from '../account/display_list/CollectionList';

// import PostList from './PostList';

const { width, height } = Dimensions.get('window');

export default class RecordScreen extends Component {
  render() {
    return (
      <View style={{width:width,height:height,paddingTop:10,paddingBottom:100,backgroundColor:'#fff'}}>
        <RecordHeader navigation={this.props.navigation}/>
        
        <View style={styles.classContainer}>
          <View style={styles.classTitleBar}>
            <Text style={styles.classTitleText}>收款</Text>
            <Text style={styles.classTitleText}>更多</Text>
          </View>
          <View style={styles.classContentContainer}>

            <CollectionList navigation={this.props.navigation} />

          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:width,
    height:height,
    paddingTop:10,
    paddingBottom:100,
    backgroundColor:'#fff'
  },

  classContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 6, 
    borderBottomColor: '#F5F5F5'
  },
  classTitleBar: {
    flexDirection:'row',
    justifyContent:'space-between',
  },
  classTitleText: {
    fontSize:16,
  },
  classContentContainer: {
  },
  classLineContainer: {
    flexDirection:'row',
    justifyContent:'flex-start',
  },
  itemTouchable: {
    width:(width - 30) / 4,
    height:80,
    justifyContent:'center',
    alignItems:'center',
  },

});
