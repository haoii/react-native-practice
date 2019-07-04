
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';

import RetryComponent from '../../baseComponent/RetryComponent';

import URL from '../../Config';
import WarehouseHeader from '../display_list_header/WarehouseHeader';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class WarehouseList extends Component {
  constructor(props) {
    super(props);

    this.material_class = null;
    this.warehouse = null;

    this.state = {
      refreshing: false,
      materials: [],

      got_no_data: false,
      no_data_hint: '',
    }
  }

  componentDidMount() {
    this._refreshDate();
  }

  _fetchData = () => {

    let formData = new FormData();
    formData.append("first_class", this.material_class[0]);
    formData.append("second_class", this.material_class[1]);
    formData.append("third_class", this.material_class[2]);
    formData.append("warehouse", this.warehouse);

    fetch(URL.warehouse_materials, {
      method:'POST',
      body:formData,
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          if (responseJson.data.length === 0) {
            this.setState({materials:[], refreshing: false, got_no_data:true, no_data_hint: '没有数据~'});
          } else {
            let arrData = responseJson.data;
            let i = 0;
            let arrList = [];
            arrData.map(item => {
              arrList.push({key: i, value: item});
              i++;
            })
            this.setState({materials: arrList, refreshing: false, got_no_data:false});
          }
        } else if (responseJson.msg === 'not_logged_in') {
          this.setState({materials:[], refreshing: false, got_no_data:true, no_data_hint: '您还没有登录~'});
          this.props.navigation.navigate('LoginScreen');
        } else {
          this.setState({materials:[], refreshing: false, got_no_data:true, no_data_hint: '出现未知错误'});
        }

      }).catch((error) => {
        this.setState({materials:[], refreshing: false, got_no_data:true, no_data_hint: '服务器出错了'});
      });
  }

  _refreshDate = () => {
    if (!this.material_class 
      || this.material_class[0] === '无' 
      || this.material_class[1] === '无'
      || this.material_class[2] === '无'
      || !this.warehouse) {
        this.setState({materials: []});
        return;
      }
      

    this.setState({refreshing: true});
    this._fetchData();
  }

  _renderItem = ({item}) => {
    
    return (
      <View>
        <TouchableHighlight
          style={styles.itemContainer}>

          <View>

            <View style={styles.itemTitleView}>
              <View style={styles.itemTitleLeftView}>
                <Text style={styles.mainBoldText}>{item.value.name}    </Text>
                <Text style={styles.minorText}>{item.value.description}   </Text>
              </View>
              <Text style={styles.minorText}>编号：{item.value.id}</Text>
            </View>

            <View style={styles.detailView}>
              <Text style={styles.minorText}>库存数量：{item.value.quantity}{item.value.unit}</Text>
              <Text style={styles.minorText}>单价：{item.value.price}元/{item.value.unit}</Text>

            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _onEndMaterialClassChoose = (data) => {
    this.material_class = data;
    this._refreshDate();
  }

  _onEndWarehouseChoose = (data) => {
    this.warehouse = data[0];
    this._refreshDate();
  }

  render() {
    return (
      <View>
        
        <FlatList
          data={this.state.materials}
          onRefresh={this._refreshDate}
          refreshing={this.state.refreshing}
          renderItem={this._renderItem}
          ListHeaderComponent={
            <WarehouseHeader 
              onEndMaterialClassChoose={this._onEndMaterialClassChoose} 
              onEndWarehouseChoose={this._onEndWarehouseChoose}
              navigation={this.props.navigation} />
          }/>

        {this.state.got_no_data
          ? <RetryComponent 
              hint={this.state.no_data_hint} 
              retryFunc={this._refreshDate}
              style={{height:400}}/>
          : null}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    padding:10, 
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
    justifyContent:'space-between',
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
  detailView: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between',
  },

  loadding: {
    marginTop: 100
  },
})
