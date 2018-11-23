//socket.io引入
var messagedb = require("./messagedbserver.js");
var frienddb = require('./friendsdbserver.js');
var date = require('./date.js');

module.exports = function(io){
	var socketList = {};
	var socketLogin = {};

	io.on('connection', function(socket){
		//用户登陆到大厅
		socket.on('login',function(id){
			socket.name = id;
			socketLogin[id] = socket.id;
			//console.log('socketid'+socketList[id]);
		});
		//用户进入聊天
		socket.on('chart',function(id){
			socket.name = id;
			socketList[id] = socket.id;
			//console.log('socketid'+socketList[id]);
		});
	  	socket.on('message', function(msg){
		    var nowtime = date.NowTime(new Date());
		    //更新好友最近通信时间
		    frienddb.updateTime(msg.fromid,msg.toid,);
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
		    	socket.to(socketLogin[msg.toid]).emit('addMsg',msg.fromid,msg.message,nowtime);
			}
	  	});
	  	//用户离开
	  	socket.on('disconnect', function() {
        	//hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性
	        if(socketList.hasOwnProperty(socket.name)) {
	            //删除
	            delete socketList[socket.name];
	        }
	        if(socketLogin.hasOwnProperty(socket.name)){
	        	delete socketLogin[socket.name];
	        	//console.log('离开yike');
	        }
	    });
	});
}