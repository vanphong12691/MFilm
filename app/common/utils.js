'use strict'

import React,{
  NetInfo,
  Platform,
  AsyncStorage,
}from 'react-native';
var Constants = require('./constants');
var Domain = require('./domain');
var Global = require('./global');
var RCTUIManager = require('NativeModules').UIManager;
var moment = require('moment');

class Utils
{
  checkNetwork(){
    return new Promise(function(resolve,reject){
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          resolve(true);
        }else{
          reject(false);
        }
      });
    });
  }

  updateUIWhenShowKeyboard(refStr,component){
    if (Platform.OS === 'ios') {
      //var refStr = view._dispatchListeners.__reactBoundContext._reactInternalInstance._currentElement._owner._currentElement.ref;
      var inputView = component.refs[refStr];
      inputView.measure((x, y, width, height, pageX, pageY) =>{
        var spaceScreen = Constants.HEIGHT_SCREEN - Constants.HEIGHT_KEYBOARD_IOS;
        if (spaceScreen < pageY+height) {
          component.setState({containerMarginTop:(pageY + height - spaceScreen)*(-1)});
        }
      });
    }
  }

  updateUIWhenHideKeyboard(component){
    if (Platform.OS === 'ios') {
      component.setState({containerMarginTop:0});
    }
  }

  //view get by access view.refs
  measureView(view, callb){
    const handle = React.findNodeHandle(view);
    RCTUIManager.measure(
      handle,
      (x, y, width, height, pageX, pageY) => {
        callb({x, y, width, height, pageX, pageY});
      });
  }

  backToRoute(backRoute, navigator){
    let routes=navigator.getCurrentRoutes();
    var route=null;
    for(var i=routes.length-1; i>=0; i--){
      if(routes[i].id==backRoute.id){
        route=routes[i];
        break;
      }
    }

    if(route){
      navigator.popToRoute(route);
    }else{
      navigator.push(backRoute);
    }
  }

  backToRouteId(routeId, navigator){
    this.backToRoute({id: routeId}, navigator);
  }

  replaceRouteId(routeId,currentView){
    this.replaceRoute({id:routeId},currentView);
  }

  replaceRoute(newRoute,currentView){
    let routes=currentView.props.navigator.getCurrentRoutes();
    var route=null;
    var index;//vi tri se replace
    for(var i=0; i < routes.length; i++){
      index=i-routes.length;
      if(routes[i].id===newRoute.id){
        route=routes[i];
        break;
      }
    }

    if(route != null){
      currentView.props.navigator.replaceAtIndex(newRoute,index,()=>{
          this.backToRoute(newRoute,currentView.props.navigator);
      });
    }else{
      currentView.props.navigator.push(newRoute)
    }
  }

  getCurrentDateTime() {
      var now     = new Date();
      var year    = now.getFullYear();
      var month   = now.getMonth()+1;
      var day     = now.getDate();
      var hour    = now.getHours();
      var minute  = now.getMinutes();
      var second  = now.getSeconds();
      if(month.toString().length == 1) {
          var month = '0'+month;
      }
      if(day.toString().length == 1) {
          var day = '0'+day;
      }
      if(hour.toString().length == 1) {
          var hour = '0'+hour;
      }
      if(minute.toString().length == 1) {
          var minute = '0'+minute;
      }
      if(second.toString().length == 1) {
          var second = '0'+second;
      }
      var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute;
       return dateTime;
  }

  checkLimitTime(limitTime){
      var currentDateTime = Date.parse(this.getCurrentDateTime());
      var limitDateTime = Date.parse(limitTime);
      if(limitDateTime >= currentDateTime){
        return true;
      } else {
        return false;
      }
  }


  checkObjectValid(object,keys)
  {
    if(object && (typeof object ==='object') && keys && (keys.constructor == Array)){
      var isValid = true;
      for (var i = 0; i < keys.length; i++) {
        if (!object.hasOwnProperty(keys[i])) {
          console.log('no key: '+keys[i]);
          isValid = false;
          break;
        }
      }
      global.isClearDataMsg = !isValid;
      return isValid;
    }else{
      global.isClearDataMsg = true;
      return false;
    }
  }
    changeBodyToUrlFormat(body){
        var str = "";
        for (var key in body) {
            if (str != "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(body[key]);
        }
        return str;
    }

    getTimeForChat(time){
      function pad(n) {return n<10 ? "0"+n : n}

      return pad(time.getHours())+":"+pad(time.getMinutes())
    }

    secondsToHms(d) {
      if(isNaN(d)){
        return d;
      }if(d==0){
            return "0:00";
        } else {
        d = Number(d);
        if(d==0) return '';
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
      }
    }
    prettyName(name){
        if(name.length>15){
            name=name.substring(0, 15)+'...';
        }
        return name;
    }
}
module.exports = Utils;
