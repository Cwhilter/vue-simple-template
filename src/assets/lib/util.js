const toString = Object.prototype.toString;
export const dateFormat = function(fmt,timestamp) {
    timestamp = timestamp ? timestamp : Date.now();
    let time = new Date(timestamp);
    var o = {
      "M+": time.getMonth() + 1, //月份
      "d+": time.getDate(), //日
      "h+": time.getHours(), //小时
      "m+": time.getMinutes(), //分
      "s+": time.getSeconds(), //秒
      "q+": Math.floor((time.getMonth() + 3) / 3), //季度
      S: time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1,(time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
};
/**
 * 节流函数生成器
 * 对于调用频繁的地方，可保障在设置时间内只执行1次。
 * 使用方法:
 *
 * const currentThrottle = generateThrottle() //生成一个节流函数
 * currentThrottle(Data.now()) //如果超过了阈值则返回true，否则返回false
 *
 * @param throttleTime 设置此生成器的阈值
 */
export const generateThrottle = function (throttleTime) {
    let time = Date.now()
    return function (now) {
        // 如果没有设置节流时间， 使用默认配置的时间 14毫秒
        if (now - time > (throttleTime || 14)) {
            time = now
            return true
        }
    }
}

/**
 * 防抖。func函数在最后一次调用时刻的wait毫秒之后执行！
 * @param func 执行函数
 * @param wait 时间间隔
 * @param immediate 为true，debounce会在wai 时间间隔的开始调用这个函数
 * @returns {Function}
 */
export const debounce = function (func, wait, immediate) {
    var timeout, args, context, timestamp, result

    var later = function () {
        var last = new Date().getTime() - timestamp // timestamp会实时更新

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function () {
        context = this
        args = arguments
        timestamp = new Date().getTime()
        var callNow = immediate && !timeout

        if (!timeout) {
            timeout = setTimeout(later, wait)
        }
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }
        return result
    }
}
export const EventUtil = {
    // 添加事件监听
    add: function (element, type, callback) {

        if (element.addEventListener) {
            element.addEventListener(type, callback, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, callback);
        } else {
            element['on' + type] = callback;
        }
    },

    // 移除事件监听
    remove: function (element, type, callback) {

        if (element.removeEventListener) {
            element.removeEventListener(type, callback, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, callback);
        } else {
            element['on' + type] = null;
        }

    },

    // 跨浏览器获取 event 对象
    getEvent: function (event) {

        return event ? event : window.event;
    },

    // 跨浏览器获取 target 属性
    getTarget: function (event) {

        return event.target || event.srcElement;
    },

    preventDefault: function (event) {

        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    // 阻止事件流或使用 cancelBubble
    stopPropagation: function (event) {

        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    getWheelDelta: function (event) {
        if (event.wheelDelta) {
            return event.wheelDelta;
        }
        else {
            return -event.detail * 40;
        }
    }

}
export const judgeType = {
    isArray: function (v) {
        return toString.apply(v) === '[object Array]';
    },
    isDate: function (v) {
        return toString.apply(v) === '[object Date]';
    },
    isObject: function (v) {
        return !!v && toString.call(v) === '[object Object]';
    },
    isFunction: function (v) {
        return toString.apply(v) === '[object Function]';
    },
    isNumber: function (v) {
        return typeof v === 'number' && isFinite(v);
    },
    isString: function (v) {
        return typeof v === 'string';
    },
    isBoolean: function (v) {
        return typeof v === 'boolean';
    },
    isElement: function (v) {
        return v ? !!v.tagName : false;
    },
    isDefined: function (v) {
        return typeof v !== 'undefined';
    }
};

export const client =  function () {

    //呈现引擎
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //完整的版本号
        ver: null
    };


    //浏览器
    var browser = {
        //主要浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        //具体的版本号
        ver: null
    };


    //平台,设备的操作系统
    var system = {
        win: false,
        mac: false,
        xll: false,
        //移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        //游戏系统
        will: false,
        ps: false
    };

    //检测呈现引擎和浏览器
    var ua = navigator.userAgent;
    if (window.opera) {
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        engine.ver = RegExp.$1;
        engine.webkit = parseFloat(engine.ver);
        //确定是chrome还是Safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp.$1;
            browser.chrome = parseFloat(browser.ver);
        } else {
            //近似地确定版本号
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }
            browser.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp.$1;
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.ver = RegExp.$1;
        engine.gecko = parseFloat(engine.ver);
        //确定是不是firefox
        if (/Firefox\/(\S+)/.test(ua)) {
            browser.ver = RegExp.$1;
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp.$1;
        engine.ie = browser.ie = parseFloat(engine.ver);
    }
    //检测浏览器
    browser.ie = engine.ie;
    browser.opera = engine.opera;

    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.xll = (p == "Xll") || (p.indexOf("Linux") == 0);

    //检测Windows操作系统
    if (system.win) {
        if (/Win(?:dows)?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {

            if (RegExp.$1 == "NT") {
                switch (RegExp.$2) {
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    default:
                        system.win = "NT";
                        break;
                }
            } else if (RegExp.$1 == "9x") {
                system.win = "ME";
            } else {
                system.win = RegExp.$1;
            }
        }
    }

    //移动设备
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;
    //windos mobile
    if (system.win == "CE") {
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if (/Windows Phone OS (\d+. \d)/.test(ua)) {
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp.$1);
        }
    }
    //检测iOS 版本
    if (system.mac && ua.indexOf("Mobile") > -1) {
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } else {
            system.ios = 2; //不能真正检测出来,所以只能猜测
        }
    }
    //检测Android版本
    if (/Android (\d+\. \d+)/.test(ua)) {
        system.android = parseFloat(RegExp.$1);
    }
    //游戏系统
    system.will = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);
    //返回这些对象
    return {
        engine: engine,
        browser: browser,
        system: system
    };

}
