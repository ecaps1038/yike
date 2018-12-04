$(document).ready(function(){
	//上传头像
	$('.icon').on('click',function(){
		$('.upicon').toggle();
	});

	$('.upuser').on('click',function(evt){
		evt.preventDefault();
		var groupName = $('.group-name').val();
		var icon = $('.icon-name').val();
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
});