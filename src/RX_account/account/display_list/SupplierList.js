
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

export default class SupplierList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      suppliers: [],

      got_no_data: false,
      no_data_hint: '',
    }
  }

  componentDidMount() {
    this._refreshDate();
  }

  _fetchData = () => {
    fetch(URL.suppliers, {credentials: 'same-origin'})
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
            })
            this.setState({suppliers: arrList, refreshing: false, got_no_data:false});
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

  _renderItem = ({item}) => {
    let total_expense_pixel = size.width - 36;
    let expense_paid_pixel = (item.value.expense_paid / item.value.total_expense) * total_expense_pixel;
    return (
      <View>
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.push('SupplierDetail', {
              supplier: item.value,
            })}
          style={styles.itemContainer}>

          <View>
        
            <View style={styles.itemTitleView}>
              <View style={styles.itemTitleLeftView}>
                <Text style={styles.mainBoldText}>{item.value.name}    </Text>
                <Text style={styles.minorText}>{item.value.address}   </Text>
              </View>
              <Text style={styles.minorText}>编号：{item.value.id}</Text>
            </View>

            <View style={styles.progressBarContainer}>

              <View style={[styles.progressBarBase, {width:total_expense_pixel, backgroundColor:'#F44336'}]}></View>
              <View style={[styles.progressBar, {width:expense_paid_pixel, backgroundColor:'#3F51B5'}]}></View>

            </View>

            <View style={styles.detailView}>
              <View style={styles.detailLeftView}>
                <Text style={styles.minorText}>已支付/开销：</Text>
                <Text style={styles.minorText}>
                  {Math.floor(item.value.expense_paid)}/{Math.floor(item.value.total_expense)}
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
              data={this.state.suppliers}
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
  },
  detailLeftView: {
    flexDirection:'row', 
  },

  loadding: {
    marginTop: 100
  },
})
