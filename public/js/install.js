;(function($, window, document, undefined){
    $(document).ready(function(){
    	var chander = {
    		showsex : function(sex){
    			var html = '';
    			if(sex){
    				if(sex == 'male'){
    					html+='<input type="radio" name="sex" value="male" checked>男'+
		                  '<input type="radio" name="sex" value="female">女';
    				}else{
    					html+='<input type="radio" name="sex" value="male">男'+
		                  '<input type="radio" name="sex" value="female" checked>女';
    				}
    			}else{
    				html+='<input type="radio" name="sex" value="male">男'+
		              '<input type="radio" name="sex" value="female">女';
    			}
    			return html;
    		},
            upUser : function(){
                $('.upuser').on('click',function(evt){
                    evt.preventDefault();
                    //var action = $('.newslefft').attr('action');
                    $.ajax({
                        url: '/install',
                        type: 'POST',
                        data: $('.newslefft').serialize(),
                        success: function(data){
                            if(data.success){
                                //$container.html('Thank you!');
                                alert('添加修改成功');
                                //返回上一页
                                $(window).attr('location','/yike');
                            }
                            else{
                                alert('添加失败');
                            }
                        },
                        error: function(){
                            alert('添加失败');
                        }
                    });
                });
            }
    	}
    	var sex = $('.sex').val();
    	var aaa = chander.showsex(sex);
    	$('#sex').html(aaa);

        chander.upUser();
    });
   })(jQuery,window,document);