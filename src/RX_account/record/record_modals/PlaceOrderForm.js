
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView, ActivityIndicator, Alert } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
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

    this.customers_data = [];
    this._initCustomerNameData();

    this.customer_demand_items = {};
    this.material_demand_sum = {};

    this.state = {   
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

    if (!this._checkComplete())
      return;

    let formData = new FormData();
    formData.append("order_date", this.state.order_date);
    formData.append("remark", this.state.remark_value);
    
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
        if (!this.state[keys[i]]) 
          return false;
    return true;
  }

  _addCustomer = () => {
    Picker.init({
      pickerData: this.customers_data,
      onPickerConfirm: data => {
        if (data[0] in this.customer_demand_items) {
          alert('该客户已存在');
        } else {
          this.customer_demand_items[data[0]] = [];
        }
        this.setState({});
      },
      pickerFontSize: 14,
      pickerTextEllipsisLen: 10,
    });
    Picker.show();
  }

  _renderDemandListEachCutomer = (items) => {
    let index = 1;
    return items.map(item => {
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
                  // {text: '确认取消', onPress: () => {this._delItemByMaterialAddress(customer_address, item.material);}},
                ],
                { cancelable: false }
              );}}>
            <IconIonicons name='ios-close-circle-outline' size={23} color='#E4572E' />
          </TouchableHighlight>
        </View>
      );
    });
  }

  _renderPurchaseListEachMaterial = (items) => {
    let index = 1;
    return items.map(item => {
      return (
        <View style={[index>1? styles.TableRowItemContainerAfter2: styles.TableRowItemContainer, {paddingRight:0}]}>
          <Text style={[styles.orderItemText, {width: 30}]}>{index++}</Text>
          <Text style={[styles.orderItemText, {flex: 1}]}>{item.supplier}</Text>
          <Text style={[styles.orderItemText, {width: 55, textAlign:'right'}]}>{item.price}</Text>
          <Text style={[styles.orderItemText, {width: 60, textAlign:'right'}]}>
            {item.quantity}{item.material_unit}
          </Text>
          <Text style={[styles.orderItemText, {width: 55, textAlign:'right'}]}>{Math.floor(item.price * item.quantity)}</Text>
          <TouchableHighlight style={styles.delItemBtnView}
            onPress={() => {
              Alert.alert(
                null,
                '确认材料来源：' + item.supplier + '？',
                [
                  {text: '不取消', onPress: () => {}, style: 'cancel'},
                  // {text: '确认取消', onPress: () => {this._delItemByMaterialAddress(customer_address, item.material);}},
                ],
                { cancelable: false }
              );}}>
            <IconIonicons name='ios-close-circle-outline' size={23} color='#E4572E' />
          </TouchableHighlight>
        </View>
      );
    });
  }

  _add_order_demand_item = (item) => {
    this.customer_demand_items[item.customer_address].push(item);
    if (item.material in this.material_demand_sum) {
      this.material_demand_sum[item.material].quantity += item.quantity;
      this.material_demand_sum[item.material].purchase_complete = false;
    }
    else {
      this.material_demand_sum[item.material] = {
        unit: item.material_unit,
        quantity:item.quantity,
        quantity_purchased:0,
        purchase_complete:false,
        purchase_items:[],
      };
    }


  }

  _add_order_purchase_item = (item) => {
    this.material_demand_sum[item.material].purchase_items.push(item);
    this.material_demand_sum[item.material].quantity_purchased += item.quantity;
  }

  render() {

    const { navigation } = this.props;
    const order_demand_item = navigation.getParam('order_demand_item', null);
    if (order_demand_item) {
      navigation.setParams({order_demand_item: null});
      this._add_order_demand_item(order_demand_item);
    }
    const order_purchase_item = navigation.getParam('order_purchase_item', null);
    if (order_purchase_item) {
      navigation.setParams({order_purchase_item: null});
      this._add_order_purchase_item(order_purchase_item);
    }

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

                {Object.keys(this.customer_demand_items).map(customer_address => {
                  return (
                    <View>
                      <View style={styles.tableInnerTitleRowView}>

                        <TouchableHighlight style={styles.addMaterialView}
                          onPress={() => {this.props.navigation.navigate('AddOrderDemandItemForm', {
                            customer_address: customer_address,
                        })}}>
                          <Text style={styles.addMaterialBtnText}>添加材料</Text>
                        </TouchableHighlight>

                        <Text style={styles.tableInnerTitleView}>{customer_address}</Text>

                        <TouchableHighlight style={styles.delCustomerBtnView} 
                          onPress={() => {
                            Alert.alert(
                              null,
                              '确认取消采购该工地的所有材料：' + customer_address + '？',
                              [
                                {text: '不取消', onPress: () => {}, style: 'cancel'},
                                // {text: '确认取消', onPress: () => {this._delItemByAddress(customer_address);}},
                              ],
                              { cancelable: false }
                            );
                          }}>
                          <IconFeather name='delete' size={23} color='#E4572E' />
                        </TouchableHighlight>

                      </View>
                      
                      {this._renderDemandListEachCutomer(this.customer_demand_items[customer_address])}
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
                <Text style={styles.level2TitleText}>材料来源</Text>

                <View style={styles.TableRowItemContainer}>
                  <Text style={[styles.orderItemHeaderText, {width: 35}]}>序号</Text>
                  <Text style={[styles.orderItemHeaderText, {flex: 1}]}>来源</Text>
                  <Text style={[styles.orderItemHeaderText, {width: 55, textAlign:'right'}]}>单价</Text>
                  <Text style={[styles.orderItemHeaderText, {width: 60, textAlign:'right'}]}>数量</Text>
                  <Text style={[styles.orderItemHeaderText, {width: 55, textAlign:'right'}]}>价格</Text>
                  <View style={{width:20}}></View>
                </View>

                {Object.keys(this.material_demand_sum).map(material => {
                  return (
                    <View>
                      <View style={styles.tableInnerTitleRowView}>

                        <TouchableHighlight style={styles.addMaterialView}
                          onPress={() => {this.props.navigation.navigate('AddOrderPurchaseItemForm', {
                            material:material,
                            unit:this.material_demand_sum[material].unit,

                        })}}>
                          <Text style={styles.addMaterialBtnText}>添加来源</Text>
                        </TouchableHighlight>

                        <Text style={styles.tableInnerTitleView}>
                          {material}（已购：{this.material_demand_sum[material].quantity_purchased}/{this.material_demand_sum[material].quantity} 100元
                        </Text>

                        <TouchableHighlight style={styles.delCustomerBtnView} 
                          onPress={() => {
                            Alert.alert(
                              null,
                              '确认删除所有来源：' + material + '？',
                              [
                                {text: '不取消', onPress: () => {}, style: 'cancel'},
                                // {text: '确认取消', onPress: () => {this._delItemByAddress(customer_address);}},
                              ],
                              { cancelable: false }
                            );
                          }}>
                          <IconFeather name='delete' size={23} color='#E4572E' />
                        </TouchableHighlight>

                      </View>
                      
                      {this._renderPurchaseListEachMaterial(this.material_demand_sum[material].purchase_items)}
                    </View>
                  );
                })}

              </View>

              <View style={{paddingHorizontal: 15}}>

                <DateInput 
                  label='订单日期' init_date={this.state.order_date}
                  onEndEditing={(date) => {
                    this.setState({
                      order_date:date,
                    });}}/> 

                <ParagraphInput 
                  label='备注' allow_empty={true}
                  onEndEditing={(isValid, num) => {
                    this.setState({
                      remark_comFlag:isValid,
                      remark_value:num,
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