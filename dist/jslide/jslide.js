;(function($){
  $(document).ready(function() {

    // @Parameter target slide element
    // @Parameter option slide option
    function Jonslide (ele, option) {
      var t = this;
      var defaultOption = {
        showImgcout: 1,  // 已经显示的幻灯片数，默认是一个
        imgStart: 0,
        direction: 'horizontal',  // or 'vertical'
        autoplay: true,  // or 'false'
        transition: 500
      }
      option = option || {};
      for (var prop in defaultOption) {
        if (!option[prop]) {
            option[prop] = defaultOption[prop];  // 不能用点
        }
      }

      this.params = option;
      t.slideRoot = $(ele);  // 获取根元素，用户定义
      t.wrap = t.slideRoot.find('.slideWrap');  // 整个幻灯片的包裹层
      t.slide = t.wrap.find('.slide');  // 幻灯片图片的包裹层
      t.btn = t.slideRoot.find('.btn');
      t.imgCount = t.wrap.find('li').length;  // 总数
      t.count = t.imgCount - option.showImgcout;  // 切换次数
      t.distance = t.wrap.width();  // 切换的距离
      this.i = option.imgStart;  // 初始化后的第一张幻灯片， 默认第一张
      t.styleToDeal = defaultOption.direction === 'horizontal' ? 'margin-left' : 'margin-top';
      t.wrap.find('li').width(t.distance)
      this.init();
    }

    Jonslide.prototype = {
      constructor: Jonslide,
      init: function() {
        this.slide.css('transition', 'all 0.5s');
        this.clickBtn();
        if (this.params.autoplay) {
          this.autoplay();
        }
      },
      next: function (){
        // return false;
        var t = this;
        var styleToDeal = t.styleToDeal;
        if (t.i < t.count) {

          var maginLeft = parseInt(t.slide.css(t.styleToDeal), 10);
          t.slide.css(styleToDeal, maginLeft-t.distance);
          t.i++;
        } else {
          t.slide.css(styleToDeal, 0);
          t.i = 0;
        }
      },
      prev: function () {
        var t = this;
        if (t.i>0) {
          var styleToDeal = t.styleToDeal;
          var maginLeft = parseInt(t.slide.css(styleToDeal), 10);
          t.slide.animate({styleToDeal: maginLeft + t.distance}, 500);
          t.i--;
        } else {
          t.slide.animate({styleToDeal: -t.distance * t.count}, 500);
          t.i = t.count;
        }
      },
      autoplay: function () {
        var t = this;
        t.timer = setInterval(t.next.bind(t), 2000);
        t.slide.hover(function() { // 鼠标悬停事件
          console.log('该停止了');
          clearInterval(t.timer);
        }, function() {
          t.timer = setInterval(t.next.bind(t), 2000);
        });
      },
      clickBtn: function (){
        var t = this;

        t.btn.click(function () {
          if ($(this).hasClass('next')) {
            t.next();
          } else if ($(this).hasClass('prev')) {
            t.prev();
          }
        });
      }
    }

  window.Jonslide = Jonslide;
  })
})(jQuery)
