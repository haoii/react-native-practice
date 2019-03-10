
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from 'react-native-picker';

import URL from '../../Config';
import GeneralInput from '../../forms/GeneralInput';
import DateInput from '../../forms/DateInput';
import ChooseOneInput from '../../forms/ChooseOneInput';
import InputPlaceholder from '../../forms/InputPlaceholder';
import ParagraphInput from '../../forms/ParagraphInput';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class PlaceOrderForm extends Component {
  constructor(props) {
    super(props);

    this.ready_to_commit = false;
    this.customers_data = [];
    this._initCustomerNameData();

    this.order_items = [];

    this.state = { 

      customer_addresses: new Set(),

      remark_value: '',
      remark_comFlag: true,

      order_date: this._getCurDate(),

      customers_data_ready: false,
    };
  }

  _getCurDate = () => {
    let t = new Date();
    return '' + t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate();
  }

  _initCustomerNameData = () => {
    fetch(URL.customers)
      .then(response => response.json())
      .then(responseJson => {
        let arrData = responseJson.latest_customers;
        this.customers_data = arrData.map(item => item.name + '(' + item.address + ')')
        this.setState({customers_data_ready:true});

      }).catch(error => {
        alert(error);
      });
  }

  _submitPost = () => {

    if (!this.ready_to_commit)
      return;

    let formData = new FormData();
    formData.append("order_date", this.state.order_date);
    formData.append("remark", this.state.remark_value);
    
    fetch(URL.submit_collect_from_customer,{
      method:'POST',
      body:formData,
    })
    .then((response) => response.text())
    .then((ret)=>{
      if (ret !== 'success')
        alert(ret);
      else
        this.props.navigation.goBack();
    })
    .catch((error)=>{alert(error)});
  }

  _checkComplete = () => {
    keys = Object.keys(this.state);
    for (let i = 0; i < keys.length; i++) 
      if (keys[i].length > 7 && keys[i].slice(-7) === 'comFlag') 
        if (!this.state[keys[i]]) {
          this.ready_to_commit = false;
          return false;
        }
    this.ready_to_commit = true;
    return true;
  }

  _renderDemandListEachCutomer = (address, items) => {
    let index = 1;
    return items.map(item => {
      if (item.customer_address === address)
        return (
          <View style={index>1? styles.TableRowItemContainerAfter2: styles.TableRowItemContainer}>
            <Text style={[styles.orderItemText, {width: 30}]}>{index++}</Text>
            <Text style={[styles.orderItemText, {flex: 1}]}>{item.material}</Text>
            <Text style={[styles.orderItemText, {width: 60, textAlign:'right'}]}>
              {item.quantity}{item.material_unit}
            </Text>
          </View>
        );
    });
  }

  _addCustomer = () => {
    Picker.init({
      pickerData: this.customers_data,
      onPickerConfirm: data => {
        tmp_addresses = this.state.customer_addresses;
        tmp_addresses.add(data[0]);
        this.setState({
          customer_addresses: tmp_addresses,
        });
      },
      pickerFontSize: 14,
      pickerTextEllipsisLen: 10,
    });
    Picker.show();
  }

  render() {

    const { navigation } = this.props;
    const order_item = navigation.getParam('order_item', null);
    if (order_item) {
      navigation.setParams({order_item: null});
      this.order_items.push(order_item);
    }

    // const items = [{"item_num": 1, "material": "\u8bfa\u8d1d\u5c14-4129", "material_unit": "\u5757", "supplier": "\u8bfa\u8d1d\u5c14\u74f7\u7816\u4e13\u5356\u5e97", "customer_name": "WangLiu", "customer_address": "Baker Street 2-3", "quantity": 25.0, "price": 250.0, "is_paid": false, "remark": null}, {"item_num": 2, "material": "\u5bc6\u5ea6\u677f-\u578b\u53f71", "material_unit": "\u5f20", "supplier": "2\u53f7\u6728\u6750\u5e97", "customer_name": "WangQi", "customer_address": "Baker Street 2-4", "quantity": 10.0, "price": 160.0, "is_paid": false, "remark": null}, {"item_num": 3, "material": "\u8bfa\u8d1d\u5c14-4129", "material_unit": "\u5757", "supplier": "\u8bfa\u8d1d\u5c14\u74f7\u7816\u4e13\u5356\u5e97", "customer_name": "\u738b\u4e94", "customer_address": "\u94b0\u68651-2-3", "quantity": 30.0, "price": 250.0, "is_paid": false, "remark": null}, {"item_num": 4, "material": "\u5bc6\u5ea6\u677f-\u578b\u53f71", "material_unit": "\u5f20", "supplier": "2\u53f7\u6728\u6750\u5e97", "customer_name": "\u738b\u4e94", "customer_address": "\u94b0\u68651-2-3", "quantity": 5.0, "price": 160.0, "is_paid": false, "remark": null}, {"item_num": 5, "material": "\u7ec6\u6728\u5de5\u677f-\u578b\u53f71", "material_unit": "\u5f20", "supplier": "2\u53f7\u6728\u6750\u5e97", "customer_name": "\u738b\u4e94", "customer_address": "\u94b0\u68651-2-3", "quantity": 2.0, "price": 200.0, "is_paid": false, "remark": null}];
    // const items = [];


    let suppliers = new Set();
    this.order_items.forEach(i => {suppliers.add(i.supplier);});


    return (
      <View style={styles.container}>

        <View style={styles.headerContainer}>
          <TouchableHighlight style={styles.cancelBtn}
            onPress={() => this.props.navigation.navigate('MainBottomTab')}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableHighlight>

          <TouchableHighlight style={!this._checkComplete()?styles.btn:styles.activeBtn} onPress={this._submitPost}>
            <Text style={!this._checkComplete()?styles.btnText:styles.activeBtnText}>确认</Text>
          </TouchableHighlight>
        </View>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} style={styles.keyboardAvoiding} enabled>
          <ScrollView contentContainerStyle={styles.ScrollViewStyle}>
            <View style={styles.Canvas}>


              <View style={styles.tableContainer}>
                <Text style={styles.level2TitleText}>各工地材料需求单</Text>

                <View style={styles.TableRowItemContainer}>
                  <Text style={[styles.orderItemHeaderText, {width: 35}]}>序号</Text>
                  <Text style={[styles.orderItemHeaderText, {flex: 1}]}>材料</Text>
                  <Text style={[styles.orderItemHeaderText, {width: 60, textAlign:'right'}]}>数量</Text>
                </View>

                {[...this.state.customer_addresses].map(customer_address => {
                  return (
                    <View>
                      <View style={styles.tableInnerTitleRowView}>
                        <View style={{width:80}}></View>
                        <Text style={styles.tableInnerTitleView}>{customer_address}</Text>
                        <TouchableHighlight onPress={() => {this.props.navigation.navigate('AddOrderItemForm', {
                          customer_address: customer_address,
                        })}}>
                          <Text style={styles.addMaterialBtnView}>添加材料</Text>
                        </TouchableHighlight>
                      </View>
                      
                      {this._renderDemandListEachCutomer(customer_address, this.order_items)}
                    </View>
                  );
                })}

                {!this.state.customers_data_ready
                  ? <Text style={styles.tableOperateRowText}>正在获取工地信息...</Text>
                  : <TouchableHighlight onPress={this._addCustomer}>
                      <Text style={styles.tableOperateRowText}>添加工地</Text>
                    </TouchableHighlight>}

              </View>

              <View style={{paddingHorizontal: 15}}>

                <DateInput 
                  label='订单日期' init_date={this.state.order_date}
                  onEndEditing={(date) => {
                    this.setState({
                      order_date: date,
                    })}}/> 

                <ParagraphInput 
                  label='备注' allow_empty={true}
                  onEndEditing={(isValid, num) => {
                    this.setState({
                      remark_comFlag: isValid,
                      remark_value: num,
                    });}} />   

              </View>  

            </View>
          </ScrollView>
        </KeyboardAvoidingView>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  tableContainer: {
    marginHorizontal:15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  level2TitleText: {
    fontSize:18,
    color:'black',
    textAlign:'center',
    height:40,
    backgroundColor:'lightgray',
    textAlignVertical:'center',
  },
  tableInnerTitleText: {
    fontSize: 16,
    height: 30,
    textAlign:'center',
    textAlignVertical:'center',
    backgroundColor:'lightgray',
  },

  tableInnerTitleView: {
    flex:1, 
    textAlign:'center', 
    textAlignVertical:'center',
    fontSize:16,
  },
  addMaterialBtnView: {
    color:'#E4572E',
    width:80, 
    height:30, 
    textAlign:'right', 
    textAlignVertical:'center', 
    fontSize:16, 
    paddingRight:10,
  },

  tableInnerTitleRowView: {
    flexDirection:'row',
    alignItems: 'center',
    height: 30,
    backgroundColor:'lightgray',
  },

  tableOperateRowText: {
    fontSize: 16,
    height: 30,
    textAlign:'center',
    textAlignVertical:'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    color:'#E4572E',
  },


  TableRowItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 30,
  },
  TableRowItemContainerAfter2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 30,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  orderItemHeaderText: {
    fontSize: 14,
    fontWeight:'bold',
    flexWrap: 'wrap',
    textAlign:'left',
  },
  orderItemText: {
    fontSize: 14,
    flexWrap: 'wrap',
    textAlign:'left',
  },



  loadding: {
    marginTop: 100
  },

  ScrollViewStyle: {
    // paddingLeft:15,
    // paddingRight:15,
    // flexGrow:1,
  },
  keyboardAvoiding: {
    height:size.height-80,
  },
  Canvas: {
    paddingTop:15,
    paddingBottom:50
  },

  container:{
    paddingVertical:15,
    height:size.height,
    backgroundColor: '#F5F5F5',
    justifyContent:'flex-start',
  },
  headerContainer:{
    height:50,
    paddingBottom:15,
    paddingHorizontal:15,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  cancelBtn:{
    height:35,
    width:60,
    alignItems:'flex-start',
    justifyContent:"center",
    borderRadius:6,
  },
  btn:{
    height:35,
    width:60,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:6,
    borderColor:"#ccd6dd",
    backgroundColor:'#6699cc',
    borderWidth:1
  },
  activeBtn:{
    height:35,
    width:60,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:6,
    backgroundColor:"#2aa2ef"
  },
  cancelText:{
    color:"#3B3B3B",
    fontSize:18
  },
  text:{
    color:"#ccd6dd",
    fontSize:18
  },
  btnText:{
    color:"#ccd6dd",
    fontSize:14
  },
  activeBtnText:{
    color:"#fff",
    fontSize:14
  },
});