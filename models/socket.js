//socket.io引入
var messagedb = require("./messagedbserver.js");

module.exports = function(io){
	var socketList = {};

	io.on('connection', function(socket){
		//用户登陆
		socket.on('login',function(id){
			socket.name = id;
			socketList[id] = socket.id;
			console.log('socketid'+socketList[id]);
		});
	  	socket.on('message', function(msg){
		    //console.log(msg);
		    var masg = msg.fromid+':'+msg.message;
		    //广播消息
		    //io.emit('message',masg);
		    //1对1发送消息
		    if(socketList[msg.to]){
		    	//保存数据库且标记为已读
		    	var data = {
		    		postMessages: msg.message,
					fromUserID: msg.fromid,                    			
				    toUserID: msg.toid,                       		
				    dateTime: new Date(),							
				    status: 1  
				}
		    	messagedb.insert(data);
			    socket.to(socketList[msg.to]).emit('sendMsg',msg.message);
			}else{
				//保存数据库且标为未读
				var data = {
					postMessages: msg.message,
					fromUserID: msg.fromid,                    			
				    toUserID: msg.toid,                       		
				    dateTime: new Date(),							
				    status: 0  
				}
		    	messagedb.insert(data);
			}
	  	});
	  	//用户离开
	  	socket.on('disconnect', function() {
        	//hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性
	        if(socketList.hasOwnProperty(socket.name)) {
	            //退出用户的信息
	            //var obj = {userid:socket.name, nickname:onlineUsers[socket.name]};
	            //console.log('离开'+socket.name);
	            //删除
	            delete socketList[socket.name];

	            //向所有客户端广播用户退出
	            //socket.broadcast.emit('system', obj, onlineCount, 'logout');
	        }
	    });
	});
}