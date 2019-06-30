
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { Input } from 'react-native-elements';

import URL, {EPSILON} from '../../Config';
import GeneralInput from '../../forms/GeneralInput';
import GeneralInput_2 from '../../forms/GeneralInput_2';
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

    this.nav_data = {
      material: this.props.navigation.getParam('material'),
      unit: this.props.navigation.getParam('unit'),
      max_quantity: this.props.navigation.getParam('max_quantity'),
    };

    this.from_data = null;
    this._getFromData();

    this.state = { 
      from_data_ready: false,

      quantity_value: '',
      quantity_comFlag: false,

      remark_value: '',
      remark_comFlag: true,

      from_value: '',
      from_comFlag: '',

      material_price_value: '',
      material_price_comFlag: false,

      from_hint:'',
      max_quantity: this.nav_data.max_quantity,

      quantity_input_str:'',
      price_input_str:'',
    };

  }

  _getFromData = () => {
    fetch(URL.froms_by_material + this.nav_data.material + '/')
      .then(response => response.json())
      .then(responseJson => {
        this.from_data = responseJson.data;

        if (this.from_data.length === 0) {
          this.from_data = {
            '无': {
              type: 'supplier',
              price: '',
            },
          };
        }
        this.setState({from_data_ready: true});

      }).catch((error) => {
        alert(error);
      });
  }

  _submitPost = () => {
    if (!this._checkComplete())
      return;
    
    order_purchase_item = {
      material: this.nav_data.material,
      material_unit: this.nav_data.unit,
      from: this.state.from_value,
      price: Number(this.state.material_price_value),
      quantity: Number(this.state.quantity_value),
      remark: this.state.remark_value,
      type:this.from_data[this.state.from_value].type,
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

              {!this.state.from_data_ready
                ? <InputPlaceholder label='材料商' message='正在获取材料商列表...' />
                : <ChooseOneInput
                    label='材料商'
                    data={Object.keys(this.from_data)}
                    onEndEditing={(num) => {

                      if (!num
                        || num[0] === '无') {
                          this.setState({
                            from_comFlag: false,
                            material_price_comFlag: false,
                            from_hint:'',
                            max_quantity: this.nav_data.max_quantity,
                            quantity_comFlag:false,
                          });
                          return;
                        }

                      let tmp_hint = '';
                      let tmp_max_quantity = this.nav_data.max_quantity;
                      if (this.from_data[num[0]].type === 'warehouse') {
                        tmp_hint = '库存：' + this.from_data[num[0]].quantity;
                        tmp_max_quantity = Math.min(tmp_max_quantity, this.from_data[num[0]].quantity);
                      }

                      this.setState({
                        from_comFlag:true,
                        from_value:num[0],
                        material_price_comFlag: true,
                        material_price_value: this.from_data[num[0]].price.toString(),
                        from_hint:tmp_hint,
                        max_quantity:tmp_max_quantity,
                        quantity_comFlag:true,
                        quantity_value:tmp_max_quantity,
                        quantity_input_str:'',
                        price_input_str:'',
                      });
                    }}/>}

              {!this.state.from_comFlag
                ? null
                : <GeneralInput_2 
                    label='单价' placeholder={this.from_data[this.state.from_value].price.toString()} 
                    allow_empty={true} default_value_when_empty={this.from_data[this.state.from_value].price.toString()}
                    content_type='float' value_min={0} 
                    value={this.state.price_input_str}
                    onEndEditing={(isValid, num) => {
                      this.setState({
                        material_price_comFlag: isValid,
                        material_price_value: num,
                      });}}
                    onChangeText={(input) => {this.setState({price_input_str: input});}} />}
  
              <GeneralInput_2 
                label='数量' unit={this.nav_data.unit} hint={'还需要：' + this.nav_data.max_quantity + '  ' + this.state.from_hint}
                content_type='float' value_min={0} value_max={this.state.max_quantity + EPSILON}
                allow_empty={true} default_value_when_empty={this.state.max_quantity.toString()} placeholder={this.state.max_quantity.toString()}
                value={this.state.quantity_input_str}
                onEndEditing={(isValid, num) => {
                  this.setState({
                    quantity_comFlag: isValid,
                    quantity_value: num,
                  });}} 
                onChangeText={(input) => {this.setState({quantity_input_str: input});}} />

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