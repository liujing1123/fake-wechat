import * as React from 'react';
import { View, Button, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import 'react-native-gesture-handler'
import BarIcon from '../../../components/BarIcon'

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '设置',
        };
    };
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff", width: '100%', height: '100%' ,paddingTop:0}}>
                </View>
            </SafeAreaView>
        );
    }
}
// export default function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }