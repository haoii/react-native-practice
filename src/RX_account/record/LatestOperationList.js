
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, 
        FlatList, Image, Modal } from 'react-native';
import RNFetchBlob from "react-native-fetch-blob";
import Share from 'react-native-share';
import ImageViewer from 'react-native-image-zoom-viewer';

import {ScreenSize} from '../Config';

export default class LatestOperationList extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.latestOperations = [
      {
        user: {
          portrait_url: 'https://m.jianbihua.com/sites/default/files/styles/photo640x425/public/images/2018-03/韩风头像10.jpg',
          name: '高路'
        }, 
        type: 'add_order',
        data: {
          order_id: 12,
        },
        text: '备注：电线从仓库取，其他开关、灯具、插座、网线等从金三角市场购买。',
        pub_date: '6小时前',
        image_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564498057601&di=f3ff3fc09492957d81c305ca1ffaca87&imgtype=0&src=http%3A%2F%2Fstatic.qizuang.com%2Fupload%2Feditor%2Fimage%2F20150828%2F20150828144925_46372.jpg;'
                   + 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564498234670&di=a0fdaf36ebc117f70e2ad07c62d51fa2&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170718%2F45d3c94952b94965a658f653b8c82779_th.jpg',
      },
      {
        user: {
          portrait_url: 'https://m.jianbihua.com/sites/default/files/styles/photo640x425/public/images/2018-03/韩风头像10.jpg',
          name: '高路'
        }, 
        type: 'add_customer',
        data: {
          name: '韩丽华',
          customer_id: 5,
        },
        text: '',
        pub_date: '1天前',
      },
      {
        user: {
          portrait_url: 'http://img.wxcha.com/file/201807/13/9bbc369f6e.jpg',
          name: '程宁宁'
        }, 
        type: 'collect_from_customer',
        data: {
          customer_name: '谢村忠',
          customer_id: 5,
          quantity: 20000,
        },
        text: '备注：支付宝收款。',
        pub_date: '1天前',
        image_url: 'http://www.ditiw.com/img/aHR0cDovL2ltZzIuaW1ndG4uYmRpbWcuY29tL2l0L3U9MTMzNTQzNTg3NywyMjk5Njk4MjM1JmZtPTI2JmdwPTAuanBn.jpg'
      },
      
    ];

    this.state = { 
      imageModalVisible: false,
      images: [],
      cur_img_index: 0,
    };
  }

  _renderOperationData = (item) => {
    if (item.type == 'add_customer') {
      return (
        <View style={{flexDirection:'row'}}> 
          <Text style={styles.operationText}>添加了新客户：</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerDetail',{customer_id:2})}>
            <Text style={[styles.operationText, {textDecorationLine:'underline', color:'#181880'}]}>{item.data.name}</Text>
          </TouchableOpacity>
        </View> 
      );
    } else if (item.type == 'collect_from_customer') {
      return (
        <View style={{flexDirection:'row'}}> 
          <Text style={styles.operationText}>收到客户</Text>
          <Text style={[styles.operationText, {textDecorationLine:'underline', color:'#181880'}]}> {item.data.customer_name} </Text>
          <Text style={styles.operationText}>装修款：</Text>
          <Text style={[styles.operationText, {textDecorationLine:'underline', color:'#181880'}]}>{item.data.quantity}元</Text>
        </View> 
      );
    } else if (item.type == 'add_order') {
      return (
        <View style={{flexDirection:'row'}}> 
          <Text style={styles.operationText}>添加了材料订单：</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MaterialOrderDetail',{order_id:103})}>
            <Text style={[styles.operationText, {textDecorationLine:'underline', color:'#181880'}]}>订单号{item.data.order_id}</Text>
          </TouchableOpacity>
          
        </View> 
      );
    }
  }

  _postImages = (urls) => {
    const urlList = urls.split(';');
    var render_images = [];
    let images = urlList.map(uri => ({
      url:uri, 
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
            <Image source={{uri:v}} style={{width:120,height:120,borderRadius:0,marginRight:6}} />
          </TouchableOpacity>
          
        );
      }
    })

    return render_images;
  }


  _renderItem = ({item}) => {
    return (
      <View style={{width:ScreenSize.width, marginTop:12, flexDirection:'row',paddingRight:10, paddingLeft:10,
      borderBottomWidth: 1, borderBottomColor: '#EFEFEF'}}>
        <View>
          <Image source={{uri:item.user.portrait_url}} style={{width:46,height:46,borderRadius:4}} />
        </View>

        <View style={{marginLeft:10, flex:1}}>
          <Text style={{fontSize:16, color:'#181880', textAlignVertical:'top'}}>{item.user.name}</Text>

          {this._renderOperationData(item)}

          {item.text?<Text style={styles.mainText}>{item.text}</Text>:null}

          <View style={{flexDirection:'row'}}>
            {item.image_url? this._postImages(item.image_url): null}
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:5}}>
            <Text style={{color: '#A6A6A6', fontSize: 12}}>
              {item.pub_date}
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


        <FlatList
          data={this.latestOperations}
          // onRefresh={this._refreshDate}
          // refreshing={this.state.refreshing}
          renderItem={this._renderItem}/>

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