;(function($){
  $(document).ready(function() {

    // @Parameter target slide element
    // @Parameter option slide option
    function Jonslide (ele, option) {
      var t = this;
      var defaultOption = {
        showImgcout: 1,           // 已经显示的幻灯片数，默认是一个
        imgStart: 0,
        direction: 'vertical',  // or 'vertical'
        autoplay: true,           // or 'false'
        circle: true,            // 按钮
        transition: 500,          // 动画时长
        timer: 3500,              // 事件间隔

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
      t.li = t.wrap.find('li');
      t.imgCount = t.li.length;  // 总数
      t.count = t.imgCount - option.showImgcout;  // 切换次数
      t.i = option.imgStart;  // 初始化后的第一张幻灯片， 默认第一张

      var wrapWidth = t.wrap.width();
      t.li.width(wrapWidth);  // 设置幻灯片大小与最外层相同


      if (option.direction === 'horizontal') {
        t.slide.width(wrapWidth*t.imgCount)
        t.distance = wrapWidth;
        t.styleToDeal = 'margin-left';
        t.li.css('display', 'inline-block');
      } else {
        t.distance = t.li.height();
        t.wrap.height(t.distance);
        t.styleToDeal = 'margin-top';
      }

      this.init();
    }

    Jonslide.prototype = {
      constructor: Jonslide,
      init: function() {
        this.slide.css('transition', 'all 0.5s');
        this.clickBtn();
        if (this.params.circle) {
          this.circleAdd();
          this.circleClick();
        }
        if (this.params.autoplay) {
          this.autoplay();
        }
      },
      next: function (){
        var t = this;
        var styleToDeal = t.styleToDeal;
        if (t.i < t.count) {
          console.log('下一页');
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
        t.goInterval();

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
        console.log(1);
        for (var i = 0; i < t.imgCount; i++) {
          console.log(2);
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
      }
    }

  window.Jonslide = Jonslide;
  })
})(jQuery)
