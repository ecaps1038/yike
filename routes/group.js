var login = require('../models/login');
var socket = require('../models/socket');
var group = require('../models/group');
var fileServe = require('../models/file.js');

module.exports = function(app){
	//建群页面
	app.get('/create-group',function(req,res){
		var userid = req.session.userId;
		login.showFriend1(res,userid);
	});

	//创建群
	app.post('/addgroup',function(req,res){
		//var content = req.body.search;
		//var id = req.session.userId;
		fileServe.fileUp(req,res);
		//res.redirect('/yike');
		//res.send({success:true});
	});
};