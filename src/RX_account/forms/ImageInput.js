
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight,
        Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import IconIonicons from 'react-native-vector-icons/Ionicons';

export default class ImageInput extends Component {
  static defaultProps = {

    onEndEditing: null,
  }

  constructor(props) {
    super(props);
    this.state = { 
      img_url:[],

    };
  }
  
  _pickImage = () => {

    if (this.state.img_url.length >= 9) {
      alert('最多只能选择9张');
      return;
    }

    ImagePicker.openPicker({
      multiple: true,
      compressImageMaxWidth:1080,
      compressImageQuality:0.4,
      forceJpg: true,
    }).then(images => {
      let img_url = this.state.img_url;
      img_url = (img_url.concat(images.map(i => i.path))).slice(0,9);
      this.setState({
        img_url: img_url,
      });
      if (this.props.onEndEditing)
        this.props.onEndEditing(img_url);
    }).catch(e => alert(e));
  }

  _postImages = (urls) => {
    var images = [];
    urls.map(v => {
      v = v.trim();
      if (v) {
        images.push(<Image source={{uri:v}} style={{width:80,height:80,marginRight:5}} />)
      }
    })
    return images;
  }

  render() {
    return (
      <View style={styles.inputItemOutterView}>

        <Text style={[styles.fontMain]}>图片</Text>

        <View style={styles.inputItemInnerView}>
          <View style={{flexDirection:'row'}}>
            {this._postImages(this.state.img_url.slice(0,3))}
          </View>
          <View style={{flexDirection:'row',marginTop:5,}}>
            {this._postImages(this.state.img_url.slice(3,6))}
          </View>
          <View style={{flexDirection:'row',marginTop:5,}}>
            {this._postImages(this.state.img_url.slice(6,9))}
          </View>

          <TouchableHighlight  onPress={this._pickImage} style={[styles.touchableView]}>
            <View style={[styles.touchableContentView]}>
              <IconIonicons name="ios-add" size={60} />
            </View>
          </TouchableHighlight>

        </View>

      </View>);
  }
}

const styles = StyleSheet.create({

  touchableView: {
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginTop:5,
  },
  touchableContentView: {
    paddingHorizontal:15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#e0e0e0',
  },

  inputItemOutterView: {
    paddingBottom:10,
    alignItems:'stretch',
  },
  inputItemInnerView: {
    backgroundColor:'white',
    borderRadius:5,
    marginBottom:5,
    marginTop:5,
    padding:10,
  },
  inputItemLabelView: {
    flexDirection:'row'
  },

  fontMain: {
    fontSize:16,
    paddingLeft:10,
  },
  fontMinor: {
    fontSize:12,
  },
  textInput: {
    minWidth:200,     
  },

});