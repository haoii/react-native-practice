import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        Button, TouchableOpacity, Modal } from 'react-native';
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
    this.state = { 
    };
  }



  render() {
    const { navigation } = this.props;
    const customer = navigation.getParam('customer', null);

    return (
      <View style={styles.container}>
        <NavigationHeader navigation={this.props.navigation} 
          title='客户'
          operations={{
            '编辑': () => {
              this.props.navigation.push('AddCustomerForm', {
                customerToUpdate: customer,
              });
            },
            'test2': () => alert('tt22'),
          }}
        />

        <View style={styles.summarizeView}>
          <Text style={styles.titleText}>{customer.name}</Text>
          <Text style={styles.infoText}>地址：{customer.address}</Text>
          <Text style={styles.infoText}>编号：{customer.id}</Text>
          <Text style={styles.infoText}>电话：{customer.phone}</Text>

        </View>
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