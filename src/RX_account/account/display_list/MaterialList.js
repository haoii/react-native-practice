
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

import URL from '../../Config';
import MaterialScopeSelector from '../display_list_header/MaterialScopeSelector';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class MaterialList extends Component {
  constructor(props) {
    super(props);

    this.material_class = null;

    this.state = {
      refreshing: false,
      materials: []
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

    fetch(URL.materials, {
      method:'POST',
      body:formData,
    })
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
    if (!this.material_class 
      || this.material_class[0] === '无' 
      || this.material_class[1] === '无'
      || this.material_class[2] === '无') {
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
              <Text style={styles.minorText}>总用量：{item.value.total_used_amount}{item.value.unit}   </Text>
              <Text style={styles.minorText}>总花费：{item.value.total_expense}元   </Text>
              <Text style={styles.minorText}>
                平均价：{Math.floor(item.value.total_expense/item.value.total_used_amount)}元/{item.value.unit}
              </Text>

            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _chooseMaterialClass = (data) => {
    this.material_class = data;
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
            <MaterialScopeSelector 
              onEndEditing={this._chooseMaterialClass} />
          }/>

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
