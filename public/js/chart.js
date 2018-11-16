;(function($, window, document, undefined){
    $(document).ready(function(){
    	var socket = io();
        var html='';
    		$('#send').on('click',function(evt){
                    evt.preventDefault();
                    //var action = $('.newslefft').attr('action');
                    $.ajax({
                        url: '/chart',
                        type: 'POST',
                        data: $('.forms').serialize(),
                        success: function(data){
                            if(data.success){
                                //$container.html('Thank you!');
                                alert('添加成功');
                            }
                            else{
                                alert('添加失败');
                            }
                        },
                        error: function(){
                            alert('添加失败');
                        }
                    });
                });
        socket.on('message',function(msg){
          $('#message').append($('<li>').text(msg));
        });
})
})(jQuery,window,document);
