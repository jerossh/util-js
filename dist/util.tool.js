
var util = {
  isMobile: function () {  // 判定是否是移动版
     return navigator.userAgent.indexOf('Mobile') !== -1 || navigator.userAgent.indexOf('Android') !== -1;
  },
  getLocationOrigin: function () {  // 获取带协议的host地址，有不支持 window.location.origin
      var origin = window.location.origin;
      if (!window.location.origin) {
          origin = '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
      }
      return origin;
  },
  throtle: function (method, context) {  // 函数节流
    clearTimeout(method.tid);
    method.tid = setTimeout(function(){
      method.call(context);
    }, 200);
  }
}

window.util = util;
