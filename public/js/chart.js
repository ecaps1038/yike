;(function($, window, document, undefined){
    $(document).ready(function(){
    	var socket = io();
        var html='';
    		$('#send').on('click',function(){
    			socket.emit('message',$('#content').val());
    			$('#content').val('');
    			return false;
    		});
        socket.on('message',function(msg){
          $('#message').append($('<li>').text(msg));
        });
})
})(jQuery,window,document);
