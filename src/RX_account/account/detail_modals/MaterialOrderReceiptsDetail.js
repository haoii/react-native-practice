
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        Image, KeyboardAvoidingView, ScrollView, Modal, BackHandler,
        CameraRoll, Platform   } from 'react-native';
import RNFetchBlob from "react-native-fetch-blob";
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import ImageViewer from 'react-native-image-zoom-viewer';

import URL, {EPSILON} from '../../Config';

import Dimensions from 'Dimensions';
const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class MaterialOrderReceiptsDetail  extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.order = this.props.navigation.getParam('order');

    if (this.order.customer_demand_images_str) {
      this.customer_demand_images = this.order.customer_demand_images_str.slice(0,-1).split(';').map(url => {
        return URL.static_dir + url;
      });
    } else {
      this.customer_demand_images = [];
    }

    if (this.order.from_purchase_images_str) {
      this.from_purchase_images = this.order.from_purchase_images_str.slice(0,-1).split(';').map(url => {
        return URL.static_dir + url;
      });
    } else {
      this.from_purchase_images = [];
    }

    let index = 0;
    this.from_purchase_images.map((uri) => {
      let tmp_index = index;
      Image.getSize(uri,(width, height) => {
        let from_heights = this.state.from_heights;
        from_heights[tmp_index] = Math.round(320 * height / width);
        this.setState({from_heights:from_heights});
      });
      index++
    });

    index = 0;
    this.customer_demand_images.map((uri) => {
      let tmp_index = index;
      Image.getSize(uri,(width, height) => {
        let customer_heights = this.state.customer_heights;
        customer_heights[tmp_index] = Math.round(320 * height / width);
        this.setState({customer_heights:customer_heights});
      });
      index++;
    });

    this.tmp_img_index = 0;

    this.state = { 

      customer_heights: {},
      from_heights: {},

      imageModalVisible: false,

      images: this.customer_demand_images.concat(this.from_purchase_images).map(uri => ({
        url:uri, 
        props: {}
      })),
      cur_img_index: 0,
    };
  }

  _setModalVisible = (visible) => {
    this.setState({ imageModalVisible: visible });
  }

  // _share = (url) => {

  //   const fs = RNFetchBlob.fs;
  //   let imagePath = null;
  //   RNFetchBlob.config({
  //     fileCache: true,
  //     appendExt : 'jpg'
  //   })
  //     .fetch("GET", 'http://img.wxcha.com/file/201807/13/9bbc369f6e.jpg',{})
  //     // the image is now dowloaded to device's storage
  //     .then(async resp => {
  //       // the image path you can use it directly with Image component
  //       // imagePath = Platform.OS === 'android' ? 'file://' +  resp.path(): '' + resp.path();
  //       imagePath = resp.path();

  //       await Share.open({
  //         title: '分享单据',
  //         // message: 'some message',
  //         type: 'image/jpeg',
  //         url: 'file://' + imagePath,
  //       });
  //       await fs.unlink(imagePath);

  //     });
      
  // }

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
          title: '分享单据',
          type: 'image/jpeg',
          url: base64data,
        });
        await fs.unlink(imagePath);
      });
      
  }

  _saveImage = (url) => {
    CameraRoll.saveToCameraRoll(url).catch((err) => {
      alert(err);
    });
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
            enableSwipeDown={true}
            onSave={(url) => {
              this._share(url);
            }}
            menuContext={{
              saveToLocal: '分享', 
              cancel: '取消'
            }}
            // onSaveToCamera = {(index) => {
            //   this._share(this.state.images[index].url);
            // }}
          />
        </Modal>


        <ScrollView contentContainerStyle={styles.ScrollViewStyle}>
          <View style={styles.Canvas}>

            <View style={{alignItems:'center'}}>

              <Text style={{fontSize:16}}>客户材料需求单</Text>

              {(() => {
                let render_items = [];
                this.tmp_img_index = 0;
                this.customer_demand_images.map(url => {
                  // 不加这一行导致箭头函数里的index为外层index的引用，加完就变成传值了。
                  let img_index = this.tmp_img_index;
                  let show_height = this.state.customer_heights[img_index];
                  
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
                let height_index = 0;
                this.from_purchase_images.map(url => {
                  // 不加这一行导致箭头函数里的index为外层index的引用，加完就变成传值了。
                  let img_index = this.tmp_img_index;
                  let show_height = this.state.from_heights[height_index++];
                  
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

            

          </View>
        </ScrollView>

      
      </View>

    );
  }
}

const styles = StyleSheet.create({

  ScrollViewStyle: {
    // paddingLeft:15,
    // paddingRight:15,
    // flexGrow:1,
  },

  Canvas: {
    paddingTop:15,
    paddingBottom:50
  },

  container:{
    height:size.height,
    backgroundColor: '#F5F5F5',
    justifyContent:'flex-start',
  },

  mainText:{
    fontSize:16,
    color:'#3b3b3b',
  },
});