
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView, ActivityIndicator, Alert } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Picker from 'react-native-picker';

import URL, {EPSILON} from '../../Config';
import GeneralInput from '../../forms/GeneralInput';
import DateInput from '../../forms/DateInput';
import DateTimeInput from '../../forms/DateTimeInput';
import ChooseOneInput from '../../forms/ChooseOneInput';
import InputPlaceholder from '../../forms/InputPlaceholder';
import ParagraphInput from '../../forms/ParagraphInput';
import ImageInput from '../../forms/ImageInput';
import DeviceStorage from '../../DeviceStorage';

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

    this.new_order_id = 0;
    this._receiveNewOrderId();

    this.user_info = null;
    DeviceStorage.get('user_info').then((info) => {
      this.user_info = info;
    });

    this.from_purchase_sum = {};

    this.customer_demand_items = {};
    this.material_demand_sum = {};

    this.from_paid = {};

    this.state = {   
      remark_value: '',
      remark_comFlag: true,

      remark_imgs:[],
      
      order_datetime: this._getCurDate(),

      customers_data_ready: false,
    };
  }

  _getCurDate = () => {
    let dt = new Date();
    let dts = '' + dt.getFullYear();
    let month = dt.getMonth()+1;
    dts += '-' + (month < 10? ('0'+month): month);
    let day = dt.getDate();
    dts += '-' + (day < 10? ('0'+day): day);
    let hour = dt.getHours();
    dts += ' ' + (hour < 10? ('0'+hour): hour);
    let minute = dt.getMinutes();
    dts += ':' + (minute < 10? ('0'+minute): minute);
    let second = dt.getSeconds();
    dts += ':' + (second < 10? ('0'+second): second);
    return dts;
  }

  _initCustomerNameData = () => {
    fetch(URL.customers_table_by_date, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          if (responseJson.data.length === 0) {
            alert('还没有客户数据~');
            this.props.navigation.goBack();
          } else {
            this.customers_data = responseJson.data;
            this.setState({customers_data_ready:true});
          }
        } else if (responseJson.msg === 'not_logged_in') {
          alert('您还没有登录~');
          this.props.navigation.goBack();
        } else {
          alert('出现未知错误');
          this.props.navigation.goBack();
        }

      }).catch(error => {
        alert('服务器出错了');
        this.props.navigation.goBack();
      });
  }

  _receiveNewOrderId = () => {
    fetch(URL.get_material_order_id, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          this.new_order_id = responseJson.data;
        } else if (responseJson.msg === 'not_logged_in') {
          alert('您还没有登录~');
          this.props.navigation.goBack();
        } else {
          alert('出现未知错误');
          this.props.navigation.goBack();
        }

      }).catch(error => {
        alert('服务器出错了');
        this.props.navigation.goBack();
      });
  }

  _submitPost = () => {

    

    // this.props.navigation.navigate('OrderReceiptsGenerator', {
    //   customer_demand_items: {'谢村忠(钻石湾7-1-1402)':[{"customer_address":"谢村忠(钻石湾7-1-1402)", "material":"诺贝尔-B49", "material_unit":"块", "quantity": 5, "remark": "test"},
    //                                            {"customer_address":"谢村忠(钻石湾7-1-1402)", "material":"马可波罗-A12-4", "material_unit":"块", "quantity": 8, "remark": ""}],
    //                           '唐昕(大华锦绣5-2-402)':[{"customer_address":"唐昕(大华锦绣5-2-402)", "material":"诺贝尔-B49", "material_unit":"块", "quantity": 10, "remark": ""}]},
    //   from_purchase_sum: {"瓷砖店-李":{"expense":4280, "type":"supplier", "purchase_items":[{"material":"诺贝尔-B49", "material_unit":"块", "from":"瓷砖店-李", "price":500, "quantity": 10, "remark":"", "type":"supplier"},
    //                                                                     {"material":"马可波罗-A12-4", "material_unit":"块", "from":"瓷砖店-李", "price":450, "quantity": 8, "remark":"", "type":"supplier"}]},
    //                       "华南2号仓库":{"expense":2000, "type":"warehouse", "purchase_items":[{"material":"诺贝尔-B49", "material_unit":"块", "from":"华南2号仓库", "price":400, "quantity": 5, "remark":"test", "type":"warehouse"}]}},
    //   order_datetime: this.state.order_datetime,
    //   new_order_id: this.new_order_id,
    //   user_info: this.user_info,
    // });
    // return;

    if (!this._checkComplete())
      return;

    this.props.navigation.setParams({waiting_render_img: true});
    this.setState();

    this.props.navigation.navigate('OrderReceiptsGenerator', {
      customer_demand_items: this.customer_demand_items,
      from_purchase_sum: this.from_purchase_sum,
      material_demand_sum: this.material_demand_sum,
      order_datetime: this.state.order_datetime,
      from_paid: this.from_paid,

      new_order_id: this.new_order_id,
      user_info: this.user_info,
      remark: this.state.remark_value,
      remark_imgs:this.state.remark_imgs,
    });
    return;

    
    let formData = new FormData();
    formData.append("order_datetime", this.state.order_datetime);
    formData.append("remark", this.state.remark_value);
    formData.append('customer_demand_items', JSON.stringify(this.customer_demand_items));
    formData.append('material_demand_sum', JSON.stringify(this.material_demand_sum));
    formData.append('from_paid', JSON.stringify(this.from_paid));
    
    fetch(URL.add_material_order,{
      method:'POST',
      body:formData,
      credentials: 'same-origin',
    })
    .then((response) => response.json())
    .then((responseJson)=>{
      if (responseJson.msg === 'success') {
        this.props.navigation.goBack();
      }  else if (responseJson.msg === 'not_logged_in') {
        alert('您还没有登录~');
        this.props.navigation.navigate('MainBottomTab');
      } else {
        alert('出现未知错误');
        this.props.navigation.navigate('MainBottomTab');
      }

    }).catch((error) => {
      alert('服务器出错了');
      this.props.navigation.navigate('MainBottomTab');
    });
  }

  _checkComplete = () => {
    keys = Object.keys(this.state);
    for (let i = 0; i < keys.length; i++) 
      if (keys[i].length > 7 && keys[i].slice(-7) === 'comFlag') 
        if (!this.state[keys[i]]) 
          return false;

    let materials = Object.keys(this.material_demand_sum);
    if (materials.length === 0)
      return false;

    for (let i=0; i<materials.length; i++)
      if (!this.material_demand_sum[materials[i]].purchase_complete)
        return false;

    return true;
  }

  _addCustomer = () => {
    Picker.init({
      pickerData: this.customers_data,
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择客户',
      wheelFlex: [2, 1, 8],
      onPickerConfirm: data => {
        if (data[0] in this.customer_demand_items) {
          alert('添加失败：该客户已存在。');
        } else {
          this.customer_demand_items[data[2]] = [];
          this.setState({});
        }
      },
      pickerFontSize: 14,
      pickerTextEllipsisLen: 15,
    });
    Picker.show();
  }

  _renderDemandListEachCutomer = (customer_address, items) => {
    let index = 1;
    return items.map(item => {
      return (
        <View>
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
                  '确认取消采购该材料：' + item.material + '？',
                  [
                    {text: '不取消', onPress: () => {}, style: 'cancel'},
                    {text: '确认取消', onPress: () => {this._delDemandItemByMaterial(customer_address, item);}},
                  ],
                  { cancelable: false }
                );}}>
              <IconIonicons name='ios-close-circle-outline' size={23} color='#E4572E' />
            </TouchableHighlight>
          </View>

          {item.remark
            ? <Text style={{marginLeft:40, marginRight:100, marginBottom:5}}>备注：{item.remark}</Text>
            : null}
        </View>
        
      );
    });
  }

  _renderPurchaseListEachMaterial = (material, items) => {
    let index = 1;
    return items.map(item => {
      return (
        <View>
          <View style={[index>1? styles.TableRowItemContainerAfter2: styles.TableRowItemContainer, {paddingRight:0}]}>
            <Text style={[styles.orderItemText, {width: 30}]}>{index++}</Text>
            <Text style={[styles.orderItemText, {flex: 1}]}>{item.from}</Text>
            <Text style={[styles.orderItemText, {width: 55, textAlign:'right'}]}>{item.price}</Text>
            <Text style={[styles.orderItemText, {width: 60, textAlign:'right'}]}>
              {item.quantity}{item.material_unit}
            </Text>
            <Text style={[styles.orderItemText, {width: 55, textAlign:'right'}]}>{Math.floor(item.price * item.quantity)}</Text>
            <TouchableHighlight style={styles.delItemBtnView}
              onPress={() => {
                Alert.alert(
                  null,
                  '确认删除该来源：' + item.from + '？',
                  [
                    {text: '不删除', onPress: () => {}, style: 'cancel'},
                    {text: '确认删除', onPress: () => {this._delPurchaseItemByFrom(material, item);}},
                  ],
                  { cancelable: false }
                );}}>
              <IconIonicons name='ios-close-circle-outline' size={23} color='#E4572E' />
            </TouchableHighlight>
          </View>

          {item.remark
            ? <Text style={{marginLeft:40, marginRight:100, marginBottom:5}}>备注：{item.remark}</Text>
            : null}
        </View>
        
      );
    });
  }

  _renderPurchaseListEachFrom = (from, items) => {
    return items.map((item, index) => {
      return (
        <View style={index>0? styles.TableRowItemContainerAfter2: styles.TableRowItemContainer}>
          <Text style={[styles.orderItemText, {width: 30}]}>{index+1}</Text>
          <Text style={[styles.orderItemText, {flex: 1}]}>{item.material}</Text>
          <Text style={[styles.orderItemText, {width: 55, textAlign:'right'}]}>{item.price}</Text>
          <Text style={[styles.orderItemText, {width: 60, textAlign:'right'}]}>
            {item.quantity}{item.material_unit}
          </Text>
          <Text style={[styles.orderItemText, {width: 55, textAlign:'right'}]}>{Math.floor(item.price * item.quantity)}</Text>
          <View style={{width:20}}></View>
        </View>
      );
    });
  }

  _delPurchaseItemByFrom = (material, item) => {
    let material_demand = this.material_demand_sum[material];
    for (let i=0; i<material_demand.purchase_items.length; i++) {
      if (material_demand.purchase_items[i].from === item.from) {
        material_demand.purchase_items.splice(i, 1);
        break;
      }
    }

    material_demand.quantity_purchased -= item.quantity;
    material_demand.expense -= item.quantity * item.price;
    material_demand.purchase_complete = false;
    this.setState({});
  }

  _delPurchaseAllItem = (material) => {
    let material_demand = this.material_demand_sum[material];
    material_demand.quantity_purchased = 0;
    material_demand.expense = 0;
    material_demand.purchase_complete = false;
    material_demand.purchase_items = [];
    this.setState({});
  }

  _delDemandItemByMaterial = (customer_address, item) => {
    let demand_items = this.customer_demand_items[customer_address];
    for (let i=0; i<demand_items.length; i++) {
      if (demand_items[i].material === item.material) {
        demand_items.splice(i, 1);
        break;
      }
    }

    this._delPurchaseAllItem(item.material);
    let material_demand = this.material_demand_sum[item.material];
    material_demand.quantity -= item.quantity;
    if (material_demand.quantity < EPSILON) {
      delete this.material_demand_sum[item.material];
    }
    this.setState({});
  }

  _delDemandAllItem = (customer_address) => {
    let demand_items = this.customer_demand_items[customer_address];
    while (demand_items.length > 0) {
      this._delDemandItemByMaterial(customer_address, demand_items[demand_items.length-1]);
    }

    delete this.customer_demand_items[customer_address];
    this.setState({});
  }

  _add_order_demand_item = (item) => {
    let demand_items = this.customer_demand_items[item.customer_address];
    for (let i=0; i<demand_items.length; i++) {
      if (demand_items[i].material === item.material) {
        alert('添加失败：该材料已添加过。');
        return;
      }
    }

    demand_items.push(item);
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
        expense:0,
      };
    }
  }

  _add_order_purchase_item = (item) => {
    let material_demand = this.material_demand_sum[item.material];
    for (let i=0; i<material_demand.purchase_items.length; i++) {
      if (material_demand.purchase_items[i].from === item.from) {
        alert('添加失败：该来源已添加过。');
        return;
      }
    }

    material_demand.purchase_items.push(item);
    material_demand.quantity_purchased += item.quantity;
    material_demand.expense += item.quantity * item.price;
    if (material_demand.quantity_purchased > material_demand.quantity - EPSILON)
      material_demand.purchase_complete = true;
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

    let from_purchase_sum = this.from_purchase_sum;
    for (let k in from_purchase_sum) 
      delete from_purchase_sum[k];
    let materials = Object.keys(this.material_demand_sum);

    for (let i=0; i<materials.length; i++) {
      let purchase_items = this.material_demand_sum[materials[i]].purchase_items;
      purchase_items.map(item => {
        if (item.from in from_purchase_sum) {
          from_purchase_sum[item.from].expense += item.price * item.quantity;
          from_purchase_sum[item.from].purchase_items.push(item);
        } else {
          from_purchase_sum[item.from] = {
            expense:item.price * item.quantity,
            purchase_items:[item],
            type:item.type,
          };

          if (!(item.from in this.from_paid))
            this.from_paid[item.from] = (item.type === 'warehouse');
        }
      });
    }

    const waiting_render_img = navigation.getParam('waiting_render_img', null);
    if (order_purchase_item) {
      navigation.setParams({waiting_render_img: null});
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
            {waiting_render_img
              ? <Text style={{paddingLeft:10}}>正在渲染图片...</Text>
              : <View style={styles.Canvas}>

                  
                  <View style={styles.tableContainer}>
                    <Text style={styles.level2TitleText}>各工地材料需求单</Text>

                    <View style={styles.TableRowItemContainer}>
                      <Text style={[styles.orderItemHeaderText, {width: 35}]}>序号</Text>
                      <Text style={[styles.orderItemHeaderText, {flex: 1}]}>材料</Text>
                      <Text style={[styles.orderItemHeaderText, {width: 60, textAlign:'right'}]}>数量</Text>
                      <View style={{width:20}}></View>
                    </View>

                    {Object.keys(this.customer_demand_items).map(customer_address => {
                      let address = customer_address.slice(customer_address.indexOf('(')+1,-1);
                      return (
                        <View>
                          <View style={styles.tableInnerTitleRowView}>

                            <TouchableHighlight style={styles.addMaterialView}
                              onPress={() => {this.props.navigation.navigate('AddOrderDemandItemForm', {
                                customer_address: customer_address,
                            })}}>
                              <Text style={styles.addMaterialBtnText}>添加材料</Text>
                            </TouchableHighlight>

                            <Text style={styles.tableInnerTitleView}>{address}</Text>

                            <TouchableHighlight style={styles.delCustomerBtnView} 
                              onPress={() => {
                                Alert.alert(
                                  null,
                                  '确认取消采购该工地的所有材料：' + customer_address + '？',
                                  [
                                    {text: '不取消', onPress: () => {}, style: 'cancel'},
                                    {text: '确认取消', onPress: () => {this._delDemandAllItem(customer_address);}},
                                  ],
                                  { cancelable: false }
                                );
                              }}>
                              <IconFeather name='delete' size={23} color='#E4572E' />
                            </TouchableHighlight>

                          </View>
                          
                          {this._renderDemandListEachCutomer(customer_address, this.customer_demand_items[customer_address])}
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
                      let material_demand = this.material_demand_sum[material];
                      return (
                        <View>
                          <View style={styles.tableInnerTitleRowView}>

                            {material_demand.purchase_complete
                              ? <View style={styles.addMaterialView}>
                                  <Text style={[styles.addMaterialBtnText, {color:'gray', borderColor: 'gray'}]}>添加来源</Text>
                                </View>
                              : <TouchableHighlight style={styles.addMaterialView}
                                  onPress={() => {this.props.navigation.navigate('AddOrderPurchaseItemForm', {
                                    material:material,
                                    unit:material_demand.unit,
                                    max_quantity:material_demand.quantity - material_demand.quantity_purchased,
                                })}}>
                                  <Text style={styles.addMaterialBtnText}>添加来源</Text>
                                </TouchableHighlight>}

                            

                            <View style={styles.tableInnerTitleViewContainer}>
                              <Text style={styles.materialTitleText}>{material}</Text>
                              {material_demand.purchase_complete
                                ? <IconIonicons name='md-checkmark' size={23} color='green' />
                                : <IconIonicons name='ios-warning' size={23} color='#FBC02D' />}
                            </View>

                            <TouchableHighlight style={styles.delCustomerBtnView} 
                              onPress={() => {
                                Alert.alert(
                                  null,
                                  '确认删除所有来源：' + material + '？',
                                  [
                                    {text: '不删除', onPress: () => {}, style: 'cancel'},
                                    {text: '确认删除', onPress: () => {this._delPurchaseAllItem(material);}},
                                  ],
                                  { cancelable: false }
                                );
                              }}>
                              <IconFeather name='delete' size={23} color='#E4572E' />
                            </TouchableHighlight>

                          </View>
                          
                          {this._renderPurchaseListEachMaterial(material, material_demand.purchase_items)}

                          <View style={[styles.TableRowItemContainerAfter2, {paddingRight:30, justifyContent:'flex-end'}]}>
                            <Text style={[styles.orderItemText, {width:120, textAlign:'left'}]}>
                              已购：{material_demand.quantity_purchased}/{material_demand.quantity}{material_demand.unit}
                            </Text>
                            <Text style={[styles.orderItemText, {width:110, textAlign:'right'}]}>
                              合计：{material_demand.expense}元
                            </Text>
                          </View>
                        </View>
                      );
                    })}

                  </View>


                  <View style={styles.tableContainer}>
                    <Text style={styles.level2TitleText}>各材料商采购单</Text>

                    <View style={styles.TableRowItemContainer}>
                      <Text style={[styles.orderItemHeaderText, {width: 35}]}>序号</Text>
                      <Text style={[styles.orderItemHeaderText, {flex: 1}]}>材料</Text>
                      <Text style={[styles.orderItemHeaderText, {width: 55, textAlign:'right'}]}>单价</Text>
                      <Text style={[styles.orderItemHeaderText, {width: 60, textAlign:'right'}]}>数量</Text>
                      <Text style={[styles.orderItemHeaderText, {width: 55, textAlign:'right'}]}>价格</Text>
                      <View style={{width:20}}></View>
                    </View>

                    {Object.keys(from_purchase_sum).map(from => {
                      return (
                        <View>

                          <View style={styles.tableInnerTitleRowView}>
                            <View style={{width:70}}></View>
                            <Text style={styles.tableInnerTitleText}>{from}</Text>

                            {from_purchase_sum[from].type === 'warehouse'
                              ? <View style={styles.paidCheckView}>
                                  <Text>已支付</Text>
                                  <IconMaterialCommunity name='check-circle' size={23} color='gray' />
                                </View> 
                              : <TouchableHighlight 
                                  onPress={() => {
                                    this.from_paid[from] = !this.from_paid[from];
                                    this.setState({});
                                  }}>
                                  <View style={styles.paidCheckView}>
                                    <Text>已支付</Text>
                                    {this.from_paid[from]
                                      ? <IconMaterialCommunity name='check-circle' size={23} color='#E4572E' />
                                      : <IconMaterialCommunity name='checkbox-blank-circle-outline' size={23} color='#E4572E' />} 
                                  </View> 
                                </TouchableHighlight>}
                            
                          </View>

                          {this._renderPurchaseListEachFrom(from, from_purchase_sum[from].purchase_items)}

                          <View style={[styles.TableRowItemContainerAfter2, {paddingRight:30, justifyContent:'flex-end'}]}>
                            <Text style={[styles.orderItemText, {width:110, textAlign:'right'}]}>
                              合计：{Math.floor(from_purchase_sum[from].expense)}元
                            </Text>
                          </View>
                        </View>
                      );
                    })}

                  </View>


                  <View style={{paddingHorizontal: 15}}>

                    <DateTimeInput 
                      label='订单日期' init_datetime={this.state.order_datetime}
                      onEndEditing={(datetime) => {
                        this.setState({
                          order_datetime:datetime,
                        });}}/> 

                    <ParagraphInput 
                      label='备注' allow_empty={true}
                      onEndEditing={(isValid, num) => {
                        this.setState({
                          remark_comFlag:isValid,
                          remark_value:num,
                        });}} />   

                    <ImageInput 
                      onEndEditing={(urls) => {
                        this.setState({remark_imgs:urls})
                      }}/>

                  </View>  

                </View>}
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
  tableInnerTitleViewContainer: {
    flex:1, 
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  materialTitleText: {
    fontSize:16,
    paddingRight:5,
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
    marginLeft:30, 
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