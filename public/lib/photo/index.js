$(document).ready(function(){
	//上传头像
	var clipArea = new bjj.PhotoClip("#clipArea", {
		size: [260, 260],
		outputSize: [640, 640],
		file: "#file",
		view: "#view",
		ok: "#clipBtn",
		loadStart: function() {
			console.log("照片读取中");
		},
		loadComplete: function() {
			console.log("照片读取完成");
		},
		clipFinish: function(dataURL) {
			$('.dataurl').val(dataURL);
		}
	});
	$('.clipphoto').on('click',function(){
		var dataurl = $('.dataurl').val();
		if(dataurl){
			var atl = $(this).attr('data-link');
			if (atl==1){
				var link = '/userPhoto';
				upPhoto(link,dataurl);
			}else if(atl == 2){
				var link = '/groupPhoto';
				upPhoto(link,dataurl);
			}
		}else{
			alert('您未选择图片！');
		}		
	});
	//对不同来源进行一步存储处理
	function upPhoto(link,dataurl){
		$.ajax({
			url: link,
			type: 'POST',
			data: {dataurl:dataurl},
			success: function(data){
				if(data.success){
					//alert('发送成功');
					history.go(-1);
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