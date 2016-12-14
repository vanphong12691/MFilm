
const HTTP_POST = 'POST';
const HTTP_GET = 'GET';

const ALLOW_INVALID_HTTPS = false;

var Constants = require('./constants');
var Helper = require('./dev_network');
var Global = require('./global');
var Utils = require('./utils');
var Localization = require('./localization');
import axios from 'axios';

class NetworkHelper{
  requestApiWithGet(urlRequest,component){
    return this.requestApi(urlRequest,HTTP_GET,null,component)
  }

  requestApiWithPost(urlRequest,body,component){
    return this.requestApi(urlRequest,HTTP_POST,body,component)
  }

  requestApi(urlRequest,method,body,component){
    var self=this;
    var promise = new Promise(function(resolve,reject){
      if (ALLOW_INVALID_HTTPS) {
        Helper.requestAPIByURL(urlRequest,method,body,function(responseData){
          console.log('********start**********');
          console.log(urlRequest);
          console.log(body);
          console.log(responseData);
          console.log('********end**********');

          resolve(responseData); // success
        },function(error){
          console.log('********start**********');
          console.log(urlRequest);
          console.log(body);
          console.log("failure: "+JSON.stringify(error));
          console.log('********end**********');

          reject(error); // failure
        });
      }else{
        let header = {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            };
        ;

        var tryCount=0;
        var dorequestFunc=function(successCallback, errorCallback){
          self._timeoutPromise(60000, axios.request({
                                            method: method,
                                            url: urlRequest,
                                            data: body,
                                            headers:header
                                          }))
            .then(function (response) {
              successCallback(response)
            })
            .catch(function (error) {
              console.log(error);

              if(typeof error ==='object'
                  && 'message' in error
                  && error.message=='Network timeout'){
                errorCallback(error)
              }else{
                tryCount++;
                if(tryCount<3){
                  console.log("retry: "+tryCount);
                  dorequestFunc(successCallback, errorCallback);
                }else{
                  errorCallback(error)
                }
              }
            });
        };

        var requestSuccess=function(response){
          console.log('********start**********');
          console.log(urlRequest);
          console.log(body);
          console.log(JSON.stringify(response.data));
          console.log('********end**********');

          resolve(response.data);
        }

        var requestError=function(error){
          console.log('********start**********');
          console.log(urlRequest);
          console.log(body);
          console.log(error);
          console.log('********end**********');

          reject(error);
        }
        dorequestFunc(requestSuccess, requestError);
      }
    });

    return promise;
  }

  _timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Network timeout"))
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  })
}


  requestGetApi(url,component){
    var self=this;
    return new Promise(function(resolve,reject){
      //check network connection
      var utils = new Utils();
      utils.checkNetwork().then(()=>{
        self.requestApiWithGet(url,component)
        .then((responseData)=>{
            resolve(responseData);
        })
        .catch((error)=>{
          reject(Localization.message_error_request_api);
        });
      }).catch(()=>{
        reject(Localization.message_error_network_connection);
      });
    });
  }

  requestPostApi(url,body,component){
    var self=this;
    return new Promise(function(resolve,reject){
      //check network connection
      var utils = new Utils();
      utils.checkNetwork().then(()=>{
        self.requestApiWithPost(url,body,component)
        .then((responseData)=>{
            resolve(responseData);
        })
        .catch((error)=>{
          console.log(error);
          reject(Localization.message_error_request_api);
        });
      }).catch(()=>{
        console.log("checkNetwork");
        reject(Localization.message_error_network_connection);
      });
    });
  }
}
module.exports = NetworkHelper;
