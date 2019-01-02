/**
 * 兼容IE8浏览器的滚动条插件
 * version：2.1（测试版）
 * author：weixiaoxin
 * modification date：2018-03-28
 */
//监控DIV resize事件插件
;(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.get(0).scrollWidth,h:l.get(0).scrollHeight});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.get(0).scrollWidth;r.h=p!==c?p:q.get(0).scrollHeight;n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.get(0).scrollWidth,l=n.get(0).scrollHeight,o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);
;(function($, window){
    $.fn.teoyallScroll = function(options) {
        var opts = $.extend({
            skin: '',
            conced: 0,   // 退让距离，false时为覆盖在内容上方；距离值时为内容的padding值；
            standBar: true,     //是否显示纵向滚动条
            acrossBar: false,   //是否显示横向滚动条
            borderRadius: 0,    //圆角尺寸；
            scrollWidth: '8px', //滚动条宽度；
            bottomFixed: false,           //固定模式，1为内容更改后，滚动条不变，2为内容更改后滚动条始终保持在底部
            rightFixed: false,           //固定模式，1为内容更改后，滚动条不变，2为内容更改后滚动条始终保持在右部
            autoResetRraw: false,   //是否开启自动重绘
            autoHideScroll: false,
            beforeFn: $.noop,   //滚动条未挂载到HTML时的回调函数；
            afterFn: $.noop,    //滚动条刚挂载完成触发的回调函数；
            scrollFn: $.noop,   //滚动条滚动的时触发的回调函数，提供一个参数（当前的滚动距离）；
            afterScrollFn: $.noop   //滚动条停止滚动触发的回调函数，提供一个参数（当前的滚动距离）；
        }, options);

        return this.each(function(){
            var $this = $(this),
                position = $this.css('position'),
                screenW = $this.outerWidth(),       //div的宽度（滚动条包装器的宽度）
                screenH = $this.outerHeight(),      //div的高度（滚动条包装器的高度）
                mainH = 0,                          //包装内容的可视高度
                mainW = 0,                          //包装内容的可视宽度
                contH = 0,                          //包装内容的总高度
                contW = 0,                          //包装内容的总宽度
                $main = $('<div class="zr-scroll-main">'),      //原来内容封装容器
                $standScrollMode = $('<div class="zr-stand-scroll-mode">'),    //滚动条模块
                $standScrollWrap = $('<div class="zr-stand-scroll-wrap">'),    //滚动条滚动区域包装器
                $standScrollBar = $('<div class="zr-stand-scroll-bar">'),      //滚动条对象
                $acrossScrollMode = $('<div class="zr-across-scroll-mode">'),    //滚动条模块
                $acrossScrollWrap = $('<div class="zr-across-scroll-wrap">'),    //滚动条滚动区域包装器
                $acrossScrollBar = $('<div class="zr-across-scroll-bar">'),      //滚动条对象
                $topBtn = $('<div class="zr-scroll-top-btn">'),
                $bottomBtn = $('<div class="zr-scroll-bottom-btn">'),
                $leftBtn = $('<div class="zr-scroll-left-btn">'),
                $rightBtn = $('<div class="zr-scroll-right-btn">'),
                restStyle = {},
                top = 0,
                left = 0,
                contTop = 0,        //内容div的滚动top
                contLeft = 0,       //内容div的滚动left
                standScrollH = 0,   //滚动条容器的高度值
                acrossScrollW = 0,  //滚动条容器的宽度值
                standBarH = 0,      //滚动条的高度
                acrossBarW = 0,     //滚动条的宽度
                standRatio = 0,     
                acrossRatio = 0,
                nowScroll = 'y',
                scroll = true,
                speed = 0,
                handle = {},
                initW = 0,  // $main的宽度；
                initH = 0,  // $main的高度；
                choke = null;

            // 绑定事件
            function addEvent(obj, ev, fn) {
                if (obj.attachEvent) {
                    obj.attachEvent('on' + ev, fn);
                } else {
                    obj.addEventListener(ev, fn, false);
                }
            }

            // 函数节流工具
            function Choke(speed) {
                this.n = 0;
                this.speed = speed || 2;
            };
            Choke.prototype.play = function (callBack) {
                this.n++;
                if ((this.n % this.speed) === 0) {
                    callBack && callBack();
                    if (this.n > 10000000) this.n = 0;
                }
            }

            choke = new Choke(2);
            
            handle.toScrollBottom = function() {
                top = standScrollH - standBarH;
                contTop = contH - mainH;
                $standScrollBar.css('top', top);
                $main.scrollTop(contTop);
            }

            handle.toScrollTop = function() {
                top = 0;
                contTop = 0;
                $standScrollBar.css('top', top);
                $main.scrollTop(contTop);
            }

            handle.toScrollRight = function() {
                left = acrossScrollW - acrossBarW;
                contLeft = contW - mainW;
                $acrossScrollBar.css('left', left);
                $main.scrollLeft(contLeft);
            }

            handle.toScrollLeft = function() {
                left = 0;
                contLeft = 0;
                $acrossScrollBar.css('left', left);
                $main.scrollLeft(contLeft);
            }

            handle.restDrawScroll = function() {
                restWidthAndHeight();
            }

            // 重新计算内容区域宽高
            var restMainWidthAndHeight = function () {
                screenW = $this.outerWidth();
                screenH = $this.outerHeight();
                if (opts.standBar && opts.conced) {
                    restStyle.paddingRight = parseInt(opts.conced);
                    mainH = screenH - parseInt(opts.conced);
                } else {
                    restStyle.paddingRight = 0;
                    mainH = screenH;
                }
                if (opts.acrossBar && opts.conced) {
                    restStyle.paddingBottom = parseInt(opts.conced);
                    mainW = screenW - parseInt(opts.conced);
                } else {
                    restStyle.paddingBottom = parseInt(opts.conced);
                    mainW = screenW;
                }
            }

            // 重置竖向滚动条
            var restStandScroll = function() {
                if(opts.acrossBar && contW > screenW) {
                    mainH = screenH - parseInt(opts.conced);
                }else {
                    mainH = screenH;
                }
                $standScrollMode.css({
                    display: 'block',
                    height: mainH
                });
                standRatio = mainH / contH;
                standScrollH = $standScrollWrap.outerHeight(true);
                standBarH = Math.round(standScrollH * standRatio);
                $standScrollBar.css('height', standBarH);
                if(opts.bottomFixed) {
                    top = standScrollH - standBarH;
                    contTop = contH - mainH;
                }
                $standScrollMode.css('display', 'block');
                $standScrollBar.css('top', top);
                $main.scrollTop(contTop);
            }

            // 重置横向滚动条
            var restAcrossScroll = function() {
                if(opts.standBar && contH > screenH) {
                    mainW = screenW - parseInt(opts.conced);
                }else {
                    mainW = screenW;
                }
                $acrossScrollMode.css({
                    display: 'block',
                    width: mainW
                });
                acrossRatio = mainW / contW;
                acrossScrollW = $acrossScrollWrap.outerWidth(true);
                acrossBarW = Math.round(acrossScrollW * acrossRatio);
                $acrossScrollBar.css('width', acrossBarW);
                if(opts.rightFixed) {
                    left = acrossScrollW - acrossBarW;
                    contLeft = contW - mainW;
                }
                $acrossScrollMode.css('display', 'block');
                $acrossScrollBar.css('left', left);
                $main.scrollLeft(contLeft);
            }

            //重新绘制滚动条
            var restWidthAndHeight = function() {
                contH = $main.get(0).scrollHeight;
                contW = $main.get(0).scrollWidth;
                if(opts.standBar) {
                    if( contH <= screenH ) {
                        contTop = 0;
                        top = 0;
                        $this.css('paddingRight', 0);
                        $standScrollMode.css('display', 'none');
                        scroll = false;
                    }else {
                        scroll = true;
                        restStandScroll();
                    }
                }
                if(opts.acrossBar) {
                    if( contW <= screenW ) {
                        $this.css('paddingBottom', 0);
                        $acrossScrollMode.css('display', 'none');
                    }else {
                        restAcrossScroll();
                    }
                }
            }

            /**
             * 初始化滚动条界面
             * 包装滚动条和内容，并重载样式
             */
            $main.css({
                position: 'relative',
                width: '100%',
                height: '100%',
                boxSizing: $this.css('boxSizing'),
                paddingLeft: parseInt($this.css('paddingLeft')),
                paddingTop: parseInt($this.css('paddingTop')),
                paddingRight: parseInt($this.css('paddingRight')),
                paddingBottom: parseInt($this.css('paddingBottom')),
                overflow: 'hidden',
                transform: 'translate3d(0, 0, 0)'
            });
            if(opts.skin) {
                $this.addClass(opts.skin + ' zr-global-scroll');
            }else {
                $this.addClass('zr-global-scroll');
            }
            if(opts.autoHideScroll) {
                $this.addClass('scroll-toggle-animation');
            }
            if(position === 'static') {
                restStyle.position = 'relative'
            }
            restMainWidthAndHeight();
            restStyle.paddingTop = 0;
            restStyle.paddingLeft = 0;
            restStyle.overflow = 'hidden';
            restStyle.boxSizing = 'box-sizing';
            opts.beforeFn && opts.beforeFn();
            $main.append($this.children());
            $this.html('').append($main).css(restStyle);
            if(opts.standBar) {
                $standScrollMode.append($standScrollWrap.css({
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }).append($topBtn).append($standScrollBar.css({
                    position: 'absolute',
                    borderRadius: opts.borderRadius,
                    width: '100%',
                    transform: 'translate3d(0, 0, 0)'
                })).append($bottomBtn)).css({
                    width: opts.scrollWidth,
                    height: mainH
                });
                $this.append($standScrollMode);
                standScrollH = $standScrollWrap.outerHeight(true);
            }
            if(opts.acrossBar) {
                $acrossScrollMode.append($acrossScrollWrap.css({
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }).append($leftBtn).append($acrossScrollBar.css({
                    position: 'absolute',
                    borderRadius: opts.borderRadius,
                    height: '100%',
                    transform: 'translate3d(0, 0, 0)'
                })).append($rightBtn)).css({
                    width: mainW,
                    height: opts.scrollWidth
                });
                $this.append($acrossScrollMode);
                acrossScrollW = $acrossScrollWrap.outerWidth(true);
            }
            initW = $main.outerWidth();
            initH = $main.outerHeight();
            restWidthAndHeight();
            opts.afterFn && opts.afterFn(handle);
            // 初始化过程结束

            /**
             * 滚动条操作，拖拽和滚轮操作，并促发相应的回调函数
             */
            $standScrollBar.on('mousedown', function(e){
                var startY = e.pageY,
                    move = 0,
                    startTop = top;
                nowScroll = 'y';
                $standScrollMode.addClass('show-opacity');
                $acrossScrollMode.addClass('show-opacity');
                $(document).on('mousemove.scrollM', function(e) {
                    move = e.pageY - startY;
                    if( startTop + move <= 0 ) {
                        top = 0;
                        contTop = 0;
                    }else if( startTop + move > standScrollH - standBarH) {
                        top = standScrollH - standBarH;
                        contTop = contH - mainH;
                    }else {
                        top = startTop + move;
                        contTop = Math.round( contH * (top / standScrollH) );
                    }
                    $standScrollBar.css('top', top);
                    $main.scrollTop(contTop);
                    opts.scrollFn && opts.scrollFn(nowScroll, contTop);
                    return false;
                });
                $(document).on('mouseup.scrollU', function(){
                    $standScrollMode.removeClass('show-opacity');
                    $acrossScrollMode.removeClass('show-opacity');
                    opts.afterScrollFn && opts.afterScrollFn(nowScroll, contTop);
                    $(document).off('mousemove.scrollM').off('mouseup.scrollU');
                });
                return false;
            });
            $acrossScrollBar.on('mousedown', function(e){
                var startX = e.pageX,
                    move = 0,
                    startLeft = left;
                nowScroll = 'x';
                $standScrollMode.addClass('show-opacity');
                $acrossScrollMode.addClass('show-opacity');
                $(document).on('mousemove.scrollM', function(e) {
                    move = e.pageX - startX;
                    if( startLeft + move <= 0 ) {
                        left = 0;
                        contLeft = 0;
                    }else if( startLeft + move > acrossScrollW - acrossBarW) {
                        left = acrossScrollW - acrossBarW;
                        contLeft = contW - mainW;
                    }else {
                        left = startLeft + move;
                        contLeft = Math.round( contW * (left / acrossScrollW) );
                    }
                    $acrossScrollBar.css('left', left);
                    $main.scrollLeft(contLeft);
                    opts.scrollFn && opts.scrollFn(nowScroll, contLeft);
                    return false;
                });
                $(document).on('mouseup.scrollU', function(){
                    $standScrollMode.removeClass('show-opacity');
                    $acrossScrollMode.removeClass('show-opacity');
                    opts.afterScrollFn && opts.afterScrollFn(nowScroll, contLeft);
                    $(document).off('mousemove.scrollM').off('mouseup.scrollU');
                });
                return false;
            });
            //滚动滚轮操作纵向滚动条上下滚动
            if(opts.standBar) {
                $this.on('mouseover', function(){
                    var n = contH / mainH;
                    if( n  > 8 ) {
                        speed = Math.ceil( mainH / 2 );
                    }else {
                        speed = Math.ceil( mainH / 4 );
                    }
                    if(scroll) {
                        $this.on("mousewheel.mouseW1 DOMMouseScroll.domS1", function (e) {
                            // 兼容chrome & ie  || firefox
                            var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
                            if( delta > 0 ) {  //向上滚
                                contTop = contTop - speed;
                            }else if( delta < 0) {  //向下滚
                                contTop = contTop + speed;
                            }
                            if( contTop <= 0 ) {
                                top = 0;
                                contTop = 0;
                            }else if( contTop >= contH - mainH ) {
                                top = standScrollH - standBarH
                                contTop = contH - mainH;
                            }else {
                                top = Math.round( standScrollH * ( contTop / contH ) );
                            }
                            $standScrollBar.css('top', top);
                            $main.scrollTop(contTop);
                            opts.afterScrollFn && opts.afterScrollFn('y', contLeft);
                            return false;
                        });
                    }
                    $this.on('mouseout', function(){
                        $this.off('mousewheel.mouseW1').off('DOMMouseScroll.domS1');
                        $this.off('mouseout');
                    });
                });
            }
            //开启自动监控内容大小变化触发重绘滚动条
            if(opts.autoResetRraw) {
                $main.on('resize', function(){
                    restWidthAndHeight();
                });
                addEvent(window, 'resize', function(){
                    // choke.play(function(){
                        var w = $main.outerWidth(),
                            h = $main.outerHeight();
                        if (h != initH || w != initW) {
                            restMainWidthAndHeight();
                            restWidthAndHeight();
                            initW = w;
                            initH = h;
                        }
                    // });
                });
            }
        });
    }
}(jQuery, window));