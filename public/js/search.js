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
							html+='<a href="/group-detail?id='+i.id+'"><img src="/group-photo/'+i.icon+'" style="width:60px;"/>'+
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
});
