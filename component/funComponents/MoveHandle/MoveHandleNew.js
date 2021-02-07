import * as React from 'react';
import {
    View, Button, Text, SafeAreaView, Dimensions, StyleSheet, TouchableHighlight, Image, PanResponder, Animated
} from 'react-native';
import AnimatedSpread from './AnimatedSpread'
export default class MoveHandleNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            initialPosition: {
                left: 0,
                top: 0,
            },
        }
    }

    onLayout = (e) => {
        this.ref.measure((x, y, width, height, pageX, pageY) => {
            this.offsetLeft = pageX
            this.offsetTop = pageY
            this.containerWidth = width
            this.containerHeight = height
            this.endDiameter = height > width ? height * 2 : width * 2
        });
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onPanResponderGrant: (evt, gestureState) => {
            },
            onPanResponderMove: (evt, gestureState) => {
                this._onPanResponderMove(gestureState)
            },
            onPanResponderRelease: (evt, gestureState) => {
                this._onPanResponderRelease(evt, gestureState)
            },
            onPanResponderTerminate: (evt, gestureState) => {
            },
        });
    }

    _onPanResponderMove = ({ dx, dy }) => { }

    _onPanResponderRelease = ({ nativeEvent }, { dx, dy }) => {
        let { initialPosition } = this.state
        if (dx == 0 && dy == 0) {
            initialPosition.left = this.containerWidth / 2
            initialPosition.top = this.containerHeight / 2
            this.setState({
                initialPosition
            });
            this.refs.animatedSpread.startAnimation()
        } else {
            let direction = "horizontal"
            let type = "left"
            if (Math.abs(dx) < Math.abs(dy)) {
                direction = "vertical"
            } else if (Math.abs(dx) > Math.abs(dy)) {
                direction = "horizontal"
            }
            if (direction == "vertical") {
                if (dy > 0) {
                    type = "down"
                    initialPosition.left = this.containerWidth / 2
                    initialPosition.top = 0
                } else {
                    type = "up"
                    initialPosition.left = this.containerWidth / 2
                    initialPosition.top = this.containerHeight
                }
            } else {
                if (dx > 0) {
                    type = "right"
                    initialPosition.left = 0
                    initialPosition.top = this.containerHeight / 2
                } else {
                    type = "left"
                    initialPosition.left = this.containerWidth
                    initialPosition.top = this.containerHeight / 2
                }
            }
            this.setState({
                initialPosition
            });
            this.refs.animatedSpread.startAnimation()
        }
    }

    render() {
        return (
            <View ref={ref => { this.ref = ref }} onLayout={(e) => this.onLayout(e)} style={{ height: '100%', flex: 1, overflow: "hidden" }}>
                <AnimatedSpread ref="animatedSpread" initialPosition={this.state.initialPosition} initialDiameter={0} endDiameter={this.endDiameter} rippleColor="#E1E1E1" spreadSpeed={700} />
                <View style={styles.container} {...this._panResponder.panHandlers}>
                    <Text style={{ fontSize: 20 }}>滑动或点击</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    redView: {
        width: 100,
        height: 100,
    },
});