var login = require('../models/login');
var socket = require('../models/socket');
var yike = require('../models/yike');
module.exports = function(app,io){
	app.get('/yike',function(req,res){
		if(req.signedCookies.id){
			req.session.userId = req.signedCookies.id;
			req.session.username = req.signedCookies.username;
			req.session.imgurl = req.signedCookies.imgurl;
			var id = req.session.userId;
			login.showFriend(req,res,id);
		}else if(req.session.userId){
			var id = req.session.userId;
			login.showFriend(req,res,id);
		}else{
			res.redirect('/');
		}
	});
	app.post('/search',function(req,res){
		var content = req.body.search;
		var id = req.session.userId;
		yike.search(req,res,content,id);
		//res.send({success:true});
	})
};