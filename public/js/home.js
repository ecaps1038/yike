$(document).ready(function(){
	//点击登录提交
	$('.log-submit').on('click',function(evt){
		evt.preventDefault();
		var email = $('.email').val();
		var pwd = $('.pwd').val();
		if(email && pwd){
			$.ajax({
				url: '/login',
				type: 'POST',
				data: $('.newslefft').serialize(),
				success: function(data){
					if(data.success){
						var tep = data.tep;
						if(tep == 0){
							goPAGE();
						}else if(tep == 1){
							$('.room').html(data.return);
							$('.pwd').val("");
						}
						//$(window).attr('location','/yike');
					}
					else{
					alert("问题");
					}
				},
				error: function(){
					alert("问题1");
				}
			});		
		}
	});


	function goPAGE(){                               
		if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            // window.location.href="移动端url";
            //alert("mobile")
            $(window).attr('location','/yike');
        }
        else {
            // window.location.href="pc端url"; 
            //alert("pc")
            $(window).attr('location','/yikepc');
        }
    }
});