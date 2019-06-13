
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';

import URL from '../../Config';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class SupplierDetailMaterials extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      materials: []
    }
  }

  componentDidMount() {
    this._refreshDate();
  }

  _fetchData = () => {

    fetch(URL.supplier_detail + this.props.supplier_id + '/')
      .then(response => response.json())
      .then(responseJson => {
        let arrData = responseJson.data;
        let i = 0;
        let arrList = [];
        arrData.map(item => {
          arrList.push({key: i, value: item});
          i++;
        })
        this.setState({materials: arrList, refreshing: false});

      }).catch((error) => {
        alert(error);
      });
  }

  _refreshDate = () => {

    this.setState({refreshing: true});
    this._fetchData();
  }

  _renderItem = ({item}) => {
    
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemTitleView}>
          <View style={styles.itemTitleLeftView}>
            <Text style={styles.mainBoldText}>{item.value.name}    </Text>
          </View>
          <Text style={styles.minorText}>参考价：{item.value.price}元/{item.value.unit}</Text>
        </View>

        {item.value.total_used_amount
          ? <View style={styles.detailView}>
              <Text style={styles.minorText}>已购：{item.value.total_used_amount}{item.value.unit}</Text>
              <Text style={styles.minorText}>花费：{item.value.total_expense}元</Text>
              <Text style={styles.minorText}>
                平均价：{Math.floor(item.value.total_expense/item.value.total_used_amount)}元/{item.value.unit}
              </Text>
            </View>
          : null}
        
      </View>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.materials}
          onRefresh={this._refreshDate}
          refreshing={this.state.refreshing}
          renderItem={this._renderItem}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingRight:15, 
    paddingLeft:25,
    paddingVertical:6, 
  },
  itemTitleView: {
    flexDirection:'row', 
    alignItems:'flex-end', 
    justifyContent:'space-between',
  },
  itemTitleLeftView: {
    flexDirection:'row', 
    alignItems:'flex-end',
  },
  mainBoldText: {
    fontSize:14, 
    fontWeight:'bold',
  },
  minorText: {
    fontSize:14,
  },
  detailView: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between',
  },


})
