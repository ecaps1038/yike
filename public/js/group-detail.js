;(function($, window, document, undefined){
    $(document).ready(function(){
        var adminid;
        var groupid = $('.id').val();
        var usid = $('.usid').val();
        var $oper = $('.user-oper');

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
                            adminid = ver.adminid;
                            html +='<img src="/group-photo/'+ver.icon+'" style="width:100px;" />'+
                                '<span class="name">'+ver.name+'<i></i></span>'+
                                '<p>'+ver.intro+'</p>';
                            $('.intro').html(ver.intro);
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
            var html='',num = 0,usname,ingroup= '';
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
                            //判断是否已经加入该群
                            if(i.id == usid){
                            	ingroup = 1;
                            }
                        	html += '<li><a href="/detail?id='+i.id+'"><div class="img"><img src="/vacation-photo/'
                        	+i.imgurl+'"/>'+'</div>';
                            if(i.id == adminid){
                                html += '<span style="color:#00aaee;">'+usname+'</span></a>';
                            }else{
                                html += '<span>'+usname+'</span></a>';
                            }
                            
                        });
                        if(ingroup){
                            oper = '<a href="/groupchart?id='+groupid+'" class="chart">进入群</a>';
                        }else{
                            oper = '<button class="join-group">加入该群</button>';
                        }
                        $oper.html(oper);

                        $('.groupmsg .user').html(html);
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
                        	alert('加入成功');
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

    })
})(jQuery,window,document);



