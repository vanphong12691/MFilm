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
const { Component } = React;
var TypeCell = require('../cell/type/index');
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
var HomePresenter = require('../../presenter/home');
const styles = StyleSheet.create({
    menu: {
        flex: 1,
        backgroundColor: '#151515',
        paddingLeft: 20,
        paddingTop: 5
    },
    menuScroll: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: '#151515',
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
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
        color: '#0080FF',
        fontWeight: 'bold'
    },
});
class Menu extends Component {
    static propTypes = {
        onItemSelected: React.PropTypes.func,
        isScroll: React.PropTypes.boolean
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
            alert(1);

        });
    }
    render() {
        return (
          <View>
            <ScrollView scrollsToTop={false} style={[styles.menu, !this.props.isScroll && styles.menuScroll]}>
                <Text
                    onPress={() => this._onPress('About')}
                    style={styles.item}>
                    THỂ LOẠI PHIM
                </Text>
                <ListView
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataCat}
                    renderRow={this._renderRow.bind(this)}
                />

                <Text
                    onPress={() => this._onPress('Contacts')}
                    style={styles.item}>
                    QUỐC GIA
                </Text>


                <ListView
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataCity}
                    renderRow={this._renderRow.bind(this)}
                />

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

    }

};

module.exports = Menu;
