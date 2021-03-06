
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

import RetryComponent from '../../baseComponent/RetryComponent';

import URL from '../../Config';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class CollectionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      collections: [],

      got_no_data: false,
      no_data_hint: '',
    };
  }

  componentDidMount() {
    this._refreshDate();
  }

  _fetchData = () => {
    fetch(URL.collections_from_customer, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          if (responseJson.data.length === 0) {
            this.setState({materials:[], refreshing: false, got_no_data:true, no_data_hint: '没有数据~'});
          } else {
            let arrData = responseJson.data;
            let i = 0;
            let arrList = [];
            arrData.map(item => {
              arrList.push({key: i, value: item});
              i++;
            })
            this.setState({collections: arrList, refreshing: false, got_no_data:false});
          }
        } else if (responseJson.msg === 'not_logged_in') {
          this.setState({materials:[], refreshing: false, got_no_data:true, no_data_hint: '您还没有登录~'});
          this.props.navigation.navigate('LoginScreen');
        } else {
          this.setState({materials:[], refreshing: false, got_no_data:true, no_data_hint: '出现未知错误'});
        }


      }).catch((error) => {
        this.setState({materials:[], refreshing: false, got_no_data:true, no_data_hint: '服务器出错了'});
      });
  }

  _refreshDate = () => {
    this.setState({refreshing: true});
    this._fetchData();
  }


  _renderItem = ({item}) => {

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemContentView}>
          <View style={styles.itemMainContentView}>
            <Text style={styles.customerText}>{item.value.customer}</Text>
            <Text style={styles.amountText}>{item.value.amount}元</Text>
          </View>
          <Text style={styles.minorText}>{item.value.collect_date}</Text>
        </View>

        {item.value.remark
          ? <View style={styles.remarkView}>
              <Text style={styles.minorText}>备注：{item.value.remark}</Text>
            </View> 
          : null}

      </View>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.collections}
          onRefresh={this._refreshDate}
          refreshing={this.state.refreshing}
          renderItem={this._renderItem}/>

        {this.state.got_no_data
          ? <RetryComponent 
              hint={this.state.no_data_hint} 
              retryFunc={this._refreshDate}
              style={{height:400}}/>
          : null}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    padding:10, 
    paddingTop:18, 
    borderBottomWidth: 1, 
    borderBottomColor: '#EFEFEF',
  },
  itemContentView: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between',
  },
  itemMainContentView: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'flex-start',
  },

  customerText: {
    fontSize:14,
    minWidth:150,
  },
  amountText: {
    fontSize:14,
    minWidth:70,
    textAlign:'right',
  },

  minorText: {
    fontSize:14,
  },

  remarkView: {
    paddingTop:10,
    // flexDirection:'row',
    // justifyContent:'flex-end',
  },
})
