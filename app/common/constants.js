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
exports.USER_INFO_STORE_KEY = 'USER_INFO_STORE_KEY';
exports.CHECK_LOGIN_STORE_KEY = 'CHECK_LOGIN_STORE_KEY';

exports.OTP_RESET_PASSWORD_STORE_KEY = 'OTP_RESET_PASSWORD_STORE_KEY';
exports.EMAIL_RESET_PASSWORD_STORE_KEY = 'EMAIL_RESET_PASSWORD_STORE_KEY';
exports.USER_EMAIL_STORE_KEY = 'USER_EMAIL_STORE_KEY';
exports.OTP_CHANGE_EMAIL_STORE_KEY = 'OTP_CHANGE_EMAIL_STORE_KEY';
exports.LIST_CHAT_HISTORY_STORE_KEY = 'LIST_CHAT_HISTORY_STORE_KEY';

//define route id
exports.HOME_ID = 1;
exports.DETAIL_ID = 2;
exports.CHAPPER_ID = 3;
exports.PLAY_ID = 4;
exports.PAGE_ID = 5;
exports.H_PAGE_ID = 6;
