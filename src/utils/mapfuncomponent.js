import React from 'react'
//原来写返回组件的方法时也是需要引入React的
import ColorWheel from '../../component/funComponents/ColorWheel'
import TempAndColorWheel from '../../component/funComponents/TempAndColorWheel'
import MoveHandle from '../../component/funComponents/MoveHandle'

export function mapfuncomponent(funName) {
    console.log('mapfuncomponent', funName);
    if (funName) {
        switch (funName.toLowerCase()) {
            case 'colorwheel':
                return (< ColorWheel></ColorWheel>);
                break;
            case 'tempwheel':
                return (< TempAndColorWheel></TempAndColorWheel>);
                break;
            case 'panresponder':
                return (< MoveHandle></MoveHandle>);
                break;
        }
    }
    return;
}