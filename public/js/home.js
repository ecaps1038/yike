$(document).ready(function(){
	$('.log-submit').on('click',function(evt){
		evt.preventDefault();
		$.ajax({
			url: '/login',
			type: 'POST',
			data: $('.newslefft').serialize(),
			success: function(data){
				if(data.success){
					goPAGE();
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
	});


	function goPAGE(){                               
		if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            // window.location.href="移动端url";
            alert("mobile")
            $(window).attr('location','/yike');
        }
        else {
            // window.location.href="pc端url"; 
            //alert("pc")
            $(window).attr('location','/yikepc');
        }
    }
});