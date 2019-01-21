;(function($,window){

    var training = {
        init : function(){
            this._initUser();
            this._length = 0;
      },
        // 获取群信息
        _initUser : function(){
        	var date = $('.date').html();
        	var email = $('.email').html();
        	var usmsg = $('.top-msg');
        	var html = '';

            $.ajax({
                url: '/forget/init',
                type: 'POST',
                data: {date:date, email:email},
                success: function(data){
                    if(data.success){
                        if(data.tep == 1){
                            var aa = data.context.vacation;
                            aa.map(function(ver){
                            	
                            	html +='<div class="img"><div class="img-200">'+
                                '<img src="/vacation-photo/'+ver.imgurl+'"/></div></div>'+
                                '<div clss="name"><p>'+ver.name+'</p></div>';
                            });
                            usmsg.html(html);
                        }if(data.tep == 2){
                            alert('验证码有误！');
                            //$(window).attr('location','/');
                        }if(data.tep == 3){
                            alert('验证没有')
                            //$(window).attr('location','/');
                        }
                    }else{
                    console.log('取回数据问题');
                    }
                },
                error: function(){
                    console.log('没实现异步');
                }
            });
        }
        
    }

    $(document).ready(function(){
        training.init();
    })

    window.training = training;
    sideMenuScroll(0,0);

}(jQuery,window));