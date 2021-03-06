import React,{
  StyleSheet
}from 'react-native';
import Global from '../../../common/global';
module.exports = StyleSheet.create({
  container:{
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
    justifyContent: 'center',
    width: 180,
    height: 30,
    paddingLeft: 20
  },
});
