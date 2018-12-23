;(function($,window){

    var training = {
        init : function(){
            this._initGroup();
            this._length = 0;
      },
       
        // 获取群信息
        _initGroup : function(){
        	var id = $('.id').val();
        	var grpInf = $('.inf-form');
        	var html = '',explain = '';
            $.ajax({
                url: '/groupchart/managegroup/init',
                type: 'POST',
                data: {id:id},
                success: function(data){
                    if(data.success){
                        var aa = data.context.vacation;
                        aa.map(function(ver){
                        	if(ver.intro){
                        		explain = ver.intro;
                        	}
                        	html +='<a href="/photocut?atl=3&id='+id+'"><img src="/group-photo/'+ver.icon+'" style="width:100px;" /></a>'+
							'<p>群名称：<input type="text" value="'+ver.name+'" name="name"></p>'+
							'<p>群说明：<textarea name="explain">'+explain+'</textarea></p>';
                        });
                        grpInf.html(html);
                    }else{
                    console.log('取回数据问题');
                    }
                },
                error: function(){
                    console.log('没实现异步');
                }
            });
        },
        
        //设置备注
        _markname : function(){
            var that = this, _link = '';
            $('body').on('click','.beizhu',function(){
                var vel = $('.beizhu').html();
                if(vel == "设置备注"){
                    $('.beizhu').html('取消');
                    $('.addmark').show();
                }else{
                    $('.beizhu').html('设置备注');
                    $('.addmark').hide();
                }         
            });
        },
        //备注提交
        _upmarkName : function(){
            $('body').on('click','.addmark .upmark',function(){
                var cont  = $('.markname').val();
                if(cont){
                    //异步添加用户备注
                    var _id = $(this).attr('data-id');
                    $.ajax({
                        url: '/detail/markname',
                        type: 'POST',
                        data: {cont:cont,id:_id},
                        success: function(data){
                            if(data.success){
                                //刷新当前页面
                                window.location.reload();
                            }else{
                            console.log('取回数据问题');
                            }
                        },
                        error: function(){
                            console.log('没实现异步');
                        }
                    });
                }
            });
        },
        //添加好友
        _addfriend : function(){
            $('body').on('click','.add',function(){
                //异步添加好友
                var _id = $(this).attr('data-id');
                $.ajax({
                    url: '/add',
                    type: 'POST',
                    data: {id:_id},
                    success: function(data){
                        if(data.success){
                            //刷新当前页面
                            alert('添加成功');
                            window.location.reload();
                        }else{
                        console.log('取回数据问题');
                        }
                    },
                    error: function(){
                        console.log('没实现异步');
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