
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        Image, KeyboardAvoidingView, ScrollView, Modal, BackHandler   } from 'react-native';
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

  _share = (url) => {
    const shareOptions = {
      title: 'Share via',
      message: 'some message',
      type: 'image/jpeg',
      url: url,
    };

    Share.open(shareOptions)
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });
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
            // onSaveToCamera = {(index) => {
            //   this._share(this.state.images[index].url);
            // }}
          />
        </Modal>


        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} style={styles.keyboardAvoiding} enabled>
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
        </KeyboardAvoidingView>

      
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