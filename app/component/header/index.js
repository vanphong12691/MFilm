/**
*
* Header Chat
*
* @author  Minh Huy
* @version 1.0
* @since   14-11-2016
*/
import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  Platform
}from 'react-native';

var Global = require('../../common/global');
var styles = require('./index_style');

class Header extends Component
{
  propTypes:{
    title:React.Props.string
  }

  render(){
    return(
      <View style={styles.main_view}>
           <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.text_header}>{this.props.title}</Text>
      </View>
    );
  }
}
module.exports = Header;
