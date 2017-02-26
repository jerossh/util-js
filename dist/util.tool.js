
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
  },

  handleTouchEvent: function (event) {
    // var root =  document.querySelector(ele);
    var start = {} ,end = {},direction, x, y;
    if (event.touches.length === 1) {
      switch (event.type) {
        case 'touchstart':
          start.x = event.touches[0].clientX;
          start.y = event.touches[0].clientY;
          break;
        case 'touchend':
          end.x = event.changedTouches[0].clientX;
          end.y = event.changedTouches[0].clientY;
          break;
        case 'touchmove':
          event.preventDefault();
          break;
        default:
      }
    }
    x = end.x - start.x;
    y = end.y - start.y;
    if (Math.abs(x) - Math.abs(y) >= 0) {  // 水平优先
      direction = x > 0 ? 'right': 'left';
    } else {
      direction = y > 0 ? 'bottom' : 'top';
    }
    return direction
  }  // handleTouchEvent
}

window.util = util;


var start = {} ,end = {},direction, x, y;
var handleTouchEvent = function (event) {
  console.log(event.type);
  if (event.touches.length === 1) {
    switch (event.type) {
      case 'touchstart':
        event.preventDefault()
        start.x = event.touches[0].clientX;
        start.y = event.touches[0].clientY;
        console.log('点击位置',start);
        break;
      case 'touchmove':
        event.preventDefault();
        break;
      default:
        console.log('nothing');
    }
  }
}  // handleTouchEvent

var handleTouchend = function () {
  console.log('没有结束？');
  end.x = event.changedTouches[0].clientX;
  end.y = event.changedTouches[0].clientY;
  x = end.x - start.x;
  y = end.y - start.y;

  if (Math.abs(x) - Math.abs(y) >= 0) {  // 水平优先
    direction = x > 0 ? 'right': 'left';
  } else {
    direction = y > 0 ? 'bottom' : 'top';
  }
  return direction
}
document.addEventListener('touchstart', handleTouchEvent);
document.addEventListener('touchend', handleTouchend);
document.addEventListener('touchmove', handleTouchEvent);
