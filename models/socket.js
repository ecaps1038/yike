//socket.io引入
var messagedb = require("./messagedbserver.js");
var frienddb = require('./friendsdbserver.js');
var groupdb = require('./groupdbserver.js');
var date = require('./date.js');

var group = require("./groupsdb.js");
var Groupuser = group.model('Groupuser');

module.exports = function(io){
	var socketList = {};
	var socketLogin = {};
	var socketGroupList = {};

	io.on('connection', function(socket){
		//用户登陆到大厅
		socket.on('login',function(id){
			socket.name = id;
			socketLogin[id] = socket.id;
			//console.log('socketid'+socketLogin);
		});
		//用户进入聊天
		socket.on('chart',function(id){
			socket.name = id;
			socketList[id] = socket.id;
			//console.log('socketid'+socketList[id]);
		});
		//接收好友信息
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
	        	console.log('离开yike');
	        }
	    });

	  	//加入群
		socket.on('group', function (data) {
			console.log(data);
	    	socket.join(data);
	  	});
		//接收群信息
	  	socket.on('groupmessage', function(msg){
		    var nowtime = date.NowTime(new Date());
		    //保存到群消息内
		    var msgData = {
		    	groupID: msg.groupid,
		    	fromID: msg.userid,
		    	content: msg.message,
		    	time: new Date(),
		    }
		    groupdb.insertGroupMsg(msgData);

		    //更新群用户消息数及最后通讯时间
		    groupdb.updateTime(msg.groupid);

			//广播消息
			socket.broadcast.to(msg.groupid).emit('sendGroupMsg',msg.message,msg.name,msg.imgurl,msg.userid);

			//未进入聊天群提示
			function getGroupUser(groupid){
				var id = {'groupID':groupid};
			    var out = {'userID':1};
			    Groupuser.find(id, out, function(err, res){
			        if (err) {
			            console.log("查询失败：" + err);
			        }
			        else {
			        	res.map(function(ver){
			        		var userid = ver.userID;
			        		if(socketLogin[userid]){
			        			socket.to(socketLogin[userid]).emit('addGroupMsg',msg.groupid,msg.message,nowtime);
			        		}
			        	})
			        }
			    });
			}
			getGroupUser(msg.groupid);
	  	});
	});
}