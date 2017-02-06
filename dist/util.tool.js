// 判定是否是移动版
var isMobile = function () {
   return navigator.userAgent.indexOf('Mobile') !== -1 || navigator.userAgent.indexOf('Android') !== -1;
}

// 获取带协议的host地址，有不支持 window.location.origin
var getLocationOrigin =function () {
    var origin = window.location.origin;
    if (!window.location.origin) {
        origin = "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
    }
    return origin;
}

// setTimeout 来模拟 setInterval
var i = 0
var setTimeInterval = function time(){ //每隔1秒让++i
 console.log(++i);
 setTimeout(time, 1000);
}
