var login = require('../models/login');
var socket = require('../models/socket');
var yike = require('../models/yike');
var chart = require('../models/chart');
var group = require('../models/group');
module.exports = function(app,io){
	//移动端进入首页
	app.get('/yike',function(req,res){
		if(req.signedCookies.id){
			req.session.userId = req.signedCookies.id;
			req.session.username = req.signedCookies.username;
			req.session.imgurl = req.signedCookies.imgurl;
			var id = req.session.userId;
		    var myimgurl = req.session.imgurl;
		    var myname = req.session.username;
			//login.showFriend(req,res,id);
			res.render('yike',{id:id,myimgurl:myimgurl,myname:myname});
			//group.showGroup(req,res,id);
		}else if(req.session.userId){
			var id = req.session.userId;
			var myimgurl = req.session.imgurl;
		    var myname = req.session.username;
			res.render('yike',{id:id,myimgurl:myimgurl,myname:myname});
			//group.showGroup(req,res,id);
		}else{
			res.redirect('/');
		}
	});

	//pc端进入首页
	app.get('/yikepc',function(req,res){
		if(req.signedCookies.id){
			req.session.userId = req.signedCookies.id;
			req.session.username = req.signedCookies.username;
			req.session.imgurl = req.signedCookies.imgurl;
			var id = req.session.userId;
		    var myimgurl = req.session.imgurl;
		    var myname = req.session.username;
			//login.showFriend(req,res,id);
			res.render('pc/yikepc',{id:id,myimgurl:myimgurl,myname:myname});
			//group.showGroup(req,res,id);
		}else if(req.session.userId){
			var id = req.session.userId;
			var myimgurl = req.session.imgurl;
		    var myname = req.session.username;
			res.render('pc/yikepc',{id:id,myimgurl:myimgurl,myname:myname});
			//group.showGroup(req,res,id);
		}else{
			res.redirect('/');
		}
	});

	//获取用户列表
	app.post('/getuser',function(req,res){
		var userid = req.session.userId;
		login.getUser(req,res,userid);
	});
	//获取好友请求列表
	app.post('/getaddfriend',function(req,res){
		var userid = req.session.userId;
		login.getaddfriend(req,res,userid);
	});
	//进入搜索页面
	app.get('/yike/search',function(req,res){
		res.render('search');
	});
	//搜索用户
	app.post('/search/user',function(req,res){
		var content = req.body.search;
		var id = req.session.userId;
		yike.searchUser(res,content,id);
	});
	//搜索用户
	app.post('/search/group',function(req,res){
		var content = req.body.search;
		yike.searchGroup(res,content);
	});
	//进入搜索结果
	app.get('/detail',function(req,res){
		var id = req.query.id;
		var usid = req.session.userId;
		if(id && usid){
			yike.findUser(req,res,id);
		}else{
			res.redirect('/');
		}
	});		
	//进入群搜索结果
	app.get('/group-detail',function(req,res){
		var id = req.query.id;
		var usid = req.session.userId;
		if(id && usid){
			res.render('group-detail',{id:id,usid:usid});
			//yike.findUser(req,res,id);
		}else{
			res.redirect('/');
		}
	});		
	//添加好友
	app.post('/add',function(req,res){
		var friendid = req.body.id;
		var reason = req.body.reason;
		var userid = req.session.userId;
		yike.addfriend(res,friendid,userid,reason);
	});	
	//同意好友申请
	app.post('/yike/aggree',function(req,res){
		var friendid = req.body.id;
		var userid = req.session.userId;
		yike.aggreeAndAdd(res,friendid,userid);
	})
	//删除好友
	app.post('/delete-friend',function(req,res){
		var friendid = req.body.id;
		var userid = req.session.userId;
		yike.deletefriend(res,friendid,userid);
	});
	//获取未读信息数
	app.post('/imsg',function(req,res){
		var friendid = req.body.id;
		var userid = req.session.userId;
		chart.getcount(res,userid,friendid);
	});
	//获取最后一条通信信息
	app.post('/lastmsg',function(req,res){
		var friendid = req.body.id;
		var userid = req.session.userId;
		chart.findOne(res,userid,friendid);
	});
	//获取群列表
	app.post('/getgroup',function(req,res){
		var userid = req.session.userId;
		group.showGroup(req,res,userid);
	});
	//获取群未读消息数及最后通话时间
	app.post('/groupcount',function(req,res){
		var groupid = req.body.id;
		var userid = req.session.userId;
		group.getgroupcount(res,groupid,userid);
	});
	//获取群最后通讯信息
	app.post('/lastgroupmsg',function(req,res){
		var groupid = req.body.id;
		group.findOne(res,groupid);	
	})

};