;(function($,window){

    var training = {
        init : function(){
            this._initGroup();
            this._changeInf();
            this._gorupUser();
            this._removeUser();
            this._dissolveGroup();
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
							'<p>群名称：<input type="text" value="'+ver.name+'" name="name" disabled class="inputs">'+
                            '<span class="change-name change"> 更改 </span><span class="sub-change-name sub-chg"> 确定</span></p>'+
							'<p>群说明：<textarea name="explain" class="inputs" disabled>'+explain+'</textarea>'+
                            '<span class="change-explain change"> 更改 </span><span class="sub-change-exp sub-chg"> 确定</span></p></p>';
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
        
        //群名或说明更改
        _changeInf : function(){
            var fal = false;
            var that = this;
            var id = $('.id').val();
            $('body').on('click', '.inf-form .change', function(){
                var $that = $(this);
                if(!fal){
                    $that.siblings('.sub-chg').show();
                    $that.siblings('.inputs').attr('disabled',false);
                    $that.html('取消');
                    fal = true;
                }else{
                    $that.siblings('.sub-chg').hide();
                    $that.siblings('.inputs').attr('disabled',true);
                    $that.html(' 更改');
                    fal = false;                
                }
            });
            //提交群名称或群资料
            $('body').on('click','.inf-form .sub-chg',function(){
                var main = $(this).siblings('.inputs').val();
                var name = $(this).siblings('.inputs').attr("name");
                if(main){
                    $.ajax({
                        url: '/groupchart/managegroup/update',
                        type: 'POST',
                        data: {main: main, name: name, id: id},
                        success: function(data){
                            if(data.success){
                                //刷新当前页面
                                //alert('添加成功');
                                //window.location.reload();
                                that._initGroup();
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
        //获取群列表
        _gorupUser : function(){
            var id = $('.id').val();
            var userid = $('.userid').val();
            var html = '';
            $.ajax({
                url: '/groupchart/managegroup/groupUser',
                type: 'POST',
                data: {id: id},
                success: function(data){
                    if(data.success){
                        var aa = data.result.vacation;
                        var tt = aa.map(function(i){
                            if(i.markname){
                                usname = i.markname;
                            }else{
                                usname = i.name;
                            }
                            html += '<li><img src="/vacation-photo/'
                            +i.imgurl+'"/>';
                            if(i.id == userid){
                                html += '<span style="color:#00aaee;">'+usname+'</span></li>';
                            }else{
                                html += '<span>'+usname+'</span><button class="remove-user" value="'+i.id+'">移出群</button></li>';
                            }
                        });
                        $('.user-form ul').html(html);
                    }else{
                    console.log('取回数据问题');
                    }
                },
                error: function(){
                    console.log('没实现异步');
                }
            });              
        },
        //删除群成员
        _removeUser : function(){
            var id = $('.id').val();
            var that = this;
            $('body').on('click','.user-form .remove-user',function(){
                var userid = $(this).val();
                $.ajax({
                    url: '/groupchart/managegroup/removeUser',
                    type: 'POST',
                    data: {id: id, userid: userid},
                    success: function(data){
                        if(data.success){
                            //刷新当前页面
                            //alert('删除成功');
                            that._gorupUser();
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
        _dissolveGroup : function(){
            var id = $('.id').val();
            $('body').on('click','.dissolve button',function(){
                $.ajax({
                    url: '/groupchart/managegroup/dissolveGroup',
                    type: 'POST',
                    data: {id: id},
                    success: function(data){
                        if(data.success){
                            //跳转页面
                            alert('删除成功');
                            $(location).attr('href', '/yike');
                            //that._gorupUser();
                        }else{
                        console.log('取回数据问题');
                        }
                    },
                    error: function(){
                        console.log('没实现异步');
                    }
                });    
            })
        }
    }

    $(document).ready(function(){
        training.init();
    })

    window.training = training;

}(jQuery,window));