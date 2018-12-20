;(function($,window){

    var training = {
        init : function(){
            this._firstInit();
            this._handleClick();
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
						img = '<img src="/group-photo/'+dt.iconname+'" class="icon" />';
						$photo.html(img);
						dt.vacation.map(function(ver){
							html += '<li class="user">'+
								'<input type="checkbox" name="user" value="'+ver.id+'">'+
								'<img src="/vacation-photo/'+ver.imgurl+'" style="width:100px;" />'+
								'<span class="name">'+ver.name+'</span></li>';
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

        //提交页面
        _handleClick : function(){
        	var that = this;
	       $('.upuser').on('click',function(evt){
				evt.preventDefault();
				var groupName = $('.group-name').val();
				var icon = that._photo;
				var user = [];
				var i = 0;
				$(".user input[type=checkbox]").each(function(){
				    if(this.checked){
				    	//alert($(this).val());
					    user[i] = $(this).val();
					    i++
					    }
					});  
				
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
			});
        },

    }

    $(document).ready(function(){
        training.init();
    })

    window.training = training;

}(jQuery,window));