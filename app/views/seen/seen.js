
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
                }
                this.setState({
                    data:setting,
                    title: 'Đã xem'
                })
            });


    }

    render(){
        return (
            <View style={{flex:1, backgroundColor: "white"}}>
                <View style={{height:40, flexDirection:"row"}}>
                    <View style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                        <TouchableHighlight underlayColor="transparent"  onPress={this.onBackHome.bind(this)} style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                            <Icon  name="ios-arrow-back" size={25} color="#fff" />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1}}><Header title={this.state.title}/></View>
                    <View style={{width: 40, backgroundColor: '#0288D1'}}></View>
                </View>

                <ListView
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
            <SeenCell data={rowData} onClickCell={this.onClickCell.bind(this, rowData)}/>
        )
    }
    onClickCell(rowData,event){
        this.props.navigator.push({
            id:Global.Constants.DETAIL_ID,
            data: rowData.data
        });
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
