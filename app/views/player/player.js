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
    ActivityIndicator

} from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from 'react-native-slider';
import Video from 'react-native-video';
var Orientation = require('react-native-orientation');
import KeepAwake from 'react-native-keep-awake';
var HomePresenter = require('../../presenter/home');
const window = Dimensions.get('window');

class Player extends Component {
  constructor(props){
    Orientation.unlockAllOrientations();
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
      loading: true
    };
  }

  _updateOrientation(or) {
    let resizeMode = "";
    let widthSlider = 0;
    if(or == "LANDSCAPE"){
        resizeMode = "cover";
        widthSlider = window.height-60
    }else{
        resizeMode = "contain";
        widthSlider = window.width - 40
    }
      this.setState({
        resizeMode: resizeMode,
        widthSlider: widthSlider
      })
  }

  propTypes:{
    data:React.PropTypes.string,
    current:React.PropTypes.string,
    pages:React.PropTypes.array,
    max:React.PropTypes.string,
    film_id: React.PropTypes.string,
    name: React.PropTypes.string
  }

  componentWillUnmount(){
    Orientation.removeOrientationListener(this._updateOrientation);
    KeepAwake.deactivate();
    Orientation.lockToPortrait();
  }
  togglePlay(){
    this.setState({ playing: !this.state.playing });
  }

  toggleVolume(){
    this.setState({ muted: !this.state.muted });
  }

  toggleShuffle(){
    this.setState({ shuffle: !this.state.shuffle });
  }

  goBackward(){
    let current = this.state.current;
    this.setState({
      loading: true
    })
    if(current> 1){
      HomePresenter.getLink(this.props.pages[current-2].link,this.props.film_id,this).then(responseData=>{
        this.setState({
          url: responseData[0]['link'],
          current: current-1,
          currentTime: 0,
          next: true,
          back: current-1 > 1
        });
      });
    }
  }

  goForward(){
    this.setState({
      loading: true
    })
    let current = this.state.current;
    if(current< this.props.max){
      HomePresenter.getLink(this.props.pages[current].link,this.props.film_id,this).then(responseData=>{
        this.setState({
          url: responseData[0]['link'],
          current: current+1,
          currentTime: 0,
          back: true,
          next: current > this.props.max
        });
      });
    }
  }


  setTime(params){
    if( !this.state.sliding ){
      this.setState({ currentTime: params.currentTime });
    }
  }

  onLoad(params){
    this.setState({
      songDuration: params.duration,
      loading: false
    });
  }

  onSlidingStart(){
    this.setState({ sliding: true });
  }

  onSlidingChange(value){
    let newPosition = value * this.state.songDuration;
    this.setState({ currentTime: newPosition });
  }

  onSlidingComplete(){
    this.refs.video.seek( this.state.currentTime );
    this.setState({ sliding: false });
  }

  onEnd(){
    this.goForward();
  }
  _onClickVideo(){
    this.setState({
      showingController: !this.state.showingController
    })
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
          { this.state.showingController &&<View style={{ bottom:0, left: 0, right: 0, alignItems:"center", position: 'absolute'}}>
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
          <View style={ styles.controls }>
            { shuffleButton }
            { backwardButton }
            { playButton }
            { forwardButton }
            { volumeButton }
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
    marginLeft: 45,
  },
  play: {
    marginLeft: 50,
    marginRight: 50,
  },
  forward: {
    marginRight: 45,
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
