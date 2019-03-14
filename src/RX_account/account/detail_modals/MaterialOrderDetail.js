
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        ScrollView } from 'react-native';

import SupplierDetailMaterials from './SupplierDetailMaterials';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class MaterialOrderDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '                    订单详情',
    };
  };

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = { 
    };
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
        <Text style={styles.tableInnerTitleText}>{supplier} (合计{Math.floor(total_expense)}元)</Text>
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

  render() {
    const { navigation } = this.props;
    const order = navigation.getParam('order'); 
    const items = order.order_items;
    let customer_addresses = new Set();
    items.forEach(i => {customer_addresses.add(i.customer_address);});
    let suppliers = new Set();
    items.forEach(i => {suppliers.add(i.supplier);});

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.summarizeView}>
          <Text style={styles.titleText}>订单号：{order.id}</Text>
          <Text style={styles.infoText}>负责人：{order.clerk}</Text>
          <Text style={styles.infoText}>日期：{order.order_date}</Text>
          <Text style={styles.infoText}>备注：{order.remark}</Text>

        </View>

        <View style={styles.tableContainer}>
          <Text style={styles.level2TitleText}>各工地材料需求单</Text>

          <View style={styles.TableRowItemContainer}>
            <Text style={[styles.orderItemHeaderText, {width: 35}]}>序号</Text>
            <Text style={[styles.orderItemHeaderText, {flex: 1}]}>材料</Text>
            <Text style={[styles.orderItemHeaderText, {width: 60, textAlign:'right'}]}>数量</Text>
          </View>

          {[...customer_addresses].map(address => {
            return (
              <View>
                <Text style={styles.tableInnerTitleText}>{address}</Text>
                {this._renderDemandListEachCutomer(address, items)}
              </View>
            );
          })}

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
            return this._renderPurchaseListEachSupplier(supplier, items);
          })}

        </View>

      </ScrollView>);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:15,
  },
  summarizeView: {
    paddingHorizontal:15,
    paddingBottom: 20,
  },
  titleText: {
    fontSize:22,
    fontWeight:'bold',
    color:'black',
  },
  infoText: {
    fontSize:14,
  },

  tableContainer: {
    marginHorizontal:15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius:5,
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
    textAlign:'center',
    textAlignVertical:'center',
    backgroundColor:'#e8e8e8',
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

});