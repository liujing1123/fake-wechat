import React from 'react'
//原来写返回组件的方法时也是需要引入React的
import ColorWheel from '../../component/funComponents/ColorWheel'
export function mapfuncomponent(funName) {
    console.log('mapfuncomponent',funName);
    if (funName) {
        switch (funName.toLowerCase()) {
            case 'colorwheel':
                return (< ColorWheel></ColorWheel>);
                break;
        }
    }
    return;
}