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
    backgroundColor: '#CFD8DC'
  },
  sliderTrack: {
    height: 2,
    backgroundColor: '#0D47A1',
    opacity: 0.5
  },
  sliderThumb: {
    width: 10,
    height: 10,
    backgroundColor: '#0D47A1',
    borderRadius: 10 / 2,
    shadowColor: '#2962FF',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1,
  }
});
