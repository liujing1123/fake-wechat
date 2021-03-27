import React from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Surface, Shape, Path } from '@react-native-community/art'
import _ from 'lodash';
const ScreenWidth = Dimensions.get('window').width;


export default class VoiceLine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            paths: []
        }
        this.numberOfWaves = 5,
            this.waveColor = '#64CC7E',
            this.mainWaveWidth = 2,//主线条宽度
            this.decorativeWavesWidth = 0.6,//其他线条宽度
            this.frequency = 1,//频率
            this.density = 1.0,
            this.phaseShift = -0.55,//这个可以改变跳动的快慢
            this.phase = 0,
            this.amplitude = 0.16,//振幅
            this.waveHeight = 200,
            this.waveWidth = ScreenWidth,
            this.waveMid = this.waveWidth / 2.0,
            this.maxAmplitude = this.waveHeight - 4.0
        const { numberOfWaves, waveColor, waveWidth, waveHeight } = this.props
        numberOfWaves && (this.numberOfWaves = numberOfWaves)
        waveColor && (this.waveColor = waveColor)
        waveWidth && (this.waveWidth = waveWidth)
        waveHeight && (this.waveHeight = waveHeight)
        this.waveInterval = ""
    }

    _updateVolume = () => {
        // console.warn('_updateVolume')
        this.phase += this.phaseShift;

        // 绘制线条
        var paths = []
        for (let i = 0; i < this.numberOfWaves; i++) {

            let progress = 1.0 - i / this.numberOfWaves
            let normedAmplitude = (1.5 * progress - 0.5) * this.amplitude

            var speedStr = ''
            for (let x = 0; x < this.waveWidth + this.density; x += this.density) {
                // 使顶峰保持在视图中央
                let scaling = - Math.pow(x / this.waveMid - 1, 2) + 1
                let y = scaling * this.maxAmplitude * normedAmplitude * Math.sin(2 * Math.PI * (x / this.waveWidth) * this.frequency + this.phase) + (this.waveHeight * 0.5)

                if (x == 0) {
                    speedStr += `M${x} ${y}`
                } else {
                    speedStr += `L${x} ${y}`
                }
            }
            const path = new Path(speedStr);
            paths.push(path)
        }
        this.setState({
            paths: [].concat(paths)
        })
    }


    componentDidMount = () => {
        this.waveInterval = setInterval(() => {
            this._updateVolume()
        }, 50)
    }

    componentWillUnmount() {
        if (this.waveInterval) {
            window.clearInterval(this.waveInterval);
        }
    }

    start = () => {
        if (this.waveInterval) {
            window.clearInterval(this.waveInterval);
        }
        this.waveInterval = setInterval(() => {
            this._updateVolume()
        }, 50)
    }

    end = () => {
        if (this.waveInterval) {
            window.clearInterval(this.waveInterval);
        }
    }

    render() {
        return <View style={{ height: "100%", width: "100%" }}>
            <View style={{ width: this.waveWidth, height: this.waveHeight }}>
                {_.map(this.state.paths, (path, index) => {
                    let strokeColor = ''
                    if (index == 0) {
                        strokeColor = this.waveColor
                    } else {
                        // 渐变浅色
                        let progress = 1.0 - index / this.numberOfWaves
                        let multiplier = Math.min(1.0, (progress / 3.0 * 2.0) + (1.0 / 3.0))
                        if (multiplier == 0) {
                            multiplier = 1
                        }
                        let num = parseInt(255 * multiplier + '')
                        strokeColor = this.waveColor + num.toString(16)
                    }

                    let strokeWidth = index == 0 ? this.mainWaveWidth : this.decorativeWavesWidth;

                    return <View key={index} style={{ height: this.waveHeight, width: this.waveWidth, position: 'absolute', }}>
                        <Surface height={this.waveHeight} width={this.waveWidth}>
                            <Shape d={path} stroke={strokeColor} strokeWidth={strokeWidth} />
                        </Surface>
                    </View>
                })
                }
            </View >
            <View style={{ height: 100, width: "100%", flexDirection: "row" }}>
                <TouchableOpacity onPress={this.start} style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "pink" }}>
                    <Text style={{ color: "#000", fontSize: 18 }}>开始</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.end} style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "lightblue" }}>
                    <Text style={{ color: "#000", fontSize: 18 }}>结束</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}
