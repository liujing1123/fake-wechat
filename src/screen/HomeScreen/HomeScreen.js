import * as React from 'react';
import { StyleSheet, TouchableHighlight, Image, View, Button, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import 'react-native-gesture-handler'
import { Badge } from 'react-native-elements';
import BarIcon from '../../../components/BarIcon'

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '设置',
        };
    };
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.listContent}>
                <TouchableHighlight
                    underlayColor='#ccc'
                    style={styles.button}
                    onPress={() => { }}>
                    <View style={styles.listItem}>
                        <View style={styles.avatarContent}>
                            <Image
                                style={styles.avatar}
                                source={require('../../img/transmission.jpg')}
                            />
                        </View>
                        <View style={styles.chatContent}>
                            <View style={styles.otherInfo}>
                                <View>
                                    <Text style={{ paddingTop: 12, color: '#0D0D0D', fontSize: 16 }}>文件传输助手 </Text>
                                    <Text style={{ paddingTop: 5, color: '#B3B3B3', fontSize: 12 }}>传了个啥文件给我</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ paddingTop: 10, color: '#B3B3B3' }}>下午1:57</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor='#ccc'
                    style={styles.button}
                    onPress={() => { }}>
                    <View style={styles.listItem}>
                        <View style={styles.avatarContent}>
                            <Image
                                style={styles.avatar}
                                source={require('../../img/JackMa.jpg')}
                            />
                            <View style={{ position: 'relative', top: -60, right: -28 }} >
                                <Badge status='error' value="2"/>
                            </View>
                        </View>
                        <View style={styles.chatContent}>
                            <View style={styles.otherInfo}>
                                <View>
                                    <Text style={{ paddingTop: 12, color: '#0D0D0D', fontSize: 16 }}>马云</Text>
                                    <Text style={{ paddingTop: 5, color: '#B3B3B3', fontSize: 12 }}>明天来我公司上班</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ paddingTop: 10, color: '#B3B3B3' }}>昨天</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
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
        paddingTop:20,
        width: 80,
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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