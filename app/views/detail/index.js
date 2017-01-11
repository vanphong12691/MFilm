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
    TouchableWithoutFeedback,
    Button,
    Linking,
    ListView,
    ActivityIndicator,
    TouchableHighlight,
    ScrollView,
    AsyncStorage,
    WebView
}from 'react-native';
var styles = require('./index_style');
var Global = require('../../common/global');
var Constant = require('../../common/constants');
var HomePresenter = require('../../presenter/home');
var Header = require('../../component/header/index');
var ChapperCell = require('../cell/chapper/index');
var PageCell = require('../cell/page/index');
var Hot = require('../hot/hot');
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
class HomeCell extends Component {

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.pages = [];
        this.state = {
            dataSource:ds.cloneWithRows(['']),
            information: {'related': []},
            watched: false,
            loading: true,
            lastSeen: -1
        }
    }
    propTypes:{
        data: Object,
    }
    componentDidMount(){
        HomePresenter.getDetailFilm(this.props.data.href,this).then(responseData=>{
            this.setState({
                    information: responseData,
                    loading: false,
            });
        }).catch(error=>{
                alert("Không thể kết nối đến máy chủ, vui lòng thử lại sau!");

        });
        var _this = this;
        AsyncStorage.getItem(Global.Constants.SEEN_STORE_KEY)
            .then(value=>{
                let seen = [];
                if(value){
                    seen = JSON.parse(value);
                }
                _this.setState({
                    seen: seen
                })

            });

        AsyncStorage.getItem(Global.Constants.LIKE_STORE_KEY)
            .then(value=>{
                let like = [];
                if(value){
                    like = JSON.parse(value);
                }
                let isLike = false;

                if(_this.checkExists(this.props.data, like)){
                    isLike = true;
                }
                _this.setState({
                    like: like,
                    isLike: isLike
                })

            });
    }
    clickUnlike(){
        let list =  this.state.like;
        let index  = this.getIndexList(this.props.data,list);
        if(index>=0){
            list.splice(index,1);
        }
        AsyncStorage.setItem(Global.Constants.LIKE_STORE_KEY, JSON.stringify(list))
            .then(() => {})
            .done();
        this.setState({
            isLike: false
        })

    }
    clickLike(){
        let like  = this.state.like;
        like.push({
            id: this.state.information.film_id,
            data: this.props.data,
            chapter: []
        });
        AsyncStorage.setItem(Global.Constants.LIKE_STORE_KEY, JSON.stringify(like))
            .then(() => {})
            .done();
        this.setState({
            isLike: true
        })

    }
    render() {
        let postUrl =  Global.Domain.DOMAIN+'/facebook.php?url='+this.props.data.href;
        console.log(postUrl);
        return (
            <View style={{backgroundColor: '#263238', height: Global.Constants.HEIGHT_SCREEN}}>
                <View style={{height:40, flexDirection:"row"}}>
                    <View style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                        <TouchableHighlight underlayColor="transparent"  style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}} onPress={this.onBack.bind(this)}>
                            <Icon  name="ios-arrow-back" size={25} color="#fff" />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1}}><Header title={this.props.data.vi}/></View>
                </View>

                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar
                        backgroundColor="#607D8B"
                        activeTextColor="white"
                        inactiveTextColor="#B0BEC5"
                        underlineStyle={{
                            backgroundColor: 'black'
                        }}
                        tabStyle={{paddingBottom: 0}}
                        style={{height:40, borderColor:"black"}}
                    />}
                >

                    <ScrollView tabLabel='Thông tin'>
                        <View style={{height: 300, backgroundColor :'#263238', flexDirection: 'row'}}>

                            <Image style={{width: 180, height: 300}} source={{uri: this.state.information.thumbnailUrl}}></Image>
                            <View style={{flex: 1, backgroundColor: "#263238", padding: 10, flexDirection:'column'}}>
                                <Text style={{fontSize: 16,lineHeight: 20, color: 'white', fontWeight:'bold'}} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.data.en}</Text>

                                <Text numberOfLines={1} ellipsizeMode={'tail'}>
                                    <Text style={{color:'#B3E5FC'}}>Đang phát: </Text>
                                    <Text style={{fontSize: 14, lineHeight: 20, color: 'white'}}>{this.state.information.showing}</Text>
                                </Text>
                                <Text numberOfLines={1} ellipsizeMode={'tail'}>
                                    <Text style={{color:'#B3E5FC'}}>Sắp chiếu: </Text>
                                    <Text style={{fontSize: 14, lineHeight: 20,color: 'white'}}>{this.state.information.preShow}</Text>
                                </Text>

                                <Text numberOfLines={5} ellipsizeMode={'tail'}>
                                    <Text style={{color:'#B3E5FC'}}>Diễn viên: </Text>
                                    <Text style={{fontSize: 14, lineHeight: 20,color: 'white'}}>{this.convertArray(this.state.information.actor)}</Text>
                                </Text>
                                <Text numberOfLines={2} ellipsizeMode={'tail'}>
                                    <Text style={{color:'#B3E5FC'}}>Quốc gia: </Text>
                                    <Text style={{fontSize: 14, lineHeight: 20,color: 'white'}}>{this.convertArray(this.state.information.country)}</Text>
                                </Text>
                                <Text numberOfLines={1} ellipsizeMode={'tail'}>
                                    <Text style={{color:'#B3E5FC'}}>Thời lượng: </Text>
                                    <Text style={{fontSize: 14, lineHeight: 20,color: 'white'}} >{this.state.information.duration}</Text>
                                </Text>
                                <Text numberOfLines={1} ellipsizeMode={'tail'}>
                                    <Text style={{color:'#B3E5FC'}}>Lượt xem: </Text>
                                    <Text style={{fontSize: 14, lineHeight: 20,color: 'white'}} >{this.state.information.view}</Text>
                                </Text>
                                <Text numberOfLines={1} ellipsizeMode={'tail'}>
                                    <Text style={{color:'#B3E5FC'}}>Năm SX: </Text>
                                    <Text style={{fontSize: 14, lineHeight: 20,color: 'white'}} >{this.state.information.year}</Text>
                                </Text>





                                <View style={{
                                    position: 'absolute',
                                    bottom:10,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    <View style={{width: 30}}>
                                        {this.state.isLike && <Icon onPress={this.clickUnlike.bind(this)} name="ios-heart" size={28} color="#E91E63" />}
                                        {!this.state.isLike && <Icon  onPress={this.clickLike.bind(this)} name="ios-heart-outline" size={28} color="#E91E63" />}
                                    </View>
                                    <View style={{width: 100, borderRadius: 5, backgroundColor: '#0D47A1', justifyContent: 'center', alignItems:'center'}}>
                                        {!this.state.watched && <TouchableHighlight underlayColor="transparent" onPress={this.playFilm.bind(this)}>
                                            <View>
                                                <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>{"XEM PHIM"}</Text>
                                            </View>

                                        </TouchableHighlight>}
                                        {this.state.watched && <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>{'CHỌN TẬP'}</Text>}
                                    </View>


                                </View>
                            </View>

                        </View>
                        <View style={{height:40, flexDirection:"row", backgroundColor: "#0288D1"}}>
                            <View style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>

                                <Icon  name="ios-list" size={30} color="#fff" />

                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}><Text style={{fontSize: 16, color:'white'}}>LỊCH CHIẾU</Text></View>
                        </View>
                        <View style={{backgroundColor :'#263238', padding: 10}}>
                            <Text style={{lineHeight: 20, color: "white", paddingTop: 5, paddingBottom: 5}}>{this.state.information.lc}</Text>
                        </View>
                        {this.state.watched && <View style={{flex: 0.20, padding: 1}}>
                            <ListView
                                pageSize = {100}
                                contentContainerStyle={styles.list}
                                dataSource={this.state.dataSource}
                                renderRow={this._renderRow.bind(this)}
                            />

                        </View>
                        }
                        <View style={{height:40, flexDirection:"row", backgroundColor: "#0288D1"}}>
                            <View style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                                <Icon  name="ios-list" size={30} color="#fff" />
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}><Text style={{fontSize: 16, color:'white'}}>NỘI DUNG PHIM</Text></View>
                        </View>
                        <View style={{backgroundColor :'#263238', padding: 10}}>
                            {this.convertToPicture(this.state.information.content)}
                        </View>
                    </ScrollView>

                    <WebView tabLabel='Bình luận'
                        ref={"WEBVIEW_REF"}
                        automaticallyAdjustContentInsets={false}
                        style={styles.webView}
                        source={{uri: postUrl}}
                    />
                    <View tabLabel='Liên quan'>
                        <Hot onItemSelected={this.onPressGoDetail.bind(this)} data={this.state.information['related']}></Hot>
                    </View>
                </ScrollableTabView>
                {this.state.loading&&<View style={styles.centering}>
                    <ActivityIndicator
                        animating = {true}
                        size="large"
                    />
                </View>}
                </View>
        )
    }
    convertArray(data){
        if(data){
            let result ='';
            for(let i =0;i < data.length; i++){
                result += ", " + data[i].name;
            }
            return result.substring(2);
        }
        return '';


    }
    onBack(){
        this.props.navigator.pop();
    }

    convertToPicture(content){
        if(content){
            var result = [];
            var data =[];
            data = content.split("--IMAGE--");
            for(var i=0;i< data.length-1; i++){

                result.push(<Text style={{lineHeight: 20, color: "white", paddingTop: 5, paddingBottom: 5}}>{data[i]}</Text>)
                result.push(<Image style={{width: Constant.WIDTH_SCREEN-20,height: (Constant.WIDTH_SCREEN-20)*0.8, borderWidth: 1, borderColor: "#ecf0f1"}} source={{uri: this.state.information.image[i]}}></Image>)

            }
            result.push(<Text style={{lineHeight: 20, color: "white", paddingTop: 5, paddingBottom: 5}}>{data[data.length-1]}</Text>)
        }
        return result;


    }
    playFilm(){
        if(this.state.loading){
            return;
        }
        if(!this.checkExists(this.props.data, this.state.seen)){
            let list = this.state.seen;
            list.push({
                id: this.state.information.film_id,
                data: this.props.data,
                chapter: []
            });
            this.setState({
                seen: list
            })
        };

        let seen  = this.state.seen;
        AsyncStorage.setItem(Global.Constants.SEEN_STORE_KEY, JSON.stringify(seen))
            .then(() => {})
            .done();

        if(this.state.information.showing.startsWith("Tập") || (this.state.information.showing.contains("Full") && !this.state.information.showing.startsWith("Full HD"))){
            this.setState({
                loading: true,
            })
            HomePresenter.getChapperFilm(this.state.information.url,this).then(responseData=>{
                let index  = this.getIndexList(this.props.data,seen);
                let lastSeen = -1;
                let length = seen[index]['chapter'].length;
                if(index>=0 && length > 0){
                    lastSeen = seen[index]['chapter'][length-1].page;
                }
                if(responseData.length > 0){
                    this.pages = responseData;
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(responseData),
                        watched: true,
                        loading: false,
                        lastSeen: lastSeen
                    })


                }
            }).catch(error=>{
                alert("Không thể kết nối đến máy chủ, vui lòng thử lại sau!");

            });
           /* this.props.navigator.push({
                id:Global.Constants.CHAPPER_ID,
                data: this.state.information
            });*/
        }else{
            var _this = this;
            HomePresenter.getLink(this.state.information.url,this.state.information.film_id,this).then(responseData=>{
                this.props.navigator.push({
                    id:Global.Constants.PLAY_ID,
                    data: responseData[0]['link'],
                    type: responseData[0]['type'],
                    typeFilm: 'phim_le',
                    current: 1,
                    film_id: this.state.information.film_id,
                    pageName: 'FullHD',
                    quality: responseData,
                    name: this.props.data.vi,
                });
            }).catch(error=>{
                console.log(error);
            });
        }


    }

    getIndexList(current, seen){
        if(seen.length==0){
            return -1;
        }else{

            for(var i = 0; i<seen.length; i++){
                if(seen[i].data.vi== current.vi || seen[i].en == current.en){
                    return i;
                }
            }
            return -1;
        }
    }

    checkExists(current, seen){
        if(seen.length==0){
            return false;
        }else{

            for(var i = 0; i<seen.length; i++){
                if(seen[i].data.vi== current.vi || seen[i].en == current.en){
                    return true;
                }
            }
            return false;
        }

    }
    _renderRow(rowData: object, sectionID: number, rowID: number){
        return (
            <ChapperCell data={rowData} current={rowData.page == this.state.lastSeen} onClickCell={this.onClickCell.bind(this, rowData)}/>
        )
    }

    onPressGoDetail(data){
        this.props.navigator.push({
            id:Global.Constants.DETAIL_ID,
            data: data
        });
    }

    onClickCell(rowData,event) {
        HomePresenter.getLink(rowData.link,this.state.information.film_id,this).then(responseData=>{
            this.props.navigator.push({
                id:Global.Constants.PLAY_ID,
                data: responseData[0]['link'],
                type: responseData[0]['type'],
                quality: responseData,
                typeFilm: 'phim_bo',
                pages: this.pages,
                current: rowData.page,
                pageName: rowData.name,
                max: this.pages.length,
                film_id: this.state.information.film_id,
                name: this.props.data.vi
            });
        });

    }

}

module.exports = HomeCell;
