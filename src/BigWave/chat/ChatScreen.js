
import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

export default class ChatScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      img_url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2964837281,1968174098&fm=26&gp=0.jpg' };
  }

  _pickImage = () => {

    const options = {
      title: 'Select photos',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {    
        this.setState({
          img_url: response.uri
        });
      }
    });

  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={this._pickImage}>
          <Icon name="ios-camera" size={50} color="#222222" />
        </TouchableOpacity>
        <Text>Chat!</Text>
        <Image source={{uri:this.state.img_url}} style={{width:250,height:250,borderRadius:10}} />
      </View>
    );
  }
}