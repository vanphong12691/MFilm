
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
        return (<View>
                <View style={{flex:1,height: 50, padding: 5, justifyContent:'center', alignItems:'center', backgroundColor:'rgb(96, 125, 139)', flexDirection:'row'}}>

                     <TouchableHighlight onPress={this._onBack.bind(this)} underlayColor="transparent" style={{height: 40, width: 40,alignItems: 'center', justifyContent: 'center'}} >
                            <Icon  name="ios-arrow-back" size={25} color="#fff" />
                      </TouchableHighlight>
                    <TextInput
                        style={{flex: 1}}
                        autoFocus={true}
                        returnKeyType={'search'}
                        onSubmitEditing={this.findFilm.bind(this)}
                        placeholder={'Tìm kiếm phim, diễn viên, quốc gia...'}
                        onChangeText={(text) => this.setState({search:text})}
                        value={this.state.text}
                    />
                    <TouchableHighlight onPress={this.findFilm.bind(this)} underlayColor="transparent" style={{height: 40, width: 40,alignItems: 'center', justifyContent: 'center'}} >
                        <Icon  name="ios-search" size={25} color="#fff" />
                    </TouchableHighlight>
                </View>
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
