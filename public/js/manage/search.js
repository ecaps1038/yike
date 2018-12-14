;(function($,window){

    var training = {
        init : function(){
            this._getSearch();
            //this._searchClick();
            
        },
       
        // 左侧导航栏点击事件
        _getSearch : function(){
            var that = this,html = '';
            var searchs = $(window.parent.document).find(".search-in").val();
            var ten = getByteLen(searchs);
            if(ten>=4){
            
        }else{
			html +='<p></p><div class="search-div"><input type="search" placeholder="搜索用户、群、消息" class="search-in">'+
			'<button class="search" name="search"></button></div>';
			$('.head-search').html(html);
		}
        },
        
      //搜索点击事件
      _searchClick : function(){
        var that = this, _link = '';
        $('body').on('click','.manage-head .search',function(){
            var searchs = $('.manage-head .search-in').val();
            if(searchs){
                $('.training-iframe').css("display","none")
            }
            $('.bar-option-ul .search-page').addClass('current').siblings('li').removeClass('current');
            _link = $(this).attr('data-link');
            //$('.training-iframe').attr('src',_link);
        })
      },

      //搜索关键词

    }
    $(document).ready(function(){
        training.init();
        // $('.training-iframe').teoyallScroll();
    })

    window.training = training;

}(jQuery,window));