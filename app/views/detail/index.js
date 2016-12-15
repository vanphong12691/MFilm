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
            alert(1);

        });
    }

    render() {
        return (
            <View style={{backgroundColor: 'white'}}>
                <View style={{height:40, flexDirection:"row"}}>
                    <View style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                        <TouchableHighlight underlayColor="transparent"  onPress={this.onBack.bind(this)}>
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
                            <Text style={{fontSize: 14, lineHeight: 20, color: '#424242'}} numberOfLines={1} ellipsizeMode={'tail'}>Đang phát: {this.state.information.showing}</Text>
                            <Text style={{fontSize: 14, lineHeight: 20,color: '#424242'}} numberOfLines={1} ellipsizeMode={'tail'}>Sắp chiếu: {this.state.information.preShow}</Text>
                            <Text style={{fontSize: 14, lineHeight: 20,color: '#424242'}} numberOfLines={5} ellipsizeMode={'tail'}>Diễn viên: {this.convertArray(this.state.information.actor)}</Text>
                            <Text style={{fontSize: 14, lineHeight: 20,color: '#424242'}} numberOfLines={2} ellipsizeMode={'tail'}>Quốc gia: {this.convertArray(this.state.information.country)}</Text>
                            <Text style={{fontSize: 14, lineHeight: 20,color: '#424242'}} numberOfLines={1} ellipsizeMode={'tail'}>Thời lượng: {this.state.information.duration}</Text>
                            <Text style={{fontSize: 14, lineHeight: 20,color: '#424242'}} numberOfLines={1} ellipsizeMode={'tail'}>Lượt xem: {this.state.information.view}</Text>
                            <Text style={{fontSize: 14, lineHeight: 20,color: '#424242'}} numberOfLines={1} ellipsizeMode={'tail'}>Năm SX: {this.state.information.year}</Text>
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
                    <View style={{backgroundColor :'green', alignItems: 'center'}}>
                        {!this.state.watched && <TouchableWithoutFeedback onPress={!this.state.loading&&this.playFilm.bind(this)} style={{width: 50, height: 100}}>
                            <View>
                                <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold', padding:10}}>{"XEM PHIM"}</Text>
                            </View>

                        </TouchableWithoutFeedback>}
                        {this.state.watched && <Text style={{padding:10, color:'white'}}>{'CHỌN TẬP ĐỂ XEM'}</Text>}
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
            /*<View style={{height: Global.Constants.HEIGHT_SCREEN}}>
                <View style={{height:40, flexDirection:"row"}}>
                    <View style={{backgroundColor: "#34495e",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                        <TouchableHighlight underlayColor="transparent"  onPress={this.onBack.bind(this)}>
                            <Icon  name="ios-arrow-back" size={25} color="#fff" />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1}}><Header title={this.props.data.vi}/></View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: 0.7, justifyContent: 'center',alignItems: 'center',}}>
                        <Image style={{width: Constant.WIDTH_SCREEN-50, height: Constant.WIDTH_SCREEN-50, borderWidth: 1, borderColor: "#ecf0f1", borderRadius: Constant.WIDTH_SCREEN/2-25}} source={{uri: this.props.data.picture}}></Image>
                    </View>
                    {!this.state.watched && <View style={{flex: 0.20, padding: 1}}>

                        <View style={{flex: 0.25, paddingLeft: 20, justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, color: 'white'}}>{this.props.data.en}</Text>
                        </View>

                        <View style={{flex: 0.25, paddingLeft: 20, justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, color: 'white'}}>{"Đang phát: "}{this.state.information.showing}</Text>
                        </View>
                        <View style={{flex: 0.25, paddingLeft: 20, justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, color: 'white'}}>{"Sắp chiếu: "}{this.state.information.preShow}</Text>
                        </View>


                    </View>
                    }
                    {this.state.watched && <View style={{flex: 0.20, padding: 1}}>
                        <ListView
                            pageSize = {100}
                            contentContainerStyle={styles.list}
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow.bind(this)}
                        />

                        </View>
                    }
                    <View style={{flex: 0.1,  justifyContent: 'center',alignItems: 'center'}}>
                        {!this.state.watched && <TouchableWithoutFeedback onPress={!this.state.loading&&this.playFilm.bind(this)} style={{width: 50, height: 100}}>
                            <View>
                                <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', backgroundColor:"#e74c3c", paddingLeft: 10, paddingRight: 10, paddingBottom: 2}}>{"XEM PHIM"}</Text>
                            </View>

                        </TouchableWithoutFeedback>}
                        {this.state.watched && <Text>{'Chọn tập để xem'}</Text>}
                    </View>
                </View>
                {this.state.loading&&<View style={styles.centering}>
                   <ActivityIndicator
                        animating = {true}
                        size="large"
                    />
                </View>}
            </View>*/
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
            result.push(<Text>{data[data.length-1]}</Text>)
        }
        return result;


    }
    playFilm(){
        if(this.state.information.showing.startsWith("Tập") || (this.state.information.showing.startsWith("Full") && !this.state.information.showing.startsWith("Full HD"))){

            HomePresenter.getChapperFilm(this.state.information.url,this).then(responseData=>{
                if(responseData.length > 0){
                    this.pages = responseData;
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(responseData),
                        watched: true,
                    })
                }
            }).catch(error=>{
                alert(1);

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
                    data: responseData[0]['link']
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
                pages: this.pages,
                current: rowData.page
            });
        });

    }

}

module.exports = HomeCell;
