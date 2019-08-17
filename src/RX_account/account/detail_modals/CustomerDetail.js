import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        Button, TouchableOpacity, Modal, Alert } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import NavigationHeader from '../../baseComponent/NavigationHeader';

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
              return (
                <View style={styles.summarizeView}>
                  <Text style={styles.titleText}>{customer.name}</Text>
                  <Text style={styles.infoText}>地址：{customer.address}</Text>
                  <Text style={styles.infoText}>编号：{customer.id}</Text>
                  <Text style={styles.infoText}>电话：{customer.phone}</Text>

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