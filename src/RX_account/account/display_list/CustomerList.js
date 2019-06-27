
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
        let arrData = responseJson.data;
        let i = 0;
        let arrList = [];
        // 直接赋值的话没有 key 键,就会发出警告,
        // 所以为了避免出现警告,应主动在每个项目中添加 key 键
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
                <Text style={styles.minorText}>支/开：</Text>
                <Text style={styles.minorText}>
                  {Math.floor(item.value.expense_paid)}/{Math.floor(item.value.total_expense)}
                </Text>
              </View>
              <View style={styles.detailRightView}>
                <Text style={styles.minorText}>收/报：</Text>
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
        {this.state.ready
          ? <ActivityIndicator size="large" style={styles.loadding}/>
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
