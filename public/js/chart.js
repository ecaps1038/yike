;(function($, window, document, undefined){
    $(document).ready(function(){
    	var socket = io();
        var html='';
        var fromid = $('.myid').val();
        var toid = $('.id').val();
        var imgurl = $('.imgurl').val();
        var myimgurl = $('.myimgurl').val();
        var from = fromid+toid;
        var to = toid+fromid;
        var name = $('.name').html();
        function showMessage(){
            $.ajax({
                url: '/showMessage',
                type: 'POST',
                data: {fromid:fromid,toid:toid},
                success: function(data){
                    if(data.success){
                        var aa = data.context.vacation;
                        console.log(aa)
                        var html='';
                        var tt = aa.map(function(i){
                            if(i.toUserID==toid){
                                html+='<div style="height:60px; width:400px; margin:10px; background:#fff; float:right;"><li><img src="/vacation-photo/'+ 
                                myimgurl+'" style="width:60px;" />'+i.message+'</li></div>';
                            }else{
                                html+='<div style="height:60px; width:400px; margin:10px;  float:left;"><li><img src="/vacation-photo/'+ 
                                imgurl+'" style="width:60px;" />'+name+':'+i.message+'</li></div>';
                            }

                    })
                    $('#message').append(html);
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
        showMessage();

        socket.emit('chart',from);
    	$('.but').on('click',function(evt){
            evt.preventDefault();
            var message = $('.text').val();
            var mesg = {
                name:name,
                to:to,
                message: message,
                fromid: fromid,
                toid: toid
            }
            socket.emit('message',mesg);
            html+='<div style="height:60px; width:400px; margin:10px; background:#fff; float:right;"><li><img src="/vacation-photo/'+ 
            myimgurl+'" style="width:60px;" />'+message+'</li></div>';
            $('#message').append(html); 
            html='';
            $('.text').val("");

        });
        socket.on('sendMsg',function(msg){
            html+='<div style="height:60px; width:400px; margin:10px; float:left;"><li style="float:left;"><img src="/vacation-photo/'+ 
            imgurl+'" style="width:60px;" />'+name+':'+msg+'</li></div>';
          $('#message').append(html);
          html='';
        });
    })
})(jQuery,window,document);



