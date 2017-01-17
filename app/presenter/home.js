/**
 * Created by PHONG on 12/1/2016.
 */
var Global = require('../common/global');
var Constants = require('../common/constants');
import React,{
    AsyncStorage,
    Platform
}from 'react-native';
export function getListFilm(url, component){
    return new Promise(function(resolve,reject){
        Global.NetworkHelper.requestGetApi(Global.DefineApi.LIST_FILM_API+url,component)
            .then((responseData)=>{
                resolve(responseData);
            })
            .catch(reject);
    });
}

export function getDetailFilm(url,component){
   url = Global.DefineApi.DETAIL_FILM_API+"?url="+url;
    return new Promise(function(resolve,reject){
        Global.NetworkHelper.requestGetApi(url,component)
            .then((responseData)=>{
                resolve(responseData);
            })
            .catch(reject);
    });
}

export function getLink(url,film_id,component){
    url = Global.DefineApi.LINK_FILM_API+"?url="+url+"&filmId="+film_id;
    return new Promise(function(resolve,reject){
        Global.NetworkHelper.requestGetApi(url,component)
            .then((responseData)=>{
                resolve(responseData);
            })
            .catch(reject);
    });
}

export function getChapperFilm(url, component){
    url = Global.DefineApi.CHAPPER_FILM_API+"?url="+url;
    return new Promise(function(resolve,reject){
        Global.NetworkHelper.requestGetApi(url,component)
            .then((responseData)=>{
                resolve(responseData);
            })
            .catch(reject);
    });
}

export function getCategory(component){
    return new Promise(function(resolve,reject){
        Global.NetworkHelper.requestGetApi(Global.DefineApi.CATEROGRY_FILM_API,component)
            .then((responseData)=>{
                resolve(responseData);
            })
            .catch(reject);
    });
}


export function getHomeInformation(component){
    return new Promise(function(resolve,reject){
        Global.NetworkHelper.requestGetApi(Global.DefineApi.HOME_API,component)
            .then((responseData)=>{
                resolve(responseData);
            })
            .catch(reject);
    });
}

export function getHListFilm(url, component){
    return new Promise(function(resolve,reject){
        Global.NetworkHelper.requestGetApi(Global.DefineApi.H_LIST_FILM_API+url,component)
            .then((responseData)=>{
                resolve(responseData);
            })
            .catch(reject);
    });
}
export function getMostViewFilm(component){
    return new Promise(function(resolve,reject){
        Global.NetworkHelper.requestGetApi(Global.DefineApi.MOST_VIEW_FILM_API,component)
            .then((responseData)=>{
                resolve(responseData);
            })
            .catch(reject);
    });
}


export function getSuggestFilm(url, component){
    return new Promise(function(resolve,reject){
        Global.NetworkHelper.requestGetApi(Global.DefineApi.MOST_SUGGEST_FILM_API+url,component)
            .then((responseData)=>{
                resolve(responseData);
            })
            .catch(reject);
    });
}