import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        Button, TouchableOpacity, Modal } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';


import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class CustomerDetail extends Component {
  static defaultProps = {
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

  render() {
    return (
      <View style={styles.container}>
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
                <Text>hsgdd</Text>
                <Text>hsgdd</Text>
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
            <Text style={styles.headerTitleText}>客户</Text>
          </View>
          <TouchableOpacity style={styles.editButton} 
            onPress={() => this._setModalVisible(true)}>
            <IconIonicons name="ios-add-circle-outline" size={25} color="#222222" />
          </TouchableOpacity>
        </View>

        <Text>sdfg</Text>
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
    width:100,
    borderRadius:3,
    marginHorizontal:10,
  },

  container:{
    height:size.height,
    backgroundColor: '#fff',
    justifyContent:'flex-start'
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