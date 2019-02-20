import React, { Component } from 'react';
import { Alert, AppRegistry, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

export default class Touchables extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!');
  }

  _onLongPressButton() {
    Alert.alert('You long-pressed the button!');
  }

  _login() {
    fetch('http://10.0.2.2:8000/accounts/login', {
      credentials: 'same-origin' 
    })
      .then(response => response.json())
      .then(response => {
        alert(response.data);
      }).catch((error) => {
        alert(error);
      });
  }

  _logout() {
    fetch('http://10.0.2.2:8000/accounts/logout', {
      credentials: 'same-origin' 
    })
      .then(response => response.json())
      .then(response => {
        alert(response.data);
      }).catch((error) => {
        alert(error);
      });
  }

  _getData() {
    fetch('http://10.0.2.2:8000/square/', {
      credentials: 'same-origin' 
    })
      .then(response => response.json())
      .then(responseJson => {
        alert(responseJson.data);
      }).catch((error) => {
        alert('error:' + error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._login} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>ha TouchableHighlight</Text>
          </View>
        </TouchableHighlight>
        <TouchableOpacity onPress={this._logout}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableOpacity</Text>
          </View>
        </TouchableOpacity>
        <TouchableNativeFeedback
          onPress={this._getData}
          background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableWithoutFeedback
          onPress={this._onPressButton}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Touchable with Long Press</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
})