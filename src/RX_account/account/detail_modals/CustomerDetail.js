import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        Button, TouchableOpacity, Modal, Alert } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import NavigationHeader from '../../baseComponent/NavigationHeader';
import BuildRecordInCustomerList from '../display_list/CustomerManage/BuildRecordInCustomerList';
import CollectionFromCustomerList from '../display_list/CustomerManage/CollectionFromCustomerList';

import Dimensions from 'Dimensions';
const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class CustomerDetail extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.customer = this.props.navigation.getParam('customer', null);
    let data_ready = true; 
    if (!this.customer) {
      data_ready = false;
      let customer_id = this.props.navigation.getParam('customer_id', null);
      this._getCustomerData(customer_id);
    }

    this.state = { 
      data_ready: data_ready,
    };
  }

  _getCustomerData = (customer_id) => {

    let formData = new FormData();
    formData.append("id", customer_id);

    fetch(URL.customer_by_id, {
      method:'POST',
      body:formData,
      credentials: 'same-origin',
    }).then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          this.customer = responseJson.data;
          this.setState({data_ready:true});
        } else if (responseJson.msg === 'not_logged_in') {
          alert('您还没有登录~');
          this.props.navigation.navigate('LoginScreen');
        } else {
          alert('出现未知错误');
        }

      }).catch((error) => {
        alert('服务器出错了');
      });
  }

  _deleteCustomer = (id) => {
    let formData = new FormData();
    formData.append("id", id.toString());
    
    fetch(URL.delete_customer,{
      method:'POST',
      body:formData,
      credentials: 'same-origin',
    })
    .then((response) => response.json())
    .then((responseJson)=>{
      if (responseJson.msg === 'success') {
        this.props.navigation.goBack();
      } else if (responseJson.msg === 'not_logged_in') {
        this.props.navigation.navigate('LoginScreen');
      } else if (responseJson.msg === 'has_linked_data') {
        alert('存在与此客户关联的其他数据，无法删除！')
      } else {
        alert('出现未知错误');
      }

    })
    .catch((error)=>{
      alert('服务器出错了');
    });
  }

  _confirmDeleteCustomer = () => {
    Alert.alert(
      null,
      '删除客户后不可恢复，确认删除？',
      [
        {text: '放弃删除', onPress: () => {}, style: 'cancel'},
        {text: '确认删除', onPress: () => {this._deleteCustomer(this.customer.id);}},
      ],
      { cancelable: false }
    );
  }

  _renderProgressBar = (items) => {
    items.sort((v1,v2) => v1[0] < v2[0]? 1:-1);
    return items.map((item) => {
      return (
        <View style={[styles.progressBar, {width:item[0], backgroundColor:item[1]}]}></View>
      )});
  }

  render() {

    return (
      <View style={styles.container}>
        <NavigationHeader navigation={this.props.navigation} 
          title='客户'
          operations={{
            '编辑': () => {
              if (this.customer)
                this.props.navigation.push('AddCustomerForm', {
                  customerToUpdate: this.customer,
                });
            },
            '添加施工记录': () => {
              if (this.customer)
                this.props.navigation.push('AddBuildRecord', {
                  specified_customer: this.customer.name + '(' + this.customer.address + ')',
                  specified_customer_name: this.customer.name,
                  specified_customer_id: this.customer.id,
                });
            },
            '收工程款': () => {
              if (this.customer)
                this.props.navigation.push('CollectionFromCustomerForm', {
                  specified_customer: this.customer.name + '(' + this.customer.address + ')',
                });
            },
            '删除': () => {
              if (this.customer)
                this._confirmDeleteCustomer();
            },
          }}
        />

        {this.state.data_ready
          ? (() => {
              let customer = this.customer;

              let total_price_pixel = size.width - 30;
              let actual_price = customer.total_price * customer.price_discount / 10;
              let received_price_pixel = (customer.price_received / actual_price) * total_price_pixel;
              let expense_pixel = (customer.total_expense / actual_price) * total_price_pixel;
              let expense_paid_pixel = (customer.expense_paid / actual_price) * total_price_pixel;

              return (
                <View style={styles.mainContainer}>
                  <View style={styles.summarizeView}>
                    <Text style={styles.titleText}>{customer.name}</Text>
                    <Text style={styles.infoText}>地址：{customer.address}</Text>
                    <Text style={styles.infoText}>编号：{customer.id}</Text>
                    <Text style={styles.infoText}>电话：{customer.phone}</Text>
                    <Text style={styles.infoText}>签单日期：{customer.sign_date}</Text>
                    <Text style={styles.infoText}>工期：{customer.duration}</Text>
                    <Text style={styles.infoText}>面积：{customer.area}</Text>
                  </View>

                  <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBarBase, {width:total_price_pixel, backgroundColor:'#9E9E9E'}]}></View>

                    {this._renderProgressBar([[received_price_pixel, '#4CAF50'],
                                              [expense_pixel, '#F44336'],
                                              [expense_paid_pixel, '#3F51B5']])}

                  </View>

                  <View style={styles.detailView}>
                    <View style={styles.detailLeftView}>

                      {/* <Text style={styles.minorText}>支/开：</Text> */}
                      <Text style={[styles.minorText, {color:'#3F51B5'}]}>支</Text>
                      <Text style={styles.minorText}>/</Text>
                      <Text style={[styles.minorText, {color:'#F44336'}]}>开</Text>
                      <Text style={styles.minorText}>：</Text>

                      <Text style={styles.minorText}>
                        {Math.floor(customer.expense_paid)}/{Math.floor(customer.total_expense)}
                      </Text>
                    </View>
                    <View style={styles.detailRightView}>

                      {/* <Text style={styles.minorText}>收/报：</Text> */}
                      <Text style={[styles.minorText, {color:'#4CAF50'}]}>收</Text>
                      <Text style={styles.minorText}>/</Text>
                      <Text style={[styles.minorText, {color:'#9E9E9E'}]}>报</Text>
                      <Text style={styles.minorText}>：</Text>

                      <Text style={styles.minorText}>
                        {Math.floor(customer.price_received)}/{Math.floor(actual_price)}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.materialTitleText}>施工记录</Text>
                  <BuildRecordInCustomerList customer_id={customer.id} />

                  <Text style={styles.materialTitleText}>收款记录</Text>
                  <CollectionFromCustomerList customer_id={customer.id} />

                </View>
              );
            })()
          : <View>
              <Text>正在加载...</Text>
            </View>}

        
      </View>

    );
  }
}

const styles = StyleSheet.create({

  mainContainer:{
    height:size.height,
    backgroundColor: '#fff',
    justifyContent:'flex-start',
    paddingTop:15,
  },
  minorText: {
    fontSize:14,
  },
  materialTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom:6,
  },

  progressBarContainer: {
    height: 25,
    marginHorizontal:15,
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
    marginHorizontal:15,
    paddingBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#efefef',
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

  container:{
    height:size.height,
    backgroundColor: '#fff',
    justifyContent:'flex-start'
  },

  summarizeView: {
    paddingHorizontal:15,
  },
  titleText: {
    fontSize:22,
    fontWeight:'bold',
    color:'black',
  },
  infoText: {
    fontSize:14,
  },
});