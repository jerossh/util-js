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
        transition: 500,
        timer: 3500,
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
      t.wrap.find('li').width(t.distance);  // 设置幻灯片大小与最外层相同
      this.init();
    }

    Jonslide.prototype = {
      constructor: Jonslide,
      init: function() {
        this.slide.css('transition', 'all 0.5s');
        this.clickBtn();
        this.circleAdd();
        this.circleClick();
        if (this.params.autoplay) {
          this.autoplay();
        }
      },
      next: function (){
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
      autoplay: function () {
        var t = this;
        t.timer = setInterval(t.next.bind(t), t.params.timer);
        t.wrap.hover(function() { // 鼠标悬停事件
          console.log('该停止了');
          t.btn.fadeIn()
          clearInterval(t.timer);
        }, function() {
          console.log('启动了');
          t.btn.fadeOut();
          t.timer = setInterval(t.next.bind(t), t.params.timer);
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
        t.circle.removeClass('circle-active');
        t.circle.eq(t.i).addClass('circle-active');
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
