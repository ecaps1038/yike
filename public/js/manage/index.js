;(function($,window){

    var training = {
        init : function(){
            this.winH = $(window).height();
            this.winW = $(window).width();
            this._handleLiClick();
            this._length = 0;
            this.height = 0;
            this.heightArr = [];
            this._coverShow = false;
            var _this = this;

            $(window).on('resize', function(){
                _this.winH = $(window).height();
                _this.winW = $(window).width();
                if (_this._coverShow) {
                    _this._computeCoverImgHeight();
                }
            });
        },
       
        // 左侧导航栏点击事件
        _handleLiClick : function(){
            var _has = '',that = this,_link = '';
            $('body').on('click','.bar-option-ul li',function(){
                $(this).addClass('current').siblings('li').removeClass('current');
                // 修改取消任务按钮
                _link = $(this).attr('data-link');
                
                // 修改标
                // $('.training-iframe-div').css('height','623px');
                //$('.manage').removeAttr('style');
                //$('.body-title').text($(this).text());
                $('.training-iframe').attr('src',_link);
            })
        },
        
        // 处理点击跳转
        _handleClick : function(){
            var _num = this._length,_newindex = 0,that = this,_middleH = 0;
            $('body').on('click','.common-sec',function(){
                if($(this).hasClass('left-sec')){
                    _newindex--;
                    _newindex < 0 ? _newindex = 0 : _newindex = _newindex;
                }else{
                    _newindex++;
                    _newindex >= _num ? _newindex = _num - 1 : _newindex = _newindex;
                }
                $('.show-current').text((_newindex+1)+'/'+_num);
                $('.img-ul').stop().animate({'left':-_newindex  + '00%'});
                // _middleH = that.heightArr[_newindex] > that.height ? that.heightArr[_newindex] : that.height;
                // $('#img_inner_cover').css('height',_middleH + 20 +'px');
            })
        },

    }
    $(document).ready(function(){
        training.init();
        // $('.training-iframe').teoyallScroll();
    })

    window.training = training;

}(jQuery,window));