import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { Input } from 'react-native-elements';

import URL from '../../../Config';
import GeneralInput from '../../../forms/GeneralInput';
import DateInput from '../../../forms/DateInput';
import ChooseOneInput from '../../../forms/ChooseOneInput';
import InputPlaceholder from '../../../forms/InputPlaceholder';
import ParagraphInput from '../../../forms/ParagraphInput';
import Label from '../../../forms/Label';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class AddMaterialInSupplier extends Component {
  constructor(props) {
    super(props);

    this.material_class_data = [];
    this._initMaterialClassData();

    this.material_data = [];
    this.material_unit_data = {};
    this.material_id_data = {};

    this.supplier = this.props.navigation.getParam('supplier');

    this.state = { 

      material_class_value: '',
      material_class_comFlag: false,

      material_value: '',
      material_comFlag: false,

      price_value: '',
      price_comFlag: false,

      remark_value: '',
      remark_comFlag: true,

      material_class_data_ready: false,
      material_data_ready: false,

      material_unit: '',
    };

  }

  _initMaterialClassData = () => {
    fetch(URL.material_classes, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          this.material_class_data = responseJson.data;
          if (this.material_class_data.length === 0) {
            this.material_class_data = [{'无': [{'无': ['无']}]}];
          }
          this.setState({material_class_data_ready: true});
        } else if (responseJson.msg === 'not_logged_in') {
          alert('您还没有登录~');
          this.props.navigation.navigate('MainBottomTab');
        } else {
          alert('出现未知错误');
          this.props.navigation.navigate('MainBottomTab');
        }

      }).catch(error => {
        alert('服务器出错了');
        this.props.navigation.navigate('MainBottomTab');
      });
  }

  _getMaterialData = (material_class) => {

    let formData = new FormData();
    formData.append("first_class", material_class[0]);
    formData.append("second_class", material_class[1]);
    formData.append("third_class", material_class[2]);

    fetch(URL.materials, {
      method:'POST',
      body:formData,
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          let arrData = responseJson.data;
          let arrList = [];
          let unitList = {};
          let materialIdList = {};
          arrData.map(item => {
            arrList.push(item.name);
            unitList[item.name] = item.unit;
            materialIdList[item.name] = item.id;
          });
          this.material_data = arrList;
          this.material_unit_data = unitList;
          this.material_id_data = materialIdList;
          if (this.material_data.length === 0) {
            this.material_data = ['无'];
            this.material_unit_data = {'无': '无'};
            this.material_id_data = {'无': '无'};
          }
          this.setState({material_data_ready:true});
        } else if (responseJson.msg === 'not_logged_in') {
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

  _submitPost = () => {
    if (!this._checkComplete())
      return;

    let formData = new FormData();
    formData.append("material_id", this.material_id_data[this.state.material_value]);
    formData.append("supplier_id", this.supplier.id);
    formData.append("price", this.state.price_value);
    formData.append("remark", this.state.remark_value);
    
    fetch(URL.add_material_in_supplier,{
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
      } else if (responseJson.msg === 'material_already_exist') {
        alert(responseJson.data);
      } else {
        alert('出现未知错误');
        // this.props.navigation.navigate('MainBottomTab');
      }

    }).catch((error) => {
      alert('服务器出错了');
      // this.props.navigation.navigate('MainBottomTab');
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
            onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableHighlight>

          <TouchableHighlight style={!this._checkComplete()?styles.btn:styles.activeBtn} onPress={this._submitPost}>
            <Text style={!this._checkComplete()?styles.btnText:styles.activeBtnText}>确认</Text>
          </TouchableHighlight>
        </View>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} style={styles.keyboardAvoiding} enabled>
          <ScrollView contentContainerStyle={styles.ScrollViewStyle}>
            <View style={styles.Canvas}>

              <Label label={this.supplier.name} />

              {!this.state.material_class_data_ready
                ? <InputPlaceholder label='材料类别' message='正在获取材料类别列表...' />
                : <ChooseOneInput 
                    label='材料类别' 
                    data={this.material_class_data}
                    onEndEditing={(num) => {

                      this.setState({
                        material_data_ready:false,
                        material_comFlag:false,
                      });

                      if (num.length !== 3
                        || num[0] === '无' 
                        || num[1] === '无'
                        || num[2] === '无') {
                          this.setState({
                            material_class_comFlag:false,
                          });
                          return;
                        }

                      this.setState({
                        material_class_comFlag:true,
                        material_class_value:num,
                      });

                      this._getMaterialData(num);
                    }}/>}

              {!this.state.material_class_comFlag
                ? null
                : (!this.state.material_data_ready
                    ? <InputPlaceholder label='材料' message='正在获取材料列表...' />
                    : <ChooseOneInput 
                        label='材料'
                        data={this.material_data}
                        onEndEditing={(num) => {

                          this.setState({
                            material_unit: this.material_unit_data[num[0]],
                          });

                          if (num.length !==1
                            || num[0] === '无') {
                              this.setState({
                                material_comFlag:false,
                              });
                              return;
                            }

                          this.setState({
                            material_comFlag:true,
                            material_value:num[0],
                          });
                        }}/>)}
  
              <GeneralInput 
                label='单价' unit={'元/' + this.state.material_unit}
                content_type='float' value_min={0} 
                onEndEditing={(isValid, num) => {
                  this.setState({
                    price_comFlag: isValid,
                    price_value: num,
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