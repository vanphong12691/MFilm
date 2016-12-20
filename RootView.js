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
var SearchView = require('./app/views/search/search');
var Global = require('./app/common/global');

class RootView extends Component {

  render() {
    return (
      <Navigator
        ref='navigator'
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
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
        return (<PlayView navigator={navigator} type={route.type} quality={route.quality} name={route.name} data={route.data} pages={route.pages} current={route.current} max={route.max} film_id={route.film_id}/>);

      case Global.Constants.H_PAGE_ID:
        return (<HPageView navigator={navigator} data={route.data}/>);

      case Global.Constants.SEARCH_ID:
        return (<SearchView navigator={navigator}/>);
      default:
    }
  }
}

module.exports=RootView;
