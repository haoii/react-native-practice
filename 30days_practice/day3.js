import React,{ Component } from 'react';
import { Platform,Animated,Easing,Image,RefreshControl,ScrollView,StatusBar,StyleSheet,TabBarIOS,
  Text,TouchableHighlight,TouchableOpacity,View, Alert } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
// import ScrollableTabView from 'react-native-scrollable-tab-view';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Entrance extends Component{
  // static propTypes = {
  //   hideThis: React.PropTypes.func.isRequired,
  // };

  constructor(props) {
    super(props);
    this.state = {
       transformAnim: new Animated.Value(1), 
       opacityAnim: new Animated.Value(1), 
     };
  }

  componentDidMount() {
    Animated.timing(         
       this.state.transformAnim,    
       {toValue: 50,
        duration: 1200,
        delay:2000,
        easing: Easing.elastic(2),
      },          
    ).start();
    Animated.timing(         
       this.state.opacityAnim,    
       {toValue: 0,
        duration: 800,
        easing: Easing.elastic(1),
        delay:2200,
      },          
     ).start();
    setTimeout(() => {
      this.props.hideThis();
    }, 3300);              
  }

  render () {
    return(
      <Animated.View style={[styles.entrance,{opacity:this.state.opacityAnim}]}>
        <AnimatedIcon size={60} style={[styles.twitter,{transform:[{scale:this.state.transformAnim}]}]} name="logo-twitter"></AnimatedIcon>
      </Animated.View>
    )
  }
}

class TwitterTab extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab:'主页',
      title:'主页',
    };
  }

  changeTab(tabName) {
      this.setState({
        selectedTab: tabName
      });
  }

  _updateTitle(obj) {
    const {i} = obj;
    let title = "";
    switch(i) {
      case 0:
        title = "主页";
        break;
      case 1: 
        title = "通知";
        break;
      case 2: 
        title = "私信";
        break;
      case 3: 
        title = "我";
        break;
    }
    this.setState({
      title
    });
  }

  render(){
    const iosTabView = <TabBarIOS
          barTintColor="#fff"
          tintColor="#1b95e0">
        <Icon.TabBarItem
          title="主页"
          iconName="ios-home"
          selectedIconName="ios-home"
          onPress={ () => this.changeTab('主页') }
          selected={ this.state.selectedTab === '主页' }>
          <TwitterFlow/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="通知"
          iconName="ios-notifications-outline"
          selectedIconName="ios-notifications"
          onPress={ () => this.changeTab('通知') }
          selected={ this.state.selectedTab === '通知'}>
          {/* <TwitterFlow/> */}
          <Text>Welcome 222 to React Native!</Text>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="私信"
          iconName="ios-mail"
          selectedIconName="ios-mail"
          onPress={ () => this.changeTab('私信') }
          selected={ this.state.selectedTab === '私信'}>
          {/* <TwitterFlow/> */}
          <Text>Welcome 333 to React Native!</Text>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="我"
          iconName="ios-person"
          selectedIconName="ios-person"
          onPress={ () => this.changeTab('我') }
          selected={ this.state.selectedTab === '我'}>
          {/* <TwitterFlow/> */}
          <Text>Welcome 444 to React Native!</Text>
        </Icon.TabBarItem>
      </TabBarIOS>;
      
    // const androidTabView =   <View>
    //     <View style={styles.navBg}></View>
    //       <View style={styles.navAndroid}>
    //         <View style={styles.logoContainer}>
    //           <Icon name="logo-twitter" color="#fff" size={27}/>
    //           <Text style={styles.title}>{this.state.title}</Text>
    //         </View>
    //         <View style={styles.iconContainer}>
    //           <Icon name="ios-search" color="#fff" size={25}/>
    //           <Icon name="ios-create-outline" color="#fff" size={25}/>
    //         </View>
    //       </View>
    //       <ScrollableTabView
    //         onChangeTab={(obj) => this._updateTitle(obj)}
    //         renderTabBar={() => <FacebookTabBar />}>
    //         <TwitterPost tabLabel="ios-home" />
    //         <TwitterPost tabLabel="ios-notifications" />
    //         <TwitterPost tabLabel="ios-mail" />
    //         <TwitterPost tabLabel="ios-person" />
    //       </ScrollableTabView>
    //     </View>;
    // return Platform.OS === "ios"? iosTabView:androidTabView;
    return iosTabView;
  }
}

class TwitterFlow extends Component{
  render() {
    return(
      <View>
        <View style={styles.nav}>
          <View style={styles.navLeft}>
            <Icon name="ios-person-add" size={23} style={{color:"#1b95e0", paddingLeft:10}}></Icon>
          </View>
          <View style={styles.navMid}>
            <Icon name="logo-twitter" size={27} style={{color:"#1b95e0"}}></Icon>
          </View>
          <View style={styles.navRight}>
            <Icon name="ios-search" size={23} style={{color:"#1b95e0", width:30}}></Icon>
            <Icon name="ios-create-outline" size={23} style={{color:"#1b95e0", width:30, paddingRight:10}}></Icon>
          </View>
        </View>
        <TwitterPost></TwitterPost>
      </View>
    )
  }
}

class TwitterPost extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
      });
    }, 1000);
  }

  render() {
    return(
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={()=>this._onRefresh()}
            tintColor="#ddd"/>}>
        <Image source={require('./img/day3.png')} style={{width:Util.size.width, height:Util.size.height-110}}></Image>
      </ScrollView>

    )
  }
}

export default class extends Component{
  constructor() {
    super();
    this.state = {
      show:true
    };
  }

  componentDidMount() {
    if(Platform.OS === "ios") {
      StatusBar.setBarStyle(0);
    }
  }

  _hideEntrance() {
    this.setState({
      show:false
    })
  }

  render() {
    let entrance = this.state.show? <Entrance hideThis={()=> this._hideEntrance()}/> : <View></View>
    return(
      <View style={styles.twitterContainer}>
        <TwitterTab/>
        {entrance}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  itemWrapper:{
    backgroundColor: '#fff'
  },
  twitterContainer:{
    width: Util.size.width,
    height: Util.size.height
  },
  entrance:{
    position: "absolute",
    top:0, left:0,
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor:"#1b95e0",
    alignItems:"center",
    justifyContent:"center"
  },
  twitter:{
    color:"#fff",
    position:"relative",
    top: -20,
    textAlign: "center"
  },
  nav:{
    flexDirection: "row",
    paddingTop: 30,
    borderBottomWidth: Util.pixel,
    borderBottomColor: "#ddd",
    paddingBottom:5,
    backgroundColor:"#fff"
  },
  navLeft:{
    flex:1,
    alignItems:"flex-start",
    justifyContent:"center",
  },
  navMid:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  navRight:{
    flex:1,
    justifyContent:"flex-end",
    alignItems:"center",
    flexDirection:"row"
  },
  twitterPostContainer:{
    width: Util.size.width,
    height:Util.size.height-90,
    position:"relative",
    top:-20
  },
  navAndroid:{
    backgroundColor:"#3195d7",
    width:Util.size.width,
    height:55,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingTop:15,
    paddingLeft:20,
    paddingRight:10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor:"#111"
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 35,
  },
  img: {
    width:375,
    height: 550,
  },
  title:{
    color:"#fff",
    fontSize:20,
    paddingLeft: 10
  },
  iconContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:60,
  },
  logoContainer:{
    flexDirection:"row",
    justifyContent:"flex-start",
  },
  tabView: {
    flex: 1,
    height: 500,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
});