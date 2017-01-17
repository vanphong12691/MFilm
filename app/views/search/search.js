
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
var HomePresenter = require('../../presenter/home');

var ActorCell = require('../cell/actor/index');
var FilmCell = require('../cell/film/index');

var timer;
class Search extends Component
{
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            actor: [],
            film: [],
            search: '',
            focus: true,
            suggest: false
        }
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <View style={{height: 40, justifyContent:'center', alignItems:'center', backgroundColor:'#546E7A', flexDirection:'row'}}>

                     <TouchableHighlight onPress={this._onBack.bind(this)} underlayColor="transparent" style={{height: 40, width: 40,alignItems: 'center', justifyContent: 'center'}} >
                            <Icon  name="ios-arrow-back" size={25} color="#fff" />
                      </TouchableHighlight>
                    <View style={{flex: 1, backgroundColor:'#546E7A'}}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            blurOnSubmit={false}
                            autoFocus={true}
                            autoCorrect={false}
                            returnKeyType={'search'}
                            onSubmitEditing={this.findFilm.bind(this)}
                            onChangeText={(text) => this.changeText(text)}
                            onEndEditing ={this.suggest()}
                            style={{height: 40, color: '#42A5F5', justifyContent: 'center', backgroundColor:"#546E7A"}}
                        />
                    </View>
                    <TouchableHighlight onPress={this.findFilm.bind(this)} underlayColor="transparent" style={{height: 40, width: 40,alignItems: 'center', justifyContent: 'center'}} >
                        <Icon  name="ios-search" size={25} color="#fff" />
                    </TouchableHighlight>
                </View>
                <View style={{flex: 1, backgroundColor:'#263238', padding: 10}}>
                    <View style={{flex: 1, backgroundColor: '#546E7A', padding: 10}}>
                        <ScrollView>

                            {this.state.film.length>0 && <View style={{
                                padding: 5,
                                paddingLeft: 0,
                                borderBottomColor: '#B0BEC5',
                                borderBottomWidth: 1.5,
                            }}><Text style={{color:'white', fontWeight:'bold'}}>PHIM</Text></View>}
                            {this.state.film.length>0 && <ListView
                                contentContainerStyle={styles.list}
                                dataSource={this.ds.cloneWithRows(this.state.film)}
                                renderRow={this.renderFilm.bind(this)}
                            />}

                            {this.state.actor.length>0 && <View style={{
                                padding: 5,
                                paddingLeft: 0,
                                borderBottomColor: '#B0BEC5',
                                borderBottomWidth: 1.5,
                            }}><Text style={{color:'white', fontWeight:'bold'}}>DIỄN VIÊN</Text></View>}
                            {this.state.actor.length>0 && <ListView
                                contentContainerStyle={styles.list}
                                dataSource={this.ds.cloneWithRows(this.state.actor)}
                                renderRow={this.renderActor.bind(this)}
                            />}



                        </ScrollView>
                    </View>
                </View>
                </View>

        )
    }
    changeText(search){
        if(search!= this.state.search){
            this.setState({
                search: search
            });

            if(search){
                let url = '?q='+search;
                HomePresenter.getSuggestFilm(url,this).then(responseData=>{
                        this.setState({
                            film: responseData['data']['film'],
                            actor: responseData['data']['actors']
                        })
                    }).catch(error=>{
                });
            }else{
                this.setState({
                    film: [],
                    actor: []
                })
            }

        }
    }


    renderFilm(rowData: object, sectionID: number, rowID: number){
        return (
            <FilmCell data={rowData} onClickCell={this.onClickFilm.bind(this, rowData)}/>
        )
    }

    renderActor(rowData: object, sectionID: number, rowID: number){
        console.log('DATA',rowData);
        return (
            <ActorCell data={rowData} onClickCell={this.onClickActor.bind(this, rowData)}/>
        )
    }

    onClickFilm(rowData, event){
        this.props.navigator.push({
            id:Global.Constants.DETAIL_ID,
            data: rowData
        });

    }

    onClickActor(rowData, event){

        this.props.navigator.push({
            id:Global.Constants.H_PAGE_ID,
            data: rowData
        });

    }

    suggest(){

        if(this.state.search){
            let url = '?q='+this.state.search;
            HomePresenter.getSuggestFilm(url,this).then(responseData=>{

            }).catch(error=>{
            });
        }
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
    },
});
module.exports = Search;
