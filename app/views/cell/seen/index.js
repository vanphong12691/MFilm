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
class SeenCell extends Component {
    propTypes:{
        data: Object,
        onClickCell:React.PropTypes.func,
        onClickDelete:React.PropTypes.func
        };

    constructor(props){
        super(props);
    }

    render() {
        if(this.props.data){
            return (

            <SwipeRow
                rightOpenValue={-60}
                >
                <View style={{flex: 1, alignItems:'flex-end', justifyContent: 'center'}}>
                    <TouchableHighlight onPress={this.props.onClickDelete}>
                        <View style={{width: 60,
                            borderBottomColor:'#263238',
                            borderBottomWidth: 1, flex: 1,
                            justifyContent:'center',
                            alignItems: 'center',
                            backgroundColor:'#90A4AE'}}>
                            <Icon  name="md-close" size={30} color="#263238" />
                            </View>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight onPress={this.props.onClickCell}>
                    <View style={{paddingLeft: 20, backgroundColor: '#263238', paddingRight: 20, paddingTop: 5, paddingBottom: 5, flexDirection: 'row', borderBottomWidth:1, borderBottomColor:'#455A64'}}>
                        <View>
                            <Image style={{width:50, height: 50}} source={{uri: this.props.data.data.picture}}></Image>
                        </View>
                        <View style={{paddingLeft: 5, justifyContent: 'center'}}>
                            <Text style={{color: '#B2EBF2', fontSize: 16}}>{this.props.data.data.vi}</Text>
                            <Text style={{color: 'white', fontSize: 14}}>{this.props.data.data.en}</Text>
                        </View>

                    </View>
                </TouchableHighlight>
            </SwipeRow>

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
