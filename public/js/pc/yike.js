$(document).ready(function(){
	
	//点击搜索
	$('.searup').on('click',function(evt){
		evt.preventDefault();
		var search = $('.search-main').val();
		var $container = $('.sear');

		if(search.length>0){
			$container.html('无结果');
			gitSearch($container);
		}
	});

    //显示与隐藏申请好友
    $('.add').on('click',function(){
    	$('.adduser').toggle();
    })

	//搜索结果
	function gitSearch(elem){
		var html='';
		$.ajax({
			url: '/search/user',
			type: 'POST',
			data: $('.search').serialize(),
			success: function(data){
				if(data.success){
					var aa = data.context.vacation;
					//console.log(aa)
					if(aa.length>0){
						html +='<p>用户</p>';
						var tt = aa.map(function(ver){
							html+='<a class="search-result" href="/detail?id='+ver.id+'"><img src="/vacation-photo/'+ver.imgurl+'" style="width:60px;"/>'+
							'<span class="name">'+ver.name+'</span><span class="email">'+ver.email+'</span>'+
							"</a>";
						});
						elem.html(html);					
					}
				}
				else{
				elem.html('出现问题');
				}
			},
			error: function(){
				elem.html('出现问题');
			}
		});
		$.ajax({
			url: '/search/group',
			type: 'POST',
			data: $('.search').serialize(),
			success: function(data){
				if(data.success){
					var aa = data.context.vacation;
					if(aa.length>0){
						html +='<p>群</p>';
						var tt = aa.map(function(i){
							html+='<a href="/search-detail?id='+i.id+'"><img src="/group-photo/'+i.icon+'" style="width:60px;"/>'+
							'<span class="name">'+i.name+'</span></a>';
						});
						elem.html(html);
					}
				}
				else{
				elem.html('出现问题');
				}
			},
			error: function(){
				elem.html('出现问题');
			}
		});
	}

	//遍历获取未读信息数及最后通话信息
	function initFriend(){
		$('.other').each(function(){
			var that = $(this);
			var id = $(this).find('.friendid').val();
			var $count = that.find('.count');
	        var $news = that.find('.news');
	        var $time = that.find('.nowtime');
	        var count = $count.html();

			//获取未读数
			$.ajax({
				url: '/imsg',
				type: 'POST',
				data: {id:id},
				success: function(data){
					if(data.success){
						var count = data.rest;
						if(count>0){
							that.find('.count').html(count).css('display','block');

						}else{
							that.find('.count').html(0).css('display','none');
						}
					}else{
						console.log('查询失败');
					}
				}
			})

			//最后通话信息
			$.ajax({
				url: '/lastmsg',
				type: 'POST',
				data: {id:id},
				success: function(data){
					if(data.success){
						var count = data.result;
						var nowt = new Date();
						if(count){
							var times = gettime(count.dateTime);

							$news.html(count.postMessages);

							if(nowt-times>1000*60*60*18){
		            		$time.html(changeTime2(count.dateTime));}
		            		else{$time.html(changeTime1(count.dateTime));}
	            		}
					}else{
						console.log('查询失败');
					}
				}
			})
		});
	}
	//获取好友列表
    function getUser(){
    	var userid = $('.userid').val();
    	var markName;
 		$.ajax({
			url: '/getuser',
			type: 'POST',
			data: '',
			success: function(data){
				if(data.success){
					var html='';
					var val = data.context.vacation;
					//console.log(val);
					if(val.length>0){
						val.map(function(i){
							//查看是否有备注名
							if(i.markname){
								markName = i.markname;
							}else{
								markName = i.name;
							}
							html +='<li class="user other" data-link="/chart?id='+i.id+'">'+
							'<input type="hidden" value="'+i.id+'" class="friendid">'+
							'<p class="count"></p>'+
							'<div class="img"><img src="/vacation-photo/'
							+i.imgurl+'"/></div>'+
							'<div class="user-inf"><p class="name">'+markName+'</p>'+
							//'<p class="sex '+i.sex+'"></p>'+
							'<p class="news"></p>'+
							'<p class="nowtime"></p></div>'+
						'</li>'
						});
						$('.userlist').html(html);
						initFriend();
					}
				}else{
					console.log('查询失败');
				}
			}
		})
    }
    getUser();

	//获取好友申请列表
    function getaddfriend(){
    	var userid = $('.userid').val();
    	//alert('aaa')
 		$.ajax({
			url: '/getaddfriend',
			type: 'POST',
			data: '',
			success: function(data){
				if(data.success){
					var html='';
					var val = data.context.vacation;
					if(val.length>0){
						$('.add').show();
						var aa = val.map(function(i){
							html +='<li class="user other">'+
							'<input type="hidden" value="'+i.id+'" class="friendid">'+
							'<p class="count"></p>'+
							'<span data-id="'+i.id+'" class="aggree">同意</span>'+
							'<span data-id="'+i.id+'" class="disaggree">拒绝</span>'+
							'<a href="/detail?id='+i.id+'" class="header"><div class="img"><img src="/vacation-photo/'
							+i.imgurl+'"/></div></a>'+
							'<p class="name">'+i.name+'</p>'+
							'<p class="sex '+i.sex+'"></p>'+
							'<p class="news"></p>'+
							'<p class="nowtime"></p>'+
							
						'</li>'
						});
						$('.adduser').html(html);
						aggreeUser();
						refuseUser();
						//修改申请数
						var len = $('.adduser li').length;
						$('.item').html(len);
						$('.no-friend').hide();
						//获取群最后通话消息及未读数
						initFriend();
					}else{
						$('.add').hide();
						$('.adduser').html('');
					}
				}else{
					console.log('查询失败');
				}
			}
		})
    }
    getaddfriend();

    //同意好友请求
    function aggreeUser(){
    	$('.aggree').on('click',function(){
    		var id = $(this).attr('data-id');
    		$.ajax({
				url: '/yike/aggree',
				type: 'POST',
				data: {id:id},
				success: function(data){
					if(data.success){
						//更新好友列表
						getaddfriend();
						getUser();
						getGroup();
					}else{
						console.log('查询失败');
					}
				}
			})
    	})
    }

    //拒绝好友请求
    function refuseUser(){
    	$('.disaggree').on('click',function(){
    		var id = $(this).attr('data-id');
    		$.ajax({
				url: '/delete-friend',
				type: 'POST',
				data: {id:id},
				success: function(data){
					if(data.success){
						//更新好友列表
						getUser();
						getaddfriend();
						getGroup();
					}else{
						console.log('查询失败');
					}
				}
			})
    	})
    }

	//遍历获取群未读信息数及最后通话信息、
	function getgroupcount(){
		$('.groups').each(function(){
			var that = $(this);
			var id = $(this).find('.groupid').val();
			var $count = that.find('.count');
	        var $news = that.find('.news');
	        var $time = that.find('.nowtime');
	        var count = $count.html();

			//获取群未读数
			$.ajax({
				url: '/groupcount',
				type: 'POST',
				data: {id:id},
				success: function(data){
					if(data.success){
						var count = data.rest;
						count.map(function(i){
							if(i.status>0){
								that.find('.count').html(i.status).css('display','block');

							}else{
								that.find('.count').html(0).css('display','none');
							}						
						});
					}else{
						console.log('查询失败');
					}
				}
			})

			//最后通话信息
			$.ajax({
				url: '/lastgroupmsg',
				type: 'POST',
				data: {id:id},
				success: function(data){
					if(data.success){
						var msg = data.result;
						var nowt = new Date();
						if(msg){
							var times = gettime(msg.time);

							$news.html(msg.content);

							if(nowt-times>1000*60*60*18){
		            		$time.html(changeTime2(msg.time));}
		            		else{$time.html(changeTime1(msg.time));}
	            		}
					}else{
						console.log('查询失败');
					}
				}
			})
		});
	}


	//获取即时信息数
	var socket = io();
	var userid = $('.userid').val();
	socket.emit('login',userid); 
	//接收一对一socket
	socket.on('addMsg',function(toid,msg){
            
        $('.other').each(function(){
        	var time = changeTime1(new Date());
            var that = $(this);
            var id = that.find('.friendid').val();
            var $count = that.find('.count');
            var $news = that.find('.news');
            var $time = that.find('.nowtime');
            var count = $count.html();
            if(id==toid){
            	count++;
            	$count.html(count).css('display','block');
            	$news.html(msg);
            	$time.html(time);
            	$('.userlist').prepend(that);
            }
        });
    });
	//接收群socket
	socket.on('addGroupMsg',function(groupid,msg,name){
            
        $('.groups').each(function(){
        	var time = changeTime1(new Date());
            var that = $(this);
            var id = that.find('.groupid').val();
            var $count = that.find('.count');
            var $news = that.find('.news');
            var $time = that.find('.nowtime');
            var count = $count.html();
            if(id==groupid){
            	count++;
            	$count.html(count).css('display','block');
            	$news.html(name+':'+msg);
            	$time.html(time);
            	$('.userlist').prepend(that);
            }
        });
    });

    //获取群列表
    function getGroup(){
    	var userid = $('.userid').val();
 		$.ajax({
			url: '/getgroup',
			type: 'POST',
			data: '',
			success: function(data){
				if(data.success){
					var html='';
					var val = data.result.vacation;
					//console.log(val);
					var aa = val.map(function(i){
						//注册群登录
						socket.emit('grouplogin',i.id); 
						html +='<li class="user groups" data-link="/groupchart?id='+i.id+'">'+
						'<input type="hidden" value="'+i.id+'" class="groupid">'+
						'<p class="count"></p>'+
						'<div class="img"><img src="/group-photo/'
						+i.icon+'"/></div>'+
						'<div class="user-inf"><p class="name">'+i.name+'</p>'+
						'<p class="news"></p>'+
						'<p class="nowtime"></p></div>'+
					'</li>'
					});
					$('.userlist').append(html);
					//用户列表重新排序
					userSort();
					//获取群最后通话消息及未读数
					getgroupcount();
				}else{
					console.log('查询失败');
				}
			}
		})
    }
    getGroup();

    //对用户列表排序
    function userSort(){
    	var ul = $(".userlist");
	    var lis = [];

	    lis = $(".userlist li");
	    var ux = [];
	    //循环提取时间，并调用排序方法进行排序
	    for (var i=0; i<lis.length; i++){
	        var tmp = {};
	        tmp.dom = lis.eq(i);
	        tmp.date = lis.eq(i).find(".lasttime").html();
	        ux.push(tmp);
	    }
	    //数组排序，支持年的比较
	    ux.sort(function(a,b){
	       //var myDate = new Date();
	       //var year = myDate.getYear();
	       if(a.date<b.date){
	          return true;
	       }
	       return b.date - a.date;
	    });
	    //移除原先顺序错乱的li内容
	    $('.userlist li').remove();
	    //重新填写排序好的内容
	    for (var i=0; i<ux.length; i++){
	       $('.userlist').append(ux[i].dom);
	    }
    }
   
   // 用户动条
    function sideMenuScroll() {
            $wrap = $('.main-left .left-user');
        $wrap.teoyallScroll({
            borderRadius: '6px',
            autoHideScroll: true,
            autoResetRraw: true
        });
    }
    sideMenuScroll();
     // 左侧导航栏点击事件
    function handleLiClick(){
    	var _link;
        $('body').on('click','.left-user li',function(){
            $(this).addClass('current').siblings('li').removeClass('current');
            // 修改取消任务按钮
            _link = $(this).attr('data-link');
            $('.right-iframe').attr('src',_link);
            $(this).find('.count').css('display','none').html(0);
            //$('.training-iframe').css("display","block");
        })
    }
    handleLiClick();
});