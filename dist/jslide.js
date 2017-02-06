;(function($){
  $(document).ready(function() {

    // @Parameter target slide element
    // @Parameter option slide element
    function Jonslide (ele, option) {
      var t = this;
      var defaultOption = {
        showImgcout: 1,  // 已经显示的幻灯片数，默认是一个
        imgStart: 0,
        direction: 'horizontal' // or 'vertical'
      }
      option = option || {};
      for (var prop in defaultOption) {
        if ('undefined' === option.prop) {
            option.prop = defaultOption.prop;
        }
      }

      t.slideRoot = $(ele);  // 获取根元素，用户定义
      t.wrap = t.slideRoot.find('.slideWrap');  // 整个幻灯片的包裹层
      t.slide = t.wrap.find('.slide');  // 幻灯片图片的包裹层
      t.left = t.slideRoot.find('.btn');
      t.imgCount = t.wrap.find('li').length;  // 总数
      t.count = t.imgCount - option.showImgcout;  // 切换次数
      t.distance = t.wrap.find('li').width;  // 切换的距离
      t.i = option.imgStart;  // 初始化后的第一张幻灯片， 默认第一张
    }

    Jonslide.prototype = {
      constructor: Jonslide,
      play: function (){
        var t = this;
        if (t.i < t.count) {
          var maginLeft = parseInt(t.slide.css('margin-left'), 10);
          t.slide.animate({'margin-left': maginLeft - t.distance}, 500);
          t.i++;
        } else {
          t.box.animate({'margin-left': 0}, 500);
          t.i = 0;
        }
      },
      events: function (){
        var t = this;

        t.slide.hover(function() {
          clearInterval(t.play);
        }, function() {
          t.toScroll = setInterval(t.play, 2000);
        });
        t.left.click(function () {

        })
        t.right.click(function () {
        })


      }


    }


  })
})(jQuery)
