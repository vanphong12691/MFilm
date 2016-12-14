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
class PageCell extends Component {
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
                    <View style={styles.row}>


                           <Image style={{width:159, height: 20, flex:0.82}} source={{uri: this.props.data.picture}}></Image>

                        <View style={{flex: 0.09, paddingLeft: 5, paddingRight: 5}}><Text style={{fontWeight: "bold", color: '#0080FF'}} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.data.vi}</Text></View>
                        <View style={{flex: 0.09, paddingLeft: 5, paddingRight: 5}}><Text style={{fontWeight: "bold", color:'#81BEF7'}} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.data.en}</Text></View>
                        <View style={{
                            position: 'absolute',
                            top: 3,
                            left: 3,
                            flex: 1,
                            padding: 3,
                            marginRight: 5,
                            height: 22,
                            borderRadius: 5,
                            justifyContent: 'center',
                            backgroundColor: '#EF5350',
                        }}>
                            <Text style={{fontSize: 10, color: 'white'}} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.data.current}</Text>

                        </View>
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

module.exports = PageCell;
