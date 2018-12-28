var group = require('../models/group');
var groupdb = require('../models/groupdbserver');
var sockets = require('../models/socket');
var login = require('../models/login');

module.exports = function(app,io){
	app.get('/groupchart', function(req,res) {
		var id = req.query.id;
		var usid = req.session.userId;
		if(usid){
			res.render('groupchart',{id:id});
	    	//group.findGroup(req,res,id);
	    }else{
	    	res.redirect('/');
	    }
	});
	app.post('/groupchart/init',function(req,res){
		var id = req.body.id;
		group.findGroup(req,res,id);
	})

	//获取群成员
	app.post('/showUser',function(req,res){
		var groupid = req.body.groupid;
		group.showUser(req,res,groupid);
	});
	//查询群数据库信息
	app.post('/showGroupMessage',function(req,res){
		var groupid = req.body.groupid;
		group.showGroupMessage(req,res,groupid);
		//res.send({success:true});
	});

	//群返回刷新群未读数
	app.post('/toyike',function(req,res){
		var groupid = req.body.groupid;
		var userid = req.session.userId;
		groupdb.updateStatus(groupid,userid);
		res.send({success:true});
	});

	//获取用户朋友列表
	app.post('/groupchart/showMyfriend',function(req,res){
		var id = req.session.userId;
		login.getUser(req,res,id);
	});

	//验证好友是否在群内
	app.post('/groupchart/isinGroup',function(req,res){
		var groupid = req.body.groupid;
		var id = req.body.id;
		group.isinGroup(res,id,groupid);
	});
	//添加用户入群
	app.post('/groupchart/joinGroup',function(req,res){
		group.joinGroup(req,res);
	});
	//退出群
	app.post('/groupchart/quitGroup',function(req,res){
		group.quitGroup(req,res);
	});

	//修改群内名
	app.post('/groupchart/groupMark',function(req,res){
		group.groupMark(req,res);
	});

	//管理群
	app.get('/groupchart/managegroup',function(req,res){
		var id = req.query.id;
		var userid = req.session.userId;
		if(userid){
			res.render('managegroup',{id:id,userid:userid});
	    }else{
	    	res.redirect('/');
	    }
	});
	//获取群内信息
	app.post('/groupchart/managegroup/init',function(req,res){
		var id = req.body.id;
		group.findGroup(req,res,id);
	});
	//管理群-修改信息
	app.post('/groupchart/managegroup/update',function(req,res){
		group.updateGroup(req,res);
	});
	//管理群-修改信息
	app.post('/groupchart/managegroup/groupUser',function(req,res){
		var id = req.body.id;
		group.showUser(req,res,id);
	});
	//删除群用户
	app.post('/groupchart/managegroup/removeUser',function(req,res){
		group.removeUser(req,res);
	});
	//删除群
	app.post('/groupchart/managegroup/dissolveGroup',function(req,res){
		//group.removeUser(req,res);
		group.removeAllMsg(req,res);
		group.removeAllUser(req,res);
		group.removeGroup(req,res);
	});
}
