var login = require('../models/login');
var socket = require('../models/socket');
module.exports = function(app,io){
	app.get('/yike',function(req,res){
		var id = req.session.userId; 
		login.showFriend(req,res,id);
		res.redirect('/');
		// if(req.signedCookies.id){
		// 	req.session.userId = req.signedCookies.id;
		// 	req.session.username = req.signedCookies.username;
		// 	req.session.imgurl = req.signedCookies.imgurl;
		// 	var id = req.session.userId;
		// 	login.showFriend(req,res,id);
		// }else if(req.session.userId){
		// 	var id = req.session.userId;
		// 	login.showFriend(req,res,id);
		// }else{
		// 	res.redirect('/');
		// }
	});
};