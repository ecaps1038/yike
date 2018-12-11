;(function($,window){

    var training = {
        init : function(){
            this._groupRegist();
            this._handleChose();
            this._length = 0;
            this.heightArr = [];
            var _this = this;

        },
       
        // 用户数据
        _groupRegist : function(){
        	var $count =$('.count');
        	var html = '';
        	$.ajax({
				url: '/yike/manage/group/groupRegist',
				type: 'POST',
				data: '',
				success: function(data){
					if(data.success){
						var num = 0;
						var aa = data.context;
						$count.html(aa.i);
						aa.vacation.map(function(ver){
							if(ver){
								num += ver.j;
								html +='<li><div class="li-inner"><span>'+ver.j+'</span><i style="height:'+ver.j*2+'px"></i><span class="inst-date">'+ver.d+'</span></div></li>';
							}
						});
						var lastlth = aa.i-num;
						html += '<li><div class="li-inner"><span>'+lastlth+'</span><i style="height:'+lastlth*2+'px"></i><span class="inst-date">'+aa.ld+'</span></div></li>';
						$('.detial-count ul').html(html);
						//处理翻页
						var page = Math.ceil(aa.i/8);
						pages(page);
					}
					else{
					console.log('返回数据失败');
					}
				},
				error: function(){
					console.log('出现问题');
				}
			});
        },

 		// 翻页选择
        _handleChose:function(){
            $('body').on('click','.page ul span li',function(){
            	var length = $('.page ul span li').length-1;
            	var lasthtml = $('.page ul span li').eq(length).html();
            	var lastnum = parseInt(lasthtml);
                $(this).addClass('select').siblings('li').removeClass('select');
                var num = parseInt($(this).html());
                console.log(num);
                var index = $(this).index();
                var html ='';
                acpage(num,lastnum,html);
                grouptab(num);
            })
        },
 		// 群数据
        _groupTable : function(){
        	var html = '';
        	$.ajax({
				url: '/yike/manage/group/groupTable',
				type: 'POST',
				data: '',
				success: function(data){
					if(data.success){
						var aa = data.context.vacation;
						//console.log(aa);
						aa.map(function(ver){
						html += '<tr><td><i></i><span>'+ver.d+'</span></td>'+
						'<td><div class="img"><img src="/group-photo/'+ver.icon+'"></div></td>'+
						'<td>'+ver.name+'</td>'+
						'<td>'+ver.admin+'</td>'+
						'<td>'+ver.intro+'</td>'+
						'<td>'+ver.time+'</td>'+
						'<td><span class="td-sixin">私信</span><span class="td-delete">删除</span></td>';
						html +='</tr>';
						})
						$('.user-table table').append(html);
					}
					else{
					console.log('返回数据失败');
					}
				},
				error: function(){
					console.log('出现问题');
				}
			});
        },
    }

	function grouptab(num){
    	var html = '';
    	$.ajax({
			url: '/yike/manage/group/groupTable',
			type: 'POST',
			data: {num:num},
			success: function(data){
				if(data.success){
					var aa = data.context.vacation;
					html +='<tr><th><i></i><span>序号</span></th>'+
				'<th>头像</th><th>群名</th><th>创建者id</th>'+
				'<th>说明</th><th>注册时间</th><th>操作</th></tr>';
					//console.log(aa);
					aa.map(function(ver){
					html += '<tr><td><i></i><span>'+ver.d+'</span></td>'+
					'<td><img src="/group-photo/'+ver.icon+'"></td>'+
					'<td>'+ver.name+'</td>'+
					'<td>'+ver.admin+'</td>'+
					'<td>'+ver.intro+'</td>'+
					'<td>'+ver.time+'</td>'+
					'<td><span class="td-sixin">私信</span><span class="td-delete">删除</span></td>';
					html +='</tr>';
					})
					$('.user-table table').append(html);
				}
				else{
				console.log('返回数据失败');
				}
			},
			error: function(){
				console.log('出现问题');
			}
		});
    }
    grouptab(1);
        $(document).ready(function(){
        training.init();
        // $('.training-iframe').teoyallScroll();
    })

    window.training = training;

}(jQuery,window));