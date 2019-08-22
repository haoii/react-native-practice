
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, CameraRoll, 
    Image, KeyboardAvoidingView, ScrollView, ActivityIndicator, Alert } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Picker from 'react-native-picker';

import URL, {EPSILON} from '../../../Config';
import GeneralInput from '../../../forms/GeneralInput';
import DateInput from '../../../forms/DateInput';
import DateTimeInput from '../../../forms/DateTimeInput';
import ChooseOneInput from '../../../forms/ChooseOneInput';
import InputPlaceholder from '../../../forms/InputPlaceholder';
import ParagraphInput from '../../../forms/ParagraphInput';
import ImageInput from '../../../forms/ImageInput';
import DeviceStorage from '../../../DeviceStorage';
import Label from '../../../forms/Label';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class AddBuildRecord extends Component {
  constructor(props) {
    super(props);

    this.specified_customer = this.props.navigation.getParam('specified_customer', '');
    this.specified_customer_id = this.props.navigation.getParam('specified_customer_id', '');
    this.specified_customer_name = this.props.navigation.getParam('specified_customer_name', '');

    this.new_build_record_id = 0;
    this._receiveNewBuildRecordId();

    this.state = {   
      build_record_value: '',

      build_record_imgs:[],
      
    };
  }

  _receiveNewBuildRecordId = () => {
    fetch(URL.get_build_record_id, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          this.new_build_record_id = responseJson.data;
        } else if (responseJson.msg === 'not_logged_in') {
          alert('您还没有登录~');
          this.props.navigation.goBack();
        } else {
          alert('出现未知错误');
          this.props.navigation.goBack();
        }

      }).catch(error => {
        alert('服务器出错了');
        this.props.navigation.goBack();
      });
  }

  _submitPost = () => {

    if (!this._checkComplete())
      return;

    let formData = new FormData();
    formData.append("customer_id", this.specified_customer_id);
    formData.append("customer_name", this.specified_customer_name);
    formData.append("build_record_id", this.new_build_record_id);
    formData.append("build_record", this.state.build_record_value);

    let index = 0;
    this.state.build_record_imgs.map((url) => {
      let file = {uri: url, type: 'image/jpeg', name: 'Br' + this.new_build_record_id + '-' + (index++) + '.jpg'};   
      formData.append('build_record_imgs', file);
    });

    fetch(URL.add_build_record,{
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
      } else {
        alert('出现未知错误');
        this.props.navigation.navigate('MainBottomTab');
      }

    }).catch((error) => {
      alert('服务器出错了');
      this.props.navigation.navigate('MainBottomTab');
    });
  }

  _checkComplete = () => {
    return this.state.build_record_value !== '' || this.state.build_record_imgs.length !== 0;
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.headerContainer}>
          <TouchableHighlight style={styles.cancelBtn}
            onPress={() => this.props.navigation.navigate('MainBottomTab')}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableHighlight>

          <TouchableHighlight style={!this._checkComplete()?styles.btn:styles.activeBtn} onPress={this._submitPost}>
            <Text style={!this._checkComplete()?styles.btnText:styles.activeBtnText}>确认</Text>
          </TouchableHighlight>
        </View>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} style={styles.keyboardAvoiding} enabled>
          <ScrollView contentContainerStyle={styles.ScrollViewStyle}>
            <View style={styles.Canvas}>
                  
              <View style={{paddingHorizontal: 15}}>

                <Label label={this.specified_customer} />

                <ParagraphInput 
                  label='施工记录' allow_empty={true}
                  onEndEditing={(isValid, num) => {
                    this.setState({
                      build_record_value:num,
                    });}} />   

                <ImageInput 
                  onEndEditing={(urls) => {
                    this.setState({build_record_imgs:urls})
                  }}/>

              </View>  

            </View>
          </ScrollView>
        </KeyboardAvoidingView>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  tableContainer: {
    marginHorizontal:15,
    marginBottom: 30,
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor:'white',
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
    flex:1,
    textAlign:'center',
    textAlignVertical:'center',
    backgroundColor:'#e8e8e8',
  },
  paidCheckView: {
    width:70,
    height:30,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
  },
  paidCheckText: {
    fontSize:14,
    color:'#E4572E',
  },


  tableInnerTitleView: {
    flex:1, 
    textAlign:'center', 
    textAlignVertical:'center',
    fontSize:16,
  },
  tableInnerTitleViewContainer: {
    flex:1, 
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  materialTitleText: {
    fontSize:16,
    paddingRight:5,
  },

  addMaterialView: {
    width:90, 
    height:30, 
    paddingLeft:10,
    justifyContent: 'center',
    alignItems:'flex-start',
  },
  addMaterialBtnText: {
    color:'#E4572E',
    height: 20,
    textAlignVertical:'center', 
    fontSize:14, 
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'#E4572E',
    paddingHorizontal:8,
  },

  delItemBtnView: {
    height:30, 
    width:30, 
    justifyContent:'center', 
    alignItems:'flex-end'
  },
  delCustomerBtnView: {
    width:30, 
    height:30, 
    marginLeft:30, 
    justifyContent:'center', 
    alignItems:'flex-end'
  },

  tableInnerTitleRowView: {
    flexDirection:'row',
    alignItems: 'center',
    height: 30,
    backgroundColor:'#e8e8e8',
  },

  tableOperateRowView: {
    height:30,
    justifyContent:'center',
    alignItems:'center',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  tableOperateRowText: {
    color:'#E4572E',
    height: 20,
    textAlignVertical:'center', 
    fontSize:14, 
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'#E4572E',
    paddingHorizontal:8,
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



  loadding: {
    marginTop: 100
  },

  ScrollViewStyle: {
    // paddingLeft:15,
    // paddingRight:15,
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
    paddingVertical:15,
    height:size.height,
    backgroundColor: '#F5F5F5',
    justifyContent:'flex-start',
  },
  headerContainer:{
    height:50,
    paddingBottom:15,
    paddingHorizontal:15,
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