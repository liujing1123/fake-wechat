import * as React from 'react';
import { View, Button, Text, SafeAreaView, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
export default class MyScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    onChange = () => { }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={"time"}
                    is24Hour={true}
                    display="spinner"
                    onChange={this.onChange}
                />
            </View>
        )
    }
}