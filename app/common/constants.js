import {Dimensions} from 'react-native';
var Localization = require('./localization');
//define common
exports.WIDTH_SCREEN = Dimensions.get('window').width;
exports.HEIGHT_SCREEN = Dimensions.get('window').height;
exports.HEIGHT_KEYBOARD_IOS = 216;
exports.HEIGHT_HEADER = 93;
exports.HEIGHT_FOOTER = 120;
exports.IMAGE_MESSAGE_HEIGHT = 150;
exports.IMAGE_MESSAGE_WIDTH = 150;

//define key store
exports.SETTING_STORE_KEY = 'SETTING_STORE_KEY';

//define route id
exports.HOME_ID = 1;
exports.DETAIL_ID = 2;
exports.CHAPPER_ID = 3;
exports.PLAY_ID = 4;
exports.PAGE_ID = 5;
exports.H_PAGE_ID = 6;
exports.SEARCH_ID = 7;
exports.SETTING_ID = 8;
