
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        Image } from 'react-native';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';

import Dimensions from 'Dimensions';
const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};


export default class ExampleCaptureOnMountSimpler  extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = { 
      url:'',
    };
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

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this._capture}>
          <Text>button</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._share}>
          <Text>share</Text>
        </TouchableHighlight>
        {/* <Image source={{uri:this.state.uri}} style={{width:220,height:220,borderRadius:6,marginRight:6,borderWidth:1,borderColor:'red'}} /> */}

        <ViewShot ref="viewShot">
          <Text style={{backgroundColor:'green'}}>...Something to rasterize...</Text>
          <View style={{width:100, height:100, backgroundColor:'green'}}></View>
          <Image source={{uri:this.state.url}} 
            style={{width:320,height:320,marginRight:6,borderWidth:1,borderColor:'red',resizeMode: 'contain',}} 
            // onLoad={this._capture}
            />
        </ViewShot>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});