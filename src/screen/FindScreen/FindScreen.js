import * as React from 'react';
import { View, Button, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import 'react-native-gesture-handler'
import BarIcon from '../../../components/BarIcon'
import Orientation from 'react-native-orientation';
export default class FindScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }

    componentDidMount(){
        Orientation.addOrientationListener(this._orientationDidChange);
    }

    _orientationDidChange = (orientation) => {
        console.log('_orientationDidChange',orientation);
        // if (orientation === 'LANDSCAPE') {
        //   // do something with landscape layout
        // } else {
        //   // do something with portrait layout
        // }
      }

    render(){
        return (
            <SafeAreaView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff", width: '100%', height: '100%' }}>
                </View>
            </SafeAreaView>
        );
    }
}