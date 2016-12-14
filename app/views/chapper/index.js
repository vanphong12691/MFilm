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
    TouchableOpacity,
    Linking,
    ListView
}from 'react-native';
import Video from 'react-native-video';

var styles = require('./index_style');
var Global = require('../../common/global');
var HomePresenter = require('../../presenter/home');
var Header = require('../../component/header/index');
var ChapperCell = require('../cell/chapper/index');
class PlayVideo extends Component {

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.pages = [];
        this.state = {
            dataSource:ds.cloneWithRows(['']),
        }
    }
    propTypes:{
        data:React.PropTypes.array,
    }

    componentDidMount(){
        HomePresenter.getChapperFilm(this.props.data.url,this).then(responseData=>{
            if(responseData.length > 0){
                this.pages = responseData;
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(responseData)
                })
            }
        }).catch(error=>{
            alert(1);

        });
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: "#7f8c8d"}}>
                <View style={{height:50}}>
                    <Header title="CHỌN TẬP PHIM"/>
                </View>

                <ListView
                    pageSize = {100}
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                />
            </View>
        );
    }
    _renderRow(rowData: object, sectionID: number, rowID: number){
        return (
            <ChapperCell data={rowData} onClickCell={this.onClickCell.bind(this, rowData)}/>
        )
    }

    onClickCell(rowData,event) {
        console.log(rowData.link);
        HomePresenter.getLink(rowData.link,this.props.data.film_id,this).then(responseData=>{
            this.props.navigator.push({
                id:Global.Constants.PLAY_ID,
                data: responseData[0]['link'],
                pages: this.pages,
                current: rowData.page
            });
        });

    }



}

module.exports = PlayVideo;
