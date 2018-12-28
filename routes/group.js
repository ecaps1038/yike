var login = require('../models/login');
var socket = require('../models/socket');
var group = require('../models/group');
var fileServe = require('../models/file.js');

module.exports = function(app){
	//建群页面
	app.get('/create-group',function(req,res){
		//var userid = req.session.userId;
		res.render('create-group');
		//login.showFriend1(req,res,userid);
	});
	//获取好友列表
	app.post('/creat-group/frend',function(req,res){
		var userid = req.session.userId;
		login.getUser(req,res,userid);
	})

	//创建裁剪群上传图片
	app.post('/clipphoto',function(req,res){
		fileServe.filecil(req,res);
	});

	//创建群写入数据库
	app.post('/addgroup',function(req,res){
		
		group.addgroup(req,res);
		//group.addgroupuser(req,res);
		res.send({success:true});
	});
};