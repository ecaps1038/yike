;(function($,window){

    var training = {
        init : function(){
            this._initGroup();
            this._changeInf();
            this._gorupUser();
            this._removeUser();
            this._dissolveGroup();
            this._changeTb();
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
                        	html +='<div class="img"><a href="/photocut?atl=3&id='+id+
                            '" class="img-200"><img src="/group-photo/'+ver.icon+'"/><i></i></a></div>'+
                            '<span class="inf-head">修改</span>'+
							'<div class="newslefft"><p><span>群名称</span><input type="text" value="'+ver.name+'" name="name" class="inputs name">'+
                            
							'<p><span>群说明</span><textarea name="explain" class="inputs explain">'+explain+'</textarea>'+
                            '</div>';
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
            $('body').on('click', '.inf-form .inputs', function(){
                $('.inf-head').css('opacity', 1);
                
            });
            $('body').on('click', '.inf-form .inf-head', function(){
                $('.inf-head').css('opacity', 1);
                
            });
            //提交群名称或群资料
            $('body').on('click','.inf-head',function(){
                // var name = $(this).siblings('.inputs').val();
                // var name = $(this).siblings('.inputs').attr("name");
                var name = $('.newslefft .name').val();
                var explain = $('.newslefft .explain').val();
                if(name){
                    $.ajax({
                        url: '/groupchart/managegroup/update',
                        type: 'POST',
                        data: {name: name, explain: explain, id: id},
                        success: function(data){
                            if(data.success){
                                //刷新当前页面
                                //alert('添加成功');
                                //that._initGroup();
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
                            html += '<li class="user-select"><div class="img-80"><img src="/vacation-photo/'+i.imgurl+'"/></div>';
                            if(i.id == userid){
                                html += '<p class="name"><span>'+usname+'</span></p></li>';
                            }else{
                                html += '<p class="name"><span>'+usname+'</span></p><button class="remove-user" value="'+i.id+'">移出群</button></li>';
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
            $('body').on('click','.dissolve button',function(ev){
                ev = ev || window.event;
                if(confirm("确定解散该群?")){
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
                }else{
                    return false;
                }
            })
        },
        //群信息于群列表切换
        _changeTb : function(){
            $('.title .inform').on('click',function(){
                $(this).addClass('selected');
                $('.title .users').removeClass('selected');
                $('.group-user').css('display','none');
                $('.group-inf').css('display','block');
            });
            $('.title .users').on('click',function(){
                $(this).addClass('selected');
                $('.title .inform').removeClass('selected');
                $('.group-inf').css('display','none');
                $('.group-user').css('display','block');
            })
        }
    }

    $(document).ready(function(){
        training.init();
    })

    window.training = training;
    sideMenuScroll(0,0);

}(jQuery,window));