
import React, { Component } from 'react';
import {
  Dimensions, View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

const { width, height } = Dimensions.get('window');

export default class Me extends Component {

  render() {
    return (
      <ScrollView bounces={false} scrollEventThrottle={1} >
          <View >
              <ScrollableTabView renderTabBar={() => <DefaultTabBar/> } 
                tabBarUnderlineStyle={{
                  backgroundColor: '#000',
                  height: 2,
                }} 
                tabBarBackgroundColor='#F3F3F3' 
                tabBarActiveTextColor='#000' 
                tabBarInactiveTextColor='#959595' 
                tabBarTextStyle={{ fontSize: 14 }}
                locked={false}
              >
                <View tabLabel='hh'>
                  <View>
                    <Text>bbb</Text>
                  </View>
                  
                </View>

                <View tabLabel='评论' style={{marginBottom:50,paddingLeft:15,paddingRight:15}}>
                  <View style={{flexDirection:'row',paddingTop:20,justifyContent:'space-between'}}>
                    <Text>短评</Text>
                    <TouchableOpacity style={{borderWidth:1,borderColor:'#3FAC00',borderRadius:5,padding:4}} onPress={()=>alert('你要写短评')}>
                      <Text style={{fontSize:10,color:'#3FAC00'}}>写短评</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View tabLabel='讨论区(未做)' style={{marginBottom:50,paddingLeft:15,paddingRight:15}}>
                  <View style={{flexDirection:'row',paddingTop:20,justifyContent:'space-between'}}>
                    <Text>话题</Text>
                    <TouchableOpacity style={{borderWidth:1,borderColor:'#3FAC00',borderRadius:5,padding:4}} onPress={()=>alert('你要写话题')}>
                      <Text style={{fontSize:10,color:'#3FAC00'}}>写话题</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </ScrollableTabView>
          </View>
        </ScrollView>
      )
    }
}

const styles = StyleSheet.create({
  poster:{
    backgroundColor:'#2A362C',
    height:310,
    width:width,
    justifyContent:'center',
    alignItems:'center'

  },
  introduce:{
     color:'#343334',
  },
  movieInfo:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:15,
    paddingRight:15,
    paddingTop:15
  },
  infoSquare:{
    backgroundColor:'#FFFFFF',
    width:85,
    height:85,
    justifyContent:'center',
    alignItems:'center',
    shadowColor:'#9B9B9B',
    shadowOffset:{height:0,width:0},
    shadowRadius:10,
    shadowOpacity:0.5,

  },
  smallFont:{
    fontSize:11,
    color:'#9B9B9B',
  }
})