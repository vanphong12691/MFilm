
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

var PageCell = require('../cell/page/index');

class Hot extends Component
{
    constructor(props) {
        super(props);
        this.datas = [];
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.page = 1;
        this.totalPage = 1;
    }

    propTypes = {
        onItemSelected: React.PropTypes.func,
        data: React.PropTypes.array
    };

    render(){
        return (

                <ListView
                    contentContainerStyle={styles.list}
                    dataSource={this.ds.cloneWithRows(this.props.data)}
                    renderRow={this._renderRow.bind(this)}
                />
        )
    }

    _renderRow(rowData: object, sectionID: number, rowID: number){
        return (
            <PageCell data={rowData} onClickCell={this.onClickCell.bind(this, rowData)}/>
        )
    }
    onClickCell(rowData,event){
       this.props.onItemSelected(rowData);
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
module.exports = Hot;
