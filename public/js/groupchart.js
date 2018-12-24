;(function($, window, document, undefined){
    $(document).ready(function(){
    	var socket = io();
        var html='';
        var userid,myimgurl,myname,adminid;
        var groupid = $('.id').val();

        var time =0;
        var room = {};
        var j =1;
        var tge = false;
        room[0]=0;

        //定位到区域最下方
        function scrollToBottom(){
            var $msgout = $('.msgout');
            var $message = $('#message');
            var toHeight = $message.outerHeight()-$msgout.height()+30;
            $msgout.scrollTop(toHeight);
        }
        //初始化页面
        function initPage(){
            var html = '',oper = '';
            var id = $('.id').val();
            var $init = $('.group-init');
            var $oper = $('.user-oper');
            //alert(id)
            $.ajax({
                url: '/groupchart/init',
                type: 'POST',
                data: {id:id},
                success: function(data){
                    if(data.success){
                        var aa = data.context.vacation;
                        aa.map(function(ver){
                            userid = ver.myid;
                            adminid = ver.adminid;
                            myimgurl = ver.myimgurl;
                            myname = ver.myname;
                            html ='<img src="/group-photo/'+ver.icon+'" style="width:100px;" />'+
                                '<span class="name">'+ver.name+'<i></i></span>';
                            if(userid == adminid){
                                oper = '<a href="/groupchart/managegroup?id='+groupid+'">管理群</a>';
                            }else{
                                oper = '<button class="quit-group">删除并退群</button>';
                            }
                            $('.intro').html(ver.intro);
                        });
                        $oper.html(oper);
                        $init.html(html);
                        
                    }
                    else{
                        console.log('出现问题1');
                    }
                },
                error: function(){
                    console.log('出现问题2');
                }
            });
        }
        initPage();

        //获取消息列表
        function showGroupMessage(){
            $.ajax({
                url: '/showGroupMessage',
                type: 'POST',
                data: {groupid:groupid},
                success: function(data){
                    if(data.success){
                        var aa = data.result.vacation;
                        //console.log(aa);  
                        var tt = aa.map(function(i){
                            time = i.timeInt;
                            room[j] =time;
                            if(time>(room[j-1]+4*60*1000)){
                                html+="<p class='time'>"+i.dateTime+"</p>";
                            }
                            j++;

                            if(i.id==userid){
                                html+='<div class="my message"><p><img src="/vacation-photo/'+ 
                                myimgurl+'"/>'+i.content+'</p></div>';
                            }else{
                                html+='<div class="to message"><p><a href="/detail?id='+i.id+'"><img src="/vacation-photo/'+ 
                                i.imgurl+'"/></a>'+i.name+':'+i.content+'</p></div>';
                            }                           

                    })
                    $('#message').append(html);
                    scrollToBottom();
                    }
                    else{
                        console.log('出现问题1');
                    }
                },
                error: function(){
                    console.log('出现问题2');
                }
            });
        }
        showGroupMessage();

        //加入群申请
        socket.emit('group',groupid);
        //发送消息
    	$('.but').on('click',function(evt){
            evt.preventDefault();
            sendmsg();
        });
        //点击enter发送信息
        $(document).keyup(function(event){
          if(event.keyCode ==13){
            sendmsg();
          }
        });
        function sendmsg(){
            var message = $('.text').val();
            if(message){
                var mesg = {
                    name:myname,
                    groupid:groupid,
                    message: message,
                    userid: userid,
                    imgurl: myimgurl,
                }
                socket.emit('groupmessage',mesg);

                //获取时间点
                var nowTime= new Date();
                var changetime = changeTime1(nowTime);
                room[j] =nowTime;
                if(nowTime>(room[j-1]+4*60*1000)){
                    html+="<p class='time'>"+changetime+"</p>";
                }
                j++;

                html+='<div class="my message"><p><img src="/vacation-photo/'+ 
                myimgurl+'"/>'+message+'</p></div>';
                $('#message').append(html); 
                html='';
                $('.text').val("");
                scrollToBottom();
            }
        }
        //接收信息
        socket.on('sendGroupMsg',function(msg,uname,img,fromid){

            //获取时间点
            var nowTime= new Date();
            var changetime = changeTime1(nowTime);
            room[j] =nowTime;
            if(nowTime>(room[j-1]+4*60*1000)){
                html+="<p class='time'>"+changetime+"</p>";
            }
            j++;

            html+='<div class="to message"><p><a href="/search-detail?id='+fromid+'"><img src="/vacation-photo/'+ 
            img+'"/></a>'+uname+':'+msg+'</p></div>';
            $('#message').append(html);
            html='';
            scrollToBottom();
        });

        //获取群成员列表
        function showUsers(){
            var html='',num = 0,usname,mymark;
        	 $.ajax({
                url: '/showUser',
                type: 'POST',
                data: {groupid:groupid},
                success: function(data){
                	if(data.success){
                		var aa = data.result.vacation;
                        console.log(aa);
                        var tt = aa.map(function(i){
                            if(i.markname){
                                usname = i.markname;
                            }else{
                                usname = i.name;
                            }
                            //自己的名称
                            if(i.id == userid){
                                if(i.markname){
                                    mymark = i.markname;
                                }else{
                                    mymark = i.name;
                                }                            
                            }
                        	html += '<li><a href="/detail?id='+i.id+'"><div class="img"><img src="/vacation-photo/'
                        	+i.imgurl+'"/>'+'</div>';
                            if(i.id == adminid){
                                html += '<span style="color:#00aaee;">'+usname+'</span></a>';
                            }else{
                                html += '<span>'+usname+'</span></a>';
                            }
                            
                        });
                        $('.groupmsg .user').html(html);
                        $('.mark-name').html(mymark);
                        $('.change-mark').val(mymark);
                        num = $('.groupmsg .user li').length;
                        $('.name i').html('('+num+')');
	                }else{
	                	console.log('出现问题1');
	                }
                },
                error: function(){
                    console.log('出现问题2');
                }
            });
        }
        showUsers();
        //返回时清一下群消息数
        function toyike(){
            $('.toyike').on('click',function(){
                $.ajax({
                    url: '/toyike',
                    type: 'POST',
                    data: {groupid:groupid},
                    uccess: function(data){
                        if(data.success){
                            console.log('返回刷新成功');
                        }else{
                            console.log('出现问题1');
                        }
                    },
                    error: function(){
                        console.log('出现问题2');
                    }
                })
            })
        }
        toyike();

        //添加成员
        function addMemder(){
            $('body').on('click','.add-member',function(){
                var html = '',dt = '';
                $('.user-friend').toggle();
                tge = true;
                //异步获取成员
                $.ajax({
                    url: '/groupchart/showMyfriend',
                    type: 'POST',
                    data: '',
                    success: function(data){
                        if(data.success){
                            dt = data.context;
                            dt.vacation.map(function(ver){
                            html += '<li class="user">'+
                                //'<input type="checkbox"  class="usercheck" name="user" value="'+ver.id+'">'+
                                '<span class="user-id" data-id="'+ver.id+'"></span>'+
                                '<img src="/vacation-photo/'+ver.imgurl+'" style="width:40px;" />'+
                                '<span class="name">'+ver.name+'</span></li>';
                        });
                        $('.friend-li').html(html);
                        isGroup();

                        }else{
                            console.log('出现问题1');
                        }
                    },
                    error: function(){
                        console.log('出现问题2');
                    }
                });
            });
        }
        addMemder();

        //遍历好友是否已加入群
        function isGroup(){
            $('.friend-li .user').each(function(){
                var that = $(this),html = '';
                var id = $(this).find('.user-id').attr('data-id');
                //异步验证
                $.ajax({
                    url:'/groupchart/isinGroup',
                    type: 'POST',
                    data: {id:id,groupid:groupid},
                    success: function(data){
                        if(data.success){
                            var dt = data.rest;
                            if(dt == 0){
                                //that.find('.usercheck').attr('disabled',true);
                                html = '<input type="checkbox"  class="usercheck" name="user" value="'+id+'">';
                                that.find('.user-id').html(html);
                            }else{
                                html = '<i class="in-group-tip"></i>';
                                that.find('.user-id').html(html);
                            }
                        }else{

                        }
                    },
                    error: function(){
                        console.log('出现问题2');
                    }
                });
            });
        }

        //点击取消关闭
        $('body').on('click','.but-grp .close-but',function(){
            $('.user-friend').hide();
        });

         //提交页面
        function handleClick(){
           $('body').on('click','.but-grp .put-but',function(evt){
                evt.preventDefault();
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
                    url: '/groupchart/joinGroup',
                    type: 'POST',
                    data: {groupid:groupid,user:user},
                    success: function(data){
                        if(data.success){
                            $('.user-friend').hide();
                            showUsers();
                            //window.location.reload();
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
        }
        handleClick();

        //退出群
        function quitGroup(){
            $('body').on('click','.quit-group',function(ev){
                 ev = ev || window.event;
                if(confirm("确定退出该群?")){
                    $.ajax({
                        url: '/groupchart/quitGroup',
                        type: 'POST',
                        data: {groupid:groupid},
                        success: function(data){
                            if(data.success){
                                //返回上一页
                                //window.location.reload();
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
                }else{
                    return false;
                }
            });
        }
        quitGroup();

        //修改群内名
        function changeMark(){
            var name,num;
            $('body').on('click','.mark',function(){
                $('.change').toggle();
                name = $(this).find('.mark-name').html();
            });
            $('body').on('click','.change button',function(){
                var num = $('.change .change-mark').val();
                if(num && num!=name){
                    $.ajax({
                        url: '/groupchart/groupMark',
                        type: 'POST',
                        data: {name:num,groupid:groupid},
                        success: function(data){
                            if(data.success){
                                //跟新用户
                                showUsers();
                                $('.change').hide();
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
            })
        }
        changeMark();

    })
})(jQuery,window,document);



