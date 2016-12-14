
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
    ViewPagerAndroid
}from 'react-native';
var HomePresenter = require('../../presenter/home');
var Global = require('../../common/global');
var Switch = require('Switch');
var ToolbarAndroid = require('ToolbarAndroid');
var Header = require('../../component/header/index');
var PageCell = require('../cell/page/index');
var SideMenu = require('react-native-side-menu');
var Menu = require('../menu/menu');
var HomeSlider = require('../slider/slider');
var Hot = require('../hot/hot');
var RefreshInfiniteListView = require('@remobile/react-native-refresh-infinite-listview');
var Orientation = require('react-native-orientation');
var ScrollableTabView = require('react-native-scrollable-tab-view');
import CustomTabBar from './CustomTabBar';
import Icon from 'react-native-vector-icons/Ionicons';
class Page extends Component
{
    constructor(props) {
        Orientation.lockToPortrait();
        super(props);
        this.datas = [];
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            slider: [],
            hot: [],
            film: [[],[],[]],
            id: 0,
            type: 0,
            refreshing: false,
        }
    }


    componentWillMount(){

        HomePresenter.getHomeInformation(this).then(responseData=>{
           this.setState({
               slider: responseData['slider'],
               hot: responseData['hot'],
               film: responseData['film']
           })
        }).catch(error=>{
            alert(1);

        });
    }

    render(){

        return (
                <ScrollableTabView
                    removeClippedSubviews={false}
                    style={{ backgroundColor: 'white' }}

                    tabBarPosition={'bottom'}
                    locked = {true}
                    renderTabBar={() => <CustomTabBar />}>
                    <ScrollView tabLabel="ios-home" style={styles.tabView}>
                        <View style={styles.card}>
                            <HomeSlider onItemSelected={this.onPressGoDetail.bind(this)} data={this.state.slider}/>
                            <View style={{height:40, flexDirection:"row", backgroundColor: "#34495e"}}>
                                <View style={{backgroundColor: "#34495e",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                                    <TouchableHighlight underlayColor="transparent"  >
                                        <Icon  name="ios-list" size={30} color="#fff" />
                                    </TouchableHighlight>
                                </View>
                                <View style={{flex: 1, justifyContent: 'center'}}><Text style={{fontSize: 16, color:'white'}}>Phim bộ mới cập nhật</Text></View>
                                <View style={{backgroundColor: "#34495e", width: 40, height: 40, justifyContent: 'center', alignItems:'center'}}>
                                    <TouchableHighlight underlayColor="transparent" onPress={this._onPressList.bind(this,0)} >
                                        <Icon  name="ios-arrow-dropright" size={30} color="#fff" />
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <Hot onItemSelected={this.onPressGoDetail.bind(this)} data={this.state.film[0]}></Hot>
                            <View style={{height:40, flexDirection:"row", backgroundColor: "#34495e"}}>
                                <View style={{backgroundColor: "#34495e",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                                    <TouchableHighlight underlayColor="transparent"  >
                                        <Icon  name="ios-list" size={30} color="#fff" />
                                    </TouchableHighlight>
                                </View>
                                <View style={{flex: 1, justifyContent: 'center'}}><Text style={{fontSize: 16, color:'white'}}>Phim lẻ mới cập nhật</Text></View>
                                <View style={{backgroundColor: "#34495e", width: 40, height: 40, justifyContent: 'center', alignItems:'center'}}>
                                    <TouchableHighlight underlayColor="transparent" onPress={this._onPressList.bind(this,1)} >
                                        <Icon  name="ios-arrow-dropright" size={30} color="#fff" />
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <Hot onItemSelected={this.onPressGoDetail.bind(this)} data={this.state.film[1]}></Hot>
                            <View style={{height:40, flexDirection:"row", backgroundColor: "#34495e"}}>
                                <View style={{backgroundColor: "#34495e",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                                    <TouchableHighlight underlayColor="transparent"  >
                                        <Icon  name="ios-list" size={30} color="#fff" />
                                    </TouchableHighlight>
                                </View>
                                <View style={{flex: 1, justifyContent: 'center'}}><Text style={{fontSize: 16, color:'white'}}>Phim hoạt hình</Text></View>
                                <View style={{backgroundColor: "#34495e", width: 40, height: 40, justifyContent: 'center', alignItems:'center'}}>
                                    <TouchableHighlight underlayColor="transparent" onPress={this._onPressList.bind(this,2)} >
                                        <Icon  name="ios-arrow-dropright" size={30} color="#fff" />
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <Hot onItemSelected={this.onPressGoDetail.bind(this)} data={this.state.film[2]}></Hot>


                        </View>
                    </ScrollView>

                    <ScrollView tabLabel="ios-timer" style={styles.tabView}>
                        <View style={styles.card}>
                            <Hot onItemSelected={this.onPressGoDetail.bind(this)} data={this.state.hot}></Hot>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-heart" style={styles.tabView}>
                        <View style={styles.card}>




                        </View>
                    </ScrollView>


                    <ScrollView tabLabel="ios-search" style={styles.tabView}>
                        <View style={styles.card}>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-menu" style={styles.tabView}>
                        <View style={styles.card}>
                            <Menu id={this.state.id} isScroll = {true} type={this.state.type} onItemSelected={this.onMenuOpen.bind(this)} />
                        </View>
                    </ScrollView>



                </ScrollableTabView>
        )
    }

    _onPressList(type, event){
        let data = {};
        switch (type){
            case 0:
                data = {
                    type : "danh-sach/phim-bo.html",
                    title: "Phim bộ mới cập nhật"
                }
                break;
            case 1:
                data = {
                    type : "danh-sach/phim-le.html",
                    title: "Phim lẻ mới cập nhật"
                }
                break;
            case 2:
                data = {
                    type : "the-loai/hoat-hinh-55.html",
                    title: "Phim hoạt hình mới cập nhật"
                }
                break;
        }
        this.props.navigator.push({
            id:Global.Constants.H_PAGE_ID,
            data: data
        });
    }
    onPressGoDetail(data){
        this.props.navigator.push({
            id:Global.Constants.DETAIL_ID,
            data: data
        });
    }

    _onPressMenu(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    onMenuOpen(rowData) {
        this.props.navigator.push({
            id:Global.Constants.PAGE_ID,
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
module.exports = Page;
