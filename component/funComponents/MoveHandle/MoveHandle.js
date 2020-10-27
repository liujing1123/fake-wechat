import * as React from 'react';
import {
    View, Button, Text, SafeAreaView, Dimensions, StyleSheet, FlatList, TouchableHighlight, Image, AppRegistry,
    PanResponder,
} from 'react-native';
export default class MoveHandle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            backgroundColor: 'red',
            marginTop: 100,
            marginLeft: 100,
        }
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                console.log('onStartShouldSetPanResponder');
                return true;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onPanResponderGrant: (evt, gestureState) => {
                this._highlight();
            },
            onPanResponderMove: (evt, gestureState) => {
                console.log(`pageX : ${evt.nativeEvent.pageX}   pageY : ${evt.nativeEvent.pageY}`);
                this.setState({
                    marginLeft: evt.nativeEvent.pageX,
                    marginTop: evt.nativeEvent.pageY,
                });
            },
            onPanResponderRelease: (evt, gestureState) => {
                this._unhighlight();
            },
            onPanResponderTerminate: (evt, gestureState) => {
            },
        });
    }

    _unhighlight() {
        this.setState({
            backgroundColor: 'red',
        });
    }

    _highlight() {
        this.setState({
            backgroundColor: 'blue',
        });
    }

    render() {
        return (
            <View style={{ height: '100%', flex: 1 }}>
                <View style={styles.container}>
                    <View style={[styles.redView,
                    {
                        backgroundColor: this.state.backgroundColor,
                        marginTop: this.state.marginTop,
                        marginLeft: this.state.marginLeft,
                    }
                    ]}
                        {...this._panResponder.panHandlers}
                    ></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    redView: {
        width: 100,
        height: 100,
    },

});
AppRegistry.registerComponent('MoveHandle', () => MoveHandle);