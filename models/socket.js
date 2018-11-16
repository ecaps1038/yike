//socket.io引入

exports.socket = function(req,res,io){
	var name = req.session.username;

    io.on('connection', function(socket){
	  socket.on('message', function(msg){

	    console.log(name + ':' + msg);
	    var masg = name + ':' + msg;
	    //广播消息
	    io.emit('message',masg);
	  });
	});
};

module.exports = function(io){
	io.on('connection', function(socket){
	  socket.on('message', function(msg){

	    console.log(msg.userName + ':' + msg.content);
	    var masg = msg.userName + ':' + msg.content;
	    //广播消息
	    io.emit('message',masg);
	  });
	});
}