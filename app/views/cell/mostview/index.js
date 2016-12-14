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
class MostViewCell extends Component {
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


                           <Image style={{width:84, height: 120}} source={{uri: this.props.data.picture}}></Image>
                        <View style={{padding: 10}}>

                            <Text style={{fontWeight: "bold", color: '#0080FF'}} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.data.vi}</Text>
                            <Text style={{fontWeight: "bold", color:'#81BEF7'}} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.data.en}</Text>
                            <Text style={{fontWeight: "bold", color:'#81BEF7'}} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.data.view}</Text>
                            <Text style={{fontWeight: "bold", color:'#81BEF7'}} numberOfLines={1} ellipsizeMode={'tail'}>{this.convertStart(this.props.data.star)}</Text>
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
    convertStart(number){
        var data = [];
        var nstar = parseFloat(number);
        data.push(<Icon  name="ios-star" size={25} color="#f1c40f" />)
        data.push(<Icon  name="ios-star" size={25} color="#f1c40f" />)
        if(nstar>9){
            data.push(<Icon  name="ios-star" size={25} color="#f1c40f" />)
            data.push(<Icon  name="ios-star" size={25} color="#f1c40f" />)
            data.push(<Icon  name="ios-star" size={25} color="#f1c40f" />)
        }else if(nstar>8){
            data.push(<Icon  name="ios-star" size={25} color="#f1c40f" />)
            data.push(<Icon  name="ios-star" size={25} color="#f1c40f" />)
            data.push(<Icon  name="ios-star-half" size={25} color="#f1c40f" />)
        }else if(nstar>7){
            data.push(<Icon  name="ios-star" size={25} color="#f1c40f" />)
            data.push(<Icon  name="ios-star" size={25} color="#f1c40f" />)
        }else if(nstar>6){
            data.push(<Icon  name="ios-star" size={25} color="#f1c40f" />)
            data.push(<Icon  name="ios-star-half" size={25} color="#f1c40f" />)
        }else if(nstar>5){
            data.push(<Icon  name="ios-star" size={25} color="#f1c40f" />)
        }
        return (data);
    }

}

module.exports = MostViewCell;
