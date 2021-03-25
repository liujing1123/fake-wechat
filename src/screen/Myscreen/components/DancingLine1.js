import React, { PureComponent, } from 'react';

import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
// import style from '../../constants/style';
import { Surface, Shape, Path } from '@react-native-community/art'
import _ from 'lodash';
// import { observer } from 'mobx-react';
// import { observable } from 'mobx';
const ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

})

export default class DancingLine extends React.Component {

    // // 传入波动值[0, 0.5]
    // private volume: any = 0
    // // 条数
    // private numberOfWaves = 5
    // // 颜色
    // private waveColor: any = '#ff0000'
    // // 主波线宽
    // private mainWaveWidth: any = 2.0
    // // 辅波线宽
    // private decorativeWavesWidth: any = 1.0
    // // 闲置时即最小振幅
    // private idleAmplitude: any = 0.02

    // private frequency: any = 1.2
    // private density: any = 1.0

    // private phaseShift: any = -0.25

    // private phase: any = 0

    // private amplitude: any = 1.0

    // private waveHeight: any = 200
    // private waveWidth: any = ScreenWidth
    // private waveMid: any = this.waveWidth / 2.0
    // private maxAmplitude: any = this.waveHeight - 4.0

    // @observable
    // private paths: any = []

    constructor(props) {
        super(props)
        this.state = {
            paths:[]
        }
        this.volume = 0,
            this.numberOfWaves = 5,
            this.waveColor = '#64CC7E',
            this.mainWaveWidth = 2.0,
            this.decorativeWavesWidth = 1.0,
            this.idleAmplitude = 0.02,
            this.frequency = 1.2,
            this.density = 1.0,
            this.phaseShift = -0.25,
            this.phase = 0,
            this.amplitude = 1.0,
            this.waveHeight = 200,
            this.waveWidth = ScreenWidth,
            this.waveMid = this.waveWidth / 2.0,
            this.maxAmplitude = this.waveHeight - 4.0
        const { numberOfWaves, waveColor, waveWidth, waveHeight } = this.props
        numberOfWaves && (this.numberOfWaves = numberOfWaves)
        waveColor && (this.waveColor = waveColor)
        waveWidth && (this.waveWidth = waveWidth)
        waveHeight && (this.waveHeight = waveHeight)
    }


    _updateVolume = () => {
        // console.warn('_updateVolume')
        this.volume = this.props.volume
        this.phase += this.phaseShift;
        this.amplitude = Math.max(this.volume, this.idleAmplitude);

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
            paths:[].concat(paths)
        })
        // this.paths = paths
    }

    componentDidMount = () => {
        this._updateVolume()
        // this._navListener = this.props.navigation.addListener('focus', async () => {
        //     this._updateVolume()
        //   });
    }

    componentWillReceiveProps(nextProps){

        if (this.props.volume != nextProps.volume) {
            this._updateVolume()
        }  
    }
    // shouldComponentUpdate(nextProps) {
    //     if (this.props.volume == nextProps.volume) {
    //         return false
    //     }
    //     this._updateVolume()
    //     return true
    // }

    render() {
        // console.warn('render',this.state.paths)
        return <View style={{ width: this.waveWidth, height: this.waveHeight }}>
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
    }
}
