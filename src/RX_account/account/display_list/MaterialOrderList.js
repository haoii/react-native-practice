
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';

import URL from '../../Config';
import MaterialOrderDetail from '../detail_modals/MaterialOrderDetail';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class MaterialOrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      orders: []
    }
  }

  componentDidMount() {
    this._refreshDate();
  }

  _fetchData = () => {
    fetch(URL.material_orders)
      .then(response => response.json())
      .then(responseJson => {
        let arrData = responseJson.latest_material_orders;
        let i = 0;
        let arrList = [];
        arrData.map(item => {
          arrList.push({key: i, value: item});
          i++;
        })
        this.setState({orders: arrList, refreshing: false});

      }).catch((error) => {
        alert(error);
      });
  }

  _refreshDate = () => {
    this.setState({refreshing: true});
    this._fetchData();
  }

  _renderMaterialItems = (customer_in_order) => {
    let material_render_items = [];
    let index = 1;

    Object.keys(customer_in_order).map(customer_address => {
      let materials = customer_in_order[customer_address].material_in_customer_in_order;
      Object.keys(materials).map(material => {
        material_render_items.push(
          <View style={index>1? styles.TableRowItemContainerAfter2: styles.TableRowItemContainer}>
            <Text style={[styles.orderItemText, {width: 35}]}>{index++}</Text>
            <Text style={[styles.orderItemText, {flex: 1}]}>{customer_address}</Text>
            <Text style={[styles.orderItemText, {flex: 1}]}>{material}</Text>
            <Text style={[styles.orderItemText, {width: 60, textAlign:'right'}]}>
              {materials[material].quantity}{materials[material].unit}
            </Text>
          </View>
        );
      });
    });

    return material_render_items;
  }

  _renderItem = ({item}) => {
    return (
      
      <View>
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.push('MaterialOrderDetail', {
              order: item.value,
            })}
          style={styles.itemContainer}
        >
          <View>
            <View style={styles.itemTitleView}>
              <Text style={styles.minorText}>日期：{item.value.order_date}   </Text>
              <Text style={styles.minorText}>编号：{item.value.id}</Text>
            </View>

            <View style={styles.tableContainer}>

              <View style={styles.TableHeaderContainer}>
                <Text style={[styles.orderItemHeaderText, {width: 35}]}>序号</Text>
                <Text style={[styles.orderItemHeaderText, {flex: 1}]}>工地</Text>
                <Text style={[styles.orderItemHeaderText, {flex: 1}]}>材料</Text>
                <Text style={[styles.orderItemHeaderText, {width: 60, textAlign:'right'}]}>数量</Text>
              </View>

              {this._renderMaterialItems(item.value.customer_in_order)}

            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View>

        <FlatList
          data={this.state.orders}
          onRefresh={this._refreshDate}
          refreshing={this.state.refreshing}
          renderItem={this._renderItem}
          ListHeaderComponent={
            <View style={{height:5}}></View>
          }/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    padding:10, 
    // borderBottomWidth: 1, 
    // borderBottomColor: '#EFEFEF',
    marginHorizontal:8,
    marginTop:3,
    marginBottom: 5,
    backgroundColor:'white',
    borderRadius:8,
    elevation: 2,
  },
  itemTitleView: {
    flexDirection:'row', 
    alignItems:'flex-end', 
    justifyContent:'flex-end',
    paddingBottom:5,
  },
  itemTitleLeftView: {
    flexDirection:'row', 
    alignItems:'flex-end',
  },
  mainBoldText: {
    fontSize:16, 
    fontWeight:'bold',
  },
  minorText: {
    fontSize:14,
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
  
  tableContainer: {
    // marginHorizontal:15,
    // marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius:5,
  },

  TableHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 30,
    backgroundColor: '#e8e8e8',
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

})
