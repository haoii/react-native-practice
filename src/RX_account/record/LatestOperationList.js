
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, 
        FlatList, Image, Modal } from 'react-native';
import RNFetchBlob from "react-native-fetch-blob";
import Share from 'react-native-share';
import ImageViewer from 'react-native-image-zoom-viewer';

import RetryComponent from '../baseComponent/RetryComponent';
import {ScreenSize} from '../Config';

export default class LatestOperationList extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.latestOperations = [
      {
        avatar_url: 'https://m.jianbihua.com/sites/default/files/styles/photo640x425/public/images/2018-03/韩风头像10.jpg',
        name: '高路',
        type: 'add_order',
        fk0: 101,
        text: '备注：电线从仓库取，其他开关、灯具、插座、网线等从金三角市场购买。',
        pub_date: '6小时前',
        img_urls: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564498057601&di=f3ff3fc09492957d81c305ca1ffaca87&imgtype=0&src=http%3A%2F%2Fstatic.qizuang.com%2Fupload%2Feditor%2Fimage%2F20150828%2F20150828144925_46372.jpg;'
                   + 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564498234670&di=a0fdaf36ebc117f70e2ad07c62d51fa2&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170718%2F45d3c94952b94965a658f653b8c82779_th.jpg',
      },
      {
        avatar_url: 'https://m.jianbihua.com/sites/default/files/styles/photo640x425/public/images/2018-03/韩风头像10.jpg',
        name: '高路',
        type: 'add_customer',
        fk0: 2,
        text: '',
        str0: '韩丽华',
        pub_date: '1天前',
      },
      {
        avatar_url: 'http://img.wxcha.com/file/201807/13/9bbc369f6e.jpg',
        name: '程宁宁',
        type: 'collect_from_customer',
        str0: '谢村忠',
        fk0: 1,
        fk1: 2,
        double0: 20000,
        text: '备注：支付宝收款。',
        pub_date: '1天前',
        img_urls: 'http://www.ditiw.com/img/aHR0cDovL2ltZzIuaW1ndG4uYmRpbWcuY29tL2l0L3U9MTMzNTQzNTg3NywyMjk5Njk4MjM1JmZtPTI2JmdwPTAuanBn.jpg'
      },
      
    ];

    this.state = { 
      imageModalVisible: false,
      images: [],
      cur_img_index: 0,

      refreshing: false,
      operations: [],
      
      got_no_data: false,
      no_data_hint: '',
    };
  }

  componentDidMount() {
    this._refreshDate();
  }

  
  _fetchData = () => {
    fetch(URL.user_operations, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          if (responseJson.data.length === 0) {
            this.setState({refreshing: false, got_no_data:true, no_data_hint: '没有数据~'});
          } else {
            // let arrData = responseJson.data;
            // let i = 0;
            // let arrList = [];
            // arrData.map(item => {
            //   arrList.push({key: i, value: item});
            //   i++;
            // });
            this.setState({operations: responseJson.data, refreshing: false, got_no_data:false});
          }
        } else if (responseJson.msg === 'not_logged_in') {
          this.setState({refreshing: false, got_no_data:true, no_data_hint: '您还没有登录~'});
          this.props.navigation.navigate('LoginScreen');
        } else {
          this.setState({refreshing: false, got_no_data:true, no_data_hint: '出现未知错误'});
        }

      }).catch((error) => {
        this.setState({refreshing: false, got_no_data:true, no_data_hint: '服务器出错了'});
      });
  }

  _refreshDate = () => {
    this.setState({refreshing: true});
    this._fetchData();
  }

  _renderOperationData = (item) => {
    if (item.type == 'add_customer') {
      return (
        <View style={{flexDirection:'row'}}> 
          <Text style={styles.operationText}>添加了新客户：</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerDetail',{customer_id:item.fk0})}>
            <Text style={[styles.operationText, {textDecorationLine:'underline', color:'#181880'}]}>{item.str0}</Text>
          </TouchableOpacity>
        </View> 
      );
    } else if (item.type == 'collect_from_customer') {
      return (
        <View style={{flexDirection:'row'}}> 
          <Text style={styles.operationText}>收到客户</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerDetail',{customer_id:item.fk0})}>
            <Text style={[styles.operationText, {textDecorationLine:'underline', color:'#181880'}]}>{item.str0}</Text>
          </TouchableOpacity>
          <Text style={styles.operationText}>装修款：</Text>
          <Text style={[styles.mainText]}>{item.double0}元</Text>
        </View> 
      );
    } else if (item.type == 'add_order') {
      return (
        <View style={{flexDirection:'row'}}> 
          <Text style={styles.operationText}>添加了材料订单：</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MaterialOrderDetail',{order_id:item.fk0})}>
            <Text style={[styles.operationText, {textDecorationLine:'underline', color:'#181880'}]}>订单号{item.fk0}</Text>
          </TouchableOpacity>
          
        </View> 
      );
    } else if (item.type == 'edit_customer') {
      return (
        <View style={{flexDirection:'row'}}> 
          <Text style={styles.operationText}>修改了客户：</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerDetail',{customer_id:item.fk0})}>
            <Text style={[styles.operationText, {textDecorationLine:'underline', color:'#181880'}]}>{item.str0}</Text>
          </TouchableOpacity>
        </View> 
      );
    } else if (item.type == 'add_memo') {
      return (
        <View style={{flexDirection:'row'}}> 
          <Text style={styles.operationText}>添加了备忘录：</Text>
        </View> 
      );
    } else if (item.type == 'add_build_record') {
      return (
        <View style={{flexDirection:'row'}}> 
          <Text style={styles.operationText}>添加了施工记录：</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerDetail',{customer_id:item.fk0})}>
            <Text style={[styles.operationText, {textDecorationLine:'underline', color:'#181880'}]}>{item.str0}</Text>
          </TouchableOpacity>
        </View> 
      );
    }
  }

  _postImages = (urls) => {
    const urlList = urls.slice(0,-1).split(';');
    var render_images = [];
    let images = urlList.map(uri => ({
      url:URL.static_dir+uri, 
      props: {}
    }));
    urlList.map((v,i) => {
      v = v.trim();
      if (v) {
        render_images.push(
          <TouchableOpacity onPress={() => {
            this.setState({
              images: images,
              cur_img_index: i,
              imageModalVisible: true,
            });
          }}>
            <Image source={{uri:URL.static_dir+v}} style={{width:120,height:120,borderRadius:0,marginRight:6}} />
          </TouchableOpacity>
          
        );
      }
    })

    return render_images;
  }


  _renderItem = ({item}) => {
    let dt = new Date();
    let year = dt.getFullYear();
    let month = dt.getMonth()+1;
    let day = dt.getDate();
    let hour = dt.getHours();
    let minute = dt.getMinutes();
    let second = dt.getSeconds();
    let p_year = Number(item.pub_time.slice(0,4));
    let p_month = Number(item.pub_time.slice(5,7));
    let p_day = Number(item.pub_time.slice(8,10));
    let p_hour = Number(item.pub_time.slice(11,13));
    let p_minute = Number(item.pub_time.slice(14,16));
    let p_second = Number(item.pub_time.slice(17,19));
    let time_show = '';
    if (year !== p_year) {
      time_show = '' + (year - p_year) + '年前';
    } else if (month !== p_month) {
      time_show = '' + (month - p_month) + '月前';
    } else if (day !== p_day) {
      time_show = '' + (day - p_day) + '天前';
    } else if (hour !== p_hour) {
      time_show = '' + (hour - p_hour) + '小时前';
    } else if (minute !== p_minute) {
      time_show = '' + (minute - p_minute) + '分钟前';
    } else if (second != p_second) {
      time_show = '' + (second - p_second) + '秒前';
    }

    return (
      <View style={{width:ScreenSize.width, marginTop:12, flexDirection:'row',paddingRight:10, paddingLeft:10,
      borderBottomWidth: 1, borderBottomColor: '#EFEFEF'}}>
        <View>
          <Image source={{uri:URL.static_dir+item.avatar_url}} style={{width:46,height:46,borderRadius:4}} />
        </View>

        <View style={{marginLeft:10, flex:1}}>
          <Text style={{fontSize:16, color:'#181880', textAlignVertical:'top'}}>{item.user_name}</Text>

          {this._renderOperationData(item)}

          {item.text?<Text style={styles.mainText}>{item.text}</Text>:null}

          <View style={{flexDirection:'row'}}>
            {item.img_urls? this._postImages(item.img_urls): null}
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:5}}>
            <Text style={{color: '#A6A6A6', fontSize: 12}}>
              {time_show}
            </Text>

            <TouchableOpacity style={{backgroundColor:'#d6d6d6',borderRadius:2}}>
              <Text style={{color:'#181880', fontSize:12}}>  ••  </Text>
            </TouchableOpacity>
          </View>

        </View>

        
      </View>
    )
  }

  _share = (url) => {

    const fs = RNFetchBlob.fs;
    let imagePath = null;

    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch("GET", url,{})
      .then(resp => {
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(async base64data => {
        base64data = `data:image/jpeg;base64,` + base64data;

        await Share.open({
          title: '分享',
          type: 'image/jpeg',
          url: base64data,
        });
        await fs.unlink(imagePath);
      });
      
  }

  render() {
    return (
      <View>
        <Modal
          transparent={false}
          visible={this.state.imageModalVisible}
          onRequestClose={() => this.setState({imageModalVisible:false})}
        >
          <ImageViewer imageUrls={this.state.images} 
            index={this.state.cur_img_index}
            enableSwipeDown={true}
            onSave={(url) => {
              this._share(url);
            }}
            menuContext={{
              saveToLocal: '分享', 
              cancel: '取消'
            }}
          />
        </Modal>


        {/* <FlatList
          data={this.latestOperations}
          // onRefresh={this._refreshDate}
          // refreshing={this.state.refreshing}
          renderItem={this._renderItem}/> */}

        {this.state.got_no_data
          ? <RetryComponent 
              hint={this.state.no_data_hint} 
              retryFunc={this._refreshDate}
              style={{height:400}}/>
          : <FlatList
              data={this.state.operations}
              onRefresh={this._refreshDate}
              refreshing={this.state.refreshing}
              renderItem={this._renderItem}
              // ListHeaderComponent={
              //   <View style={{height:5}}></View>
              // }
              />}

      </View>);
  }
}

const styles = StyleSheet.create({
  loadding: {
    marginTop: 100
  },

  mainText: {
    marginBottom:5,
    color:'#3B3B3B'
  },

  operationText: {
    marginBottom:5,
    color:'#E4572E'
  }
});