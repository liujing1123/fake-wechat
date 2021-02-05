import * as React from 'react';
import { View, Button, Text, SafeAreaView, Dimensions, StyleSheet, FlatList, TouchableHighlight, Image } from 'react-native';
import Wheel from '../../plugIn/ColorWheel'
// import ColorWheelNew from './ColorWheelNew'
import colorsys from '../../../src/utils/colorsys'
export default class ColorWheel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            backgroundColor: '#c3fcff',
        }
    }
    changeColor = (color) => {
        this.setState({
            backgroundColor: colorsys.hsv2Hex(color)
        })
    }
    render() {
        let { backgroundColor } = this.state
        return (
            <View style={{ backgroundColor: "#fff", height: '100%', justifyContent: "center", alignItems: "center", flex: 1 }}>
                <View style={{ justifyContent: "center", alignItems: "center", height: 60 }}>
                    <Text>当前的颜色是:&nbsp;&nbsp;{backgroundColor}</Text>
                </View>
                <View style={{ width: 200, height: 400, justifyContent: "center", alignItems: "center" }}>
                    <Wheel
                        initialColor={backgroundColor}
                        onColorChange={this.changeColor}
                        style={{ width: Dimensions.get('window').width, backgroundColor: backgroundColor }}
                        thumbSize={30}

                    />
                    {/* <ColorWheelNew
                        color={backgroundColor}
                        // swatchesOnly={this.state.swatchesOnly}
                        onColorChange={this.changeColor}
                        onColorChangeComplete={this.changeColor}
                        thumbSize={40}
                        sliderSize={40}
                        noSnap={true} /> */}
                </View>
            </View>
        );
    }
}