
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
} from 'react-native';

import RetryComponent from '../../../baseComponent/RetryComponent';

import URL from '../../../Config';

import Dimensions from 'Dimensions';
const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class MaterialOrderInCustomerList extends Component {
  static defaultProps = {
    customer_id: 0,
  }

  constructor(props) {
    super(props);
    this.state = {

      refreshing: false,
      orders: [],

      got_no_data: false,
      no_data_hint: '',
    }
  }

  componentDidMount() {
    this._refreshDate();
  }

  _fetchData = () => {
    fetch(URL.orders_from_customer_by_id + this.props.customer_id + '/', {credentials: 'same-origin'})
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
            this.setState({orders: arrList, refreshing: false, got_no_data:false});
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
    let order = item.value;
    return (
      <View style={{flexDirection:'row', paddingHorizontal:20, justifyContent:'space-between'}}>
        <Text>{order.order_datetime.slice(0,10)}</Text>
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('MaterialOrderDetail',{order_id:order.order_id})}>
          <Text style={{textDecorationLine:'underline', color:'#181880'}}>{order.order_id}</Text>
        </TouchableOpacity>
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
              style={{height:100}}/>
          : <FlatList
              data={this.state.orders}
              onRefresh={this._refreshDate}
              refreshing={this.state.refreshing}
              renderItem={this._renderItem}
            />}

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
