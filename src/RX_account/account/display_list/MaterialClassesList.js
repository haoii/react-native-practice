import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import RetryComponent from '../../baseComponent/RetryComponent';

import URL from '../../Config';

import Dimensions from 'Dimensions';

const size = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

export default class MaterialClassesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      classes: [],
      
      got_no_data: false,
      no_data_hint: '',

      class2_show_flag: {},
      class3_show_flag: {},
    };
  }

  componentDidMount() {
    this._refreshDate();
  }

  _fetchData = () => {
    fetch(URL.material_classes_no_empty, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg === 'success') {
          if (responseJson.data.length === 0) {
            this.setState({refreshing: false, got_no_data:true, no_data_hint: '没有数据~'});
          } else {
            let arrData = responseJson.data;
            let i = 0;
            let arrList = [];
            arrData.map(item => {
              arrList.push({key: i, value: item});
              i++;
            });
            arrList.push({key: i, value: 'add_material_class_1'});
            this.setState({classes: arrList, refreshing: false, got_no_data:false});
          }
        } else if (responseJson.msg === 'not_logged_in') {
          this.setState({refreshing: false, got_no_data:true, no_data_hint: '您还没有登录~'});
          this.props.navigation.navigate('LoginScreen');
        } else {
          this.setState({refreshing: false, got_no_data:true, no_data_hint: '出现未知错误'});
        }

      }).catch((error) => {
        this.setState({refreshing: false, got_no_data:true, no_data_hint: '服务器出错了'});
      });
  }

  _refreshDate = () => {
    this.setState({refreshing: true});
    this._fetchData();
  }

  _change_class2_show = (class1_name) => {
    let class2_show_flag = this.state.class2_show_flag;
    if (class2_show_flag[class1_name])
      class2_show_flag[class1_name] = false;
    else
      class2_show_flag[class1_name] = true;

    this.setState({class2_show_flag:class2_show_flag});
  }

  _change_class3_show = (class12_name) => {
    let class3_show_flag = this.state.class3_show_flag;
    if (class3_show_flag[class12_name])
      class3_show_flag[class12_name] = false;
    else
      class3_show_flag[class12_name] = true;

    this.setState({class3_show_flag:class3_show_flag});
  }

  _deleteClass1 = (class1_name) => {
    let formData = new FormData();
    formData.append("class1_name", class1_name);
    
    fetch(URL.delete_material_class1,{
      method:'POST',
      body:formData,
      credentials: 'same-origin',
    })
    .then((response) => response.json())
    .then((responseJson)=>{
      if (responseJson.msg === 'success') {
        this._refreshDate();
      } else if (responseJson.msg === 'not_logged_in') {
        this.props.navigation.navigate('LoginScreen');
      } else if (responseJson.msg === 'has_linked_data') {
        alert('存在与此类别关联的其他数据，无法删除！')
      } else {
        alert('出现未知错误');
      }

    })
    .catch((error)=>{
      alert('服务器出错了');
    });
  }

  _confirmDeleteClass1 = (class1_name) => {
    Alert.alert(
      null,
      '删除材料类别后不可恢复，确认删除：' + class1_name + '？',
      [
        {text: '放弃删除', onPress: () => {}, style: 'cancel'},
        {text: '确认删除', onPress: () => {this._deleteClass1(class1_name);}},
      ],
      { cancelable: false }
    );
  }

  _deleteClass2 = (class1_name, class2_name) => {
    let formData = new FormData();
    formData.append("class1_name", class1_name);
    formData.append("class2_name", class2_name);
    
    fetch(URL.delete_material_class2,{
      method:'POST',
      body:formData,
      credentials: 'same-origin',
    })
    .then((response) => response.json())
    .then((responseJson)=>{
      if (responseJson.msg === 'success') {
        this._refreshDate();
      } else if (responseJson.msg === 'not_logged_in') {
        this.props.navigation.navigate('LoginScreen');
      } else if (responseJson.msg === 'has_linked_data') {
        alert('存在与此类别关联的其他数据，无法删除！')
      } else {
        alert('出现未知错误');
      }

    })
    .catch((error)=>{
      alert('服务器出错了');
    });
  }

  _confirmDeleteClass2 = (class1_name, class2_name) => {
    Alert.alert(
      null,
      '删除材料类别后不可恢复，确认删除：' + class1_name + ' - ' + class2_name + '？',
      [
        {text: '放弃删除', onPress: () => {}, style: 'cancel'},
        {text: '确认删除', onPress: () => {this._deleteClass2(class1_name, class2_name);}},
      ],
      { cancelable: false }
    );
  }

  _deleteClass3 = (class1_name, class2_name, class3_name) => {
    let formData = new FormData();
    formData.append("class1_name", class1_name);
    formData.append("class2_name", class2_name);
    formData.append("class3_name", class3_name);
    
    fetch(URL.delete_material_class3,{
      method:'POST',
      body:formData,
      credentials: 'same-origin',
    })
    .then((response) => response.json())
    .then((responseJson)=>{
      if (responseJson.msg === 'success') {
        this._refreshDate();
      } else if (responseJson.msg === 'not_logged_in') {
        this.props.navigation.navigate('LoginScreen');
      } else if (responseJson.msg === 'has_linked_data') {
        alert('存在与此类别关联的其他数据，无法删除！')
      } else {
        alert('出现未知错误');
      }

    })
    .catch((error)=>{
      alert('服务器出错了');
    });
  }

  _confirmDeleteClass3 = (class1_name, class2_name, class3_name) => {
    Alert.alert(
      null,
      '删除材料类别后不可恢复，确认删除：' + class1_name + ' - ' + class2_name + ' - ' + class3_name + '？',
      [
        {text: '放弃删除', onPress: () => {}, style: 'cancel'},
        {text: '确认删除', onPress: () => {this._deleteClass3(class1_name, class2_name, class3_name);}},
      ],
      { cancelable: false }
    );
  }

  _renderItem = ({item}) => {

    if (item.value == 'add_material_class_1') {
      return (
        <View>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('AddClass1Form')}>

            <View style={[styles.class1Container, {backgroundColor:'#f8f8f8', justifyContent:'flex-start'}]}>
              <IconIonicons name="ios-add" size={35} color="#E4572E" />
              <Text style={{paddingLeft:10}}>添加一级分类</Text>
            </View>
        
          </TouchableHighlight>
        </View>
      );
    }


    let class1_name = Object.keys(item.value)[0];

    return (
      <View>
        <TouchableHighlight
          onPress={() => {this._change_class2_show(class1_name)}}>

          <View style={styles.class1Container}>
            <Text>{class1_name}</Text>

            <View style={styles.rightOperateView}>
              <TouchableHighlight style={styles.deleteOpView}
                onPress={() => {this.props.navigation.navigate('AddClass1Form', {
                  class1ToUpdate: class1_name,
                })}}>
                <IconMaterialIcons name="edit" size={20} />
              </TouchableHighlight>

              <TouchableHighlight style={styles.deleteOpView}
                onPress={() => {this._confirmDeleteClass1(class1_name)}}>
                <IconMaterialCommunityIcons name="delete" size={20} />
              </TouchableHighlight>
            
              {this.state.class2_show_flag[class1_name]
                ? <IconEvilIcons name="chevron-up" size={25}/>
                : <IconEvilIcons name="chevron-down" size={25}/>}
            </View>
          </View>

        </TouchableHighlight>
            
        {this.state.class2_show_flag[class1_name]
          ? (() => {
              let class2 = item.value[class1_name];
              let render_items = [];
              class2.map(class2_map => {
                let class2_name = Object.keys(class2_map)[0];
                let class12_name = class1_name + '-' + class2_name;
                render_items.push(
                  <View style={{backgroundColor:'#f0f0ff'}}>
                    <TouchableHighlight
                      onPress={() => {this._change_class3_show(class12_name)}}>

                      <View style={styles.class2Container}>
                        <Text>{class2_name}</Text>

                        <View style={styles.rightOperateView}>
                          <TouchableHighlight style={styles.deleteOpView}
                            onPress={() => {this.props.navigation.navigate('AddClass2Form', {
                              class1_name: class1_name,
                              class2ToUpdate: class2_name,
                            })}}>
                            <IconMaterialIcons name="edit" size={20} />
                          </TouchableHighlight>

                          <TouchableHighlight style={styles.deleteOpView}
                            onPress={() => {this._confirmDeleteClass2(class1_name, class2_name)}}>
                            <IconMaterialCommunityIcons name="delete" size={20} />
                          </TouchableHighlight>

                          {this.state.class3_show_flag[class12_name]
                            ? <IconEvilIcons name="chevron-up" size={25}/>
                            : <IconEvilIcons name="chevron-down" size={25}/>}
                        </View>
                      </View>
                    </TouchableHighlight>

                    {this.state.class3_show_flag[class12_name]
                      ? (() => {
                        let class3 = class2_map[class2_name];
                        let render_items3 = [];
                        class3.map(class3_name => {
                          render_items3.push(
                            <View style={{backgroundColor:'#f0fff0'}}>
                              <View style={styles.class3Container}>
                                <Text>{class3_name}</Text>

                                <View style={styles.rightOperateView}>
                                  <TouchableHighlight style={styles.deleteOpView}
                                    onPress={() => {this.props.navigation.navigate('AddClass3Form', {
                                      class1_name: class1_name,
                                      class2_name: class2_name,
                                      class3ToUpdate: class3_name,
                                    })}}>
                                    <IconMaterialIcons name="edit" size={20} />
                                  </TouchableHighlight>

                                  <TouchableHighlight style={[styles.deleteOpView, {marginRight:25}]}
                                    onPress={() => {this._confirmDeleteClass3(class1_name, class2_name, class3_name)}}>
                                    <IconMaterialCommunityIcons name="delete" size={20} />
                                  </TouchableHighlight>
                                </View>
                              </View>
                            </View>
                          );
                        });

                        render_items3.push(
                          <View>
                            <TouchableHighlight
                              onPress={() => {this.props.navigation.navigate('AddClass3Form', {
                                class1_name: class1_name,
                                class2_name: class2_name,
                              })}}
                              style={{backgroundColor:'#f0fff0'}}>

                              <View style={[styles.class3Container, {justifyContent:'flex-start'}]}>
                                <IconIonicons name="ios-add" size={35} color="#E4572E" />
                                <Text style={{paddingLeft:10}}>添加三级分类</Text>
                              </View>
                          
                            </TouchableHighlight>
                          </View>
                        );
                        return render_items3;
                      })()
                      : null}

                  </View>
                );
              });
              render_items.push(
                <View>
                  <TouchableHighlight
                    onPress={() => {this.props.navigation.navigate('AddClass2Form', {
                      class1_name: class1_name,
                    })}}
                    style={{backgroundColor:'#f0f0ff'}}>

                    <View style={[styles.class2Container, {justifyContent:'flex-start'}]}>
                      <IconIonicons name="ios-add" size={35} color="#E4572E" />
                      <Text style={{paddingLeft:10}}>添加二级分类</Text>
                    </View>
                
                  </TouchableHighlight>
                </View>
              );

              return render_items;
            })()
          : null}
  
      </View>
    )
  }

  render() {

    return (
      <View>
        {this.state.got_no_data
          ? <RetryComponent 
              hint={this.state.no_data_hint} 
              retryFunc={this._refreshDate}
              style={{height:400}}/>
          : <FlatList
              data={this.state.classes}
              onRefresh={this._refreshDate}
              refreshing={this.state.refreshing}
              renderItem={this._renderItem}
              ListHeaderComponent={
                <View style={{height:5}}></View>
              }/>}
        

      </View>
    );
  }
}

const styles = StyleSheet.create({

  class1Container: {
    paddingHorizontal:10, 
    backgroundColor:'#f8f8f8',
    borderBottomColor:'#cccccc',
    borderBottomWidth:1, 
    flexDirection:'row', 
    height:50, 
    alignItems:'center',
    justifyContent:'space-between',
  },
  rightOperateView: {
    flexDirection:'row',
    alignItems:'center'
  },
  deleteOpView: {
    height:48,
    width:48,
    alignItems:'center',
    justifyContent:'center',
  },
  class2Container: {
    paddingHorizontal:10, 
    marginLeft:26,
    borderBottomColor:'#cccccc',
    borderBottomWidth:1,
    flexDirection:'row', 
    height:50, 
    alignItems:'center',
    justifyContent:'space-between',
  },
  class3Container: {
    paddingHorizontal:10, 
    marginLeft:52,
    borderBottomColor:'#cccccc',
    borderBottomWidth:1,
    flexDirection:'row', 
    height:50, 
    alignItems:'center',
    backgroundColor:'#f0fff0',
    justifyContent:'space-between',
  },

  itemTitleView: {
    flexDirection:'row', 
    alignItems:'flex-end', 
    justifyContent:'space-between',
  },
  itemTitleLeftView: {
    flexDirection:'row', 
    alignItems:'flex-end',
  },
  mainBoldText: {
    fontSize:16, 
    fontWeight:'bold',
  },
  minorText: {
    fontSize:14,
  },

  progressBarContainer: {
    height: 25,
  },
  progressBarBase: {
    height:10, 
    borderRadius:5, 
    position:'absolute', 
    left:0, 
    top:10,
  },
  progressBar: {
    height:10, 
    borderTopLeftRadius:5, 
    borderBottomLeftRadius:5,
    position:'absolute', 
    left:0, 
    top:10,
  },

  detailView: {
    flexDirection:'row', 
    alignItems:'flex-end', 

  },
  detailLeftView: {
    flexDirection:'row', 
    alignItems:'flex-end', 
    width: size.width/2-18,

  },
  detailRightView: {
    flexDirection:'row', 
    alignItems:'flex-end', 
    width: size.width/2-18,
  },

  loadding: {
    marginTop: 100
  },
})
