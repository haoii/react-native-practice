
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        ScrollView } from 'react-native';

import SupplierDetailMaterials from './SupplierDetailMaterials';
import NavigationHeader from '../../baseComponent/NavigationHeader';

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

    this.order = this.props.navigation.getParam('order'); 

    this.state = { 
    };
  }

  _renderDemandListEachCutomer = (material_in_customer_in_order) => {
    let index = 1;
    return Object.keys(material_in_customer_in_order).map(material => {
      return (
        <View style={index>1? styles.TableRowItemContainerAfter2: styles.TableRowItemContainer}>
          <Text style={[styles.orderItemText, {width: 30}]}>{index++}</Text>
          <Text style={[styles.orderItemText, {flex: 1}]}>{material}</Text>
          <Text style={[styles.orderItemText, {width: 60, textAlign:'right'}]}>
            {material_in_customer_in_order[material].quantity}{material_in_customer_in_order[material].unit}
          </Text>
        </View>
      );
    });
  }

  _renderPurchaseListEachSupplier = (material_in_from_in_order) => {

    return Object.keys(material_in_from_in_order).map((material, index) => {
      return (
        <View style={index>0? styles.TableRowItemContainerAfter2: styles.TableRowItemContainer}>
          <Text style={[styles.orderItemText, {width: 30}]}>{index+1}</Text>
          <Text style={[styles.orderItemText, {flex: 1}]}>{material}</Text>
          <Text style={[styles.orderItemText, {width: 55, textAlign:'right'}]}>{material_in_from_in_order[material].price}</Text>
          <Text style={[styles.orderItemText, {width: 60, textAlign:'right'}]}>
            {material_in_from_in_order[material].quantity}{material_in_from_in_order[material].unit}
          </Text>
          <Text style={[styles.orderItemText, {width: 55, textAlign:'right'}]}>
            {Math.floor(material_in_from_in_order[material].price * material_in_from_in_order[material].quantity)}
          </Text>
        </View>
      );
    });

  }

  _renderMaterialInOrder = (from_items, unit) => {

    return Object.keys(from_items).map((from, index) => {
      return (
        <View style={index>0? styles.TableRowItemContainerAfter2: styles.TableRowItemContainer}>
          <Text style={[styles.orderItemText, {width: 30}]}>{index+1}</Text>
          <Text style={[styles.orderItemText, {flex: 1}]}>{from}</Text>
          <Text style={[styles.orderItemText, {width: 55, textAlign:'right'}]}>{from_items[from].price}</Text>
          <Text style={[styles.orderItemText, {width: 60, textAlign:'right'}]}>
            {from_items[from].quantity}{unit}
          </Text>
          <Text style={[styles.orderItemText, {width: 55, textAlign:'right'}]}>
            {Math.floor(from_items[from].price * from_items[from].quantity)}
          </Text>
        </View>
      );
    });

  }

  render() {
    const order = this.order; 
    const customer_in_order = order.customer_in_order;
    const from_in_order = order.from_in_order;
    const material_in_order = order.material_in_order;

    return (
      <View style={{height:size.height}}>
        <NavigationHeader navigation={this.props.navigation} 
          title='材料订单'
          operations={{
            '订单单据': () => {
              this.props.navigation.push('MaterialOrderReceiptsDetail', {
                order: this.order,
              });
            },
            '删除': () => {alert('此功能等待开发。')},
          }}
        />
          
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.summarizeView}>
            <Text style={styles.titleText}>订单号：{order.id}</Text>
            <Text style={styles.infoText}>负责人：{order.clerk}</Text>
            <Text style={styles.infoText}>日期：{order.order_datetime}</Text>
            <Text style={styles.infoText}>备注：{order.remark}</Text>

          </View>

          <View style={styles.tableContainer}>
            <Text style={styles.level2TitleText}>各工地材料需求单</Text>

            <View style={styles.TableRowItemContainer}>
              <Text style={[styles.orderItemHeaderText, {width: 35}]}>序号</Text>
              <Text style={[styles.orderItemHeaderText, {flex: 1}]}>材料</Text>
              <Text style={[styles.orderItemHeaderText, {width: 60, textAlign:'right'}]}>数量</Text>
            </View>

            {Object.keys(customer_in_order).map(customer_address => {
              return (
                <View>
                  <Text style={styles.tableInnerTitleText}>{customer_address}</Text>
                  {this._renderDemandListEachCutomer(customer_in_order[customer_address].material_in_customer_in_order)}
                </View>
              );
            })}

          </View>

          <View style={styles.tableContainer}>
            <Text style={styles.level2TitleText}>材料来源</Text>

            <View style={styles.TableRowItemContainer}>
              <Text style={[styles.orderItemHeaderText, {width: 35}]}>序号</Text>
              <Text style={[styles.orderItemHeaderText, {flex: 1}]}>来源</Text>
              <Text style={[styles.orderItemHeaderText, {width: 55, textAlign:'right'}]}>单价</Text>
              <Text style={[styles.orderItemHeaderText, {width: 60, textAlign:'right'}]}>数量</Text>
              <Text style={[styles.orderItemHeaderText, {width: 55, textAlign:'right'}]}>价格</Text>
            </View>

            {Object.keys(material_in_order).map(material => {
              let m_info = material_in_order[material];
              return (
                <View>
                  <Text style={styles.tableInnerTitleText}>{material} (合计 {m_info.quantity}{m_info.unit} {Math.floor(m_info.expense)}元)</Text>
                  {this._renderMaterialInOrder(m_info.from_in_material_in_order, m_info.unit)}
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

            {Object.keys(from_in_order).map(from => {
              return (
                <View>
                  <Text style={styles.tableInnerTitleText}>{from} (合计{Math.floor(from_in_order[from].expense)}元)</Text>
                  {this._renderPurchaseListEachSupplier(from_in_order[from].material_in_from_in_order)}
                </View>
              );
            })}

          </View>

        </ScrollView>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical:15,
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