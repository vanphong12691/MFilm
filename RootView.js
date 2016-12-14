/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  NetInfo
} from 'react-native';
var PageView = require('./app/views/page/page');
var HomeView = require('./app/views/home/home');
var DetailView = require('./app/views/detail/index');
var ChapperView = require('./app/views/chapper/index');
var PlayView = require('./app/views/player/player');
var HPageView = require('./app/views/phome/phome');
var Global = require('./app/common/global');

class RootView extends Component {

  render() {
    return (
      <Navigator
        ref='navigator'
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
        initialRoute={{id: Global.Constants.HOME_ID}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route,navigator){
     Global.navigator = navigator;
    if(this.props.onRouteChange){
      this.props.onRouteChange(route.id);
    }
    switch (route.id) {
      case Global.Constants.HOME_ID:
        return (<HomeView navigator={navigator}/>);
      case Global.Constants.PAGE_ID:
            return (<PageView navigator={navigator} data={route.data}/>);
      case Global.Constants.DETAIL_ID:
        return (<DetailView navigator={navigator} data={route.data}/>);
      case Global.Constants.CHAPPER_ID:
        return (<ChapperView navigator={navigator} data={route.data}/>);
      case Global.Constants.PLAY_ID:
        return (<PlayView navigator={navigator} data={route.data}/>);

      case Global.Constants.H_PAGE_ID:
        return (<HPageView navigator={navigator} data={route.data}/>);
      default:
    }
  }
}

module.exports=RootView;