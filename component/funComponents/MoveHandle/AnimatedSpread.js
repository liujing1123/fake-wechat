import React from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Text
} from 'react-native';

export default class AnimatedSpread extends React.Component{
    static defaultProps = {
        ripple:3,       //同时存在的圆数量
        initialDiameter:150,
        endDiameter:350,
        initialPosition:{top:310,left:180},
        rippleColor:'#5BC6AD',
        intervals:500,      //间隔时间
        spreadSpeed:500,      //扩散速度
    }
    // static propTypes = {
    //     initialPosition:React.PropTypes.object.isRequired
    // }
    constructor(props){
        super(props);
        let rippleArr = [1,2,];
        for(let i=0;i<4;i++) rippleArr.push(0);
        this.state = {
            anim:[0].map(()=> new Animated.Value(0))
        }
        this.cancelAnimated = false;
        this.animatedFun = null;
    }

    startAnimation=()=>{
        this.state.anim.map((val,index)=>val.setValue(0));
        this.animatedFun = Animated.stagger(this.props.intervals,this.state.anim.map((val)=>{
            return Animated.timing(val,{toValue:1,duration:this.props.spreadSpeed})
        }));
        this.cancelAnimated = false;
        // this.animatedFun.start(()=>{if(!this.cancelAnimated) {this.startAnimation()}})
        this.animatedFun.start()
    }

    stopAnimation=()=>{
        this.cancelAnimated = true;
        this.animatedFun.stop();
        this.state.anim.map((val,index)=>val.setValue(0));
    }

    render(){
        const {initialPosition,initialDiameter,endDiameter,rippleColor,type} = this.props;
        let r = endDiameter-initialDiameter;    // 直径变化量,top与left的变化是直径的一半
        let rippleComponent = this.state.anim.map((val,index)=>{
            return (
                <Animated.View key={"animatedView_"+index} style={[styles.spreadCircle,{backgroundColor:rippleColor},{
                    opacity:val.interpolate({
                                inputRange:[0,1],
                                outputRange:[1,0]
                            }),
                    height:val.interpolate({
                                inputRange:[0,1],
                                outputRange:[initialDiameter,endDiameter]
                            }),
                    width:val.interpolate({
                                inputRange:[0,1],
                                outputRange:[initialDiameter,endDiameter]
                            }),
                    top:val.interpolate({
                                inputRange:[0,1],
                                outputRange:[initialPosition.top - initialDiameter/2,initialPosition.top - initialDiameter/2 - r/2]
                            }),
                    left:val.interpolate({
                                inputRange:[0,1],
                                outputRange:[initialPosition.left - initialDiameter/2,initialPosition.left - initialDiameter/2 - r/2]
                            }),
                    }]}></Animated.View>
            )
        })
        return (
            <View>
                {/* <Text onPress={this.startAnimation}>点击调用</Text>
                <Text onPress={this.stopAnimation}>点击停止</Text> */}
                {rippleComponent}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    spreadCircle:{
        borderRadius:999,
        position:'absolute',
    },
})