
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
         Modal, Picker } from 'react-native';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class GeneralInput extends Component {
  static defaultProps = {
    label: '',
    hint: '',
  }

  constructor(props) {
    super(props);
    this.state = { 
      modalVisible: false,
      language: 'java',
    };
  }

  _chosenPopup = () => {
    this._setModalVisible(true);
  }

  _setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.inputItemOutterView}>
        <View style={styles.inputItemInnerView}>
          <View style={styles.inputItemLabelView}>
            <Text style={styles.fontMain}>{this.props.label}</Text>
          </View>

          <TouchableHighlight style={styles.touchableView} onPress={this._chosenPopup}>
            <Text>确认</Text>
          </TouchableHighlight>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View style={styles.modalContainer}>
              <TouchableHighlight style={styles.modalBlankArea}
                onPress={() => {this._setModalVisible(false);}}>
                <View></View>
              </TouchableHighlight>

              <View>
                <Text>Hello World!</Text>
                <Picker
                  selectedValue={this.state.language}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
              </View>
            </View>
          </Modal>

        </View>
        {this.props.hint
          ? <Text style={styles.fontMinor}>{this.props.hint}</Text>
          : null}
      </View>);
  }
}

const styles = StyleSheet.create({

  modalBlankArea: {
    height:size.height-300,
    width:size.width,
    borderWidth:2,
    borderColor:'red',
  },

  modalContainer: {
    height:size.height,
    width:size.width,
    borderWidth:2,
    borderColor:'red',
  },

  inputItemOutterView: {
    paddingBottom:10,
    alignItems:'stretch',
  },
  inputItemInnerView: {
    backgroundColor:'white',
    borderRadius:5,
    height:50,
    marginBottom:5,
    marginTop:5,
    flexDirection:'row',
    paddingLeft:10,
    paddingRight:10,
    justifyContent:'space-between',
    alignItems:'center',
  },
  inputItemLabelView: {
    flexDirection:'row'
  },
  fontMain: {
    fontSize:16,
  },
  fontMinor: {
    fontSize:12,
  },

  touchableView: {
    maxWidth:200,
    minWidth:100,
    height:50,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    backgroundColor:'red',
  },

});