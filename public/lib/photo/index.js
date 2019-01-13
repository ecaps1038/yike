$(document).ready(function(){
	//上传头像
	var clipArea = new bjj.PhotoClip("#clipArea", {
		size: [400, 400],
		outputSize: [640, 640],
		file: "#file",
		view: "#view",
		ok: "#clipBtn",
		loadStart: function() {
			console.log("照片读取中");
			showCut();
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
		var link;
		if(dataurl){
			var atl = $(this).attr('data-link');
			var id = $(this).attr('data-id');
			if (atl==1){
				link = '/userPhoto';
				upPhoto(link,dataurl,id);
			}else if(atl == 2){
				link = '/groupPhoto';
				upPhoto(link,dataurl,id);
			}else if(atl == 3){
				link = '/groupCgPhoto';
				upPhoto(link,dataurl,id);
			}
		}else{
			alert('您未选择图片！');
		}		
	});
	//对不同来源进行一步存储处理
	function upPhoto(link,dataurl,id){
		$.ajax({
			url: link,
			type: 'POST',
			data: {id:id,dataurl:dataurl},
			success: function(data){
				if(data.success){
					//alert('发送成功');
					window.location.href=document.referrer;
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
	//显示裁剪界面
	function showCut(){
		$('.selects').css('display','none');
		$('.cutphoto').css('display','block');
	}
	//裁剪后能确定
	$('#clipBtn').on('click',function(){
		$('.clipphoto').css('opacity',1).attr('disabled',false);
	})
	sideMenuScroll(0,0);
	
});