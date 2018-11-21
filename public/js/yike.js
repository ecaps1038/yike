$(document).ready(function(){
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
					//alert(data.context);

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
});