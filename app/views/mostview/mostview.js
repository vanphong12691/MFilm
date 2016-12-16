
import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ListView,
    ScrollView,
    Image,
    TouchableHighlight,
    RefreshControl
}from 'react-native';
var Global = require('../../common/global');
var Switch = require('Switch');
var ToolbarAndroid = require('ToolbarAndroid');
import Swiper from 'react-native-swiper';
var MostViewCell = require('../cell/mostview/index');
import Icon from 'react-native-vector-icons/Ionicons';
class MostView extends Component
{
    constructor(props) {
        super(props);
        this.datas = [];
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state=({
            type: 'd',
            data: []
        })
    }

    static propTypes = {
        onItemSelected: React.PropTypes.func,
        data: React.PropTypes.object
    };
    componentDidMount(){
    }


    render(){
        let data;
        if(this.state.data.length==0){
            data = this.props.data.d;
        }else{
            data = this.state.data;
        }
        return (
        <View style={styles.container}>
                <View style={{borderTopColor:'#81D4FA', borderTopWidth:1, backgroundColor: '#E1F5FE', height: 30, flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom: 5}}>
                    <View style={[styles.tabView,this.state.type=='d' && styles.active]}>
                        <TouchableHighlight onPress={this._onPressTab.bind(this, 'd')} underlayColor="transparent" style={{height: 30, alignItems: 'center', justifyContent: 'center'}} >
                            <Text style={styles.textTab}>NGÀY</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.tabView,this.state.type=='w' && styles.active]}>
                        <TouchableHighlight onPress={this._onPressTab.bind(this, 'w')} underlayColor="transparent" style={{height: 30, alignItems: 'center', justifyContent: 'center'}} >
                            <Text style={styles.textTab}>TUẦN</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.tabView,this.state.type=='m' && styles.active]}>
                        <TouchableHighlight onPress={this._onPressTab.bind(this, 'm')} underlayColor="transparent" style={{height: 30, alignItems: 'center', justifyContent: 'center'}} >
                            <Text style={styles.textTab}>THÁNG</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <ListView
                    contentContainerStyle={styles.list}
                    dataSource={this.ds.cloneWithRows(data)}
                    renderRow={this._renderRow.bind(this)}
                />
        </View>

        )
    }
    _onPressTab(type){
        this.setState({
            type: type,
            data: this.props.data[type]
        })
    }
    _renderRow(rowData: object, sectionID: number, rowID: number){
        return (
            <MostViewCell data={rowData} onClickCell={this.onClickCell.bind(this, rowData)}/>
        )
    }
    onClickCell(rowData,event){
       this.props.onItemSelected(rowData);
    }


}

var styles = StyleSheet.create({
    textTab:{
      color: '#0080FF',
       fontSize: 15,
        fontWeight: 'bold'
    },
    tabView:{
      flex:0.3,
      justifyContent: 'center',
        alignItems: 'center',
        height: 30
    },
    active:{
      backgroundColor: '#81D4FA',
      borderBottomColor: '#4FC3F7',
        borderBottomWidth: 5,
        height: 30
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    container: {
        backgroundColor: 'white'
    },
    dot: {
        backgroundColor: 'rgba(255,255,255,.3)',
        width: 13,
        height: 4,
        marginLeft: 7,
        marginRight: 7,
    },
    activeDot: {
        backgroundColor: '#fff',
    },
    slide: {
        flex: 1,
        height: 194,
        justifyContent: 'center',
    },
    thumb: {
        flex: 1,
        height: 194,
        resizeMode: 'stretch',
        justifyContent: 'center',
    }
});
module.exports = MostView;
