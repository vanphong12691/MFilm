
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
var RefreshInfiniteListView = require('@remobile/react-native-refresh-infinite-listview');
import Icon from 'react-native-vector-icons/Ionicons';
var Orientation = require('react-native-orientation');
class Page extends Component
{
    constructor(props) {
        Orientation.lockToPortrait();
        super(props);
        this.datas = [];
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(['']),
            isOpen: false,
            title: this.props.data.name,
            id: this.props.data.id,
            type:  this.props.data.type,
            refreshing: false,
            loading: true,
        }
        this.page = 1;
        this.totalPage = 1;
    }
    propTypes:{
        data:Object,
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
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
        let url ="?order=publish_date";

        if(this.state.id){
            url += '&'+this.state.type+'='+this.state.id;
        }
       /* let url = '?'+rowData.type+'='+rowData.id;*/
        HomePresenter.getListFilm(url,this).then(responseData=>{
            this.totalPage = responseData.max;
            if(responseData.data.length > 0){
                this.datas = responseData.data.reverse();
              console.log("DATAS", this.datas.length);
                this.setState({
                    dataSource:this.ds.cloneWithRows(this.datas),
                    loading: false
                })
            }
        }).catch(error=>{
            alert(1);

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
                {this.state.loading&&<View style={styles.centering}>
                    <ActivityIndicator
                        animating = {true}
                        size="large"
                    />
                </View>}
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
        let url = "?order=publish_date";
        this.isRefresh = true;
        if(this.page<this.totalPage){
            url +="&page="+(++this.page);
            if(this.state.id){
                url += '&'+this.state.type+'='+this.state.id;
            }
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
                    alert(1);

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
        this.setState({
            loading: true,
            isOpen: false,
            title: rowData.name
        });
        this.isRefresh = false;
        let url = '?'+rowData.type+'='+rowData.id;
        HomePresenter.getListFilm(url,this).then(responseData=>{

            if(responseData.data.length > 0){
                this.datas = responseData.data.reverse();
                this.setState({
                    dataSource: this.ds.cloneWithRows(this.datas),
                    id: rowData.id,
                    type: rowData.type,
                    loading: false
                })
            }
        }).catch(error=>{
            alert(1);

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
    centering:{
        alignItems: 'center',
        justifyContent: 'center',
        top: 40,
        right: 0,
        bottom: 0,
        height: Global.Constants.HEIGHT_SCREEN-40,
        left: 0,
        position: 'absolute',
        flex: 1,
        backgroundColor: '#CFD8DC'
    },
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
module.exports = Page;
