var login = require('../models/login');
var socket = require('../models/socket');
module.exports = function(app,io){
	app.post('/showUser',function(req,res){
		if(req.signedCookies.id){
			req.session.userId = req.signedCookies.id;
			req.session.username = req.signedCookies.username;
			req.session.imgurl = req.signedCookies.imgurl;
			var id = req.session.userId;
			login.showUser(req,res,id);
		}else if(req.session.userId){
			var id = req.session.userId;
			login.showUser(req,res,id);
		}else{
		//	res.redirect('/');
		}
	});
	app.post('/test',function(req,res){
		//res.send({success:true,context:'ddsdfsfasfafsfsf'});
		login.showUser1(req,res);
	})
};