;(function($,window){

    var training = {
        init : function(){
            this._findUser();
            this._findGroup();
            this._findMsg();
			this._findGrpmsg();
            this._length = 0;
            this.heightArr = [];
            var _this = this;

        },
       
        // 用户数据
        _findUser : function(){
        	var $user = $('.user-count');
        	var $data = $user.find('.data');
        	var $sex = $user.find('.user-sex');
        	$.ajax({
				url: '/yike/manage/home/findUser',
				type: 'POST',
				data: '',
				success: function(data){
					if(data.success){
						var aa = data.context;
						$data.html(aa.i);
						$sex.find('.m').html(aa.m+'人');
						$sex.find('.f').html(aa.f+'人');
						$sex.find('.n').html(aa.n+'人');
						
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

 		// 群数据
        _findGroup : function(){
        	var $group = $('.group-count');
        	var $data = $group.find('.data');
        	$.ajax({
				url: '/yike/manage/home/findGroup',
				type: 'POST',
				data: '',
				success: function(data){
					if(data.success){
						var aa = data.rest;
						$data.html(aa);					
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

 		// 点信息数
        _findMsg : function(){
        	var $msg = $('.msg-count');
        	var $data = $msg.find('.data');
        	var $memory = $msg.find('.user-sex');
        	$.ajax({
				url: '/yike/manage/home/findMsg',
				type: 'POST',
				data: '',
				success: function(data){
					if(data.success){
						var aa = data.context;
						var d = (aa.d/1024).toFixed(2);
						$data.html(aa.i);
						$memory.find('.mm').html(d+'kb');
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

 		// 群信息数
        _findGrpmsg : function(){
        	var $grpmsg = $('.grpmsg-count');
        	var $data = $grpmsg.find('.data');
        	var $memory = $grpmsg.find('.user-sex');
        	$.ajax({
				url: '/yike/manage/home/findGrpmsg',
				type: 'POST',
				data: '',
				success: function(data){
					if(data.success){
						var aa = data.context;
						//取小数点后2位
						var d = (aa.d/1024).toFixed(2);
						$data.html(aa.i);
						$memory.find('.gm').html(d+'kb');
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

    }
    $(document).ready(function(){
        training.init();
        // $('.training-iframe').teoyallScroll();
    })

    window.training = training;

}(jQuery,window));