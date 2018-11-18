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
        socket.emit('login',from);
    	$('.but').on('click',function(evt){
            evt.preventDefault();
            var name = $('.name').html();
            var message = $('.text').val();
            var mesg = {
                name:name,
                to:to,
                message:message
            }
            socket.emit('message',mesg);
            html+='<div style="height:60px; width:400px; margin:10px; background:#fff; float:right;"><li><img src="/vacation-photo/'+ 
            myimgurl+'" style="width:60px;" />'+message+'</li></div>';
            $('#message').append(html); 
            html='';
            $('.text').val();

        });
        socket.on('sendMsg',function(name,msg){
            html+='<div style="height:60px; width:400px; margin:10px; float:left;"><li style="float:left;"><img src="/vacation-photo/'+ 
            imgurl+'" style="width:60px;" />'+name+':'+msg+'</li></div>';
          $('#message').append(html);
          html='';
        });
    })
})(jQuery,window,document);



