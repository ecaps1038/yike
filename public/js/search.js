$(document).ready(function(){
	//定位光标
	$(".search .search-main").focus(); 
	//点击搜索
	$('.searup').on('click',function(evt){
		evt.preventDefault();
		var search = $('.search-main').val();
		var $container = $('.sear .sear-inner');
		

		if(search.length>0){
			$container.html('<div class="nothing"><p>无结果</p></div>');
			gitSearch($container);
		}
	});
	// 搜索结果
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
						html +='<p class="title">用户</p>';
						var tt = aa.map(function(ver){
							html+='<a class="search-list" href="/detail?id='+ver.id+'">'+
							'<div class="img-80"><img src="/vacation-photo/'+ver.imgurl+'"/></div>'+
							'<p><span class="name">'+ver.name+'</span><span class="email">'+ver.email+
							'</span></p></a>';
						});
						elem.html(html);					
					}
				}
				else{
				elem.html('出现问题1');
				}
			},
			error: function(){
				elem.html('出现问题2');
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
						html +='<p class="title">群</p>';
						var tt = aa.map(function(i){
							html+='<a href="/group-detail?id='+i.id+'" class="search-list">'+
							'<div class="img-80"><img src="/group-photo/'+i.icon+'"/></div>'+
							'<p><span class="name">'+i.name+'</span></p></a>';
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

	sideMenuScroll(0,1);
});
