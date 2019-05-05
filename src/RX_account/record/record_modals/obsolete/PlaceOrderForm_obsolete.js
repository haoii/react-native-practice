
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView, ActivityIndicator, Alert } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Picker from 'react-native-picker';

import URL from '../../../Config';
import GeneralInput from '../../../forms/GeneralInput';
import DateInput from '../../../forms/DateInput';
import ChooseOneInput from '../../../forms/ChooseOneInput';
import InputPlaceholder from '../../../forms/InputPlaceholder';
import ParagraphInput from '../../../forms/ParagraphInput';

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

    this.suppliers_paid = {};

    this.state = { 

      customer_addresses: new Set(),

      remark_value: '',
      remark_comFlag: true,

      order_date: this._getCurDate(),

      customers_data_ready: false,

      manual_update: true,
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
    formData.append('order_items', JSON.stringify(this.order_items));
    formData.append('suppliers_paid', JSON.stringify(this.suppliers_paid));
    
    fetch(URL.add_material_order,{
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

    if (this.order_items.length === 0) {
      this.ready_to_commit = false;
      return false;
    }

    this.ready_to_commit = true;
    return true;
  }

  _delItemByMaterialAddress = (customer_address, material) => {
    for (let i=0; i<this.order_items.length; i++) {
      if (this.order_items[i].customer_address === customer_address 
          && this.order_items[i].material === material) {
            this.order_items.splice(i, 1);
          }
    }
    this.setState({
      manual_update: true,
    });
  }

  _delItemByAddress = (customer_address) => {
    for (let i=0; i<this.order_items.length; i++) {
      if (this.order_items[i].customer_address === customer_address) {
        this.order_items.splice(i, 1);
        i--;
      }
    }
    tmp_addresses = this.state.customer_addresses;
    tmp_addresses.delete(customer_address);
    this.setState({
      customer_addresses: tmp_addresses,
    });
  }

  _renderDemandListEachCutomer = (customer_address, items) => {
    let index = 1;
    return items.map(item => {
      if (item.customer_address === customer_address)
        return (
          <View style={[index>1? styles.TableRowItemContainerAfter2: styles.TableRowItemContainer, {paddingRight:0}]}>
            <Text style={[styles.orderItemText, {width: 30}]}>{index++}</Text>
            <Text style={[styles.orderItemText, {flex: 1}]}>{item.material}</Text>
            <Text style={[styles.orderItemText, {width: 60, textAlign:'right'}]}>
              {item.quantity}{item.material_unit}
            </Text>
            <TouchableHighlight style={styles.delItemBtnView}
              onPress={() => {
                Alert.alert(
                  null,
                  '确认取消采购材料：' + item.material + '？',
                  [
                    {text: '不取消', onPress: () => {}, style: 'cancel'},
                    {text: '确认取消', onPress: () => {this._delItemByMaterialAddress(customer_address, item.material);}},
                  ],
                  { cancelable: false }
                );}}>
              <IconIonicons name='ios-close-circle-outline' size={23} color='#E4572E' />
            </TouchableHighlight>
          </View>
        );
    });
  }

  _renderPurchaseListEachSupplier = (supplier, items) => {

    let quantities = {};
    let material_info = {};
    let total_expense = 0;
    items.forEach(item => {
      if (item.supplier === supplier) {
        let key = [item.material, item.price];
        total_expense += item.price * item.quantity;
        if (key in quantities)
          quantities[key] += item.quantity;
        else {
          quantities[key] = item.quantity;
          material_info[key] = item;
        }
      }
    });

    return (
      <View>
        <View style={styles.tableInnerTitleRowView}>
          <View style={{width:70}}></View>
          <Text style={styles.tableInnerTitleText}>{supplier} (合计{Math.floor(total_expense)}元)</Text>
          <TouchableHighlight onPress={() => {
            this.suppliers_paid[supplier] = !this.suppliers_paid[supplier];
            this.setState({manual_update: true});
          }}>
            <View style={styles.paidCheckView}>
              <Text>已支付</Text>
              {this.suppliers_paid[supplier]
                ? <IconMaterialCommunity name='check-circle' size={23} color='#E4572E' />
                : <IconMaterialCommunity name='checkbox-blank-circle-outline' size={23} color='#E4572E' />}
            </View> 
          </TouchableHighlight>
          
        </View>
        
        {Object.keys(quantities).map((key, index) => {
          return (
            <View style={index>0? styles.TableRowItemContainerAfter2: styles.TableRowItemContainer}>
              <Text style={[styles.orderItemText, {width: 30}]}>{index+1}</Text>
              <Text style={[styles.orderItemText, {flex: 1}]}>{material_info[key].material}</Text>
              <Text style={[styles.orderItemText, {width: 55, textAlign:'right'}]}>{material_info[key].price}</Text>
              <Text style={[styles.orderItemText, {width: 60, textAlign:'right'}]}>
                {quantities[key]}{material_info[key].material_unit}
              </Text>
              <Text style={[styles.orderItemText, {width: 55, textAlign:'right'}]}>{Math.floor(material_info[key].price * quantities[key])}</Text>
            </View>
          );
        })}
      </View>
    );
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

      if (this.suppliers_paid[order_item.supplier] === undefined)
        this.suppliers_paid[order_item.supplier] = false;
    }

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
                  <View style={{width:20}}></View>
                </View>

                {[...this.state.customer_addresses].map(customer_address => {
                  return (
                    <View>
                      <View style={styles.tableInnerTitleRowView}>

                        <TouchableHighlight style={styles.addMaterialView}
                          onPress={() => {this.props.navigation.navigate('AddOrderItemForm', {
                            customer_address: customer_address,
                        })}}>
                          <Text style={styles.addMaterialBtnText}>添加材料</Text>
                          {/* <IconIonicons name='ios-add-circle-outline' size={23} color='#E4572E' /> */}
                        </TouchableHighlight>

                        <Text style={styles.tableInnerTitleView}>{customer_address}</Text>

                        <TouchableHighlight style={styles.delCustomerBtnView} 
                          onPress={() => {
                            Alert.alert(
                              null,
                              '确认取消采购该工地的所有材料：' + customer_address + '？',
                              [
                                {text: '不取消', onPress: () => {}, style: 'cancel'},
                                {text: '确认取消', onPress: () => {this._delItemByAddress(customer_address);}},
                              ],
                              { cancelable: false }
                            );
                          }}>
                          <IconFeather name='delete' size={23} color='#E4572E' />
                        </TouchableHighlight>

                      </View>
                      
                      {this._renderDemandListEachCutomer(customer_address, this.order_items)}
                    </View>
                  );
                })}

                {!this.state.customers_data_ready
                  ? <Text style={styles.tableOperateRowText}>正在获取工地信息...</Text>
                  : <TouchableHighlight style={styles.tableOperateRowView} 
                      onPress={this._addCustomer}>
                      <Text style={styles.tableOperateRowText}>添加工地</Text>
                    </TouchableHighlight>}

              </View>

              <View style={styles.tableContainer}>
                <Text style={styles.level2TitleText}>各材料商材料采购单</Text>

                <View style={styles.TableRowItemContainer}>
                  <Text style={[styles.orderItemHeaderText, {width: 35}]}>序号</Text>
                  <Text style={[styles.orderItemHeaderText, {flex: 1}]}>材料</Text>
                  <Text style={[styles.orderItemHeaderText, {width: 55, textAlign:'right'}]}>单价</Text>
                  <Text style={[styles.orderItemHeaderText, {width: 60, textAlign:'right'}]}>数量</Text>
                  <Text style={[styles.orderItemHeaderText, {width: 55, textAlign:'right'}]}>价格</Text>
                </View>

                {[...suppliers].map(supplier => {
                  return this._renderPurchaseListEachSupplier(supplier, this.order_items);
                })}

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
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor:'white',
  },
  level2TitleText: {
    fontSize:18,
    color:'black',
    textAlign:'center',
    height:40,
    backgroundColor:'#e8e8e8',
    textAlignVertical:'center',
  },
  tableInnerTitleText: {
    fontSize: 16,
    height: 30,
    flex:1,
    textAlign:'center',
    textAlignVertical:'center',
    backgroundColor:'#e8e8e8',
  },
  paidCheckView: {
    width:70,
    height:30,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
  },
  paidCheckText: {
    fontSize:14,
    color:'#E4572E',
  },


  tableInnerTitleView: {
    flex:1, 
    textAlign:'center', 
    textAlignVertical:'center',
    fontSize:16,
  },

  addMaterialView: {
    width:90, 
    height:30, 
    paddingLeft:10,
    justifyContent: 'center',
    alignItems:'flex-start',
  },
  addMaterialBtnText: {
    color:'#E4572E',
    height: 20,
    textAlignVertical:'center', 
    fontSize:14, 
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'#E4572E',
    paddingHorizontal:8,
  },

  delItemBtnView: {
    height:30, 
    width:30, 
    justifyContent:'center', 
    alignItems:'flex-end'
  },
  delCustomerBtnView: {
    width:30, 
    height:30, 
    marginLeft:60, 
    justifyContent:'center', 
    alignItems:'flex-end'
  },

  tableInnerTitleRowView: {
    flexDirection:'row',
    alignItems: 'center',
    height: 30,
    backgroundColor:'#e8e8e8',
  },

  tableOperateRowView: {
    height:30,
    justifyContent:'center',
    alignItems:'center',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  tableOperateRowText: {
    color:'#E4572E',
    height: 20,
    textAlignVertical:'center', 
    fontSize:14, 
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'#E4572E',
    paddingHorizontal:8,
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
    borderTopColor: '#e8e8e8',
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