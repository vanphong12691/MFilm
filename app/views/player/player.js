'use strict';
import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
    AsyncStorage

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
var Global = require('../../common/global');
import Slider from 'react-native-slider';
import Video from 'react-native-video';
var Orientation = require('react-native-orientation');
import KeepAwake from 'react-native-keep-awake';
var HomePresenter = require('../../presenter/home');
const window = Dimensions.get('window');
var hiddenController;
class Player extends Component {
  constructor(props){
    super(props);
    this._updateOrientation = this._updateOrientation.bind(this);
    Orientation.addOrientationListener(this._updateOrientation);
    KeepAwake.activate()
    this.state = {
      url:'',
      playing: true,
      muted: false,
      shuffle: false,
      next: this.props.current<this.props.max,
      back: this.props.current > "1",
      sliding: false,
      currentTime: 0,
      songIndex: props.songIndex,
      resizeMode: "contain",
      widthSlider: window.width - 40,
      showingController: true,
      current: this.props.current,
      loading: true,
      vertical: true,
      changQuality: false,
      type: this.props.type,
      setting:{
        "phim_bo" : {
          "begin": 0,
          "end": 0
        }
      }
    };

    AsyncStorage.getItem(Global.Constants.SETTING_STORE_KEY)
        .then(value=>{
          if(value){
            this.setState({
              setting: JSON.parse(value)
            })
          }
        });
  }

  _updateOrientation(or) {

    var delay=1000;
    var _this=this;
    setTimeout(function() {
      if(or == "LANDSCAPE"){
        _this.setState({
          resizeMode: "cover",
          vertical: false,
          widthSlider: window.height -40
        })
      }else{
        _this.setState({
          resizeMode: "contain",
          vertical: true,
          widthSlider: window.width -40
        })
      }
    }, delay);


  }

  propTypes:{
    data:React.PropTypes.string,
    current:React.PropTypes.string,
    pages:React.PropTypes.array,
    quality:React.PropTypes.array,
    max:React.PropTypes.string,
    film_id: React.PropTypes.string,
    name: React.PropTypes.string,
    type: React.PropTypes.string,
    typeFilm: React.PropTypes.string,
  }

  componentWillUnmount(){
    Orientation.removeOrientationListener(this._updateOrientation);
    KeepAwake.deactivate();
    Orientation.lockToPortrait();
  }
  togglePlay(){
    clearTimeout(hiddenController);
    this.setState({ playing: !this.state.playing });
    var _this = this;
    hiddenController = setTimeout(function(){
      _this.setState({
        showingController: false
      })
    }, 5000);

  }

  toggleVolume(){
    this.setState({ muted: !this.state.muted });
  }

  toggleShuffle(){
    this.setState({ shuffle: !this.state.shuffle });
  }

  goBackward(){
    clearTimeout(hiddenController);
    let current = this.state.current;
    this.setState({
      loading: true
    })
    if(current> 1){
      HomePresenter.getLink(this.props.pages[current-2].link,this.props.film_id,this).then(responseData=>{
        this.setState({
          url: this.getUrlByType(responseData),
          current: current-1,
          quality: responseData,
          currentTime: 0,
          next: true,
          back: parseInt(current)-1 > 1
        });
      });
    }
  }

  goForward(){
    clearTimeout(hiddenController);
    this.setState({
      loading: true
    })
    let current = this.state.current;
    if(current< this.props.max){
      HomePresenter.getLink(this.props.pages[current].link,this.props.film_id,this).then(responseData=>{
        this.setState({
          url: this.getUrlByType(responseData),
          current: current+1,
          quality: responseData,
          currentTime: 0,
          back: true,
          next: current+1 < this.props.max
        });
      });
    }
  }
  getUrlByType(data, type){
    if(data){
      for(let i=0; i<data.length; i++){
        if(data[i]['type']==type){
          return data[i]['link'];
        }
      }
      return data[0]['link'];
    }
    return  '';

  }


  setTime(params){
    if( !this.state.sliding ){
      this.setState({ currentTime: params.currentTime });
    }
  }

  onLoad(params){
    clearTimeout(hiddenController);

    let change = this.state.changQuality;
    if(change){
       this.refs.video.seek( this.state.currentTimeTemp );
    }else{
      if(this.state.setting['phim_bo']['begin'] && this.props.typeFilm == 'phim_bo'){
        this.refs.video.seek(this.state.setting['phim_bo']['begin']);
      }
    }
    this.setState({
      songDuration: params.duration,
      loading: false,
      changQuality: false,
    });

    var _this = this;
    hiddenController = setTimeout(function(){
      _this.setState({
        showingController: false
      })
    }, 8000);

  }

  onSlidingStart(){
    clearTimeout(hiddenController);
    this.setState({ sliding: true });
  }

  onSlidingChange(value){
    let newPosition = value * this.state.songDuration;
    this.setState({ currentTime: newPosition });
  }

  onSlidingComplete(){
    this.refs.video.seek( this.state.currentTime );
    this.setState({ sliding: false });
    var _this = this;
    hiddenController = setTimeout(function(){
      _this.setState({
        showingController: false
      })
    }, 5000);
  }

  onEnd(){
    this.setState({
      changQuality: false,
    })
    this.goForward();
  }
  _onClickVideo(){
    clearTimeout(hiddenController);
    this.setState({
      showingController: !this.state.showingController
    })
    var _this = this;
    hiddenController = setTimeout(function(){
      _this.setState({
        showingController: false,
        changQuality: false,
      })
    }, 5000);
  }

  render() {
    let songPercentage;
    if( this.state.songDuration !== undefined ){
      songPercentage = this.state.currentTime / this.state.songDuration;
    } else {
      songPercentage = 0;
    }

    let playButton;
    if( this.state.playing ){
      playButton = <Icon onPress={ this.togglePlay.bind(this) } style={ styles.play } name="ios-pause" size={70} color="#fff" />;
    } else {
      playButton = <Icon onPress={ this.togglePlay.bind(this) } style={ styles.play } name="ios-play" size={70} color="#fff" />;
    }

    let forwardButton;
    if( !this.state.next){
      forwardButton = <Icon style={ styles.forward } name="ios-skip-forward" size={25} color="#333" />;
    } else {
      forwardButton = <Icon onPress={ this.goForward.bind(this) } style={ styles.forward } name="ios-skip-forward" size={25} color="#fff" />;
    }

    let forwardButtonV;
    if( !this.state.next){
      forwardButtonV = <Icon style={ styles.forward } name="ios-skip-forward" size={50} color="transparent" />;
    } else {
      forwardButtonV = <Icon onPress={ this.goForward.bind(this) } style={ styles.forward } name="ios-skip-forward" size={50} color="#fff" />;
    }

    let backwardButtonV;
    if( !this.state.back){
      backwardButtonV = <Icon style={ styles.back } name="ios-skip-backward" size={50} color="transparent" />
    } else {
      backwardButtonV = <Icon onPress={ this.goBackward.bind(this) } style={ styles.back } name="ios-skip-backward" size={50} color="#fff" />;
    }

    let playButtonV;
    if( this.state.playing ){
      playButtonV = <Icon onPress={ this.togglePlay.bind(this) } style={ styles.play } name="ios-pause" size={50} color="#fff" />;
    } else {
      playButtonV = <Icon onPress={ this.togglePlay.bind(this) } style={ styles.play } name="ios-play" size={50} color="#fff" />;
    }


    let backwardButton;
    if( !this.state.back){
      backwardButton = <Icon style={ styles.back } name="ios-skip-backward" size={25} color="#333" />
    } else {
      backwardButton = <Icon onPress={ this.goBackward.bind(this) } style={ styles.back } name="ios-skip-backward" size={25} color="#fff" />;
    }

    let volumeButton;
    if( this.state.muted ){
      volumeButton = <Icon onPress={ this.toggleVolume.bind(this) } style={ styles.volume } name="md-volume-off" size={18} color="#fff" />;
    } else {
      volumeButton = <Icon onPress={ this.toggleVolume.bind(this) } style={ styles.volume } name="md-volume-up" size={18} color="#fff" />;
    }

    let shuffleButton;
    if( this.state.shuffle ){
      shuffleButton = <Icon onPress={ this.toggleShuffle.bind(this) } style={ styles.shuffle } name="ios-shuffle" size={18} color="#f62976" />;
    } else {
      shuffleButton = <Icon onPress={ this.toggleShuffle.bind(this) } style={ styles.shuffle } name="ios-shuffle" size={18} color="#fff" />;
    }

    let url;
    if(this.state.url){
      url = this.state.url;
    }else{
      url = this.props.data;
    }
    let title = this.props.name;
    if(this.props.max){
      title += ' Tập ('+this.state.current+'/'+ this.props.max+')';
    }

    let quality;
    if(this.state.quality){
      quality = this.state.quality;
    }else{
      quality = this.props.quality;
    }



    return (
        <View style={styles.container}>
          <TouchableWithoutFeedback style={styles.fullScreen} onPress={this._onClickVideo.bind(this)}>
          <Video source={{uri: url}}
                 ref="video"
                  style={styles.fullScreen}
                 volume={ this.state.muted ? 0 : 1.0}
                 muted={false}
                 paused={!this.state.playing}
                 onLoad={ this.onLoad.bind(this) }
                 onProgress={ this.setTime.bind(this) }
                 onEnd={ this.onEnd.bind(this) }
                 resizeMode={this.state.resizeMode}
                 repeat={false}/>
          </TouchableWithoutFeedback>
          {this.state.showingController &&<View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}>
            <Text style={{fontSize: 20, color: 'white', padding: 10}} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text>

          </View>}

          { this.state.showingController && !this.state.vertical &&<View style={{ top:0, bottom:0, left: 0, right: 0, alignItems:"center", position: 'absolute'}}>

            <View style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 0,
            }}>

              { backwardButtonV }
              { playButton }
              { forwardButtonV }

            </View>
            <View style={ {width: this.state.widthSlider-100} }>


              <View style={ [styles.timeInfo,{alignItems:'center'}] }>
                <Text style={{width: 30,color: '#FFF', fontSize: 10}}>{ formattedTime(this.state.currentTime)  }</Text>
                <Slider
                    onSlidingStart={ this.onSlidingStart.bind(this) }
                    onSlidingComplete={ this.onSlidingComplete.bind(this) }
                    onValueChange={ this.onSlidingChange.bind(this) }
                    minimumTrackTintColor='#851c44'
                    style={ {flex: 1, marginTop: 2} }
                    trackStyle={ styles.sliderTrack }
                    thumbStyle={ styles.sliderThumb }
                    value={ songPercentage }/>
                <Text style={ {width: 33,color: '#FFF', fontSize: 10, paddingLeft: 3} }>- { formattedTime( this.state.songDuration - this.state.currentTime ) }</Text>
              </View>

            </View>

            <View style={{
              position: 'absolute',
              bottom: 10,
              right: 40,
            }}>
              <Icon style={ {marginLeft: 0} } onPress={this._onPressExpandQuality.bind(this)} name="ios-settings" size={25} color="#fff" />

            </View>

            {this.state.type >= "720p" && <View style={{
              position: 'absolute',
              bottom: 25,
              right: 35,
              backgroundColor:'red',
              paddingLeft: 2,
              paddingRight: 2,
              height: 12,
              alignItems: 'center',
            }}>
              <Text onPress={this._onPressExpandQuality.bind(this)} style={{fontSize: 8, fontWeight:'bold'}}>HD</Text>

            </View>}

            {this.state.changQuality&&<View style={{
              position: 'absolute',
              bottom: 25,
              right: 47,
              backgroundColor: '#263238',
              padding: 5,
              width: 50,
              alignItems: 'center',
            }}>{quality.map((item, i) => {
              if(item['type'] == this.state.type){
                return (<Text style={{color:'#D50000', fontWeight:'bold', lineHeight: 22}}>{item['type']}</Text>);
              }else{
                return (
                    <Text style={{color:'white',lineHeight: 22}} onPress={this._onPressQuality.bind(this, item)}>{item['type']}</Text>
                )
              }
            })}

            </View>}




            <View style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
            }}>
              <Icon style={ {marginLeft: 0} } onPress={this._onPressCollapse.bind(this)} name="md-contract" size={25} color="#fff" />

            </View>
          </View>}

          { this.state.showingController && this.state.vertical &&<View style={{ bottom:0, left: 0, right: 0, alignItems:"center", position: 'absolute'}}>
          <View style={ {width: this.state.widthSlider} }>
            <Slider
                onSlidingStart={ this.onSlidingStart.bind(this) }
                onSlidingComplete={ this.onSlidingComplete.bind(this) }
                onValueChange={ this.onSlidingChange.bind(this) }
                minimumTrackTintColor='#851c44'
                style={ styles.slider }
                trackStyle={ styles.sliderTrack }
                thumbStyle={ styles.sliderThumb }
                value={ songPercentage }/>

            <View style={ styles.timeInfo }>
              <Text style={ styles.time }>{ formattedTime(this.state.currentTime)  }</Text>
              <Text style={ styles.timeRight }>- { formattedTime( this.state.songDuration - this.state.currentTime ) }</Text>
            </View>
          </View>
            <View style={{
              position: 'absolute',
              left: 20,
              bottom: 10,
              right: 0,
            }}>
              <Icon style={ {marginLeft: 0} } onPress={this._onPressBack.bind(this)} name="ios-arrow-back" size={30} color="#fff" />

            </View>
            <View style={{
              position: 'absolute',
              bottom: 15,
              right: 50,
            }}>
              <Icon style={ {marginLeft: 0} } onPress={this._onPressExpandQuality.bind(this)} name="ios-settings" size={25} color="#fff" />

            </View>

            {(this.state.type == "720p" || this.state.type=="1080p") && <View style={{
              position: 'absolute',
              bottom: 28,
              right: 42,
              backgroundColor:'red',
              paddingLeft: 2,
              paddingRight: 2,
              height: 12,
              alignItems: 'center',
            }}>
              <Text onPress={this._onPressExpandQuality.bind(this)} style={{fontSize: 8, fontWeight:'bold'}}>HD</Text>

            </View>}

            {this.state.changQuality&&<View style={{
            position: 'absolute',
            bottom: 25,
            right: 55,
            backgroundColor: '#263238',
            padding: 5,
            width: 50,
            alignItems: 'center',
          }}>{quality.map((item, i) => {
            if(item['type'] == this.state.type){
              return (<Text style={{color:'#D50000', fontWeight:'bold', lineHeight: 22}}>{item['type']}</Text>);
            }else{
              return (
                  <Text style={{color:'white',lineHeight: 22}} onPress={this._onPressQuality.bind(this, item)}>{item['type']}</Text>
              )
            }
          })}

          </View>}




            <View style={{
              position: 'absolute',
              bottom: 15,
              right: 20,
            }}>
              <Icon style={ {marginLeft: 0} } onPress={this._onPressExpand.bind(this)} name="md-expand" size={25} color="#fff" />

            </View>
          <View style={ styles.controls }>
            { backwardButton }
            { playButton }
            { forwardButton }
          </View>
          </View>}
          {this.state.loading&&<View style={styles.centering}>
            <ActivityIndicator
                animating = {true}
                size="large"
            />
          </View>}
        </View>
    );
  }

  _onPressQuality(item,event){
    this.setState({
        loading: true,
        currentTimeTemp: this.state.currentTime,
        type: item['type'],
        url: item['link']
    })
  }

  _onPressExpandQuality(){
    clearTimeout(hiddenController);
    this.setState({
      changQuality: true,
    })
  }

  _onPressBack(){
    clearTimeout(hiddenController);
    this.props.navigator.pop();
  }
  _onPressExpand(){
    clearTimeout(hiddenController);
    Orientation.lockToLandscape();
    var _this = this;
    hiddenController = setTimeout(function(){
      _this.setState({
        showingController: false
      })
    }, 5000);
  }
  _onPressCollapse(){
    clearTimeout(hiddenController);
    Orientation.lockToPortrait();
    var _this = this;
    hiddenController = setTimeout(function(){
      _this.setState({
        showingController: false
      })
    }, 5000);
  }
}

const styles = StyleSheet.create({
  centering:{
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    flex: 1,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    marginTop: 17,
    marginBottom: 17,
    width: window.width,
  },
  headerClose: {
    position: 'absolute',
    top: 10,
    left: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },

  controls: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 0,
  },
  back: {
    marginLeft: 40,
  },
  play: {
    marginLeft: 40,
    marginRight: 40,
  },
  forward: {
    marginRight: 40,
  },
  shuffle: {
    marginTop: 0,
  },
  volume: {

  },
  timeInfo: {
    flexDirection: 'row',
  },
  time: {
    color: '#FFF',
    flex: 1,
    fontSize: 10,
  },
  timeRight: {
    color: '#FFF',
    textAlign: 'right',
    flex: 1,
    fontSize: 10,
  },
  slider: {
    height: 20,
  },
  sliderTrack: {
    height: 2,
    backgroundColor: '#333',
    opacity: 0.5
  },
  sliderThumb: {
    width: 10,
    height: 10,
    backgroundColor: '#f62976',
    borderRadius: 10 / 2,
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1,
  }
});

//TODO: Move this to a Utils file
function withLeadingZero(amount){
  if (amount < 10 ){
    return `0${ amount }`;
  } else {
    return `${ amount }`;
  }
}

function formattedTime( timeInSeconds ){
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds - minutes * 60;

  if( isNaN(minutes) || isNaN(seconds) ){
    return "";
  } else {
    return(`${ withLeadingZero( minutes ) }:${ withLeadingZero( seconds.toFixed(0) ) }`);
  }
}


module.exports = Player;
