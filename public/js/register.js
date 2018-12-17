;(function($,window){

    var training = {
        init : function(){
            //this._email();
            this._clickName();
            this._clickEmail();
            this._clickPwd();
            this._clickSubmit();
            var _this = this;

        },
       
        //判断邮箱是否占用
        _email : function(email){
        	var html = '';
			$.ajax({
				url: '/register/email',
				type: 'POST',
				data: {email:email},
				success: function(data){
					if(data.success){
						var aa = data.rest;
						if(aa>0){
							html += '该邮箱已注册！';
						}else{
							html +='<i>1</i>';
						}
						$('.judge-email').html(html);
					}
					else{
					console.log('返回数据失败');
					}
				},
				error: function(){
					console.log('出现问题');
				}
			});            
        },

        //判断用户名是否占用
        _name : function(name){
        	var html = '';
			$.ajax({
				url: '/register/name',
				type: 'POST',
				data: {name:name},
				success: function(data){
					if(data.success){
						var aa = data.rest;
						if(aa>0){
							html += '该用户名已注册！';
						}else{
							html +='<i>1</i>';
						}
						$('.judge-name').html(html);
					}
					else{
					console.log('返回数据失败');
					}
				},
				error: function(){
					console.log('出现问题');
				}
			});            
        },
        
        //注册
        _register : function(data){
        	var html = '';
        	alert('aaaa');
			$.ajax({
				url: '/register',
				type: 'POST',
				data: data,
				success: function(data){
					if(data.success){
						alert('注册成功！请登陆');
						$(location).attr('href', '/');
						//var aa = data.rest;
					}
					else{
					console.log('返回数据失败');
					}
				},
				error: function(){
					console.log('出现问题');
				}
			});            
        },
        
        //搜索点击事件
        _clickName : function(){
	        var that = this;
	        $('body').on('click','.name',function(){
	            var email = $('.email').val();
	            if(email){
	                that._email(email);     
	            }            
	        })
        },
        //邮箱点击事件
        _clickEmail : function(){
	        var that = this;
	        $('body').on('click','.email',function(){
	            var name = $('.name').val();
	            if(name){
	                that._name(name);     
	            }            
	        })
        },
        //密码点击事件
        _clickPwd : function(){
	        var that = this;
	        $('body').on('click','.pwd',function(){
	            var name = $('.name').val();
	            var email = $('.email').val();
	            if(name){
	                that._name(name);     
	            }            
	            if(email){
	                that._email(email);     
	            }            
	        })
        },
        //点击注册事件
        _clickSubmit : function(){
	        var that = this,data = {};
	        $('body').on('click','.submit',function(){
	            var name = $('.name').val();
	            var email = $('.email').val();
	            var pwd = $('.pwd').val();
	            var jgName = $('.judge-name').find('i').length;
	            var jgEmail = $('.judge-email').find('i').length;
	            if(name && email && pwd.length>=6 && jgName>0 && jgEmail>0){
	            	data = {name:name,email:email,pwd:pwd};
	            	that._register(data);
	            }
	            if(0<pwd.length &&pwd.length<6){
	            	alert('密码不能小于6位数');
	            }
	            if(pwd.length==0){
	                alert('请输入密码');
	            }            
	            if(!name){
	                alert('请输入用户名');
	                var pwd = $('.pwd').val('');  
	            }            
	            if(!email){
	                alert('请输入邮箱');
	                var pwd = $('.pwd').val('');  
	            }
	            if(jgName==0 || jgEmail==0){
	            	var pwd = $('.pwd').val('');
	            }       
	        })
        },

    }

    $(document).ready(function(){
        training.init();
    })

    window.training = training;

}(jQuery,window));