

/**     * HSL颜色值转换为RGB.
 * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
 * h, s, 和 l 设定在 [0, 1] 之间
 * 返回的 r, g, 和 b 在 [0, 255]之间
 * @param   Number  h       色相
 * @param   Number  s       饱和度
 * @param   Number  l       亮度
 * @return  Array           RGB色值数值
 **/ 
export function hslToRgb(h, s, l) {
	var r, g, b;
	if (s == 0) {
		r = g = b = l;
		// achromatic
	} else {
		var hue2rgb = function hue2rgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};
		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


// export function hslToRgbHex(h, s, l) {
// 	var r, g, b;
// 	if (s == 0) {
// 		r = g = b = l;
// 		// achromatic
// 	} else {
// 		var hue2rgb = function hue2rgb(p, q, t) {
// 			if (t < 0) t += 1;
// 			if (t > 1) t -= 1;
// 			if (t < 1 / 6) return p + (q - p) * 6 * t;
// 			if (t < 1 / 2) return q;
// 			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
// 			return p;
// 		};
// 		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
// 		var p = 2 * l - q;
// 		r = hue2rgb(p, q, h + 1 / 3);
// 		g = hue2rgb(p, q, h);
// 		b = hue2rgb(p, q, h - 1 / 3);
// 	}
// 	return rgb2Hex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
// }

export function hslToRgbHex(h, s, v) {
    // var h = arr[0], s = arr[1], v = arr[2];
    // s = s / 100;
	// v = v / 100;
	if(h>=360)
	{
		h=0;
	}
    var r = 0, g = 0, b = 0;
    var i = parseInt((h / 60) % 6);
    var f = h / 60 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);
	// //console.warn("hslToRgbHex",i,f,h,s,v)
    switch (i) {
        case 0:
            r = v; g = t; b = p;
            break;
        case 1:
            r = q; g = v; b = p;
            break;
        case 2:
            r = p; g = v; b = t;
            break;
        case 3:
            r = p; g = q; b = v;
            break;
        case 4:
            r = t; g = p; b = v;
            break;
        case 5:
            r = v; g = p; b = q;
            break;
        default:
            break;
    }
    r = parseInt(r * 255.0)
    g = parseInt(g * 255.0)
    b = parseInt(b * 255.0)
	return rgb2Hex(r, g, b);
}

export function rgb2Hex(r,g,b) {
    let red = parseInt(r);
    let green = parseInt(g);
    let blue = parseInt(b);
    var hex = "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
    return hex;
 };

/**    * RGB 颜色值转换为 HSL.
 * 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
 * r, g, 和 b 需要在 [0, 255] 范围内    
 * 返回的 h, s, 和 l 在 [0, 1] 之间
 * @param   Number  r       红色色值
 * @param   Number  g       绿色色值
 * @param   Number  b       蓝色色值
 * @return  Array           HSL各值数组
 **/ 
export function rgbToHsl(r, g, b) {
	(r /= 255), (g /= 255), (b /= 255);
	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	var h,
		s,
		l = (max + min) / 2;
	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return [Math.floor(h * 100), Math.round(s * 100), Math.round(l * 100)];
}

// export function rgbHexToHsl(hex) {
// 	let r =parseInt("0x" + hex.slice(1, 3));
// 	let g =parseInt("0x" + hex.slice(3, 5));
// 	let b =parseInt("0x" + hex.slice(5, 7));
// 	(r /= 255), (g /= 255), (b /= 255);
// 	var max = Math.max(r, g, b),
// 		min = Math.min(r, g, b);
// 	var h,
// 		s,
// 		l = (max + min) / 2;
// 	if (max == min) {
// 		h = s = 0; // achromatic
// 	} else {
// 		var d = max - min;
// 		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
// 		switch (max) {
// 			case r:
// 				h = (g - b) / d + (g < b ? 6 : 0);
// 				break;
// 			case g:
// 				h = (b - r) / d + 2;
// 				break;
// 			case b:
// 				h = (r - g) / d + 4;
// 				break;
// 		}
// 		h /= 6;
// 	}
// 	return [Math.floor(h * 100), Math.round(s * 100), Math.round(l * 100)];
// }

export function rgbHexToHsl(hex) {
	let r =parseInt("0x" + hex.slice(1, 3));
	let g =parseInt("0x" + hex.slice(3, 5));
	let b =parseInt("0x" + hex.slice(5, 7));
    var h = 0, s = 0, v = 0;
    // var r = arr[0], g = arr[1], b = arr[2];
    // arr.sort(function (a, b) {
    //     return a - b;
    // })
    var max = r;
	var min = r;
	if(g>max)
	{
		max=g;
	}
	if(g<min)
	{
		min=g;
	}
	if(b>max)
	{
		max=b;
	}
	if(b<min)
	{
		min=b;
	}
    v = max / 255;
    if (max === 0) {
        s = 0;
    } else {
        s = 1 - (min / max);
    }
    if (max === min) {
        h = 0;//事实上，max===min的时候，h无论为多少都无所谓
    } else if (max === r && g >= b) {
        h = 60 * ((g - b) / (max - min)) + 0;
    } else if (max === r && g < b) {
        h = 60 * ((g - b) / (max - min)) + 360
    } else if (max === g) {
        h = 60 * ((b - r) / (max - min)) + 120
    } else if (max === b) {
        h = 60 * ((r - g) / (max - min)) + 240
    }
    h = parseInt(h);
    s = parseInt(s * 100);
    v = parseInt(v * 100);
    return [h, s, v]
}




export function tempToRgb(temp,hex){
	let calTemp = temp/100;
	let red = 255;
	let green = 255;
	let blue =255;
	if(calTemp<=66)
	{
		red = 255;
	}
	else{
		red = calTemp - 60;
		red = 329.698727446 * (red ^ -0.1332047592)
	}
	red=red<0?0:(red>255?255:red);
	if(calTemp<=66)
	{
		green = calTemp;
		green = 99.4708025861 * Math.log(green) - 161.1195681661
	}
	else{
		green = calTemp - 60
		green = 288.1221695283 * (green ^ -0.0755148492)
	}
	green=green<0?0:(green>255?255:green);
	if(calTemp>=66)
	{
		blue=255;
	}
	else{
		if(calTemp<= 19)
		{
			blue=0;
		}
		else{
			blue = 138.5177312231 * Math.log(calTemp - 10) - 305.0447927307;
		}
	}
	blue=blue<0?0:(blue>255?255:blue);
	if(!hex)
	{
		return "rgb("+red+","+green+","+blue+")"
	}
	return "#" + ((1 << 24) + (parseInt(red) << 16) + (parseInt(green) << 8) + parseInt(blue)).toString(16).slice(1);
	
}