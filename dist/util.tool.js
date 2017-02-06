// 判定是否是移动版
function isMobile() {
   return navigator.userAgent.indexOf('Mobile') !== -1 || navigator.userAgent.indexOf('Android') !== -1;
}

// 获取带协议的host地址，有不支持 window.location.origin
function getLocationOrigin() {
    var origin = window.location.origin;
    if (!window.location.origin) {
        origin = "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
    }
    return origin;
}
