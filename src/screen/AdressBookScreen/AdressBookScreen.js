import * as React from 'react';
import { View, Button, Text, SafeAreaView, StyleSheet, FlatList, TouchableHighlight, Image } from 'react-native';
const pic1 = require('../../../img/pic1.jpg')
const pic2 = require('../../../img/pic2.jpg')
const pic3 = require('../../../img/pic3.jpg')
const pic4 = require('../../../img/pic4.jpg')
const pic5 = require('../../../img/pic5.jpg')
export default class AdressBookScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            funList: [{ id: 1, funName: '色盘', avatar: pic1, funLabe: 'colorWheel' }, { id: 2, funName: '色环', avatar: pic2, funLabe: 'tempWheel' }, { id: 3, funName: '手势+动画', avatar: pic3, funLabe: 'panResponder' }, { id: 4, funName: '滑动条', avatar: pic4, funLabe: 'slider' }, { id: 5, funName: '声波纹', avatar: pic5, funLabe: 'voiceline' }]
        }
    }

    renderItem = (lstItem) => {
        let item = lstItem.item
        return (
            item ? <TouchableHighlight
                underlayColor='#ccc'
                style={styles.detailButton}
                onPress={() => { this.goTofunPage(item) }}>
                <View style={styles.listItem}>
                    <View style={{ ...styles.avatarContent }}>
                        <Image
                            style={styles.avatar}
                            source={item.avatar}
                        />
                    </View>
                    <View style={styles.funNameContent}>
                        <Text style={{ fontSize: 16 }}>{item.funName}</Text>
                    </View>
                </View>
            </TouchableHighlight> : null
        )
    }

    goTofunPage = (item) => {
        this.props.navigation.navigate('function', { item: item })
    }

    render() {
        return (
            <View style={{ backgroundColor: "#fff", height: '100%' }}>
                <FlatList
                    data={this.state.funList}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                // onRefresh={this.refresh}
                // refreshing={this.state.refreshing}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    detailButton: {
        backgroundColor: "#FFF",
        height: 70,
        width: '100%',
        paddingLeft: 10,
        borderBottomColor: '#F0F0F0'
    },
    listItem: {
        flexDirection: 'row',
        height: '100%',
    },
    avatarContent: {
        width: 70,
        height: 70,
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    funNameContent: {
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#EFEFEF",
    }
});