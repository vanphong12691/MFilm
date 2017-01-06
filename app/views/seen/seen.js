
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
    Keyboard,
    AsyncStorage
}from 'react-native';
var Global = require('../../common/global');
var SeenCell = require('../cell/seen/index');
import Icon from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';
var Header = require('../../component/header/index');

class Seen extends Component
{
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            title: 'Đã xem',
            data: []
        }
    }
    componentDidMount(){
        AsyncStorage.getItem(Global.Constants.SEEN_STORE_KEY)
            .then(value=>{
                var setting;
                if(value){
                    setting = JSON.parse(value);
                    console.log('SETTING_DAXEM', setting);
                }
                this.setState({
                    data:setting,
                    title: 'Đã xem'
                })
            });


    }

    render(){
        return (
            <View style={{flex:1, backgroundColor: "#263238"}}>
                <View style={{height:40, flexDirection:"row"}}>
                    <View style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                        <TouchableHighlight underlayColor="transparent"  onPress={this.onBackHome.bind(this)} style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                            <Icon  name="ios-arrow-back" size={25} color="#fff" />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1}}><Header title={this.state.title}/></View>
                    <View style={{width: 40, backgroundColor: '#0288D1'}}></View>
                </View>

                <SwipeListView
                    contentContainerStyle={styles.list}
                    dataSource={this.ds.cloneWithRows(this.state.data)}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                />

            </View>

        )
    }
    onBackHome(){
        this.props.navigator.pop();
    }

    _renderRow(rowData: object, sectionID: number, rowID: number){
        return (
            <SeenCell data={rowData} onClickCell={this.onClickCell.bind(this, rowData)} onClickDelete={this.onClickDelete.bind(this, rowData, rowID)}/>
        )
    }
    onClickCell(rowData,event){
        this.props.navigator.push({
            id:Global.Constants.DETAIL_ID,
            data: rowData.data
        });
    }
    onClickDelete(rowData,rowId,event){
        let dt = this.state.data;
        dt.splice(rowId,1);
        AsyncStorage.setItem(Global.Constants.SEEN_STORE_KEY, JSON.stringify(dt))
            .then(() => {})
            .done();
        this.setState({
            data: dt
        })
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
module.exports = Seen;
