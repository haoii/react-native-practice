
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import ListItem from '../baseComponent/ListItem';
import AvatarListItem from './AvatarListItem';
import {ScreenSize} from '../Config';

export default class MeScreen extends Component {
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    // this.list_data =

    this.state = { 
    };
  }

  render() {
    return (
      <View style={{width:ScreenSize.width,height:ScreenSize.height-75,backgroundColor:'#f4f4f4'}}>
        <AvatarListItem navigation={this.props.navigation} ></AvatarListItem>

        <View style={{height:10}}></View>
        <View style={styles.listGroupView}>
          <ListItem icon={<IconIonicons name="ios-recording" size={25} color="#222222"/>}
            title='操作记录' />
          <ListItem icon={<IconMaterialIcons name="business-center" size={23} color="#222222"/>}
            title='我的业务' />
            <ListItem icon={<IconAntDesign name="message1" size={19} color="#222222"/>}
            title='我的留言' 
            last={true}/>
        </View>

        <View style={{height:10}}></View>
        <View style={styles.listGroupView}>
          <ListItem icon={<IconIonicons name="ios-settings" size={25} color="#222222"/>} 
            title='设置' 
            last={true}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listGroupView:{
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
    borderColor:'#c3c3c3',
  },
});