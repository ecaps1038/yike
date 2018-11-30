var login = require('../models/login');
var socket = require('../models/socket');
var group = require('../models/group');
var fileServe = require('../models/file.js');

module.exports = function(app){
	//建群页面
	app.get('/create-group',function(req,res){
		var userid = req.session.userId;
		login.showFriend1(req,res,userid);
	});

	//创建群上传图片
	app.post('/groupicon',function(req,res){
		fileServe.fileUp(req,res);
	});
	
	//创建裁剪群上传图片
	app.post('/clipphoto',function(req,res){
		fileServe.filecil(req,res);
	});

	//创建群写入数据库
	app.post('/addgroup',function(req,res){
		
		//var id = req.session.userId;
		group.addgroup(req,res);
		//res.redirect('/yike');
		res.send({success:true});
	});

	app.get('/photocut',function(req,res){
		res.render('photocut');
	})
};