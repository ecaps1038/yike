$(document).ready(function(){
	$('.log-submit').on('submit',function(evt){
		evt.preventDefault();
		//var action = $('.newslefft').attr('action');
		var $container = $('.return');
		$container.html('逸刻');
		$.ajax({
			url: '/login',
			type: 'POST',
			data: $('.newslefft').serialize(),
			success: function(data){
				if(data.success){
					$container.html('Thank you!');
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