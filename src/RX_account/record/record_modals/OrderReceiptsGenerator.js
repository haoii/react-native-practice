
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        Image, KeyboardAvoidingView, ScrollView, Modal  } from 'react-native';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import ImageViewer from 'react-native-image-zoom-viewer';


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
    };

    this.state = { 
      customer_demand_items_url: {},
      imageModalVisible: false,
      images: [],
    };
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

  _submitPost = () => {

  }

  _onCapture_customer_demand_items = (uri, customer_name) => {
    let urls = this.state.customer_demand_items_url;
    urls[customer_name] = uri;
    this.setState({customer_demand_items_url:urls});

    let imgs = [];
    Object.keys(urls).map(name => {
      imgs.push({
        url:urls[name],
        props:{},
      });
    });

    this.setState({images: imgs});
  }

  _render_customer_demand_items = () => {
    let customer_demand_items = this.nav_data.customer_demand_items;
    let customer_names = Object.keys(customer_demand_items);
    let render_items = [];
    customer_names.map(customer_name => {
      render_items.push(
        <ViewShot  onCapture={(uri) => this._onCapture_customer_demand_items(uri, customer_name)} captureMode="mount"
        style={{width:600, height:300, backgroundColor:'green'}}>

          <Text style={{textAlign:'center', borderBottomWidth:1, borderColor:'#000'}}>客户需求单</Text>

          <Text>{customer_name}</Text>
          <Text>{customer_demand_items[customer_name][0].material}</Text>
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
          <ImageViewer imageUrls={this.state.images}/>
        </Modal>

        <View style={styles.headerContainer}>
          <TouchableHighlight style={styles.cancelBtn}
            onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.cancelText}>取消</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.activeBtn} onPress={this._submitPost}>
            <Text style={styles.activeBtnText}>确认</Text>
          </TouchableHighlight>
        </View>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} style={styles.keyboardAvoiding} enabled>
          <ScrollView contentContainerStyle={styles.ScrollViewStyle}>
            <View style={styles.Canvas}>

            {this._render_customer_demand_items()}

            {Object.keys(this.state.customer_demand_items_url).map(customer_name => {
              let url = this.state.customer_demand_items_url[customer_name];
              return (
                <TouchableHighlight onPress={() => this._setModalVisible(true)}>
                  <Image source={{uri:url}} 
                  style={{width:120,height:120,marginRight:6,borderWidth:1,borderColor:'red',resizeMode: 'contain',}} />
                </TouchableHighlight>
                
              );
              
            })}

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
});