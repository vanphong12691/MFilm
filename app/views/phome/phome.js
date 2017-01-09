
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
    Keyboard,
    ActivityIndicator
}from 'react-native';
var HomePresenter = require('../../presenter/home');
var Global = require('../../common/global');
var Switch = require('Switch');
var ToolbarAndroid = require('ToolbarAndroid');
var Header = require('../../component/header/index');
var PageCell = require('../cell/page/index');
var SideMenu = require('react-native-side-menu');
var Menu = require('../menu/menu');
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
                this.datas = responseData.data;
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
        const menu = <Menu id={this.state.id} onMenuSelected={this.onMenuSelected.bind(this)} type={this.state.type} onItemSelected={this.onMenuOpen.bind(this)} />;
        return (
            <SideMenu
                menu={menu}
                menuPosition={'right'}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}>
            <View style={{flex:1, backgroundColor: "white"}}>
                <View style={{height:40, flexDirection:"row"}}>
                    <View style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                        <TouchableHighlight underlayColor="transparent"  onPress={this.onBackHome.bind(this)} style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
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
                        renderFooter={this.renderFooter.bind(this)}
                        onEndReached={this.onEndReached.bind(this)}
                        ref="listView"
                        contentContainerStyle={styles.list}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                 />
            </View>
                </SideMenu>


        )
    }

    onEndReached() {
        if (!this.state.refreshing) {
            this.setState({refreshing: true});
            this._onRefresh();
        }
    }

    renderFooter() {
        if (this.state.refreshing) {
            return (<View style={{
                padding: 5,
                right: 0,
                bottom: 0,
                left: 0,
                position: 'absolute',
                backgroundColor: 'rgba(3, 169, 244,0.3)'
              }}><ActivityIndicator size={30}  animating = {true}/></View>);
        }
    }

    onMenuSelected(name){
        let data;
        switch(name){
            case 'home':
                this.props.navigator.push({
                    id:Global.Constants.HOME_ID,
                });
                break;
            case 'seen':
                this.props.navigator.push({
                    id:Global.Constants.SEEN_ID,
                });
                break;
            case 'like':
                this.props.navigator.push({
                    id:Global.Constants.LIKE_ID,
                });
                break;
            case 'search':
                this.props.navigator.push({
                    id:Global.Constants.SEARCH_ID
                })
                break;
            case 'setting':
                this.props.navigator.push({
                    id:Global.Constants.SETTING_ID
                })
                break;
            case 'movie':
                data = {
                    type : "danh-sach/phim-le.html",
                    title: "Phim lẻ"
                };
                this.props.navigator.push({
                    id:Global.Constants.H_PAGE_ID,
                    data: data
                });
                break;

            case 'movies':
                data = {
                    type : "danh-sach/phim-bo.html",
                    title: "Phim bộ"
                };
                this.props.navigator.push({
                    id:Global.Constants.H_PAGE_ID,
                    data: data
                });
                break;
            case 'cartoon':
                data = {
                    type : "the-loai/hoat-hinh-55.html",
                    title: "Phim hoạt hình"
                };
                this.props.navigator.push({
                    id:Global.Constants.H_PAGE_ID,
                    data: data
                });
                break;
            case 'cinema':
                data = {
                    type : "the-loai/chieu-rap-56.html",
                    title: "Phim chiếu rạp"
                };
                this.props.navigator.push({
                    id:Global.Constants.H_PAGE_ID,
                    data: data
                });
                break;

        }
    }
    onBackHome(){
        this.props.navigator.pop();
    }

    _onRefresh() {

        let url = '?type='+this.props.data.type;
        this.isRefresh = true;
        if(this.page<this.totalPage){
            url +="&page="+(++this.page);
            HomePresenter.getListFilm(url,this).then(responseData=>{
                    if(responseData.data.length > 0){
                        for(let i=responseData.data.length-1; i>=0;i--){
                            this.datas.push(responseData.data[i]);
                        }
                        this.setState({dataSource:this.ds.cloneWithRows(this.datas)});
                        this.setState({refreshing: false});
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
