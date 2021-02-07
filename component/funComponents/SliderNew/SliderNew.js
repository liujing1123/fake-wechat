import * as React from 'react';
import { View, Button, Text, SafeAreaView, Dimensions, StyleSheet, FlatList, TouchableHighlight, Image } from 'react-native';
import { scaleSize } from '../../../src/utils/AdaptUtil';
// import ColorWheelNew from './ColorWheelNew'
import Silder from '../../plugIn/Slider'
export default class SliderNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value:10,
            value1:10,
        }
    }

    changeValue=(value)=>{
        this.setState({
            value
        })
    }

    changeValue1=(value)=>{
        this.setState({
            value1:value
        })
    }

    render() {
        return (
            <View style={{ backgroundColor: "#fff", height: '100%', justifyContent: "center", alignItems: "center", flex: 1 }}>
                <View style={{ height:scaleSize(700)}}>
                    <Silder
                        orientation="vertical"
                        minimumValue={0}
                        maximumValue={100}
                        thumbTintColor='#D8D8D8'
                        minimumTrackTintColor="#D8D8D8"
                        maximumTrackTintColor="#64CC7E"
                        value={100 - parseInt(this.state.value)}
                        showValue
                        valueColor="#64CC7E"
                        acturalValue={parseInt(this.state.value)}
                        onValueChange={value => this.changeValue(100 - value, false)}
                        onSlidingComplete={value => this.changeValue(100 - value, true)}
                        style={{ flex: 1 }}
                        step={1}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: scaleSize(100), paddingHorizontal: scaleSize(40) ,marginTop:40}}>
                <Silder
                        minimumValue={0}
                        maximumValue={100}
                        thumbTintColor='#D8D8D8'
                        maximumTrackTintColor="#D8D8D8"
                        minimumTrackTintColor="#64CC7E"
                        // trackStyle={{ height: 7, borderRadius: 5 }}
                        value={parseInt(this.state.value1)}
                        showValue
                        valueColor="#64CC7E"
                        onValueChange={value => this.changeValue1( value, false)}
                        onSlidingComplete={value => this.changeValue1(value, true)}
                        style={{ flex: 1 }}
                        step={1}
                    />
                </View>
                {/* <Silder
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor='#D8D8D8'
                    minimumTrackTintColor="#D8D8D8"
                    maximumTrackTintColor="#64CC7E"
                    // trackStyle={{ height: 7, borderRadius: 5 }}
                    value={100 - parseInt(this.state.vol)}
                    showValue
                    valueColor="#64CC7E"
                    acturalValue={parseInt(this.state.vol)}
                    onValueChange={value => this.changeVol(100 - value, false)}
                    onSlidingComplete={value => this.changeVol(100 - value, true)}
                    style={{ flex: 1 }}
                    step={1}
                /> */}
            </View>
        );
    }
}