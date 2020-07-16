import * as React from 'react';
import { View, Button, Text, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import 'react-native-gesture-handler'
import CommonIcon from '../../../components/CommonIcon'
import ColorWheel from './component/ColorWheel'
import colorsys from '../../utils/colorsys'
export default class AdressBookScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            backgroundColor: '#cccccc'
        }
    }
    changeColor = (color) => {
        // console.log('changeColor', color);
        // let color1=Object.assign({},color,{v:100})
        // console.log(color1,'color1');
        this.setState({
            backgroundColor: colorsys.hsv2Hex(color)
        })
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff", width: '100%', height: '100%', paddingTop: 0 }}>
                <View>
                    <ColorWheel
                        initialColor="#ee0000"
                        onColorChange={this.changeColor}
                        // style={{width: Dimensions.get('window').width}}
                        style={{ width: Dimensions.get('window').width, backgroundColor: this.state.backgroundColor }}
                        thumbSize={30}
                    />
                </View>
            </View>
        );
    }
}