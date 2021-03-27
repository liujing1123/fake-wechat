import * as React from 'react';
import { View, Button, Text, SafeAreaView ,Dimensions} from 'react-native';
export default class MyScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "red", width: '100%', height: '100%' }}>
                </View>
            </SafeAreaView>
        )
    }
}