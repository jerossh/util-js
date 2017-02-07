;(function($){
  $(document).ready(function() {

    // @Parameter target slide element
    // @Parameter option slide option
    function Jonslide (ele, option) {
      var t = this;
      var defaultOption = {
        showImgcout: 1,           // 已经显示的幻灯片数，默认是一个
        imgStart: 0,
        direction: 'horizontal',    // or 'vertical'
        // direction: 'vertical',    // or 'vertical'
        autoplay: true,           // or 'false'
        circle: true,             // 按钮
        transition: 500,          // 动画时长
        timer: 3500,              // 切换间隔
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
      t.li = t.wrap.find('li');
      t.btn = t.slideRoot.find('.btn');

      t.imgCount = t.li.length;  // 总数
      t.count = t.imgCount - option.showImgcout;  // 切换次数
      t.i = option.imgStart;  // 初始化后的第一张幻灯片， 默认第一张

      if (this.params.direction === 'horizontal') {
        t.styleToDeal = 'margin-left';
        t.li.css('display', 'inline-block');
      } else {
        t.styleToDeal = 'margin-top';
      }

      this.init();
    }

    Jonslide.prototype = {
      constructor: Jonslide,
      init: function() {
        this.slide.css('transition', 'all 0.5s');
        this.direction();
        this.clickBtn();
        this.resize();
        if (this.params.circle) {
          this.circleAdd();
          this.circleClick();
        }
        if (this.params.autoplay) {
          this.autoplay();
        }
      },
      direction: function(val){
        var t = this;
        if (this.params.direction === 'horizontal') {
          var wrapWidth = t.slideRoot.width();  // 直接获取跟元素有bug， 小于原值15像素
          if (val) {
            wrapWidth = val;
          }
          t.distance = wrapWidth;
          t.li.width(wrapWidth);  // 设置幻灯片大小与最外层相同
          t.distance = wrapWidth;

        } else {
          t.distance = t.li.height();
          t.wrap.height(t.distance);
        }
        t.slide.css(t.styleToDeal, -t.distance * t.i);
      },
      next: function (){
        var t = this;
        var styleToDeal = t.styleToDeal;
        if (t.i < t.count) {
          // console.log('下一页');
          var maginLeft = parseInt(t.slide.css(t.styleToDeal), 10);
          t.slide.css(styleToDeal, maginLeft-t.distance);
          t.i++;
        } else {
          t.slide.css(styleToDeal, 0);
          t.i = 0;
        }
        t.circleChange();
      },
      prev: function () {
        var t = this;
        var styleToDeal = t.styleToDeal;
        if (t.i>0) {
          var maginLeft = parseInt(t.slide.css(styleToDeal), 10);
          t.slide.css(styleToDeal, maginLeft + t.distance);
          t.i--;
        } else {
          t.slide.css(styleToDeal, -t.distance * t.count);
          t.i = t.count;
        }
        t.circleChange();
      },
      goInterval: function time() {  // setInterval 有缺陷
        var t = this;
        t.next();
        t.timer = setTimeout(time.bind(t), t.params.timer)
      },
      autoplay: function () {
        var t = this;
        t.timer = setTimeout(function() {
          t.goInterval()
        }, t.params.timer)

        t.wrap.hover(function() { // 鼠标悬停事件
          t.btn.fadeIn();
          clearTimeout(t.timer);
        }, function() {
          t.btn.fadeOut();
          t.goInterval();
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
          t.circleChange();
        });
      },
      circleAdd: function(){
        var t = this;
        for (var i = 0; i < t.imgCount; i++) {
          $('.circle-wrap').append('<div class="circle" data-slide=' + i + '>.</div>')
        }
        t.circle = $('.circle');
        t.circle.eq(t.i).addClass('circle-active')
      },
      circleChange: function() {
        var t = this;
        if (t.params.circle) {
          t.circle.removeClass('circle-active');
          t.circle.eq(t.i).addClass('circle-active');
        } else {
          return false;
        }
      },
      circleClick: function() {
        var t = this;
        t.circle.click(function(){
          var sortId = $(this).data('slide');
          t.i = sortId;
          t.slide.css(t.styleToDeal, -t.distance * t.i);
          t.circleChange();
        })
      },
      resize: function() {
        var t = this;
        var testw1 = this.slideRoot.width();
        var testw2 = this.slideRoot.parent().width();
        this.direction(testw1);
        $(window).resize(function(){
          clearTimeout(t.timer);
          throtle(t.direction, t);
        })
      }
    }

    var throtle = function (method, context) {  // 函数节流
      if (method.tid) clearTimeout(method.tid);
      method.tid = setTimeout(function(){
        method.call(context);
      }, 200);
    }

  window.Jonslide = Jonslide;
  })
})(jQuery)
