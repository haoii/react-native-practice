
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
          } from 'react-native';
import ViewShot from "react-native-view-shot";

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class ExampleCaptureOnMountManually extends Component {
  onCapture = uri => {
    alert(uri);
  }
  render() {
    return (
      <ViewShot onCapture={this.onCapture} captureMode="mount">
        <Text>...Something to rasterize...</Text>
      </ViewShot>
    );
  }
}

const styles = StyleSheet.create({

});