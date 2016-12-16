
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
    Keyboard
}from 'react-native';
var HomePresenter = require('../../presenter/home');
var Global = require('../../common/global');
var Switch = require('Switch');
var ToolbarAndroid = require('ToolbarAndroid');
var Header = require('../../component/header/index');
var PageCell = require('../cell/page/index');
var SideMenu = require('react-native-side-menu');
var Menu = require('../menu/menu');
var RefreshInfiniteListView = require('@remobile/react-native-refresh-infinite-listview');
import Icon from 'react-native-vector-icons/Ionicons';
var Orientation = require('react-native-orientation');
class PageHome extends Component
{
    constructor(props) {
        Orientation.lockToPortrait();
        super(props);
        this.datas = [];
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(['']),
            isOpen: false,
            title: this.props.data.title,
            refreshing: false,
        }
        this.page = 1;
        this.totalPage = 1;
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    propTypes:{
        data:Object,
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen: isOpen });
    }

    onMenuItemSelected = (item) => {
        this.isRefresh = false;
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    }

    componentDidMount(){
        Keyboard.dismiss();
        let url = '?type='+this.props.data.type;
        HomePresenter.getHListFilm(url,this).then(responseData=>{
            this.totalPage = responseData.max;
            if(responseData.data.length > 0){
                this.datas = responseData.data.reverse();
              console.log("DATAS", this.datas.length);
                this.setState({
                    dataSource:this.ds.cloneWithRows(this.datas)
                })
            }
        }).catch(error=>{
            alert("Không thể kết nối đến máy chủ, vui lòng thử lại sau!");

        });
    }

    render(){
        const menu = <Menu id={this.state.id} type={this.state.type} onItemSelected={this.onMenuOpen.bind(this)} />;
        return (
            <SideMenu
                menu={menu}
                menuPosition={'right'}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}>
            <View style={{flex:1, backgroundColor: "white"}}>
                <View style={{height:40, flexDirection:"row"}}>
                    <View style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                        <TouchableHighlight underlayColor="transparent"  onPress={this.onBackHome.bind(this)}>
                            <Icon  name="ios-arrow-back" size={25} color="#fff" />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1}}><Header title={this.state.title}/></View>
                    <View style={{backgroundColor: "#0288D1", width: 40, height: 40, justifyContent: 'center', alignItems:'center'}}>
                        <TouchableHighlight underlayColor="transparent"  onPress={this._onPressMenu.bind(this)}>
                            <Icon  name="ios-menu" size={25} color="#fff" />
                        </TouchableHighlight>
                    </View>
                </View>

                 <ListView
                        refreshControl={
                         <RefreshControl
                             refreshing={this.state.refreshing}
                             onRefresh={this._onRefresh.bind(this)}
                         />
                        }
                        ref="listView" onLayout={this.onListViewLayout.bind(this)}
                        contentContainerStyle={styles.list}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                        onContentSizeChange={this.onContentSizeChange.bind(this)}
                 />
            </View>
                </SideMenu>


        )
    }
    onBackHome(){
        this.props.navigator.pop();
    }
    onListViewLayout(){
        var self=this;
        Global.Utils.measureView(this.refs.listView, function(measureData){
            self.listViewMaxHeight = measureData.height;
        });
    }
    onContentSizeChange(w, h)
    {
        this.contentHeight = h;
        console.log(this.isRefresh);
        if (!this.isRefresh) {
            this.scrollToBottom(this.listViewMaxHeight);
        }
    }
    scrollTo(listViewHeight){
        this.refs.listView.scrollTo({x: 0, y: listViewHeight, animated: true});
    }

    scrollToBottom(listViewHeight){
        if (this.contentHeight > listViewHeight) {
            this.refs.listView.scrollTo({x: 0, y: this.contentHeight - listViewHeight, animated: true});
        }
    }

    _onRefresh() {

        this.setState({refreshing: true});
        let url = '?type='+this.props.data.type;
        this.isRefresh = true;
        if(this.page<this.totalPage){
            url +="&page="+(++this.page);
            HomePresenter.getListFilm(url,this).then(responseData=>{
                    responseData.data = responseData.data.reverse();
                    if(responseData.data.length > 0){
                        for(let i=responseData.data.length-1; i>=0;i--){
                            this.datas.unshift(responseData.data[i]);
                        }
                        console.log('Data', this.datas.length);
                        this.setState({dataSource:this.ds.cloneWithRows(this.datas)});
                        this.setState({refreshing: false});
                        console.log(this.listViewMaxHeight);
                        this.scrollTo((responseData.data.length-1)*260/2);
                    }
                }).catch(error=>{
                alert("Không thể kết nối đến máy chủ, vui lòng thử lại sau!");

                });
        }
        this.setState({refreshing: false});
    }

    _onPressMenu(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    onMenuOpen(rowData) {
        this.props.navigator.push({
            id:Global.Constants.PAGE_ID,
            data: {
              name: rowData.name,
              id:rowData.id,
              type: rowData.type
            }
        });

        console.log(rowData);
    }
    _renderRow(rowData: object, sectionID: number, rowID: number){
        return (
            <PageCell data={rowData} onClickCell={this.onClickCell.bind(this, rowData)}/>
        )
    }
    onClickCell(rowData,event){
        this.props.navigator.push({
            id:Global.Constants.DETAIL_ID,
            data: rowData
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
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
});
module.exports = PageHome;
