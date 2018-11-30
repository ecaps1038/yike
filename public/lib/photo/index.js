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
		$.ajax({
			url: '/clipphoto',
			type: 'POST',
			data: {dataurl:dataurl},
			success: function(data){
				if(data.success){
					alert('发送成功');
					$(location).attr('href', '/create-group');
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