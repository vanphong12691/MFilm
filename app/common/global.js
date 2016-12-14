var network_helper = require('./network_helper');
var utils = require('./utils');

module.exports = {
  NetworkHelper : new network_helper(),
  Utils : new utils(),
  Constants : require('./constants'),
  Domain : require('./domain'),
  DefineApi : require('./api'),
  Localization: require('./localization.js'),
  navigator:{}
};
