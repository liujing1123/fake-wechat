import * as React from 'react';
import { View, Button, Text, SafeAreaView, StyleSheet, FlatList, TouchableHighlight, Image } from 'react-native';
const colorWheel = require('./img/color-wheel.png')
const slider = require('./img/slider.png')
export default class AdressBookScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            funList: [{ id: 1, funName: '颜色拾取器', avatar: colorWheel ,funLabe:'colorWheel'}, { id: 2, funName: '滑动条', avatar: slider ,funLabe:'slider'}]
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
                        <Text style={{fontSize:16}}>{item.funName}</Text>
                    </View>
                </View>
            </TouchableHighlight> : null
        )
    }

    goTofunPage=(item)=>{
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
        flex:1,
        justifyContent: "center",
        alignItems: "flex-start",
        borderBottomWidth:1,
        borderBottomColor:"#EFEFEF",
    }
});