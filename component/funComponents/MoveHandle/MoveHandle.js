import * as React from 'react';
import { View, Button, Text, SafeAreaView, Dimensions, StyleSheet, FlatList, TouchableHighlight, Image } from 'react-native';
export default class MoveHandle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: "#fff", height: '100%', justifyContent: "center", alignItems: "center", flex: 1 }}>
                <Text>MoveHandle</Text>
            </View>
        );
    }
}