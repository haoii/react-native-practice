
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
          } from 'react-native';

import SupplierDetailMaterials from './SupplierDetailMaterials';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class SupplierDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '                      材料商',
    };
  };

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = { 
    };
  }


  render() {
    const { navigation } = this.props;
    const supplier = navigation.getParam('supplier'); 

    let total_expense_pixel = size.width - 30;
    let expense_paid_pixel = (supplier.expense_paid / supplier.total_expense) * total_expense_pixel;

    return (
      <View style={styles.container}>
        <View style={styles.summarizeView}>
          <Text style={styles.titleText}>{supplier.name}</Text>
          <Text style={styles.infoText}>地址：{supplier.address}</Text>
          <Text style={styles.infoText}>编号：{supplier.id}</Text>
          <Text style={styles.infoText}>电话：{supplier.phone}</Text>

        
          <View style={styles.progressBarView}>
            <View style={[styles.progressBarBase, {width:total_expense_pixel, backgroundColor:'red'}]}></View>
            <View style={[styles.progressBar, {width:expense_paid_pixel, backgroundColor:'blue'}]}></View>
          </View>

          <View style={styles.detailView}>
            <Text style={[styles.minorText, {color:'blue'}]}>已支付</Text>
            <Text style={styles.minorText}>/</Text>
            <Text style={[styles.minorText, {color:'red'}]}>开销</Text>
            <Text style={styles.minorText}>：</Text>
            <Text style={styles.minorText}>
              {Math.floor(supplier.expense_paid)}/{Math.floor(supplier.total_expense)}
            </Text>
          </View>
        </View>
        <Text style={styles.materialTitleText}>出售的材料</Text>
        <SupplierDetailMaterials supplier_id={supplier.id} /> 
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:15,
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

  materialTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom:6,
  },

  minorText: {
    fontSize:16,
  },
  progressBarView: {
    height:35,
  },
  progressBarBase: {
    height:10, 
    borderRadius:5, 
    position:'absolute', 
    left:0, 
    top:20,
  },
  progressBar: {
    height:10, 
    borderTopLeftRadius:5, 
    borderBottomLeftRadius:5,
    position:'absolute', 
    left:0, 
    top:20,
  },
  detailView: {
    flexDirection:'row',
    paddingBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#efefef',
  },

});