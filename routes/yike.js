var login = require('../models/login');
var socket = require('../models/socket');
var yike = require('../models/yike');
var chart = require('../models/chart');
var group = require('../models/group');
module.exports = function(app,io){
	app.get('/yike',function(req,res){
		if(req.signedCookies.id){
			req.session.userId = req.signedCookies.id;
			req.session.username = req.signedCookies.username;
			req.session.imgurl = req.signedCookies.imgurl;
			var id = req.session.userId;
			login.showFriend(req,res,id);
			group.showGroup(req,res,id);
		}else if(req.session.userId){
			var id = req.session.userId;
			login.showFriend(req,res,id);
			group.showGroup(req,res,id);
		}else{
			res.redirect('/');
		}
	});
	//搜索
	app.post('/search',function(req,res){
		var content = req.body.search;
		var id = req.session.userId;
		yike.search(req,res,content,id);
		//res.send({success:true});
	});
	//进入搜索结果
	app.get('/search-detail',function(req,res){
		var id = req.query.id;
		if(id){
			yike.findUser(req,res,id);
		}else{
			res.redirect('/');
		}
	});		
	//添加好友
	app.get('/add',function(req,res){
		var friendid = req.query.id;
		var userid = req.session.userId;
		yike.addfriend(res,friendid,userid);
	});	
	//删除好友
	app.get('/delete-friend',function(req,res){
		var friendid = req.query.id;
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

};