import * as React from 'react';
import {
    View, Button, Text, SafeAreaView, Dimensions, StyleSheet, FlatList, TouchableHighlight, Image, AppRegistry,
    PanResponder,
} from 'react-native';
export default class MoveHandle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            backgroundColor: 'pink',
            marginTop: 100,
            marginLeft: 100,
        }
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
                console.log('onPanResponderGrant',evt,gestureState);
                this._highlight();
            },
            onPanResponderMove: (evt, gestureState) => {
                console.log('onPanResponderMove',evt,gestureState);
                this.setState({
                    marginLeft: evt.nativeEvent.pageX,
                    marginTop: evt.nativeEvent.pageY,
                });
            },
            onPanResponderRelease: (evt, gestureState) => {
                console.log('onPanResponderRelease',evt,gestureState);
                this._unhighlight();
            },
            onPanResponderTerminate: (evt, gestureState) => {
            },
        });
    }

    _unhighlight() {
        this.setState({
            backgroundColor: 'pink',
        });
    }

    _highlight() {
        this.setState({
            backgroundColor: 'lightpink',
        });
    }

    render() {
        return (
            <View style={{ height: '100%', flex: 1,padding:20 }}>
                <View style={styles.container} {...this._panResponder.panHandlers}>
                    <View style={[styles.redView,
                    // {
                    //     backgroundColor: this.state.backgroundColor,
                    //     marginTop: this.state.marginTop,
                    //     marginLeft: this.state.marginLeft,
                    // }
                    ]}></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#ccc",
        borderRadius:10,
    },
    redView: {
        width: 100,
        height: 100,
    },

});
AppRegistry.registerComponent('MoveHandle', () => MoveHandle);