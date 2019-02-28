
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import URL from '../Config';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: true,
      refreshing: false,
      customers: []
    }
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData = () => {
    fetch(URL.customers)
      .then(response => response.json())
      .then(responseJson => {
        let arrData = responseJson.latest_customers;
        let i = 0;
        let arrList = [];
        /* 直接赋值的话没有 key 键,就会发出警告,所以为了避免出现警告,应主动在每个项目中添加 key 键 */
        arrData.map(item => {
          arrList.push({key: i, value: item});
          i++;
        })
        this.setState({customers: arrList, ready: false, refreshing: false});

      }).catch((error) => {
        alert(error);
      });
  }

  _refreshDate = () => {
    this.setState({refreshing: true});
    this._fetchData();
  }


  _renderItem = ({item}) => {
    let total_price_pixel = size.width - 20;
    let actual_price = item.value.total_price * item.value.price_discount;
    let received_price_pixel = (item.value.price_received / actual_price) * total_price_pixel;
    let expense_pixel = (item.value.total_expense / actual_price) * total_price_pixel;
    let expense_paid_pixel = (item.value.expense_paid / actual_price) * total_price_pixel;
    return (
      <View style={{padding:10, paddingTop:18, height:95, borderBottomWidth: 1, borderBottomColor: '#EFEFEF'}}>
        <View style={{flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between'}}>
          <View style={{flexDirection:'row', alignItems:'flex-end'}}>
            <Text style={{fontSize:16, fontWeight:'bold'}}>{item.value.name}    </Text>
            <Text style={{fontSize:14}}>{item.value.address}   </Text>
          </View>
          <Text style={{fontSize:14}}>工期：{item.value.remained_duration}/{item.value.duration}</Text>
        </View>

        <View style={{width:total_price_pixel, height:10, backgroundColor:'gray', borderRadius:5, 
            position:'absolute', left:10, top:48}}></View>
        <View style={{width:received_price_pixel, height:10, backgroundColor:'green', borderTopLeftRadius:5, 
            borderBottomLeftRadius:5, position:'absolute', left:10, top:48}}></View>
        <View style={{width:expense_pixel, height:10, backgroundColor:'red', borderTopLeftRadius:5, 
            borderBottomLeftRadius:5, position:'absolute', left:10, top:48}}></View>
        <View style={{width:expense_paid_pixel, height:10, backgroundColor:'blue', borderTopLeftRadius:5, 
            borderBottomLeftRadius:5, position:'absolute', left:10, top:48}}></View>

        <View style={{flexDirection:'row', alignItems:'flex-end', position:'absolute', left:10, top:65}}>
          <View style={{flexDirection:'row', alignItems:'flex-end', position:'absolute', left:0, top:0}}>
            <Text style={{fontSize:14}}>已支付/开销：</Text>
            <Text style={{fontSize:14}}>
              {Math.floor(item.value.expense_paid)}/{Math.floor(item.value.total_expense)}
            </Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'flex-end', position:'absolute', left:size.width/2-10, top:0}}>
            <Text style={{fontSize:14}}>已到账/报价：</Text>
            <Text style={{fontSize:14}}>
              {Math.floor(item.value.price_received)}/{Math.floor(actual_price)}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View>
        {this.state.ready
          ? <ActivityIndicator size="large" style={styles.loadding}/>
          : <FlatList
            data={this.state.customers}
            onRefresh={this._refreshDate}
            refreshing={this.state.refreshing}
            renderItem={this._renderItem}/>}

      </View>
    );
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
  star: {
    width: 12,
    height: 12,
    marginRight: 2
  },
  hotList: {
    height: 130,
    paddingLeft: 18,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF'
  },
  lastList: {
    borderBottomWidth: 0
  },
  title: {
    fontWeight: '900',
    fontSize: 15
  },
  pay: {
    width: 50,
    height: 25,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:'#FF4E65',
    borderRadius:5,
  }
})
