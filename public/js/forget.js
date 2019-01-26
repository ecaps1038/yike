;(function($,window){

    var training = {
        init : function(){
            this._initUser();
            this._changePwd();
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
                            alert('验证超时，您可以从新发送！');
                            $(window).attr('location','/');
                        }if(data.tep == 3){
                            alert('邮箱未注册')
                            $(window).attr('location','/');
                        }
                    }else{
                    console.log('取回数据问题');
                    }
                },
                error: function(){
                    console.log('没实现异步');
                }
            });
        },
        _changePwd : function(){
            $('.log-submit').on('click',function(){
                var newPwd = $('.new-pwd').val();
                var email = $('.email').html();
                if(newPwd.length>=6 && email.length>4){
                    $.ajax({
                        url: '/forget/changepwd',
                        type: 'POST',
                        data: {pwd:newPwd,email:email},
                        success: function(data){
                            if(data.success){
                                alert('密码修改成功！');
                                $(window).attr('location','/');
                            }else{
                            console.log('取回数据问题');
                            }
                        },
                        error: function(){
                            console.log('没实现异步');
                        }
                    });
                }
                if(0<newPwd.length &&newPwd.length<6){
                    alert('密码不能小于6位数');
                    $('.new-pwd').val('');
                }
                if(newPwd.length==0){
                    alert('请输入密码');
                } 
            })
        }
        
    }

    $(document).ready(function(){
        training.init();
    })

    window.training = training;
    sideMenuScroll(0,0);

}(jQuery,window));