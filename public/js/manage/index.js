;(function($,window){

    var training = {
        init : function(){
            this.winH = $(window).height();
            this.winW = $(window).width();
            this._handleLiClick();
            this._searchClick();
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
                $('.training-iframe').attr('src',_link);
                $('.training-iframe').css("display","block");
            })
        },
        
        //搜索点击事件
        _searchClick : function(){
        var that = this, _link = '';
        $('body').on('click','.manage-head .search',function(){
            var searchs = $('.manage-head .search-in').val();
            if(searchs){
                var len = getByteLen(searchs);
                if(len<4){
                    alert('字符小于4');
                }else{
                    $('.bar-option-ul .search-page').addClass('current').siblings('li').removeClass('current');
                    _link = $(this).attr('data-link');
                    $('.training-iframe').attr('src',_link);  
                }          
            }            
        })
        },

    }

    $(document).ready(function(){
        training.init();
        // $('.training-iframe').teoyallScroll();
    })

    window.training = training;

}(jQuery,window));