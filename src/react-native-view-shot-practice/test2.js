
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        Image } from 'react-native';
import { captureRef } from "react-native-view-shot";

import Dimensions from 'Dimensions';
const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

class Com1  extends Component {

  render() {
    return (
      <View>
        <Text>omething to rasteriz.</Text>
      </View>
    );
  }
}

export default class ExampleCaptureOnMountSimpler  extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = { 
      uri:'',
    };
  }

  _capture = () => {
    captureRef(this.refs.hhh, {
      quality: 0.8
    })
    .then(
      uri => {
        this.setState({uri:uri});
        alert(uri);
      },
      error => alert("Oops, snapshot failed", error)
    );
  }

  render() {
    return (
      <View ref='hhh' collapsable={false}>
        <TouchableHighlight onPress={this._capture}>
          <Text>button</Text>
        </TouchableHighlight>
        <Image source={{uri:this.state.uri}} style={{width:220,height:220,borderRadius:6,marginRight:6,borderWidth:1,borderColor:'red',resizeMode: 'contain',}} />
        <Text style={{backgroundColor:'green', fontSize:20}}>fdfv</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});