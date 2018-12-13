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
            if(ten>4){
            $.ajax({
				url: '/yike/manage/search/user',
				type: 'POST',
				data: {searchs:searchs},
				success: function(data){
					if(data.success){
						var aa = data.context.vacation;
						if(aa.length>0){
							html +='<tr><th><i></i><span>序号</span></th>'+
							'<th>头像</th><th>用户名</th><th>邮箱</th><th>性别</th><th>生日</th>'+
							'<th>注册时间</th><th>是否在线</th><th>操作</th></tr>';
							//console.log(aa);
							aa.map(function(ver){
							html += '<tr><td>';
							if(ver.admin){
								html +='<span class="admin"></span>';
							}else{
								html +='<i data-id="'+ver.id+'"></i>';
							}
							
							html+='<span>'+ver.d+'</span></td>'+
							'<td><div class="img"><img src="/vacation-photo/'+ver.imgurl+'"></div></td>'+
							'<td>'+ver.name+'</td>'+
							'<td>'+ver.email+'</td>'+
							'<td>'+ver.sex+'</td>'+
							'<td>'+ver.birth+'</td>'+
							'<td>'+ver.registerdate+'</td>'+
							'<td>'+ver.online+'</td>';
							if(ver.admin){
								html +='<td></td>';
							}else{
								html +='<td><span class="td-sixin">私信</span><span class="td-delete">删除</span></td>';
							}
							html +='</tr>';
							})
							$('.user-table table').html(html);
						}else{
							$('.user-table table').html('无数据');
						}
					}else{
						console.log('返回数据失败');
					}
				},
				error: function(){
					console.log('出现问题');
				}
			});
        }else{
			html +='<input type="search" placeholder="搜索用户，群，消息" class="search-in">'+
			'<button class="search" name="search"></button>';
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