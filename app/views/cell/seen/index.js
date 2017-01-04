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
    TouchableWithoutFeedback
}from 'react-native';
var styles = require('./index_style');
var Global = require('../../../common/global');
import Icon from 'react-native-vector-icons/Ionicons';
class SeenCell extends Component {
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
                <TouchableWithoutFeedback onPress={this.props.onClickCell}>
                    <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5}}>
                        <Text style={{color: 'black'}}>{this.props.data.data.vi}</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        } else {
            return(
                <View>
                </View>
            );
        }
    }


}

module.exports = SeenCell;
