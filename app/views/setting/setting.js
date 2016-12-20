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
    AsyncStorage
}from 'react-native';
var styles = require('./setting_style');
var Global = require('../../common/global');
var Header = require('../../component/header/index');
import Slider from 'react-native-slider';
import Icon from 'react-native-vector-icons/Ionicons';
class Setting extends Component {

    constructor(props){
        super(props);
        this.state=({
            currentTime:0,
            setting : {
                "phim_bo" : {
                    "begin": 0,
                    "end": 0
                }
            },
        });
    }
    componentDidMount(){
        var setting;
         AsyncStorage.getItem(Global.Constants.SETTING_STORE_KEY)
         .then(value=>{
             if(!value){
                 setting = {
                     "phim_bo" : {
                         "begin": 0,
                         "end": 0
                     }
                 }
             }else{
                 setting = JSON.parse(value);

             }
            this.setState({
                setting:setting
            })
         });

    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: "white"}}>
                <View style={{height:40, flexDirection:"row"}}>
                    <View style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                        <TouchableHighlight underlayColor="transparent"  onPress={this.onBackHome.bind(this)} style={{backgroundColor: "#0288D1",width: 40, height: 40, justifyContent: 'center',alignItems:'center'}}>
                            <Icon  name="ios-arrow-back" size={25} color="#fff" />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1}}><Header title={"CÀI ĐẶT"}/></View>
                </View>
                <View style={{padding: 10}}>
                    <Text style={{color:'#000000', fontWeight:'bold', fontSize:15}}>{"Phim bộ"}</Text>

                    <View style={{flexDirection:'row', alignItems:'center', paddingLeft: 20}}>
                        <View style={{width: 75, flexDirection:'row',alignItems:'center'}}>
                            <Icon style={ {marginRight: 3} } name="ios-timer" size={15} color="#151515" />
                            <Text style={{color:'#151515'}}>Bắt đầu</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Slider
                                onSlidingStart={ this.onSlidingStart.bind(this,'begin') }
                                onSlidingComplete={this.onSlidingComplete.bind(this) }
                                onValueChange={this.onSlidingChange.bind(this) }
                                minimumTrackTintColor='#851c44'
                                style={ styles.slider }
                                trackStyle={ styles.sliderTrack }
                                thumbStyle={ styles.sliderThumb }
                                value={this.state.setting['phim_bo']['begin']/600}/>

                        </View>
                        <View style={{width: 60, alignItems:'center'}}>
                            <Text style={{color:'#151515'}}>{this.formattedTime(this.state.setting['phim_bo']['begin'])}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', paddingLeft: 20}}>
                        <View style={{width: 75, flexDirection:'row',alignItems:'center'}}>
                            <Icon style={ {marginRight: 3} } name="ios-timer" size={15} color="#151515" />
                            <Text style={{color:'#151515'}}>Kết thúc</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Slider
                                onSlidingStart={ this.onSlidingStart.bind(this,'end') }
                                onSlidingComplete={this.onSlidingComplete.bind(this) }
                                onValueChange={this.onSlidingChange.bind(this) }
                                minimumTrackTintColor='#851c44'
                                style={ styles.slider }
                                trackStyle={ styles.sliderTrack }
                                thumbStyle={ styles.sliderThumb }
                                value={this.state.setting['phim_bo']['end']/600}/>

                        </View>
                        <View style={{width: 60, alignItems:'center'}}>
                            <Text style={{color:'#151515'}}>{this.formattedTime(this.state.setting['phim_bo']['end'])}</Text>
                        </View>
                    </View>
                </View>

             </View>
        )
    }
    onSlidingStart(type,event){
        console.log(this.state.setting);
        this.setState({
            type: type
        })
    }
    onSlidingComplete(){

        setting = this.state.setting;
        AsyncStorage.setItem(Global.Constants.SETTING_STORE_KEY, JSON.stringify(setting))
            .then(() => {})
            .done();
    }
    onSlidingChange(value){
        let setting = this.state.setting;
        let type = this.state.type;
        setting['phim_bo'][type] = value*600
        this.setState({
            setting:setting
        })

    }
    onBackHome(){
        this.props.navigator.pop();
    }

    withLeadingZero(amount){
    if (amount < 10 ){
        return `0${ amount }`;
    } else {
        return `${ amount }`;
    }
}

    formattedTime( timeInSeconds ){
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds - minutes * 60;

    if( isNaN(minutes) || isNaN(seconds) ){
        return "";
    } else {
        return(`${ this.withLeadingZero( minutes ) }:${ this.withLeadingZero( seconds.toFixed(0) ) }`);
    }
}
}

module.exports = Setting;
