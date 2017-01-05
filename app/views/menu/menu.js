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
    ListView
} = require('react-native');
import Icon from 'react-native-vector-icons/Ionicons';
const { Component } = React;
var TypeCell = require('../cell/type/index');
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
var HomePresenter = require('../../presenter/home');
const styles = StyleSheet.create({
    menuScroll: {
        width: window.width,
        height: window.height,
        backgroundColor: '#263238',
        paddingLeft: 20,
        paddingTop: 5
    },
    avatarContainer: {
        marginBottom: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 18,
        paddingTop: 7,
        paddingBottom: 7,
        color: '#81D4FA',
        justifyContent:'center',
    },
    item_parent: {
        fontSize: 18,
        paddingTop: 4,
        paddingBottom: 4,
        color: '#29B6F6',
        justifyContent:'center',
    },
    line:{
        marginRight:20,
        borderBottomWidth: 1,
        borderBottomColor: '#546E7A',
    }
});
class Menu extends Component {
    static propTypes = {
        onItemSelected: React.PropTypes.func,
        onMenuSelected: React.PropTypes.func,
        isScroll: React.PropTypes.bool
    };

    constructor(props){
        super(props);
        this.data = [];
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataCat:ds.cloneWithRows(['']),
            dataCity:ds.cloneWithRows(['']),
        }
    }

    componentDidMount(){
        HomePresenter.getCategory(this).then(responseData=>{
            this.data = responseData;
            if(responseData){
                this.setState({
                    dataCat:this.state.dataCat.cloneWithRows(responseData['cat_id']),
                    dataCity:this.state.dataCity.cloneWithRows(responseData['city_id'])
                })
            }
        }).catch(error=>{
            alert("Không thể kết nối đến máy chủ, vui lòng thử lại sau!");

        });
    }
    render() {
        return (
          <View>
            <ScrollView scrollsToTop={false} style={styles.menuScroll}>
                <Text
                    style={styles.item_parent}>
                    <Icon  name="logo-tux" size={20} color="#29B6F6" /> PHIM HD
                </Text>

                <View style={{marginLeft: 20}}>
                    <View style={styles.line}></View>
                    <Text
                        onPress={() => this._onPress('home')}
                        style={styles.item}>
                        <Icon  name="ios-home-outline" size={20} color="#81D4FA" /> Trang chủ
                    </Text>
                    <View style={styles.line}></View>
                    <Text
                        onPress={() => this._onPress('search')}
                        style={styles.item}>
                        <Icon  name="ios-search-outline" size={20} color="#81D4FA" /> Tìm kiếm
                    </Text>
                    <View style={styles.line}></View>
                    <Text
                        onPress={() => this._onPress('seen')}
                        style={styles.item}>
                        <Icon  name="ios-eye-outline" size={20} color="#81D4FA" /> Đã xem
                    </Text>
                    <View style={styles.line}></View>
                    <Text
                        onPress={() => this._onPress('like')}
                        style={styles.item}>
                        <Icon  name="ios-heart-outline" size={18} color="#81D4FA" /> Yêu thích
                    </Text>
                    <View style={styles.line}></View>
                    <Text
                        onPress={() => this._onPress('setting')}
                        style={styles.item}>
                        <Icon  name="ios-settings-outline" size={18} color="#81D4FA" /> Cài đặt
                    </Text>
                </View>
                <View style={styles.line}></View>
                <Text
                    style={styles.item_parent}>
                    <Icon  name="ios-list-box-outline" size={20} color="#29B6F6" /> DANH MỤC
                </Text>
                <View style={{marginLeft: 20}}>
                    <View style={styles.line}></View>
                    <Text
                        onPress={() => this._onPress('movie')}
                        style={styles.item}>
                        <Icon  name="ios-film-outline" size={20} color="#29B6F6" /> Phim lẻ

                    </Text>
                    <View style={styles.line}></View>
                    <Text
                        onPress={() => this._onPress('movies')}
                        style={styles.item}>
                        <Icon  name="logo-buffer" size={20} color="#29B6F6" /> Phim bộ
                    </Text>

                    <View style={styles.line}></View>
                    <Text
                        onPress={() => this._onPress('cinema')}
                        style={styles.item}><Icon  name="ios-easel-outline" size={20} color="#29B6F6" /> Phim chiếu rạp
                    </Text>
                    <View style={styles.line}></View>
                    <Text
                        onPress={() => this._onPress('cartoon')}
                        style={styles.item}>
                        <Icon  name="ios-happy-outline" size={20} color="#29B6F6" /> Phim hoạt hình
                    </Text>
                </View>
                <View style={styles.line}></View>
                <Text
                    onPress={() => this._onPress('the_loai')}
                    style={styles.item_parent}>

                    <Icon  name="md-list" size={20} color="#29B6F6" /> THỂ LOẠI
                </Text>
                {this.state.the_loai&&<ListView
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataCat}
                    renderRow={this._renderRow.bind(this)}
                />}
                <View style={styles.line}></View>
                <Text
                    onPress={() => this._onPress('quoc_gia')}
                    style={styles.item_parent}>
                    <Icon  name="md-globe" size={20} color="#29B6F6" /> QUỐC GIA
                </Text>


                {this.state.quoc_gia&&<ListView
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataCity}
                    renderRow={this._renderRow.bind(this)}
                />}
                <View style={styles.line}></View>


            </ScrollView>
            </View>




        );
    }

    _renderRow(rowData: object, sectionID: number, rowID: number){
        return (
            <TypeCell data={rowData} onClickCell={ this._onPressItem.bind(this,rowData)}/>
        )
    }
    _onPressItem(rowData,event){
       this.props.onItemSelected(rowData);
    }
    _onPress(name){
        if(name=='the_loai'){
            this.setState({
                the_loai: !this.state.the_loai,
                quoc_gia:false,
            })

        }else if(name=='quoc_gia'){
            this.setState({
                the_loai: false,
                quoc_gia: !this.state.quoc_gia
            })
        }else{
            this.setState({
                the_loai: false,
                quoc_gia: false
            })
            this.props.onMenuSelected(name);
        }

    }

};

module.exports = Menu;
