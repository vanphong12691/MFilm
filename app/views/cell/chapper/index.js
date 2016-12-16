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
    TouchableHighlight
}from 'react-native';
var styles = require('./index_style');
var Global = require('../../../common/global');

class HomeCell extends Component {
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
                <TouchableHighlight onPress={this.props.onClickCell} style={{  margin: 4,
                    width: 30,
                    height: 30,}}>
                    <View style={styles.row}>
                        <Text style={{color: '#455A64'}}>{this.props.data['page']}</Text>
                     </View>
                </TouchableHighlight>
            );
        } else {
            return(
                <View>
                </View>
            );
        }
    }

}

module.exports = HomeCell;
