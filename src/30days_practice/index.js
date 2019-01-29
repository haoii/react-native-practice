
import React, { Component } from 'react';
import { ScrollView,StatusBar, 
  StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
// import Swiper from 'react-native-swiper';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Day3 from './day3';
import Day9 from './day9';
import Day17 from './day17'


class MainView extends Component {

  constructor() {
    super();
    this.state = {
      days:[{
        key:'Day1',
        title:"A stopwatch",
        isFA: false,
        icon: "ios-stopwatch",
        size: 48,
        color: "#ff856c",
        hideNav: false,
      },{
        key:'Day2',
        title:"A weather app",
        isFA: false,
        icon: "ios-partly-sunny",
        size:60,
        color:"#90bdc1",
        hideNav: true,
      },{
        key:'Day3',
        title:"twitter",
        isFA: false,
        icon: "logo-twitter",
        size:50,
        color:"#2aa2ef",
        hideNav: true,
      },{
        key:'Day9',
        title:"Tumblr Menu",
        isFA: false,
        icon: "logo-tumblr",
        size:50,
        color:"#37465c",
        hideNav: true,
      },,{
        key:'Day17',
        title:"Fuzzy search",
        isFA: false,
        icon: "md-search",
        size:50,
        color:"#69B32A",
        hideNav: false,
      }]
    }
  }

  _jumpToDay(key){
    this.props.navigation.navigate(key);
  }

  render() {
    var onThis = this;
    var boxs = this.state.days.map(function(elem, index) {
      return(
        <TouchableHighlight style={[styles.touchBox, index%3==2?styles.touchBox2:styles.touchBox1]} underlayColor="#eee" onPress={()=> onThis._jumpToDay(elem.key)}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxText}>{elem.key}</Text>
            {elem.isFA? <IconFA size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></IconFA>:
              <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></Icon>}
          </View>
        </TouchableHighlight>
      );
    })
    return(
      <ScrollView style={styles.mainView} title={this.props.title}>
        {/* <Swiper height={150} showsButtons={false} autoplay={true}
          activeDot={<View style={{backgroundColor: 'rgba(255,255,255,0.8)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
          <TouchableHighlight onPress={()=> onThis._jumpToDay(0)}>
            <View style={styles.slide}>
              <Image style={styles.image} source={{uri:'day1'}}></Image>
              <Text style={styles.slideText}>Day1: Timer</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=> onThis._jumpToDay(1)}>
            <View style={styles.slide}>
              <Image style={styles.image} source={{uri:'day2'}}></Image>
              <Text style={styles.slideText}>Day2: Weather</Text>
            </View>
          </TouchableHighlight>
        </Swiper> */}
        <View style={styles.touchBoxContainer}>
          {boxs}
        </View>
      </ScrollView>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: MainView,
    Day3: Day3,
    Day9: Day9,
    Day17: Day17
  },
  {
    initialRouteName: 'Home',

    headerMode: 'none',
    defaultNavigationOptions: {
      headerVisible: false,
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container:{
    flexGrow:1,
  },
  mainView: {
    marginTop: 63
  },
  navBar: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  navTitle: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "500",
  },
  navBackBtn: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 18,
    color: "#555",
  },
  itemWrapper:{
    backgroundColor: '#f3f3f3'
  },
  touchBox:{
    width: Util.size.width/3-0.33334,
    height:Util.size.width/3,
    backgroundColor:"#fff",
  },
  touchBoxContainer:{
    flexDirection: "row", 
    flexWrap:"wrap",
    width: Util.size.width,
    borderTopWidth: Util.pixel,
    borderTopColor:"#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
  touchBox1:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
  touchBox2:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor:"#ccc",
  },
  boxContainer:{
    alignItems:"center",
    justifyContent:"center",
    width: Util.size.width/3,
    height:Util.size.width/3,
  },
  boxIcon:{
    position:"relative",
    top:-10
  },
  boxText:{
    position:"absolute",
    bottom:15,
    width:Util.size.width/3,
    textAlign:"center",
    left: 0,
    backgroundColor:"transparent"
  },
  slide: {
    flexGrow: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText:{
    position:"absolute",
    bottom: 0,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:"rgba(255,255,255,0.5)",
    width: Util.size.width,
    textAlign:"center",
    fontSize: 12
  },
  image:{
    width: Util.size.width,
    flexGrow: 1,
    alignSelf: 'stretch',
  }
});