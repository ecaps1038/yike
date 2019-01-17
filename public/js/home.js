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
						window.location.reload();
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

	//点击忘记密码
	function forget(){
		$('.forget').on('click',function(){
			$('.getpwd').show();
		});
		$('.no-send').on('click',function(){
			$('.getpwd').hide();
		});
		$('.send-email').on('click',function(){
			var email = $('.regemail').val();
			if(email){
				var date = new Date();
				var dd = date.getTime();
				$.ajax({
					url: '/forget',
					type: 'POST',
					data: {date:dd,email:email},
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
				
			}else{
				alert('请输入邮箱！');
			}		
		})
	}
	forget();

	function goPAGE(){                               
		if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            $(window).attr('location','/yike');
        }
        else {
            $(window).attr('location','/yikepc');
        }
    }
    function widthHei(){                               
		if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            //$('.content').css('zoom',1.8);
        }
        else {
        	$('html').css('zoom',0.7);
            //$(window).attr('location','/yikepc');
        }
    }
    widthHei();
});