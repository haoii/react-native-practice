
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        ScrollView } from 'react-native';

import SupplierDetailMaterials from './SupplierDetailMaterials';
import NavigationHeader from '../../baseComponent/NavigationHeader';
import MaterialOrderInSupplierList from '../display_list/SupplierManage/MaterialOrderInSupplierList';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class SupplierDetail extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.supplier = this.props.navigation.getParam('supplier', null);
    let data_ready = true; 
    if (!this.supplier) {
      data_ready = false;
      let supplier_id = this.props.navigation.getParam('supplier_id', null);
      this._getSupplierData(supplier_id);
    }

    this.state = { 
      data_ready: data_ready,
    };
  }

  _getSupplierData = (supplier_id) => {

    let formData = new FormData();
    formData.append("id", supplier_id);

    fetch(URL.supplier_by_id, {
      method:'POST',
      body:formData,
      credentials: 'same-origin',
    }).then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          this.supplier = responseJson.data;
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


  render() {    

    return (
      <View style={styles.mainContainer}>
        <NavigationHeader navigation={this.props.navigation} 
          title='材料商'
          operations={{
            '添加出售的材料': () => {
              if (this.supplier)
                this.props.navigation.push('AddMaterialInSupplier', {
                  supplier: this.supplier,
                });
            },
          }}
        />

        {this.state.data_ready
          ? (() => {
              let supplier = this.supplier; 
              let total_expense_pixel = size.width - 30;
              let expense_paid_pixel = (supplier.expense_paid / supplier.total_expense) * total_expense_pixel;

              return (
                <ScrollView style={{}}>
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

                    <Text style={styles.materialTitleText}>材料订单</Text>
                    <MaterialOrderInSupplierList supplier_id={supplier.id} 
                      navigation={this.props.navigation}/>


                  </View>
                </ScrollView>
              );
            })()
          : <View>
              <Text>正在加载...</Text>
            </View>}

      </View>);
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    height:size.height-20,
    backgroundColor: '#fff',
    justifyContent:'flex-start'
  },
  container: {
    paddingVertical:15,
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