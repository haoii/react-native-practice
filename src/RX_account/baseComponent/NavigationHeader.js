
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
  Button, TouchableOpacity, Modal } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class NavigationHeader extends Component {
  static defaultProps = {

    title: '标题',

    operations: {
      'option1': null,
      'option2': null,
    }
  }

  constructor(props) {
    super(props);
    this.state = { 
      headerRightModalVisible: false
    };
  }

  _setModalVisible = (visible) => {
    this.setState({ headerRightModalVisible: visible });
  }

  _renderOperations = () => {
    let operation_render_items = [];
    let index = 0;

    Object.keys(this.props.operations).map(opName => {
      let operation = this.props.operations[opName];
      index += 1;
      operation_render_items.push(
        <TouchableOpacity
          onPress={() => {
            this._setModalVisible(false);
            operation();
          }}
          style={[styles.optionView, index>1? {borderTopWidth:0.5, borderColor:'#ddd'}: null]}
        >
          <Text style={styles.optionText}>{opName}</Text>
        </TouchableOpacity>
      );
    });

    return operation_render_items;
  }

  render() {
    return (
      <View>
        <Modal
          transparent={true}
          visible={this.state.headerRightModalVisible}
          onRequestClose={() => this._setModalVisible(false)}
        >
          <TouchableHighlight
            onPress={() => this._setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={{height:50}}></View>
              <View style={styles.modalView}>
                {this._renderOperations()}
              </View>
            
            </View>
          </TouchableHighlight>
        </Modal>

        <View style={styles.headerContainer}>
          <TouchableHighlight style={styles.backIcon}
            onPress={() => this.props.navigation.goBack()}>
            <IconIonicons name='ios-arrow-back' size={25} />
          </TouchableHighlight>
          <View style={styles.titleStyle}>
            <Text style={styles.headerTitleText}>{this.props.title}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} 
            onPress={() => this._setModalVisible(true)}>
            <IconIonicons name="ios-add-circle-outline" size={25} color="#222222" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    height:size.height,
    width:size.width,
    alignItems:'flex-end'
  },
  modalView: {
    backgroundColor:'gray',
    // minWidth:100,
    borderRadius:3,
    marginHorizontal:10,
  },

  optionView: {
    height:40,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingHorizontal:15,
  },
  optionText: {
    fontSize:16,
    color:'#fff',
  },

  headerContainer:{
    height:45,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.5, 
    borderBottomColor: '#c3c3c3',
    backgroundColor: '#f8f8f8',
  },
  backIcon: {
    height:45,
    width:50,
    justifyContent:'center',
    alignItems:'center',
  },
  
  titleStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    width:50,
    height:45,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'red',
  },
  headerTitleText: {
    fontSize:16,
    fontWeight: 'bold',
    color:'#000',
  },
});