/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    BackAndroid
} from 'react-native';
var RootView = require('./RootView');
var Global = require('./app/common/global');
export default class MFilm extends Component {

  constructor(){
    super();
    var self=this;

    BackAndroid.addEventListener('hardwareBackPress', function(){
      if(self.currentRoute != Global.Constants.HOME_ID){
        self.refs.root.refs.navigator.pop();
        return true;
      }
      return false;
    });
  }
  render() {
    return (
        <RootView ref="root"/>
    );
  }
}


AppRegistry.registerComponent('MFilm', () => MFilm);
