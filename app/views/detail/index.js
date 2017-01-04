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
    ScrollView
}from 'react-native';
var styles = require('./index_style');
var Global = require('../../common/global');
var Constant = require('../../common/constants');
var HomePresenter = require('../../presenter/home');
var Header = require('../../component/header/index');
var ChapperCell = require('../cell/chapper/index');
import Icon from 'react-native-vector-icons/Ionicons';
class HomeCell extends Component {

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.pages = [];
        this.state = {
            dataSource:ds.cloneWithRows(['']),
            information: [],
            watched: false,
            loading: true,
        }
    }
    propTypes:{
        data:Object,
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
    }

    render() {
        return (
            <View style={{backgroundColor: 'white', height: Global.Constants.HEIGHT_SCREEN}}>
                <View style={{height:40, flexDirection:"row"}}>
                    <View style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                        <TouchableHighlight underlayColor="transparent"  style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}} onPress={this.onBack.bind(this)}>
                            <Icon  name="ios-arrow-back" size={25} color="#fff" />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1}}><Header title={this.props.data.vi}/></View>
                </View>
                <ScrollView>
                    <View style={{height: 300, backgroundColor :'red', flexDirection: 'row'}}>

                        <Image style={{width: 180, height: 300}} source={{uri: this.props.data.picture}}></Image>
                        <View style={{flex: 1, backgroundColor: "#FAFAFA", padding: 10, flexDirection:'column'}}>
                            <Text style={{fontSize: 16,lineHeight: 20, color: '#304FFE', fontWeight:'bold'}} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.data.en}</Text>

                            <Text numberOfLines={1} ellipsizeMode={'tail'}>
                                <Text style={{color:'#546E7A'}}>Đang phát: </Text>
                                <Text style={{fontSize: 14, lineHeight: 20, color: '#424242'}}>{this.state.information.showing}</Text>
                            </Text>
                            <Text numberOfLines={1} ellipsizeMode={'tail'}>
                                <Text style={{color:'#546E7A'}}>Sắp chiếu: </Text>
                                <Text style={{fontSize: 14, lineHeight: 20,color: '#424242'}}>{this.state.information.preShow}</Text>
                            </Text>

                            <Text numberOfLines={5} ellipsizeMode={'tail'}>
                                <Text style={{color:'#546E7A'}}>Diễn viên: </Text>
                                <Text style={{fontSize: 14, lineHeight: 20,color: '#424242'}}>{this.convertArray(this.state.information.actor)}</Text>
                            </Text>
                            <Text numberOfLines={2} ellipsizeMode={'tail'}>
                                <Text style={{color:'#546E7A'}}>Quốc gia: </Text>
                                <Text style={{fontSize: 14, lineHeight: 20,color: '#424242'}}>{this.convertArray(this.state.information.country)}</Text>
                            </Text>
                            <Text numberOfLines={1} ellipsizeMode={'tail'}>
                                <Text style={{color:'#546E7A'}}>Thời lượng: </Text>
                                <Text style={{fontSize: 14, lineHeight: 20,color: '#424242'}} >Thời lượng: {this.state.information.duration}</Text>
                            </Text>
                            <Text numberOfLines={1} ellipsizeMode={'tail'}>
                                <Text style={{color:'#546E7A'}}>Lượt xem: </Text>
                                <Text style={{fontSize: 14, lineHeight: 20,color: '#424242'}} >{this.state.information.view}</Text>
                            </Text>
                            <Text numberOfLines={1} ellipsizeMode={'tail'}>
                                <Text style={{color:'#546E7A'}}>Năm SX: </Text>
                                <Text style={{fontSize: 14, lineHeight: 20,color: '#424242'}} >{this.state.information.year}</Text>
                            </Text>





                            <View style={{
                                position: 'absolute',
                                left: 40,
                                right:40,
                                bottom:10,
                                height: 30,
                                backgroundColor: '#F44336',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {!this.state.watched && <TouchableHighlight underlayColor="transparent" onPress={!this.state.loading&&this.playFilm.bind(this)}>
                                    <View>
                                        <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>{"XEM PHIM"}</Text>
                                    </View>

                                </TouchableHighlight>}
                                {this.state.watched && <Text style={{color:'white'}}>{'CHỌN TẬP'}</Text>}

                            </View>
                        </View>

                    </View>
                    <View style={{height:40, flexDirection:"row", backgroundColor: "#03A9F4"}}>
                        <View style={{backgroundColor: "#03A9F4",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                            <TouchableHighlight underlayColor="transparent"  >
                                <Icon  name="ios-list" size={30} color="#fff" />
                            </TouchableHighlight>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}><Text style={{fontSize: 16, color:'white'}}>LỊCH CHIẾU</Text></View>
                    </View>
                    <View style={{backgroundColor :'#FAFAFA', padding: 10}}>
                        <Text style={{lineHeight: 20, color: "#424242", paddingTop: 5, paddingBottom: 5}}>{this.state.information.lc}</Text>
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
                    <View style={{height:40, flexDirection:"row", backgroundColor: "#03A9F4"}}>
                        <View style={{backgroundColor: "#03A9F4",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                            <TouchableHighlight underlayColor="transparent"  >
                                <Icon  name="ios-list" size={30} color="#fff" />
                            </TouchableHighlight>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}><Text style={{fontSize: 16, color:'white'}}>NỘI DUNG PHIM</Text></View>
                    </View>
                    <View style={{backgroundColor :'#FAFAFA', padding: 10}}>
                        {this.convertToPicture(this.state.information.content)}
                    </View>

                </ScrollView>
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

                result.push(<Text style={{lineHeight: 20, color: "#424242", paddingTop: 5, paddingBottom: 5}}>{data[i]}</Text>)
                result.push(<Image style={{width: Constant.WIDTH_SCREEN-20,height: (Constant.WIDTH_SCREEN-20)*0.8, borderWidth: 1, borderColor: "#ecf0f1"}} source={{uri: this.state.information.image[i]}}></Image>)

            }
            result.push(<Text style={{lineHeight: 20, color: "#424242", paddingTop: 5, paddingBottom: 5}}>{data[data.length-1]}</Text>)
        }
        return result;


    }
    playFilm(){
        if(this.state.information.showing.startsWith("Tập") || (this.state.information.showing.contains("Full") && !this.state.information.showing.startsWith("Full HD"))){

            HomePresenter.getChapperFilm(this.state.information.url,this).then(responseData=>{
                if(responseData.length > 0){
                    this.pages = responseData;
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(responseData),
                        watched: true,
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
                    quality: responseData,
                    name: this.props.data.vi,
                });
            }).catch(error=>{
                console.log(error);
            });
        }




    }
    _renderRow(rowData: object, sectionID: number, rowID: number){
        return (
            <ChapperCell data={rowData} onClickCell={this.onClickCell.bind(this, rowData)}/>
        )
    }

    onClickCell(rowData,event) {
        console.log(rowData.link);
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
