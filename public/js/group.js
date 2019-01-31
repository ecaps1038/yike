;(function($,window){

    var training = {
        init : function(){
            this._firstInit();
            this._handleClick();
            this._selectFriend();
            this._photo = '';
        },
       
        // 初始数据
        _firstInit : function(){
        	var html = '',that = this,img = '';
            var $photo = $('.user-photo');
			$.ajax({
				url: '/creat-group/frend',
				type: 'POST',
				data: '',
				success: function(data){
					if(data.success){
						var dt = data.context;
						that._photo = dt.iconname;
						img = '<img src="/group-photo/'+dt.iconname+'" class="icon" /><i></i>';
						$photo.html(img);
						dt.vacation.map(function(ver){
							html += '<li class="user-select">'+
                                '<div class="left"><div class="user-id" data-id="'+ver.id+'"></div>'+
                                '<div class="img-80"><img src="/vacation-photo/'+ver.imgurl+'"/></div></div>'+
                                '<p class="name"><span>'+ver.name+'</span></p></li>';
						});
						$('.friend-li').html(html);
					}
					else{
						alert('接收失败');
					}
				},
				error: function(){
					alert('添加失败');
				}
			});
        },

        //获取选择数
        _selectFriend : function(){
            var i = 0;
            $('body').on('click','.friend-li .user-select',function(){
                if($(this).find('.user-id').length>0){
                    if($(this).find('.user-id').hasClass('select')){
                        $(this).find('.user-id').removeClass('select');
                        i--;
                    }else{
                        $(this).find('.user-id').addClass('select');
                        i++;
                    }
                }
                if(i>0){
                    $('.put-but').css('opacity','1');
                    $('.put-but i').html('('+i+')');             
                }else{
                    $('.put-but').css('opacity','0.5');
                    $('.put-but i').html('');             
                }
            })
        },

        //提交页面
        _handleClick : function(){
        	var that = this;
	       $('.upuser').on('click',function(evt){
				evt.preventDefault();
				var groupName = $('.group-name').val();
				var icon = that._photo;
				var user = [];
				var i = 0;
                $('.user-select .user-id').each(function(){
                    if($(this).hasClass('select')){
                        var val = $(this).attr('data-id')
                        //alert($(this).val());
                        user[i] = val;
                        i++;
                    }
                });  
				if(i>0){
					$.ajax({
						url: '/addgroup',
						type: 'POST',
						data: {icon:icon,groupName:groupName,user:user},
						success: function(data){
							if(data.success){
								console.log('发送成功');
								$(location).attr('href', '/yike');
							}
							else{
								alert('接收失败');
							}
						},
						error: function(){
							alert('添加失败');
						}
					});
				}
			});
        },

    }

    $(document).ready(function(){
        training.init();
    })

    window.training = training;

    sideMenuScroll(0,1);

}(jQuery,window));