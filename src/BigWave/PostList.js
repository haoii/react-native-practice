
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: true,
      refreshing: false,
      posts: []
    }
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData = () => {
    fetch(this.props.url)
      .then(response => response.json())
      .then(responseJson => {
        let arrData = responseJson.latest_posts;
        let i = 0;
        let arrList = [];
        /* 直接赋值的话没有 key 键,就会发出警告,所以为了避免出现警告,应主动在每个项目中添加 key 键 */
        arrData.map(item => {
          arrList.push({key: i, value: item});
          i++;
        })
        this.setState({posts: arrList, ready: false, refreshing: false});

      }).catch((error) => {
        console.error(error);
      });
  }

  _refreshDate = () => {
    this.setState({refreshing: true});
    this._fetchData();
  }

  _renderItem = ({item}) => {
    return (
      <View style={{marginTop:18,flexDirection:'row',paddingRight:20}}>
        <View>
          <Image source={{uri:item.value.user.portrait_url}} style={{width:40,height:40,borderRadius:20}} />
        </View>

        <View style={{marginLeft:10,flex:1}}>
          <View style={{flexDirection:'row'}}>
            <Text style={{lineHeight:25}}>{item.value.user.name}</Text>
          </View>
          <Text style={{marginBottom:8,color:'#3B3B3B'}}>{item.value.text}</Text>
          <Text style={styles.smallFont}>
            {item.value.pub_date}
          </Text>
        </View>

        <View style={{position:'absolute',right:0,top:0}}>
          <Text style={{color:'#9B9B9B'}}>👍{item.value.votes}</Text>
        </View>
      </View>
    )
  }

  render() {
    // const {navigate} = this.props.navigation;
    return (
      <View>
        {this.state.ready
          ? <ActivityIndicator size="large" style={styles.loadding}/>
          : <FlatList
            data={this.state.posts}
            onRefresh={this._refreshDate}
            refreshing={this.state.refreshing}
            renderItem={this._renderItem}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smallFont: {
    lineHeight: 20,
    color: '#A6A6A6',
    fontSize: 12
  },
  loadding: {
    marginTop: 100
  },
  star: {
    width: 12,
    height: 12,
    marginRight: 2
  },
  hotList: {
    height: 130,
    paddingLeft: 18,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF'
  },
  lastList: {
    borderBottomWidth: 0
  },
  title: {
    fontWeight: '900',
    fontSize: 15
  },
  pay: {
    width: 50,
    height: 25,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:'#FF4E65',
    borderRadius:5,
  }
})
