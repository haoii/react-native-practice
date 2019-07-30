
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
        type: 'add_order',
        data: {
          order_id: 12,
        },
        text: '备注：在组件样式中使用flex可以使其在可利用的空间中动态地扩张或收缩。',
        pub_date: '2019-07-30',
      },
      {
        user: {
          portrait_url: 'http://img.wxcha.com/file/201807/13/9bbc369f6e.jpg',
          name: '郝高峰'
        }, 
        type: 'collect_from_customer',
        data: {
          customer_name: '张三',
          customer_id: 5,
          quantity: 20000,
        },
        text: '备注：支付宝收款。',
        pub_date: '2019-07-29',
      },
      {
        user: {
          portrait_url: 'http://img.wxcha.com/file/201807/13/9bbc369f6e.jpg',
          name: '郝高峰'
        }, 
        type: 'add_customer',
        data: {
          name: '张三',
          customer_id: 5,
        },
        text: '',
        pub_date: '2019-07-29',
      },
    ];

    this.state = { 
    };
  }

  _renderOperationData = (item) => {
    if (item.type == 'add_customer') {
      return (
        <View style={{flexDirection:'row'}}> 
          <Text style={styles.mainText}>添加了新客户：</Text>
          <Text style={[styles.mainText, {textDecorationLine:'underline', color:'#181880'}]}>{item.data.name}</Text>
        </View> 
      );
    } else if (item.type == 'collect_from_customer') {
      return (
        <View style={{flexDirection:'row'}}> 
          <Text style={styles.mainText}>收到客户 {item.data.customer_name} 装修款：</Text>
          <Text style={[styles.mainText, {textDecorationLine:'underline', color:'#181880'}]}>{item.data.quantity}元</Text>
        </View> 
      );
    } else if (item.type == 'add_order') {
      return (
        <View style={{flexDirection:'row'}}> 
          <Text style={styles.mainText}>添加了材料订单：</Text>
          <Text style={[styles.mainText, {textDecorationLine:'underline', color:'#181880'}]}>订单号{item.data.order_id}</Text>
        </View> 
      );
    }
  }

  _renderItem = ({item}) => {
    return (
      <View style={{width:ScreenSize.width, marginTop:18, paddingBottom:5, flexDirection:'row',paddingRight:10, paddingLeft:10,
      borderBottomWidth: 1, borderBottomColor: '#EFEFEF'}}>
        <View>
          <Image source={{uri:item.user.portrait_url}} style={{width:46,height:46,borderRadius:4}} />
        </View>

        <View style={{marginLeft:10, flex:1}}>
          <Text style={{fontSize:16, color:'#181880', textAlignVertical:'top'}}>{item.user.name}</Text>

          {this._renderOperationData(item)}

          {item.text?<Text style={styles.mainText}>{item.text}</Text>:null}

          <View style={{flexDirection:'row'}}>
            {/* {this._postImages(item.image_url)} */}
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{color: '#A6A6A6', fontSize: 12}}>
              {item.pub_date}
            </Text>

            <TouchableOpacity style={{backgroundColor:'#d6d6d6',borderRadius:2}}>
              <Text style={{color:'#181880', fontSize:12}}>  ••  </Text>
            </TouchableOpacity>
          </View>

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
  loadding: {
    marginTop: 100
  },

  mainText: {
    marginBottom:5,
    color:'#3B3B3B'
  }
});