;(function($,window){

    var training = {
        init : function(){
            this._msgCount();
            this._handleChose();
            //this._msgTable(1);
            this._page = 0;
            this.heightArr = [];
            var _this = this;

        },
       
        // 用户数据
        _msgCount : function(){
        	var $count =$('.count');
        	var html = '';
        	var that = this;
        	$.ajax({
				url: '/yike/manage/msg/msgCount',
				type: 'POST',
				data: '',
				success: function(data){
					if(data.success){
						var aa = data.context;
						var num = 0;
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
                var index = $(this).index();
                var html ='';
                acpage(num,lastnum,html);
                msg(num);
            })
        },
 		// 群数据
        _msgTable : function(num){
        	var html = '';
        	$.ajax({
				url: '/yike/manage/msg/msgTable',
				type: 'POST',
				data: {num:num},
				success: function(data){
					if(data.success){
						var aa = data.context.vacation;
						console.log(aa);
						aa.map(function(ver){
						html += '<tr><td><i></i><span>'+ver.d+'</span></td>'+
						'<td>'+ver.postMessages+'</td>'+
						'<td>'+ver.status+'</td>'+
						'<td>'+ver.fromUser+'</td>'+
						'<td>'+ver.toUser+'</td>'+
						'<td>'+ver.dateTime+'</td>'+
						'<td><span class="td-delete">删除</span></td>';
						html +='</tr>';
						})
						$('.user-table table').html(html);
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
    // 群数据
    function msg(num){
    	var html = '';
    	$.ajax({
			url: '/yike/manage/msg/msgTable',
			type: 'POST',
			data: {num:num},
			success: function(data){
				if(data.success){
					var aa = data.context.vacation;
					html +='<tr><th><i></i><span>序号</span></th>'+
			'<th>内容</th><th>是否查收</th><th>发送者</th><th>接收者</th>'+
			'<th>发送时间</th><th>操作</th></tr>';
					//console.log(aa);
					aa.map(function(ver){
					html += '<tr><td><i></i><span>'+ver.d+'</span></td>'+
					'<td>'+ver.postMessages+'</td>'+
					'<td>'+ver.status+'</td>'+
					'<td>'+ver.fromUser+'</td>'+
					'<td>'+ver.toUser+'</td>'+
					'<td>'+ver.dateTime+'</td>'+
					'<td><span class="td-delete">删除</span></td>';
					html +='</tr>';
					})
					$('.user-table table').html(html);
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
    msg(1);
    $(document).ready(function(){
        training.init();
        // $('.training-iframe').teoyallScroll();
    })

    window.training = training;

}(jQuery,window));