/**
 *
 * CardUsageCell
 *
 * @author  Minh Huy
 * @version 1.0
 * @since   23-05-2016
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    TouchableHighlight
}from 'react-native';
var styles = require('./index_style');
var Global = require('../../../common/global');
import Icon from 'react-native-vector-icons/Ionicons';
import { SwipeRow } from 'react-native-swipe-list-view';
class ActorCell extends Component {
    propTypes:{
        data: Object,
        onClickCell:React.PropTypes.func
        };

    constructor(props){
        super(props);
    }

    render() {
        if(this.props.data){
            return (

                <View style={{
                    borderBottomColor: '#B0BEC5',
                    borderBottomWidth: 1,
                    marginLeft: 10,
                }}><TouchableHighlight underlayColor="#CFD8DC" onPress={this.props.onClickCell} style={{ padding: 5, paddingLeft: 0}}>
                    <Text style={{color:'#00B0FF', fontSize: 14}}>{this.props.data.title}</Text>
                </TouchableHighlight>

                </View>

            );
        } else {
            return(
                <View>
                </View>
            );
        }
    }


}

module.exports = ActorCell;
