import * as React from 'react';
import { StyleSheet, TouchableHighlight, Image, View, Button, Text, FlatList, SafeAreaView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import 'react-native-gesture-handler'
import { Badge } from 'react-native-elements';
import BarIcon from '../../../components/BarIcon'
const pic1 = require('../../img/transmission.jpg')
const pic2 = require('../../img/JackMa.jpg')
const pic3 = require('../../img/handsomeboy.jpg')
export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '设置',
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            contactList: [
                {
                    id: '1',
                    name: '文件传输助手',
                    avatar: pic1,
                    message: '传了个啥文件给我',
                    time: '下午1:57',
                    unReadMsg: null,
                },
                {
                    id: '2',
                    name: '易烊千玺',
                    avatar: pic3,
                    message: '我来接你下班啦',
                    time: '昨天',
                    unReadMsg: 1,
                }
            ]
        }
    }

    componentDidMount() {
        console.log(this.props.navigation, 'HomeScreen');
    }

    getMsgDetail = (item) => {
        let {contactList} = this.state
        contactList.forEach(listItem=>{
            if(listItem.id==item.id){
                listItem.unReadMsg=null
            }
        })
        this.setState({
            contactList
        })
        console.log('getMsgDetail',item);
        this.props.navigation.navigate('detail', { item: item })
    }
    renderItem = (iteminfo) => {

        let item = iteminfo.item
        return (
            item ? <TouchableHighlight
                underlayColor='#ccc'
                style={styles.button}
                onPress={() => { this.getMsgDetail(item) }}>
                <View style={styles.listItem}>
                    <View style={{ ...styles.avatarContent, marginTop: item.unReadMsg ? 15 : 0 }}>
                        <Image
                            style={styles.avatar}
                            source={item.avatar}
                        />
                        {
                            item.unReadMsg ? <View style={{ position: 'relative', top: -60, right: -28 }} >
                                <Badge status='error' value={item.unReadMsg} />
                            </View> : null
                        }
                    </View>
                    <View style={styles.chatContent}>
                        <View style={styles.otherInfo}>
                            <View>
                                <Text style={{ paddingTop: 12, color: '#0D0D0D', fontSize: 16 }}>{item.name} </Text>
                                <Text style={{ paddingTop: 5, color: '#B3B3B3', fontSize: 12 }}>{item.message}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ paddingTop: 10, color: '#B3B3B3' }}>{item.time}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight> : null
        )
    }

    refresh = () => {
        let state = this.state
        if (state.contactList.length >= 3) {
            state.contactList.splice(state.contactList.length - 1, 1)
        }
        state.refreshing = true

        this.setState({
            ...state
        })
        setTimeout(() => {
            state.contactList.push({
                id: '3',
                name: '马云',
                avatar: pic2,
                message: '年薪一百万，你看行吗？',
                time: '昨天',
                unReadMsg: 1,
            })
            state.refreshing = false
            this.setState({
                ...state
            })
        }, 1000)
    }

    render() {
        return (
            <View style={styles.listContent}>
                <FlatList
                    data={this.state.contactList}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    onRefresh={this.refresh}
                    refreshing={this.state.refreshing}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        marginTop: 0,
        height: 80,
        borderBottomColor: '#F0F0F0'
    },
    listContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: "#fff",
        width: '100%',
        height: '100%',
        paddingTop: 0,
    },
    listItem: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        alignItems: "center"
    },
    avatarContent: {
        // paddingTop:20,
        width: 80,
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorBadge: {
        width: 10,
        height: 10,
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 8
    },
    chatContent: {
        flex: 1,
        height: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15
    },
    otherInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
    // countContainer: {
    //   alignItems: "center",
    //   padding: 10
    // }
});