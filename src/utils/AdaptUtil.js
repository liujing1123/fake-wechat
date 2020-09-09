import {Dimensions, StatusBar, Platform, PixelRatio} from 'react-native'

//手机屏幕的宽度
export const screenWidth = Dimensions.get('window').width;
//手机屏幕的高度
export const screenHeight = Dimensions.get('window').height;
const defaultPixel = 1;                           //iphone6的像素密度
//UI设计图的宽度
const designWidth = 1080/defaultPixel;//750
//UI设计图的高度
const designHeight = 1920/defaultPixel;//1334

//计算手机屏幕宽度对应设计图宽度的单位宽度
export const widthScale = screenWidth / designWidth
//计算手机屏幕高度对应设计图高度的单位高度
export const heightScale = screenHeight / designHeight

const scale = Math.min(widthScale, heightScale);   //获取缩放比例

export const isIOS = Platform.OS === 'ios';
export const statusBarHeight = getStatusBarHeight();
export const headerHeight = Platform.OS === 'ios' ? 44 : 56;
export const bottomBarHeight = 48;
export const safeAreaViewHeight = isIphoneX() ? 34 : 0
//标题栏的高度
export const titleHeight = heightScale * 100 + statusBarHeight;

//字体缩放比例，一般情况下不用考虑。
// 当应用中的字体需要根据手机设置中字体大小改变的话需要用到缩放比例
export const fontScale = PixelRatio.getFontScale()

let pixelRatio = PixelRatio.get();      //当前设备的像素密度

/**
 * 设置text为sp
 * @param size sp
 * return number dp
 */
export function setSpText(size) {
    size = Math.round((size * scale + 0.5) / fontScale);
    return size / defaultPixel;
}

//各类指定值 防止多次计算
export const scaleSizeObj = {
    10:parseInt(scaleSize(10)),
    15:parseInt(scaleSize(15)),
    20:parseInt(scaleSize(20)),
    30:parseInt(scaleSize(30)),
    40:parseInt(scaleSize(40)),
    44:parseInt(scaleSize(44)),
    50:parseInt(scaleSize(50)),
    60:parseInt(scaleSize(60)),
    70:parseInt(scaleSize(70)),
    80:parseInt(scaleSize(80)),
    100:parseInt(scaleSize(100)),
    120:parseInt(scaleSize(120)),
    200:parseInt(scaleSize(200)),
    250:parseInt(scaleSize(250)),
    450:parseInt(scaleSize(450)),
    455:parseInt(scaleSize(455)),
    480:parseInt(scaleSize(480)),
    485:parseInt(scaleSize(485)),
    500:parseInt(scaleSize(500)),
    550:parseInt(scaleSize(550)),
    560:parseInt(scaleSize(560)),
    800:parseInt(scaleSize(800)),
} 
export function scaleSize(size) {
    // console.warn("scaleSize",size,new Date())
    size = Math.round(size * scale + 0.5);
    return size / defaultPixel;
}
 
/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
    const X_WIDTH = 375;
    const X_HEIGHT = 812;
    return Platform.OS == 'ios' && (screenHeight == X_HEIGHT && screenWidth == X_WIDTH)
}

export function isIphoneXR() {
    const X_WIDTH = 414;
    const X_HEIGHT = 896;
    return Platform.OS == 'ios' && (screenHeight == X_HEIGHT && screenWidth == X_WIDTH)
}

export function getHeadTopHeight() {
    if(isIphoneX() || isIphoneXR())
    {
        return 24;
    }
    return 0;
}


//状态栏的高度
export function getStatusBarHeight() {
    if (Platform.OS == 'android') return StatusBar.currentHeight;
    if (isIphoneX()) {
        return 44
    }
    return 20
}