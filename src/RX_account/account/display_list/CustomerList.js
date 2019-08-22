
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';

import RetryComponent from '../../baseComponent/RetryComponent';

import URL from '../../Config';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      customers: [],
      
      got_no_data: false,
      no_data_hint: '',
    }
  }

  componentDidMount() {
    this._refreshDate();
  }

  _fetchData = () => {
    fetch(URL.customers, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          if (responseJson.data.length === 0) {
            this.setState({refreshing: false, got_no_data:true, no_data_hint: '没有数据~'});
          } else {
            let arrData = responseJson.data;
            let i = 0;
            let arrList = [];
            arrData.map(item => {
              arrList.push({key: i, value: item});
              i++;
            });
            this.setState({customers: arrList, refreshing: false, got_no_data:false});
          }
        } else if (responseJson.msg === 'not_logged_in') {
          this.setState({refreshing: false, got_no_data:true, no_data_hint: '您还没有登录~'});
          this.props.navigation.navigate('LoginScreen');
        } else {
          this.setState({refreshing: false, got_no_data:true, no_data_hint: '出现未知错误'});
        }

      }).catch((error) => {
        this.setState({refreshing: false, got_no_data:true, no_data_hint: '服务器出错了'});
      });
  }

  _refreshDate = () => {
    this.setState({refreshing: true});
    this._fetchData();
  }

  _renderProgressBar = (items) => {
    items.sort((v1,v2) => v1[0] < v2[0]? 1:-1);
    return items.map((item) => {
      return (
        <View style={[styles.progressBar, {width:item[0], backgroundColor:item[1]}]}></View>
      )});
  }

  _renderItem = ({item}) => {
    let total_price_pixel = size.width - 36;
    let actual_price = item.value.total_price * item.value.price_discount / 10;
    let received_price_pixel = (item.value.price_received / actual_price) * total_price_pixel;
    let expense_pixel = (item.value.total_expense / actual_price) * total_price_pixel;
    let expense_paid_pixel = (item.value.expense_paid / actual_price) * total_price_pixel;
    return (
      <View>
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.push('CustomerDetail', {
              customer: item.value,
            })}
          style={styles.itemContainer}>

          <View>

            <View style={styles.itemTitleView}>
              <View style={styles.itemTitleLeftView}>
                <Text style={styles.mainBoldText}>{item.value.name}    </Text>
                <Text style={styles.minorText}>{item.value.address}   </Text>
              </View>
              <Text style={[styles.minorText, {color:'#E4572E'}]}>工期：{item.value.remained_duration}/{item.value.duration}</Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarBase, {width:total_price_pixel, backgroundColor:'#9E9E9E'}]}></View>

              {this._renderProgressBar([[received_price_pixel, '#4CAF50'],
                                        [expense_pixel, '#F44336'],
                                        [expense_paid_pixel, '#3F51B5']])}

              {/* {this._renderProgressBar([[received_price_pixel, '#8ac926'],
                                        [expense_pixel, '#ff595e'],
                                        [expense_paid_pixel, '#039be5']])} */}

            </View>

            <View style={styles.detailView}>
              <View style={styles.detailLeftView}>

                {/* <Text style={styles.minorText}>支/开：</Text> */}
                <Text style={[styles.minorText, {color:'#3F51B5'}]}>支</Text>
                <Text style={styles.minorText}>/</Text>
                <Text style={[styles.minorText, {color:'#F44336'}]}>开</Text>
                <Text style={styles.minorText}>：</Text>

                <Text style={styles.minorText}>
                  {Math.floor(item.value.expense_paid)}/{Math.floor(item.value.total_expense)}
                </Text>
              </View>
              <View style={styles.detailRightView}>

                {/* <Text style={styles.minorText}>收/报：</Text> */}
                <Text style={[styles.minorText, {color:'#4CAF50'}]}>收</Text>
                <Text style={styles.minorText}>/</Text>
                <Text style={[styles.minorText, {color:'#9E9E9E'}]}>报</Text>
                <Text style={styles.minorText}>：</Text>

                <Text style={styles.minorText}>
                  {Math.floor(item.value.price_received)}/{Math.floor(actual_price)}
                </Text>
              </View>
            </View>
      
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View>
        {this.state.got_no_data
          ? <RetryComponent 
              hint={this.state.no_data_hint} 
              retryFunc={this._refreshDate}
              style={{height:400}}/>
          : <FlatList
              data={this.state.customers}
              onRefresh={this._refreshDate}
              refreshing={this.state.refreshing}
              renderItem={this._renderItem}
              ListHeaderComponent={
                <View style={{height:5}}></View>
              }/>}
        

      </View>
    );
  }
}

const styles = StyleSheet.create({

  itemContainer: {
    padding:10, 
    marginHorizontal:8,
    marginTop:3,
    marginBottom: 5,
    backgroundColor:'white',
    borderRadius:8,
    elevation: 2,
  },

  itemTitleView: {
    flexDirection:'row', 
    alignItems:'flex-end', 
    justifyContent:'space-between',
  },
  itemTitleLeftView: {
    flexDirection:'row', 
    alignItems:'flex-end',
  },
  mainBoldText: {
    fontSize:16, 
    fontWeight:'bold',
  },
  minorText: {
    fontSize:14,
  },

  progressBarContainer: {
    height: 25,
  },
  progressBarBase: {
    height:10, 
    borderRadius:5, 
    position:'absolute', 
    left:0, 
    top:10,
  },
  progressBar: {
    height:10, 
    borderTopLeftRadius:5, 
    borderBottomLeftRadius:5,
    position:'absolute', 
    left:0, 
    top:10,
  },

  detailView: {
    flexDirection:'row', 
    alignItems:'flex-end', 

  },
  detailLeftView: {
    flexDirection:'row', 
    alignItems:'flex-end', 
    width: size.width/2-18,

  },
  detailRightView: {
    flexDirection:'row', 
    alignItems:'flex-end', 
    width: size.width/2-18,
  },

  loadding: {
    marginTop: 100
  },
})
