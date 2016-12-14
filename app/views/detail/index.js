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
    ActivityIndicator
}from 'react-native';
var styles = require('./index_style');
var Global = require('../../common/global');
var Constant = require('../../common/constants');
var HomePresenter = require('../../presenter/home');
var Header = require('../../component/header/index');
var ChapperCell = require('../cell/chapper/index');

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
            <View style={{height: Global.Constants.HEIGHT_SCREEN}}>
                <View style={{height: 50}}><Header title={this.props.data.vi}/></View>
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
            </View>
        )
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
