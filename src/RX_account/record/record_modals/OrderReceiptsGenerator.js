
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        Image, KeyboardAvoidingView, ScrollView, Modal, BackHandler   } from 'react-native';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import ImageViewer from 'react-native-image-zoom-viewer';

import DeviceStorage from '../../DeviceStorage';
import URL, {EPSILON} from '../../Config';

import Dimensions from 'Dimensions';
const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class OrderReceiptsGenerator  extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.nav_data = {
      customer_demand_items: this.props.navigation.getParam('customer_demand_items'),
      from_purchase_sum: this.props.navigation.getParam('from_purchase_sum'),
      material_demand_sum: this.props.navigation.getParam('material_demand_sum'),
      order_datetime: this.props.navigation.getParam('order_datetime'),
      from_paid: this.props.navigation.getParam('from_paid'),

      new_order_id: this.props.navigation.getParam('new_order_id'),
      user_info: this.props.navigation.getParam('user_info'),
      remark: this.props.navigation.getParam('remark'),
    };

    this.order_serial = this._getOrderSerial();
    this.img_len = this._getImgLen();

    this.tmp_img_index = 0;

    this.state = { 
      customer_demand_items_url: {},

      show_heights: {},
      imageModalVisible: false,
      images: [],
      cur_img_index: 0,

      from_purchase_sum_url:{},
      
    };
  }

  _submitPost = () => {
    let formData = new FormData();
    formData.append("order_id", this.nav_data.new_order_id);
    formData.append("clerk", this.nav_data.user_info.name);
    formData.append("order_datetime", this.nav_data.order_datetime);
    formData.append("remark", this.nav_data.remark);
    formData.append('customer_demand_items', JSON.stringify(this.nav_data.customer_demand_items));
    formData.append('material_demand_sum', JSON.stringify(this.nav_data.material_demand_sum));
    formData.append('from_paid', JSON.stringify(this.nav_data.from_paid));

    // for(let i = 0; i < this.state.images.length; i++){
    //   let file = {uri: this.state.images[i].url, type: 'image/jpeg', name: 'image'+i+'.jpg'};   
    //   formData.append('images', file);  
    // }

    let index = 0;
    Object.keys(this.state.customer_demand_items_url).map((customer) => {
      let file = {uri: this.state.customer_demand_items_url[customer], type: 'image/jpeg', name: this.order_serial + '-' + (index++) + '.jpg'};   
      formData.append('customer_demand_images', file);
    });

    Object.keys(this.state.from_purchase_sum_url).map((from) => {
      let file = {uri: this.state.from_purchase_sum_url[from], type: 'image/jpeg', name: this.order_serial + '-' + (index++) + '.jpg'};   
      formData.append('from_purchase_images', file);
    });
    
    fetch(URL.add_material_order,{
      method:'POST',
      body:formData,
      credentials: 'same-origin',
    })
    .then((response) => response.json())
    .then((responseJson)=>{
      if (responseJson.msg === 'success') {
        this.props.navigation.navigate('MainBottomTab');
      }  else if (responseJson.msg === 'not_logged_in') {
        alert('您还没有登录~');
        this.props.navigation.navigate('MainBottomTab');
      } else {
        alert('出现未知错误');
        this.props.navigation.navigate('MainBottomTab');
      }

    }).catch((error) => {
      alert('服务器出错了');
      // this.props.navigation.navigate('MainBottomTab');
    });
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
  }
  onBackPress = () => {
    this.props.navigation.navigate('PlaceOrderForm', {waiting_render_img:false});
    return true;
  }

  _getOrderSerial = () => {
    let t = this.nav_data.order_datetime;
    let id = this.nav_data.new_order_id;
    let serial = 'NA' + t.slice(2,4) + t.slice(5,7) + t.slice(8,10) + id;
    return serial;
  }

  _getImgLen = () => {
    let customer_demand_items = this.nav_data.customer_demand_items;
    let from_purchase_sum = this.nav_data.from_purchase_sum;
    return Object.keys(customer_demand_items).length + Object.keys(from_purchase_sum).length;
  }

  _setModalVisible = (visible) => {
    this.setState({ imageModalVisible: visible });
  }

  _capture = () => {

    this.refs.viewShot.capture().then(uri => {
      this.setState({url:uri});
    })
  }

  _share = () => {
    const shareOptions = {
      title: 'Share via',
      message: 'some message',
      url: this.state.url,
    };

    Share.open(shareOptions)
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });
  }

  _onCapture_customer_demand_items = (uri, customer_name) => {
    let urls = this.state.customer_demand_items_url;
    urls[customer_name] = uri;
    this.setState({customer_demand_items_url:urls});

    Image.getSize(uri,(width, height) => {
      let show_heights = this.state.show_heights;
      show_heights[customer_name] = Math.round(320 * height / width);
      this.setState({show_heights:show_heights});
    });

    let imgs = this.state.images;
    imgs.push({
      url:uri,
      props:{},
    });

    this.setState({images: imgs});
  }

  _onCapture_from_purchase_sum = (uri, from_name) => {
    let urls = this.state.from_purchase_sum_url;
    urls[from_name] = uri;
    this.setState({from_purchase_sum_url:urls});

    Image.getSize(uri,(width, height) => {
      let show_heights = this.state.show_heights;
      show_heights[from_name] = Math.round(320 * height / width);
      this.setState({show_heights:show_heights});
    });

    let imgs = this.state.images;
    imgs.push({
      url:uri,
      props:{},
    });

    this.setState({images: imgs});
  }

  _render_customer_demand_items = () => {
    let customer_demand_items = this.nav_data.customer_demand_items;
    let customer_names = Object.keys(customer_demand_items);
    let render_items = [];
    customer_names.map(customer_name => {
      render_items.push(
        <ViewShot  onCapture={(uri) => this._onCapture_customer_demand_items(uri, customer_name)} 
        captureMode="mount"
        style={{width:480, padding:5, backgroundColor:'white'}}>

          <View style={{borderBottomWidth:1, borderColor:'#000', }}>
            <Text style={{textAlign:'center', fontSize:18, paddingHorizontal:10, paddingTop:10, color:'#3B3B3B', fontWeight:'bold'}}
            >客 户 材 料 需 求 单</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:5}}>
              <Text style={styles.mainText}>客户：{customer_name}</Text>
              <Text style={styles.mainText}>订单号：{this.order_serial}</Text>
            </View>
          </View>

          <View style={{minHeight:200, borderBottomWidth:1, borderColor:'#000',paddingBottom:10}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingTop:5}}>
              <Text style={[styles.mainText, {width:50}]}>编号</Text>
              <Text style={[styles.mainText, {flex:4}]}>材料</Text>
              <Text style={[styles.mainText, {flex:1, textAlign:'right'}]}>数量</Text>
            </View>
            
            {(() => {
              let materials = customer_demand_items[customer_name];
              let index = 1;
              let reder_material_items = [];
              materials.map((material) => {
                reder_material_items.push(
                  <View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10}}>
                      <Text style={[styles.mainText, {width:50}]}>{index}</Text>
                      <Text style={[styles.mainText, {flex:4}]}>{material.material}</Text>
                      <Text style={[styles.mainText, {flex:1, textAlign:'right'}]}>{material.quantity}{material.material_unit}</Text>
                    </View>

                    {material.remark
                      ? <Text style={[styles.mainText, {paddingHorizontal:60}]}>备注：{material.remark}</Text>
                      : null}

                  </View>
                );
                index++;
              });
              return reder_material_items;
            })()}
          </View>

          <View style={{flexDirection:'row', paddingHorizontal:10, paddingTop:5}}>
            <Text style={[styles.mainText, {flex:1}]}>负责人：{this.nav_data.user_info.name}</Text>
            <Text style={[styles.mainText, {flex:1, textAlign:'right'}]}>{this.nav_data.order_datetime}</Text>
          </View>
          <Text style={[styles.mainText, {textAlign:'center', paddingHorizontal:10, paddingTop:5, paddingBottom:10}]}
          >大连瑞祥装饰有限公司</Text>
        </ViewShot>
      );
    });

    return render_items;
  }

  _render_from_purchase_sum = () => {
    let from_purchase_sum = this.nav_data.from_purchase_sum;
    let from_names = Object.keys(from_purchase_sum);
    let render_items = [];
    from_names.map(from_name => {
      render_items.push(
        <ViewShot  onCapture={(uri) => this._onCapture_from_purchase_sum(uri, from_name)} 
        captureMode="mount"
        style={{width:480, padding:5, backgroundColor:'white'}}>

          <View style={{borderBottomWidth:1, borderColor:'#000', }}>
            <Text style={{textAlign:'center', fontSize:18, paddingHorizontal:10, paddingTop:10, color:'#3B3B3B', fontWeight:'bold'}}
            >材 料 商 采 购 单</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:5}}>
              <Text style={styles.mainText}>材料商：{from_name}</Text>
              <Text style={styles.mainText}>订单号：{this.order_serial}</Text>
            </View>
          </View>

          <View style={{minHeight:200, borderBottomWidth:1, borderColor:'#000',paddingBottom:10}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingTop:5}}>
              <Text style={[styles.mainText, {width:50}]}>编号</Text>
              <Text style={[styles.mainText, {flex:4}]}>材料</Text>
              <Text style={[styles.mainText, {flex:1}]}>单价</Text>
              <Text style={[styles.mainText, {flex:1, textAlign:'right'}]}>数量</Text>
            </View>
            
            {(() => {
              let materials = from_purchase_sum[from_name].purchase_items;
              let index = 1;
              let reder_material_items = [];
              materials.map((material) => {
                reder_material_items.push(
                  <View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10}}>
                      <Text style={[styles.mainText, {width:50}]}>{index}</Text>
                      <Text style={[styles.mainText, {flex:4}]}>{material.material}</Text>
                      <Text style={[styles.mainText, {flex:1}]}>{material.price}</Text>
                      <Text style={[styles.mainText, {flex:1, textAlign:'right'}]}>{material.quantity}{material.material_unit}</Text>
                    </View>

                    {material.remark
                      ? <Text style={[styles.mainText, {paddingHorizontal:60}]}>备注：{material.remark}</Text>
                      : null}

                  </View>
                );
                index++;
              });
              return reder_material_items;
            })()}

            <View style={{padding:10}}>
              <Text style={[styles.mainText, {textAlign:'right'}]}>合计：   {from_purchase_sum[from_name].expense}元</Text>
            </View>
          </View>

          <View style={{flexDirection:'row', paddingHorizontal:10, paddingTop:5}}>
            <Text style={[styles.mainText, {flex:1}]}>负责人：{this.nav_data.user_info.name}</Text>
            <Text style={[styles.mainText, {flex:1, textAlign:'right'}]}>{this.nav_data.order_datetime}</Text>
          </View>
          <Text style={[styles.mainText, {textAlign:'center', paddingHorizontal:10, paddingTop:5, paddingBottom:10}]}
          >大连瑞祥装饰有限公司</Text>
        </ViewShot>
      );
    });

    return render_items;
  }

  render() {
    return (

      <View style={styles.container}>

        <Modal
          transparent={false}
          visible={this.state.imageModalVisible}
          onRequestClose={() => this._setModalVisible(false)}
        >
          <ImageViewer imageUrls={this.state.images} 
            index={this.state.cur_img_index}
            menuContext={{}}/>
        </Modal>

        <View style={styles.headerContainer}>
          <TouchableHighlight style={styles.cancelBtn}
            onPress={() => this.props.navigation.navigate('PlaceOrderForm', {waiting_render_img:false})}>
            <Text style={styles.cancelText}>后退</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.activeBtn} onPress={this._submitPost}>
            <Text style={styles.activeBtnText}>确认</Text>
          </TouchableHighlight>
        </View>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} style={styles.keyboardAvoiding} enabled>
          <ScrollView contentContainerStyle={styles.ScrollViewStyle}>
            <View style={styles.Canvas}>

              <View style={{alignItems:'center'}}>
                <Text style={{fontSize:16}}>客户材料需求单</Text>

                {(() => {
                  let render_items = [];
                  this.tmp_img_index = 0;
                  Object.keys(this.state.customer_demand_items_url).map(customer_name => {
                    // 不加这一行导致箭头函数里的index为外层index的引用，加完就变成传值了。
                    let img_index = this.tmp_img_index;
                    let url = this.state.customer_demand_items_url[customer_name];
                    let show_height = this.state.show_heights[customer_name];
                    
                    render_items.push(
                      <TouchableHighlight onPress={() => {
                        this.setState({cur_img_index: img_index});
                        this._setModalVisible(true);
                      }}
                      style={{elevation:3, margin:5, backgroundColor:'white'}}>
                        <Image source={{uri:url}} 
                        style={{width:320,height:show_height,resizeMode: 'contain',}} />
                      </TouchableHighlight>
                    );
                    this.tmp_img_index++;
                  });
                  return render_items;
                })()}
              </View>

              <View style={{alignItems:'center'}}>
                <Text style={{fontSize:16, paddingTop:20}}>材料商采购单</Text>

                {(() => {
                  let render_items = [];
                  Object.keys(this.state.from_purchase_sum_url).map(from_name => {
                    // 不加这一行导致箭头函数里的index为外层index的引用，加完就变成传值了。
                    let img_index = this.tmp_img_index;
                    let url = this.state.from_purchase_sum_url[from_name];
                    let show_height = this.state.show_heights[from_name];
                    
                    render_items.push(
                      <TouchableHighlight onPress={() => {
                        this.setState({cur_img_index: img_index});
                        this._setModalVisible(true);
                      }}
                      style={{elevation:3, margin:5, backgroundColor:'white'}}>
                        <Image source={{uri:url}} 
                        style={{width:320,height:show_height,resizeMode: 'contain',}} />
                      </TouchableHighlight>
                    );
                    this.tmp_img_index++;
                  });
                  return render_items;
                })()}
              </View>

              <View style={{position:'absolute', top:0, left:size.width+10}}>
                {this._render_customer_demand_items()}
                {this._render_from_purchase_sum()}
              </View>

              

            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        

        

      </View>


      // <View>
      //   <TouchableHighlight onPress={this._capture}>
      //     <Text>button</Text>
      //   </TouchableHighlight>
      //   <TouchableHighlight onPress={this._share}>
      //     <Text>share</Text>
      //   </TouchableHighlight>
      //   {/* <Image source={{uri:this.state.uri}} style={{width:220,height:220,borderRadius:6,marginRight:6,borderWidth:1,borderColor:'red'}} /> */}

      //   <ViewShot ref="viewShot">
      //     <Text style={{backgroundColor:'green'}}>...Something to rasterize...</Text>
      //     <View style={{width:100, height:100, backgroundColor:'green'}}></View>
      //     <Image source={{uri:this.state.url}} 
      //       style={{width:320,height:320,marginRight:6,borderWidth:1,borderColor:'red',resizeMode: 'contain',}} 
      //       // onLoad={this._capture}
      //       />
      //   </ViewShot>
      // </View>
    );
  }
}

const styles = StyleSheet.create({


  

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
  activeBtnText:{
    color:"#fff",
    fontSize:14
  },


  mainText:{
    fontSize:16,
    color:'#3b3b3b',
  },
});