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

class ChapterCell extends Component {
    propTypes:{
        data: Object,
        onClickCell:React.PropTypes.func,
        current:React.PropTypes.bool
        };

    constructor(props){
        super(props);
    }

    render() {

        if(this.props.data){
            let color = !this.props.current ? '#455A64': 'green';
            console.log(this.props.current);
            return (
                <TouchableHighlight onPress={this.props.onClickCell} style={{  margin: 4,
                    height: 25,}}>
                    <View style={styles.row}>
                        <Text style={{color: color}}>{this.props.data['name']}</Text>
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

module.exports = ChapterCell;
