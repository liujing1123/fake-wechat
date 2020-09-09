import * as React from 'react';
import { View, Button, Text, SafeAreaView, Dimensions, StyleSheet, FlatList, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import Wheel from '../../plugIn/ColorWheel'
import colorsys from '../../../src/utils/colorsys'
import TempRing from '../../plugIn/TempRing'
import ColorRing from '../../plugIn/ColorRing'

import { tempToRgb } from '../../../src/utils/RgbUtil'
import { scaleSize, screenWidth, setSpText, statusBarHeight } from '../../../src/utils/AdaptUtil'
export default class TempAndColorWheel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            maxTemp: 6500,
            minTemp: 2500,
            maxHue:"00FFFF",
            minHue:"000000",
            temp: 2500,
            lightMode: 2,
            bright:100,
            sat:100,
            hue:"#000000"
        }
    }

    changeTempColor = (color, deg) => {
        let { minTemp, maxTemp } = this.state
        let temp = parseInt((maxTemp - minTemp) * (100 - color.s) * 0.01 + minTemp)//值越高颜色越白
        let tempSat = (temp - minTemp) / (maxTemp - minTemp) * 100
        this.setState({
            tempColor: colorsys.hsv2Hex(color),
            tempBackColor: tempToRgb(temp),
            temp: temp,
            tempdeg: deg,
            tempSat: tempSat
        })
    }
    setLightMode = (mode) => {
        this.setState({
            lightMode: mode
        })
    }

    changeHue = (color, trigger) => {
        this.setState({
            backColor: colorsys.hsv2Hex(color),
        })
        this.setHue(color.h, trigger)
    }

    //十六进制转十进制
    hex2int = (hex) => {
        var len = hex.length, a = new Array(len), code;
        for (var i = 0; i < len; i++) {
            code = hex.charCodeAt(i);
            if (48 <= code && code < 58) {
                code -= 48;
            } else {
                code = (code & 0xdf) - 65 + 10;
            }
            a[i] = code;
        }

        return a.reduce(function (acc, c) {
            acc = 16 * acc + c;
            return acc;
        }, 0);
    }

    //十进制转十六进制
    int2hex = (num, width) => {
        var hex = "0123456789abcdef";
        var s = "";
        while (num) {
            s = hex.charAt(num % 16) + s;
            num = Math.floor(num / 16);
        }
        if (typeof width === "undefined" || width <= s.length) {
            return s;
        }
        var delta = width - s.length;
        var padding = "";
        while (delta-- > 0) {
            padding += "0";
        }
        return padding + s;
    }

    getMinHue = () => {
        if (!this.state.minHue) {
            return 0;
        }
        return parseInt(this.hex2int(this.state.minHue));
    }

    getMaxHue = () => {
        if (!this.state.maxHue) {
            return 0;
        }
        return parseInt(this.hex2int(this.state.maxHue));
    }
        
    setHue = (h, trigger) => {
        let parseIntHue = parseInt((this.getMaxHue() - this.getMinHue()) * (h / 360))
        let hue = "#" + this.int2hex(parseIntHue, 6)
        this.setState({
            hue,
        })
    }

    getH=(hue)=>{
        let str = hue.replace('#',"")
        let num1= this.hex2int(str)
        let h = 0
        h = ((num1-this.getMinHue())/(this.getMaxHue() - this.getMinHue()))*360
        return h
    }

    render() {
        let { lightMode, hue, backColor, sat, bright, tempColor, tempdeg, tempSat, tempBackColor, temp } = this.state
        return (
            <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <View style={{ height: scaleSize(600),width: Dimensions.get('window').width, backgroundColor:lightMode == 1 ? backColor : tempBackColor }}>
                 {  lightMode==1? <ColorRing
                        initialColor={backColor}
                        onColorChange={this.changeHue}
                        h={this.getH(hue)}
                        s={sat}
                        v={bright}
                        lightMode={lightMode}
                        style={{ width: Dimensions.get('window').width, }}
                        thumbSize={scaleSize(80)}
                    />:
                    <TempRing
                        initialColor={tempColor || "#FFFFFF"}
                        onColorChange={this.changeTempColor}
                        s={tempSat || 100}
                        v={100}
                        temp={temp}
                        tempdeg={tempdeg || 0}
                        style={{ width:Dimensions.get('window').width}}
                        thumbSize={scaleSize(80)}
                    />}
                    <View style={{ display: "flex", height: scaleSize(300), position: "absolute", right: 20, top: 0, justifyContent: "space-around" }}>
                        <TouchableOpacity
                            onPress={this.setLightMode.bind(this, 1)}
                            style={{ width: scaleSize(120), height: scaleSize(120), borderRadius: scaleSize(30), backgroundColor: lightMode == 1 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)', justifyContent: "center", alignItems: "center" }}>
                            <Image
                                style={{ width: scaleSize(100), height: scaleSize(100) }}
                                source={require('../../imgs/color-ring.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.setLightMode.bind(this, 2)}
                            style={{ width: scaleSize(120), height: scaleSize(120), borderRadius: scaleSize(30), backgroundColor: lightMode == 2 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)', justifyContent: "center", alignItems: "center" }}>
                            <Image
                                style={{ width: scaleSize(100), height: scaleSize(100) }}
                                source={require('../../imgs/temp-ring.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}