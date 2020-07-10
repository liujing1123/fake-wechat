import * as React from 'react';
import { View, Button, Text,SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import 'react-native-gesture-handler'
import CommonIcon from '../../../components/CommonIcon'

export default function AdressBookScreen() {
    return (
        <SafeAreaView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff", width: '100%', height: '100%', paddingTop: 0 }}>
            </View>
        </SafeAreaView>
    );
}