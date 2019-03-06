
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

import URL from '../Config';
import MaterialScopeSelector from './MaterialScopeSelector';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class MaterialList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: true,
      refreshing: false,
      suppliers: []
    }
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData = () => {
    fetch(URL.suppliers)
      .then(response => response.json())
      .then(responseJson => {
        let arrData = responseJson.latest_suppliers;
        let i = 0;
        let arrList = [];
        arrData.map(item => {
          arrList.push({key: i, value: item});
          i++;
        })
        this.setState({suppliers: arrList, ready: false, refreshing: false});

      }).catch((error) => {
        alert(error);
      });
  }

  _refreshDate = () => {
    this.setState({refreshing: true});
    this._fetchData();
  }

  _renderProgressBar = (items) => {
    items.sort((v1,v2) => v1[0] < v2[0]? 1:-1);
    return items.map((item) => {
      return (
        <View style={[styles.progressBar, {width:item[0], backgroundColor:item[1]}]}></View>
      )});
  }

  _renderItem = ({item}) => {
    let total_expense_pixel = size.width - 20;
    let expense_paid_pixel = (item.value.expense_paid / item.value.total_expense) * total_expense_pixel;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemTitleView}>
          <View style={styles.itemTitleLeftView}>
            <Text style={styles.mainBoldText}>{item.value.name}    </Text>
            <Text style={styles.minorText}>{item.value.address}   </Text>
          </View>
          <Text style={styles.minorText}>编号：{item.value.id}</Text>
        </View>

        <View style={[styles.progressBarBase, {width:total_expense_pixel, backgroundColor:'red'}]}></View>
        <View style={[styles.progressBar, {width:expense_paid_pixel, backgroundColor:'blue'}]}></View>

        <View style={styles.detailView}>
          <View style={styles.detailLeftView}>
            <Text style={styles.minorText}>已支付/开销：</Text>
            <Text style={styles.minorText}>
              {Math.floor(item.value.expense_paid)}/{Math.floor(item.value.total_expense)}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View>
        <MaterialScopeSelector 
          />

        {this.state.ready
          ? <ActivityIndicator size="large" style={styles.loadding}/>
          : <FlatList
            data={this.state.suppliers}
            onRefresh={this._refreshDate}
            refreshing={this.state.refreshing}
            renderItem={this._renderItem}/>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    padding:10, 
    paddingTop:18, 
    height:95, 
    borderBottomWidth: 1, 
    borderBottomColor: '#EFEFEF',
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
  progressBarBase: {
    height:10, 
    borderRadius:5, 
    position:'absolute', 
    left:10, 
    top:48,
  },
  progressBar: {
    height:10, 
    borderTopLeftRadius:5, 
    borderBottomLeftRadius:5,
    position:'absolute', 
    left:10, 
    top:48,
  },
  detailView: {
    flexDirection:'row', 
    alignItems:'flex-end', 
    position:'absolute', 
    left:10, 
    top:65,
  },
  detailLeftView: {
    flexDirection:'row', 
    alignItems:'flex-end', 
    position:'absolute', 
    left:0, 
    top:0,
  },
  detailRightView: {
    flexDirection:'row', 
    alignItems:'flex-end', 
    position:'absolute', 
    left:size.width/2-10, 
    top:0
  },

  loadding: {
    marginTop: 100
  },
})
