import React,{
  StyleSheet
}from 'react-native';
import Global from '../../common/global';
module.exports = StyleSheet.create({
  container:{
    marginRight: 20,
    marginLeft: 20,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  centering:{
    alignItems: 'center',
    justifyContent: 'center',
    top: 40,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    height: Global.Constants.HEIGHT_SCREEN,

  },
  webView: {
    backgroundColor: 'white',
    height: 350,
  },
});
