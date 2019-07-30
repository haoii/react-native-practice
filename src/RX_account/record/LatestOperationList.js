
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, 
        FlatList, Image } from 'react-native';

import {ScreenSize} from '../Config';

export default class LatestOperationList extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.latestOperations = [
      {
        user: {
          portrait_url: 'http://img.wxcha.com/file/201807/13/9bbc369f6e.jpg',
          name: '郝高峰'
        }, 
        text: '添加了订单：法国不管不顾的身份夫人地方v人而非菲律宾你和那位夫人把人分为。',
        pub_date: '2019-07-30',
        votes:20,
      }
    ];

    this.state = { 
    };
  }

  _renderItem = ({item}) => {
    return (
      <View style={{marginTop:18,flexDirection:'row',paddingRight:20, paddingLeft:10,
      borderBottomWidth: 1, borderBottomColor: '#EFEFEF'}}>
        <View>
          <Image source={{uri:item.user.portrait_url}} style={{width:46,height:46,borderRadius:4}} />
        </View>

        <View style={{marginLeft:10,flex:1}}>
          <Text style={{fontSize:18, color:'#181880', textAlignVertical:'top', backgroundColor:'red'}}>{item.user.name}</Text>
          {item.text?<Text style={{marginBottom:8,color:'#3B3B3B', width:ScreenSize.width-86}}>{item.text}</Text>:null}
          <View style={{flexDirection:'row'}}>
            {/* {this._postImages(item.image_url)} */}
          </View>
          <Text style={styles.smallFont}>
            {item.pub_date}
          </Text>
        </View>

        <View style={{position:'absolute',right:20,top:0}}>
          <Text style={{color:'#9B9B9B'}}>👍{item.votes}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.latestOperations}
          // onRefresh={this._refreshDate}
          // refreshing={this.state.refreshing}
          renderItem={this._renderItem}/>

      </View>);
  }
}

const styles = StyleSheet.create({
  smallFont: {
    lineHeight: 20,
    color: '#A6A6A6',
    fontSize: 12
  },
  loadding: {
    marginTop: 100
  },
});