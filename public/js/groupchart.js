;(function($, window, document, undefined){
    $(document).ready(function(){
    	var socket = io();
        var html='';
        var userid,myimgurl,myname,adminid,groupname,groupIcon;
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
                            groupname = ver.name;
                            groupicon = ver.icon;
                            html ='<div class="img-64 group-more"><img src="/group-photo/'+ver.icon+'"/></div>'+
                                '<span class="name">'+ver.name+'<i></i></span>';
                            if(userid == adminid){
                                oper = '<div class="manage"><a href="/groupchart/managegroup?id='+groupid+'" class="control manage-tb">管理群</a><p class="quxiao">取消</p></div>';
                            }else{
                                oper = '<div class="manage"><p class="quit-group control">删除并退群</p><p class="quxiao">取消</p></div>';
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
                                html+='<div class="message"><div class="my"><div class="img-80 user-img"><img src="/vacation-photo/'+ 
                                myimgurl+'"/></div><p><i></i>'+i.content+'</p></div></div>';
                            }else{
                                html+='<div class="message"><div class="to">'+
                                '<a href="/detail?id='+i.id+'" class="img-80 friend-img"><img src="/vacation-photo/'+ 
                                i.imgurl+'"/></a><p><i></i>'+i.content+'</p></div></div>';
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
            clearCount();
        });
        //点击enter发送信息
        $(document).keyup(function(event){
          if(event.keyCode ==13){
            sendmsg();
            clearCount();
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
                html+='<div class="message"><div class="my"><div class="img-80 user-img"><img src="/vacation-photo/'+ 
                    myimgurl+'"/></div><p><i></i>'+message+'</p></div></div>';
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
            html+='<div class="message"><div class="to">'+
                '<a href="/detail?id='+fromid+'" class="img-80 friend-img"><img src="/vacation-photo/'+ 
                img+'"/></a><p><i></i>'+msg+'</p></div></div>';
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
                        //console.log(aa);
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
                        	html += '<li><a href="/detail?id='+i.id+'"><div class="img-100"><img src="/vacation-photo/'
                        	+i.imgurl+'"/>'+'</div>';
                            if(i.id == adminid){
                                html += '<p>'+usname+'</p></a></li>';
                            }else{
                                html += '<p>'+usname+'</p></a></li>';
                            }     
                        });
                        html += '<li><a href="#" class="add-member"><i class="add-icon img-100"></i><p class="remind">邀请</p></a></li>'
                        $('.groupmsg .user').html(html);
                        $('.mark-name').html(mymark);
                        $('.change-mark').val(mymark);
                        num = $('.groupmsg .user li').length-1;
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
                clearCount();
            })
        }
        toyike();
        function clearCount(){
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
        }

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
                            html += '<li class="user-select">'+
                                '<div class="left"><div class="user-id" data-id="'+ver.id+'"></div>'+
                                '<div class="img-80"><img src="/vacation-photo/'+ver.imgurl+'"/></div></div>'+
                                '<p class="name"><span>'+ver.name+'</span></p></li>';
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
            $('.friend-li .user-select').each(function(){
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
                                html = '<i class="in-group-tip"></i>';
                                that.find('.user-id').html(html);
                            }else{
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

        //获取选择数
        function selectFriend1(){
            $('.friend-li').on('click','.user-select',function(){
                var i = 0;
                $(".user-select input[type=checkbox]").each(function(){
                    if(this.checked){
                        i++
                    }
                });
                if(i>0){
                    $('.put-but').css('opacity','1');
                    $('.put-but i').html('('+i+')');             
                }else{
                    $('.put-but').css('opacity','0.5');
                    $('.put-but i').html('');             
                }
            })
        }
        //selectFriend();

        function selectFriend(){
            var i = 0;
            $('body').on('click','.friend-li .user-select',function(){
                if($(this).find('.in-group-tip').length>0){
                    if($(this).find('.in-group-tip').hasClass('select')){
                        $(this).find('.in-group-tip').removeClass('select');
                        i--;
                    }else{
                        $(this).find('.in-group-tip').addClass('select');
                        i++;
                    }
                }
                if(i>0){
                    $('.put-but').css('opacity','1');
                    $('.put-but i').html('('+i+')');             
                }else{
                    $('.put-but').css('opacity','0.5');
                    $('.put-but i').html('');             
                }
            })
        }
        selectFriend();

        //点击取消关闭
        $('body').on('click','.close-but',function(){
            $('.user-friend').hide();
            $('.put-but').css('opacity','0.5');
            $('.put-but i').html('');
        });

         //提交页面
        function handleClick(){
           $('body').on('click','.put-but',function(evt){
                evt.preventDefault();
                var user = [];
                var i = 0;
                $('.user-select .in-group-tip').each(function(){
                    if($(this).hasClass('select')){
                        var val = $(this).parent().attr('data-id')
                        //alert($(this).val());
                        user[i] = val;
                        i++
                    }
                }); 
                if(i>0){
                    $.ajax({
                        url: '/groupchart/joinGroup',
                        type: 'POST',
                        data: {groupid:groupid,user:user},
                        success: function(data){
                            if(data.success){
                                $('.user-friend').hide();
                                $('.put-but').css('opacity','0.5');
                                $('.put-but i').html('');
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
            }
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
                $('.change').show();
                name = $(this).find('.mark-name').html();
                //定位光标位置
                $(".change .change-mark").focus();   
            });
            $('body').on('click','.change .left',function(){
                $('.change').hide();
            })
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
        //群基本信息展示
        function groupmsgIn(){
            var html = '';
            $('body').on('click','.group-init .group-more',function(){
                html += '<img src="/group-photo/'+groupicon+'"/><p class="group-name">'+groupname+'</p>';
                $('.group-icon').html(html);
                $('.groupmsg').animate({ left: "0px"}, "fast");
            })
            $('body').on('click','.groupmsg .back',function(){
                // alert('a')
                $('.groupmsg').animate({ left: "100%"}, "fast");
            })
        }
        groupmsgIn();
        // 滚动条
        sideMenuScroll(1,1);
        //获取滚动事项
        function jianting(){
            $('.groupmsg-in').scroll(function(){
                // 滚动条距离顶部的距离 大于100px时
                if($('.groupmsg-in').scrollTop()>120){
                    $('.groupmsg .head1').css('display',"block");
                } else{
                    $('.groupmsg .head1').css('display',"none");
                }
            });
        }
        jianting();
        //更多信息
        function more(){
            $('body').on('click','.more',function(){
                $('.user-oper').show(100);
                $('.user-oper .manage').animate({bottom:0},100);
            })
            $('body').on('click','.user-oper',function(){
                $('.user-oper').hide(100);
                $('.user-oper .manage').animate({bottom:'-2.75rem'},100);
            })
        }
        more();
    })
})(jQuery,window,document);



