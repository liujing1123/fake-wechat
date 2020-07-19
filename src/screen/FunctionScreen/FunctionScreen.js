import React from 'react';
import { View, Button, Text, SafeAreaView, StyleSheet, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import {mapfuncomponent} from '../../utils/mapfuncomponent'
export default class FunctionScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            funcItem:{}
        }
    }

    componentDidMount(){
        if(this.props.route&&this.props.route.params){
            let item = this.props.route.params.item
            this.setState({
                funcItem:item
            })
        }
    }

    render() {
        let {funcItem} = this.state
        return (
            <View style={styles.content}>
                {
                    mapfuncomponent(funcItem.funLabe)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: "#EDEDED",
        width: '100%',
        height: '100%',
        paddingTop: 0,
    },
});