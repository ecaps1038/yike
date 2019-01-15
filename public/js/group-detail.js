;(function($, window, document, undefined){
    $(document).ready(function(){
        var html='';
        var userid,myimgurl,myname,adminid,groupname,groupicon;
        var groupid = $('.id').val();
        var usid = $('.usid').val();

        //初始化页面
        function initPage(){
            var html = '',oper = '';
            var id = $('.id').val();
            var $init = $('.group-init');
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
                            $('.intro').html(ver.intro);

                            //图片信息
                            var html1 = '<img src="/group-photo/'+groupicon+'"/><p class="group-name">'+groupname+'</p>';
                            $('.group-icon').html(html1);
                        });
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

        //获取群成员列表
        function showUsers(){
            var html='',num = 0,usname,groupIn = 0;
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
                                groupIn = 1;                          
                            }
                            html += '<li><a href="/detail?id='+i.id+'"><div class="img-100"><img src="/vacation-photo/'
                            +i.imgurl+'"/>'+'</div>';
                            html += '<p>'+usname+'</p></a></li>';
                        });
                        if(groupIn == 1){
                            oper = '<div class="manage"><a href="/groupchart?id='+groupid+'" class="control manage-tb">进入群聊</a></div>';
                        }else{
                            oper = '<div class="manage"><p class="join-group control">加入群</p></div>';
                        }
                        var $oper = $('.user-oper');
                        $oper.html(oper);                        
                        $('.groupmsg .user').html(html);
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

        //加入该群
        function handleClick(){
           $('body').on('click','.user-oper .join-group',function(evt){
                evt.preventDefault();
                var user = [];
                var i = 0;
                user[i] = usid; 
                $.ajax({
                    url: '/groupchart/joinGroup',
                    type: 'POST',
                    data: {groupid:groupid,user:user},
                    success: function(data){
                        if(data.success){
                        	//alert('加入成功');
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

        sideMenuScroll(1,1);

    })
})(jQuery,window,document);



