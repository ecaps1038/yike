;(function($, window, document, undefined){
    $(document).ready(function(){
    	var chander = {
    		showsex : function(sex){
    			var html = '';
    			if(sex){
    				if(sex == 'male'){
    					html+='<input type="radio" name="sex" value="male" checked><label for="male"></label>男'+
		                  '<input type="radio" name="sex" value="female"><label for="female"></label>女';
    				}else{
    					html+='<input type="radio" name="sex" value="male"><label for="male"></label>男'+
		                  '<input type="radio" name="sex" value="female" checked><label for="female"></label>女';
    				}
    			}else{
    				html+='<input type="radio" name="sex" value="male"><label for="male"></label>男'+
		              '<input type="radio" name="sex" value="female"><label for="female"></label>女';
    			}
    			return html;
    		},
            upUser : function(){
                $('.upuser').on('click',function(evt){
                    evt.preventDefault();
                    var userId = $('.user-id').val();
                    $.ajax({
                        url: '/install',
                        type: 'POST',
                        data: $('.newslefft').serialize(),
                        success: function(data){
                            if(data.success){
                                //$container.html('Thank you!');
                                //alert('添加修改成功');
                                //返回上一页
                                //window.location.href=document.referrer;
                                var goto = '/detail?id='+userId;
                                $(window).attr('location',goto);
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
        sideMenuScroll(1,0);
    });
   })(jQuery,window,document);