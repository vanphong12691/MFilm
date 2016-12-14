/**
 * Created by PHONG on 12/2/2016.
 */
const React = require('react');
const {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    TouchableHighlight
} = require('react-native');
const { Component } = React;
var TypeCell = require('../cell/type/index');
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
var HomePresenter = require('../../presenter/home');

import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 194,
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
class Slider extends Component {
   static propTypes = {
        onItemSelected: React.PropTypes.func,
        data: React.PropTypes.array
    };

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Swiper
                    removeClippedSubviews={false}
                    autoplayTimeout={10}

                    height={194}
                    autoplay={true}
                    dot={
                        <View style={styles.dot} />
                    }
                    activeDot={
                        <View style={[styles.dot, styles.activeDot]}/>
                    }
                    paginationStyle={{
                        bottom: 20
                    }}
                    loop
                >
                    {this.props.data.map((item, i) => {
                        return (
                            <TouchableHighlight onPress={this._onPressButton.bind(this,item)} key={i} style={styles.slide}>

                                    <Image  style={styles.thumb} source={{uri: item['3']}} />

                            </TouchableHighlight>
                        )
                    })}
                </Swiper>
            </View>
        )
    }
    _onPressButton(item,event){
        let data={
            href: item[2],
            vi: item[1],
            en: item[1],
            picture: item[3]
        }

        this.props.onItemSelected(data);
     }

};

module.exports = Slider;