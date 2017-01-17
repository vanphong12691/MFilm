import React,{
  StyleSheet
}from 'react-native';
import Global from '../../../common/global';
module.exports = StyleSheet.create({
  container:{
    paddingTop: 5,
    marginRight: 20,
    marginLeft: 20,
  },
  text:{
    color:'black',
    fontSize: 20,
    marginLeft: 20
  },
  subcontainer:{
    flex: 1,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  classificationName:{
    flex: 1
  },
  separator:{
    height: 1,
    backgroundColor: '#D3D3D3',
    marginTop: 5,
    marginBottom: 5,
  },
  icon:{
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 15,
    //marginRight: 30
  },
  row: {
    flexDirection: 'row',
    margin: 5,
    height: 120,
    width: Global.Constants.WIDTH_SCREEN-20,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC'
  },
});
