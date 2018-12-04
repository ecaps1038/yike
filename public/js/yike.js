$(document).ready(function(){

	//时间转换
        function changeTime1(date){
            var d = new Date(date);
           // var tiems = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
           //  + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
            var tiems =d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
            return tiems;
        }
        function changeTime2(date){
            var d = new Date(date);
           var tiems = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            return tiems;
        }
        function gettime(date){
        	var d = new Date(date);
        	return d.getTime();
        }

	//搜索
	$('.searup').on('click',function(evt){
		evt.preventDefault();
		//var action = $('.newslefft').attr('action');
		var $container = $('.sear');
		$container.html('逸刻');
		$.ajax({
			url: '/search',
			type: 'POST',
			data: $('.search').serialize(),
			success: function(data){
				if(data.success){
					var aa = data.context.vacation;
					console.log(aa)
					var html='';
					var tt = aa.map(function(i){
						html+="<div><img src='/vacation-photo/"+i.imgurl+"' style='width:60px;'/>"+i.name+
						"<a href='/search-detail?id="+i.id+"'>进入</a></div>";
						$container.html(html);
					})
					
				}
				else{
				$container.html('出现问题');
				}
			},
			error: function(){
				$container.html('出现问题');
			}
		});
	});

	//遍历获取未读信息数及最后通话信息
	$('.user').each(function(){
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
					var times = gettime(count.dateTime);

					$news.html(count.postMessages);

					if(nowt-times>1000*60*60*24){
            		$time.html(changeTime2(count.dateTime));}
            		else{$time.html(changeTime1(count.dateTime));}
				}else{
					console.log('查询失败');
				}
			}
		})
	});

	//获取即时信息数
	var socket = io();
	var userid = $('.userid').val();
	socket.emit('login',userid); 
	//接收socket
	socket.on('addMsg',function(toid,msg,time){
            
        $('.user').each(function(){
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
            }
        })
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
					console.log(val);
					var aa = val.map(function(i){
						html +='<li class="user other">'+
			'<input type="hidden" value="'+i.id+'" class="friendid">'+
			'<p class="count"></p>'+
			'<a href="/groupchart?id='+i.id+'" class="chart"></a>'+
			'<a href="/groupchart?id='+i.id+'" class="header"><img src="/group-photo/'+i.icon+'"/></a></p>'+
			'<p class="name">'+i.name+'</p>'+
			'<p class="sex group"></p>'+
			'<p class="news"></p>'+
			'<p class="nowtime"></p>'+
			'<p class="lasttime" style="display:none">'+i.lasttime+'</p>'+
		'</li>'
					});
					$('.userlist').append(html);
					//用户列表重新排序
					userSort();
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
   

});