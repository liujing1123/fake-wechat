import * as React from 'react';
import { View, Button, Text, SafeAreaView, TouchableOpacity, StyleSheet,Animated,
    Easing, InteractionManager,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import 'react-native-gesture-handler'
import BarIcon from '../../../components/BarIcon'
import Orientation from 'react-native-orientation';
import { RNCamera } from 'react-native-camera';
import { scaleSize } from '../../utils/AdaptUtil';
const { width, height } = Dimensions.get('window');

const Height = () => {
    return height
};

const Width = () => {
    return width
};
// const CAM_VIEW_HEIGHT = Dimensions.get('screen').width * 1.5;
// const CAM_VIEW_WIDTH = Dimensions.get('screen').width;
// const leftMargin = 100;
// const topMargin = 50;
// const frameWidth = 200;
// const frameHeight = 250;

// const scanAreaX = leftMargin / CAM_VIEW_HEIGHT;
// const scanAreaY = topMargin / CAM_VIEW_WIDTH;
// const scanAreaWidth = frameWidth / CAM_VIEW_HEIGHT;
// const scanAreaHeight = frameHeight / CAM_VIEW_WIDTH;
export default class FindScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            transCode:'', // 条码
            typeCode: '', // 条码类型
            showCode: true,
            animateCode: new Animated.Value((Width() - 200) / 2,(Height() - 340) / 2), // 二维坐标
        }
    }


    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange);
    }

    startScan=()=>{
        InteractionManager.runAfterInteractions(() => {
            this.startAnimation()
        })
    }
    
    // 动画开始
    startAnimation() {
        this.state.animateCode.setValue(0)
        Animated.timing(this.state.animateCode, {
            toValue: 1,             // 运动终止位置，比值
            duration: 2500,         // 动画时长
            easing: Easing.linear,  // 线性的渐变函数
            delay: 0.3,             // 在一段时间之后开始动画（单位是毫秒），默认为0
        }).start(() => this.startAnimation())
    }

    _orientationDidChange = (orientation) => {
        console.log('_orientationDidChange', orientation);
        // if (orientation === 'LANDSCAPE') {
        //   // do something with landscape layout
        // } else {
        //   // do something with portrait layout
        // }
    }

    takePicture = async () => {
        console.log('takePicture', this.camera);
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
        }
    };

    barcodeReceived(e) {
        let that = this
        console.log("barcodeReceived", e);
        if(this.state.showCode){
            console.log(e);
            that.setState({
                transCode: e.data,
                typeCode: e.type,
                showCode: false
            })
            if(e.data) {
                console.log("barCodeData");
                let barCodeData = {
                    typeName: 'HomeScreen', // TestPage获取此值
                    typeValue: e.data
                }
                that.props.navigation.navigate('Home', { barCodeData })
            }
        }
    }

    // 关闭扫一扫
    closeScanPage() {
        console.log("closeScanPage");
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <RNCamera
                        onBarCodeRead={this.barcodeReceived.bind(this)}
                        onCameraReady={() => {
                            console.log('ready')
                        }}
                        permissionDialogTitle={'提示信息'}
                        permissionDialogMessage={'APP需要使用相机，请打开相机权限允许APP使用'}
                        style={styles.scan_camera}
                        // cameraViewDimensions={{
                        //     width: CAM_VIEW_WIDTH,
                        //     height: CAM_VIEW_HEIGHT,
                        // }}
                        // rectOfInterest={{
                        //     x: scanAreaX,
                        //     y: scanAreaY,
                        //     width: scanAreaWidth,
                        //     height: scanAreaHeight,
                        // }}
                    >
                        {/* <View
                        style={{
                        position: 'absolute',
                        top: leftMargin,
                        right: topMargin,
                        width: frameHeight,
                        height: frameWidth,
                        borderWidth: 2,
                        borderColor: 'red',
                        opacity: 0.5,
                        }}
                    /> */}
                        <View style={styles.scan_cont_box}>
                            <View style={styles.scan_cont_circle}>
                                <Animated.View style={{
                                    alignItems: 'center',
                                    transform: [{
                                        // translateX: x轴移动
                                        // translateY: y轴移动
                                        translateY: this.state.animateCode.interpolate({
                                            inputRange: [0,1],
                                            outputRange: [0,200]
                                        })
                                    }]
                                }}>
                                    <Text style={styles.scan_circle_init}></Text>
                                </Animated.View>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={styles.scan_top_right_box}
                            onPress={() => this.startScan()}
                            >
                            <Text style={{color:"#fff",fontSize:20}}>开始扫描</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.8}
                            style={styles.scan_top_box}
                            onPress={() => this.closeScanPage()}
                            >
                            <Text style={{color:"#fff",fontSize:20}}>关闭</Text>
                        </TouchableOpacity>
                        <View style={styles.scan_info_box}>
                            <Text style={styles.scan_info}>将条形码放入框内，即可自动扫描</Text>
                        </View>
                    </RNCamera>
                </SafeAreaView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scan_top_box: {
        position: "absolute",
        left: 20,
        top: 20,
        width: 84,
        height: 24
    },
    scan_top_right_box: {
        position: "absolute",
        right: 20,
        top: 20,
        width: 84,
        height: 24
    },
    scan_camera: {
        flex: 1,
        height: Height()
    },
    scan_cont_box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    scan_cont_circle: {
        width: 260,
        height: 260,
        borderWidth: 1,
        borderColor: '#919191',
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    scan_circle_init: {
        width:250,
        height:1,
        backgroundColor:'#00ff00'
    },
    scan_info_box: {
        height: 100,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        width: Width()
    },
    scan_info: {
        color: '#fff'
    },
    info: {
        width: Width(),
        height: 80,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingBottom:5,
        justifyContent: 'space-around',
    },
})