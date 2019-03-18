
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { Input } from 'react-native-elements';

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

export default class AddOrderPurchaseItemForm extends Component {
  constructor(props) {
    super(props);

    this.supplier_data = [];
    this._getSupplierData();
    this.material_price_data = {};

    this.state = { 
      supplier_data_ready: false,

      quantity_value: '',
      quantity_comFlag: false,

      remark_value: '',
      remark_comFlag: true,

      supplier_value: '',
      supplier_comFlag: '',

      material_price_value: '',
      material_price_comFlag: false,

    };

  }

  _getSupplierData = () => {
    let material = this.props.navigation.getParam('material');
    fetch(URL.suppliers_by_material + material + '/')
      .then(response => response.json())
      .then(responseJson => {
        let arrData = responseJson.available_suppliers;
        let arrList = [];
        let priceList = {};
        arrData.map(item => {
          arrList.push(item.name);
          priceList[item.name] = item.price.toString();
        })
        this.supplier_data = arrList;
        this.material_price_data = priceList;
        if (this.supplier_data.length === 0) {
          this.supplier_data = ['无'];
          this.material_price_data = {'无': ''};
        }
        this.setState({supplier_data_ready: true});

      }).catch((error) => {
        alert(error);
      });
  }

  _submitPost = () => {
    if (!this._checkComplete())
      return;
    
    order_purchase_item = {
      material: this.props.navigation.getParam('material'),
      material_unit: this.props.navigation.getParam('unit'),
      supplier: this.state.supplier_value,
      price: Number(this.state.material_price_value),
      quantity: Number(this.state.quantity_value),
      remark: this.state.remark_value,

      remark: this.state.remark_value,
    };
    
    this.props.navigation.navigate('PlaceOrderForm', {
      order_purchase_item: order_purchase_item,
    });
  }

  _checkComplete = () => {
    keys = Object.keys(this.state);
    for (let i = 0; i < keys.length; i++) 
      if (keys[i].length > 7 && keys[i].slice(-7) === 'comFlag') 
        if (!this.state[keys[i]]) 
          return false;
    return true;
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.headerContainer}>
          <TouchableHighlight style={styles.cancelBtn}
            onPress={() => this.props.navigation.navigate('PlaceOrderForm')}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableHighlight>

          <TouchableHighlight style={!this._checkComplete()?styles.btn:styles.activeBtn} onPress={this._submitPost}>
            <Text style={!this._checkComplete()?styles.btnText:styles.activeBtnText}>确认</Text>
          </TouchableHighlight>
        </View>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} style={styles.keyboardAvoiding} enabled>
          <ScrollView contentContainerStyle={styles.ScrollViewStyle}>
            <View style={styles.Canvas}>

              {!this.state.supplier_data_ready
                ? <InputPlaceholder label='材料商' message='正在获取材料商列表...' />
                : <ChooseOneInput
                    label='材料商'
                    data={this.supplier_data}
                    onEndEditing={(num) => {

                      if (!num
                        || num[0] === '无') {
                          this.setState({
                            supplier_comFlag: false,
                            material_price_comFlag: false,
                          });
                          return;
                        }

                      this.setState({
                        supplier_comFlag:true,
                        supplier_value:num[0],
                        material_price_comFlag: true,
                        material_price_value: this.material_price_data[num[0]],
                      });
                    }}/>}

              {!this.state.supplier_comFlag
                ? null
                : <GeneralInput 
                    label='单价' placeholder={this.material_price_data[this.state.supplier_value]}
                    allow_empty={true} default_value_when_empty={this.material_price_data[this.state.supplier_value]}
                    content_type='float' value_min={0} 
                    onEndEditing={(isValid, num) => {
                      this.setState({
                        material_price_comFlag: isValid,
                        material_price_value: num,
                      });}} />}
  
              <GeneralInput 
                label='数量' unit={this.props.navigation.getParam('unit')}
                content_type='float' value_min={0} 
                onEndEditing={(isValid, num) => {
                  this.setState({
                    quantity_comFlag: isValid,
                    quantity_value: num,
                  });}} />

              <ParagraphInput 
                label='备注' allow_empty={true}
                onEndEditing={(isValid, num) => {
                  this.setState({
                    remark_comFlag: isValid,
                    remark_value: num,
                  });}} />     

            </View>
          </ScrollView>
        </KeyboardAvoidingView>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  loadding: {
    marginTop: 100
  },

  ScrollViewStyle: {
    paddingLeft:15,
    paddingRight:15,
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
    padding:15,
    height:size.height,
    backgroundColor: '#F5F5F5',
    justifyContent:'flex-start',
  },
  headerContainer:{
    height:50,
    paddingBottom:15,
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