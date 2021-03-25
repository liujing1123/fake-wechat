import * as React from 'react';
import { View, Button, Text, SafeAreaView ,Dimensions} from 'react-native';
import DancingLine from './components/DancingLine1'

// export default function MyScreen() {
//     return (
//         <SafeAreaView>
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff", width: '100%', height: '100%' }}>
//             <DancingLine volume={this.volume} waveWidth={Dimensions.get('window').width} waveHeight={300}/>
//             </View>
//         </SafeAreaView>
//     );
// }
export default class MyScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            volume:0
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                volume : Math.random() * 0.3
            })
            // this.volume = Math.random() * 0.5
        }, 100)
     }

    render() {
        // console.warn('this.volume',this.state.volume);
        return (
            <SafeAreaView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "red", width: '100%', height: '100%' }}>
                    <View style={{height:200,backgroundColor:'pink',width:'100%'}}>
                    <Text style={{color:"red"}}>999999999</Text>
                    </View>
                    <DancingLine volume={this.state.volume} navigation={this.props.navigation} waveWidth={Dimensions.get('window').width} waveHeight={300} />
                </View>
            </SafeAreaView>
        )
    }
}