import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, 
        Button, TouchableOpacity, Modal } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';


import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

const styles = StyleSheet.create({
  titleStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    width:50,
    height:40,
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

export default class CustomerDetail extends Component {
  static navigationOptions = {
    headerTitle: (
      <View style={styles.titleStyle}>
          <Text style={styles.headerTitleText}>客户</Text>
      </View>
    ),
    headerRight: (
      <TouchableOpacity style={styles.editButton} 
        onPress={() => this._setModalVisible(true)}>
        <IconIonicons name="ios-add-circle-outline" size={25} color="#222222" />
      </TouchableOpacity>
    ),
  };

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
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.headerRightModalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this._setModalVisible(!this.state.headerRightModalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Text>sdfg</Text>
      </View>
    );
  }
}

