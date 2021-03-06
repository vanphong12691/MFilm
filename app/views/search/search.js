
import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ListView,
    ScrollView,
    Image,
    TouchableHighlight,
    RefreshControl,
    TextInput,
    Keyboard
}from 'react-native';
var Global = require('../../common/global');
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Makiko } from 'react-native-textinput-effects';

class Search extends Component
{
    constructor(props) {
        super(props);
        this.state={
            search: '',
            focus: true,
        }
    }

    render(){
        return (
                <View style={{height: 40, justifyContent:'center', alignItems:'center', backgroundColor:'#0288D1', flexDirection:'row'}}>

                     <TouchableHighlight onPress={this._onBack.bind(this)} underlayColor="transparent" style={{height: 40, width: 40,alignItems: 'center', justifyContent: 'center'}} >
                            <Icon  name="ios-arrow-back" size={25} color="#fff" />
                      </TouchableHighlight>
                    <View style={{flex: 1}}>
                        <Makiko
                            underlineColorAndroid="transparent"
                            style={{height: 40, justifyContent: 'center', backgroundColor:"transparent"}}
                            label={'Tìm kiếm phim, diễn viên, quốc gia...'}
                            iconClass={FontAwesomeIcon}
                            iconName={'comment'}
                            iconColor={'white'}
                            autoFocus={true}
                            returnKeyType={'search'}
                            onSubmitEditing={this.findFilm.bind(this)}
                            onChangeText={(text) => this.setState({search:text})}
                            inputStyle={{ color: '#0288D1' }}
                        />
                    </View>
                    <TouchableHighlight onPress={this.findFilm.bind(this)} underlayColor="transparent" style={{height: 40, width: 40,alignItems: 'center', justifyContent: 'center'}} >
                        <Icon  name="ios-search" size={25} color="#fff" />
                    </TouchableHighlight>
                </View>

        )
    }
    _onBack(){
        this.props.navigator.pop();
    }
    findFilm(){
       let data = {
            type : "tim-kiem.html?q="+this.state.search,
            title: 'Tìm kiếm: '+this.state.search
        }

        this.props.navigator.push({
            id:Global.Constants.H_PAGE_ID,
            data: data
        });
    }

    componentWillUnmount () {
       Keyboard.dismiss();
    }


}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 50
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
});
module.exports = Search;
