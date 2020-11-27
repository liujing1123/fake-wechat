// @flow

import React, { Component } from 'react'
import {
    Animated,
    Image,
    Dimensions,
    PanResponder,
    StyleSheet,
    View,
    Text
} from 'react-native'
import colorsys from '../../src/utils/colorsys'
import { scaleSize, screenWidth, setSpText, statusBarHeight } from '../../src/utils/AdaptUtil'

export default class ColorRing extends Component {
    static defaultProps = {
        thumbSize: 50,
        initialColor: '#ffffff',
        onColorChange: () => { },
        precision: 0,
        radius1: ''
    }

    constructor(props) {
        super(props)
        this.state = {
            offset: { x: 0, y: 0 },
            currentColor: props.initialColor,
            pan: new Animated.ValueXY(),
            dy: '',
            dx: '',
        }

        this.dasharray = [Math.PI * 2 * 42];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.s != this.props.s || nextProps.v != this.props.v) {
            let h = this.props.h
            let s = nextProps.s
            let v = nextProps.v
            // this.setState({ currentColor: colorsys.hsv2Hex({ h, s, v }) })
            this.setState({ currentColor: colorsys.hsv2Hex({ h, s:100, v:100 }) })
        }
    }

    componentDidMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponderCapture: ({ nativeEvent }) => {
                if (this.outBounds(nativeEvent)) return
                this.updateColor({ nativeEvent })
                this.setState({ panHandlerReady: true })
                // Toast.show("Capture"+ this.state.left+ " "+ nativeEvent.pageX)
                this.state.pan.setValue({
                    x: -this.state.left + nativeEvent.pageX - this.props.thumbSize / 2,
                    y: -this.state.top + nativeEvent.pageY - this.props.thumbSize / 2,
                })
                return true
            },
            onStartShouldSetPanResponder: ({nativeEvent}, gestureState) => {
                if (this.outBounds(nativeEvent)) return
                return true
            },
            onMoveShouldSetPanResponderCapture: ({nativeEvent}, gestureState) => {
                if (this.outBounds(gestureState)) return
                this.updateColor({ nativeEvent })
                this.setState({ panHandlerReady: true })
                this.state.pan.setValue({
                    x: -this.state.left + nativeEvent.pageX - this.props.thumbSize / 2,
                    y: -this.state.top + nativeEvent.pageY - this.props.thumbSize / 2,
                })
                return true
            },
            onMoveShouldSetPanResponder: ({nativeEvent}, gestureState) => {
                if (this.outBounds(gestureState)) return
                return true
            },
            onPanResponderGrant: () => true,
            onPanResponderMove: (event, gestureState) => {
                if (this.outBounds(gestureState)) return
                this.resetPanHandler()
                return Animated.event(
                    [
                        null,
                        {
                            dx: this.state.pan.x,
                            dy: this.state.pan.y,
                        },
                    ],
                    { listener: this.updateColor }
                )(event, gestureState)
            },
            onPanResponderRelease: ({ nativeEvent }) => {
                this.setState({ panHandlerReady: true })
                this.state.pan.flattenOffset()
                let deg = 0
                if (this.state.deg) {
                    if (this.state.deg < 0) {
                        deg = 360 + this.state.deg
                    } else {
                        deg = this.state.deg
                    }
                } else {
                    let { h } = colorsys.hex2Hsv(this.state.currentColor)
                    deg = h
                }
                this.props.onColorChange({ h: deg, s: this.props.s, v: this.props.v }, true)
                // const { radius } = this.calcPolar(nativeEvent)
                // console.log('radius',radius);
                // console.log('onPanResponderRelease');
                // if (radius < 0.1) {
                //     this.forceUpdate('#ffffff')
                // }
            },
        })
    }

    onLayout() {
        setTimeout(()=>{
            this.measureOffset()
        },600)
    }

    measureOffset() {
        this.self.measureInWindow((x, y, width, height) => {
            // Toast.show("measureInWindow"+   x+ " "+width)
            // console.warn(x,y,width,height)
            const window = Dimensions.get('window')
            const absX = x % width
            const radius = Math.min(width, height) / 2
            const offset = {
                x: width / 2,
                // y: (y-scaleSize(140)) % window.height + height / 2,
                y: y % window.height + height / 2,
            }
            this.setState({
                offset,
                radius,
                height,
                width,
                // top: (y-scaleSize(140)) % window.height,
                top: y % window.height,
                left: absX,
            })
            this.forceUpdate(this.props.initialColor)
        })
    }

    calcPolar(gestureState) {
        const {
            pageX, pageY, moveX, moveY,
        } = gestureState;
        const [x, y] = [pageX || moveX, pageY || moveY]
        const [dx, dy] = [x - this.state.offset.x, y - this.state.offset.y]
        return {
            deg: Math.atan2(dy, dx) * (-180 / Math.PI),
            // pitagoras r^2 = x^2 + y^2 normalized
            radius: Math.sqrt(dy * dy + dx * dx) / this.state.radius,
        }
    }

    //超出滑动界限了
    outBounds(gestureState) {
        const { radius } = this.calcPolar(gestureState)
        return radius > 1 || radius < 0.34//更改此处可让圆圈不会在中心空白处滑动
        // return radius > 1
    }

    resetPanHandler() {
        if (!this.state.panHandlerReady) {
            return
        }

        this.setState({ panHandlerReady: false })
        this.state.pan.setOffset({
            x: this.state.pan.x._value,
            y: this.state.pan.y._value,
        })
        this.state.pan.setValue({ x: 0, y: 0 })
    }

    calcCartesian(deg, radius) {
        const r = radius * this.state.radius // was normalized
        const rad = Math.PI * deg / 180
        const x = r * Math.cos(rad)
        const y = r * Math.sin(rad)
        return {
            left: this.state.width / 2 + x,
            top: this.state.height / 2 - y,
        }
    }

    updateColor = ({ nativeEvent }) => {
        const { deg, radius } = this.calcPolar(nativeEvent)
        let newDeg = deg
        if (deg < 0) {
            newDeg = 360 + deg
        }
        // Toast.show("newDeg"+newDeg)
        // let currentColor = colorsys.hsv2Hex({ h: newDeg, s: this.props.s, v: this.props.v })
        let currentColor = colorsys.hsv2Hex({ h: newDeg, s: 100, v: 100 })
        this.setState({ currentColor, deg: deg })
        this.props.onColorChange({ h: newDeg, s: this.props.s, v: this.props.v })//s为100饱和度即最大
        // const currentColor = colorsys.hsv2Hex({ h: deg, s: 100 * radius, v: 100 })
        // this.props.onColorChange({ h: deg, s: this.props.s * radius, v: 100 })
    }

    forceUpdate = color => {
        // const { h, s, v } = colorsys.hex2Hsv(color)
        this.setState({
            h:this.props.h
        })
        const { left, top } = this.calcCartesian(this.props.h, 0.9)
        // let currentColor = colorsys.hsv2Hex({ h:this.props.h, s: this.props.s, v: this.props.v })
        let currentColor = colorsys.hsv2Hex({ h:this.props.h, s: 100, v: 100 })
        this.setState({ currentColor })
        // this.props.onColorChange({ h, s: this.props.s, v: this.props.v })
        this.state.pan.setValue({
            x: left - this.props.thumbSize / 2,
            y: top - this.props.thumbSize / 2,
        })
    }

    // animatedUpdate = color => {
    //     // console.log('animatedUpdate', color);
    //     const { h, s, v } = colorsys.hex2Hsv(color)
    //     const { left, top } = this.calcCartesian(h, s / 100)
    //     this.setState({ currentColor: color })
    //     // this.props.onColorChange({ h, s, v })
    //     this.props.onColorChange({ h, s: this.props.s, v: this.props.v })
    //     Animated.spring(this.state.pan, {
    //         toValue: {
    //             x: left - this.props.thumbSize / 2,
    //             y: top - this.props.thumbSize / 2,
    //         },
    //     }).start()
    // }

    render() {
        const { radius } = this.state
        const thumbStyle = [
            styles.circle,
            this.props.thumbStyle,
            {
                width: this.props.thumbSize,
                height: this.props.thumbSize,
                borderRadius: this.props.thumbSize / 2,
                backgroundColor: this.state.currentColor,
                opacity: this.state.offset.x === 0 ? 0 : 1,
            },
        ]

        const panHandlers = this._panResponder && this._panResponder.panHandlers || {}
        return (
            <View
                ref={node => {
                    this.self = node
                }}
                {...panHandlers}
                onLayout={nativeEvent => this.onLayout(nativeEvent)}
                style={[styles.coverResponder, this.props.style]}>
                <Image
                    style={[styles.img, { height: radius ? radius * 2 : 180, width: radius ? radius * 2 : 180 }]}
                    source={require('../imgs/color-ring.png')}
                />
                <Animated.View style={[this.state.pan.getLayout(), thumbStyle]} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    coverResponder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        alignSelf: 'center',
    },
    circle: {
        position: 'absolute',
        backgroundColor: '#EEEEEE',
        borderWidth: 3,
        borderColor: '#EEEEEE',
        elevation: 3,
        shadowColor: 'rgb(46, 48, 58)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
})
