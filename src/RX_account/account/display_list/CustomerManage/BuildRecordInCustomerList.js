
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import RNFetchBlob from "react-native-fetch-blob";
import Share from 'react-native-share';
import ImageViewer from 'react-native-image-zoom-viewer';

import RetryComponent from '../../../baseComponent/RetryComponent';

import URL from '../../../Config';

import Dimensions from 'Dimensions';
const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class BuildRecordInCustomerList extends Component {
  static defaultProps = {
    customer_id: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      imageModalVisible: false,
      images: [],
      cur_img_index: 0,

      refreshing: false,
      buil_records: [],

      got_no_data: false,
      no_data_hint: '',
    }
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

  componentDidMount() {
    this._refreshDate();
  }

  _fetchData = () => {
    fetch(URL.buil_records_in_customer + this.props.customer_id + '/', {credentials: 'same-origin'})
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          if (responseJson.data.length === 0) {
            this.setState({refreshing: false, got_no_data:true, no_data_hint: '没有数据~'});
          } else {
            let arrData = responseJson.data;
            let i = 0;
            let arrList = [];
            arrData.map(item => {
              arrList.push({key: i, value: item});
              i++;
            })
            this.setState({buil_records: arrList, refreshing: false, got_no_data:false});
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
            <Image source={{uri:URL.static_dir+v}} style={{width:80,height:80,borderRadius:0,marginRight:5}} />
          </TouchableOpacity>
          
        );
      }
    })

    return render_images;
  }

  _renderItem = ({item}) => {
    return (
      <View style={{flexDirection:'row'}}>
        <View style={{paddingLeft: 20, paddingRight:5, alignItems:'flex-end', borderRightWidth:2, borderRightColor:'#e0e0f0'}}>
          <Text>{item.value.pub_time.slice(0,10)}</Text>
          <Text>{item.value.user_name}</Text>
        </View>

        <View style={{paddingLeft:5}}>
          <Text>{item.value.text}</Text>

          <View style={{flexDirection:'row'}}>
            {item.value.img_urls? this._postImages(item.value.img_urls): null}
          </View>
        </View>
        
      </View>
    )
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

        {this.state.got_no_data
          ? <RetryComponent 
              hint={this.state.no_data_hint} 
              retryFunc={this._refreshDate}
              style={{height:100}}/>
          : <FlatList
              data={this.state.buil_records}
              onRefresh={this._refreshDate}
              refreshing={this.state.refreshing}
              renderItem={this._renderItem}
            />}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    padding:10, 
    marginHorizontal:8,
    marginTop:3,
    marginBottom: 5,
    backgroundColor:'white',
    borderRadius:8,
    elevation: 2,
  },
  itemTitleView: {
    flexDirection:'row', 
    alignItems:'flex-end', 
    justifyContent:'space-between',
  },
  itemTitleLeftView: {
    flexDirection:'row', 
    alignItems:'flex-end',
  },
  mainBoldText: {
    fontSize:16, 
    fontWeight:'bold',
  },
  minorText: {
    fontSize:14,
  },

  progressBarContainer: {
    height: 25,
  },
  progressBarBase: {
    height:10, 
    borderRadius:5, 
    position:'absolute', 
    left:0, 
    top:10,
  },
  progressBar: {
    height:10, 
    borderTopLeftRadius:5, 
    borderBottomLeftRadius:5,
    position:'absolute', 
    left:0, 
    top:10,
  },
  detailView: {
    flexDirection:'row', 
  },
  detailLeftView: {
    flexDirection:'row', 
  },

  loadding: {
    marginTop: 100
  },
})
