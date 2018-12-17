var register = require('../models/register');
var emails = require('../models/email');
module.exports = function(app){
	//判断邮箱是否已占用
	app.post('/register/email',function(req,res){
		var email = req.body.email;
		register.searchEmail(res,email);
	});
	//判断用户名是否已占用
	app.post('/register/name',function(req,res){
		var name = req.body.name;
		register.searchName(res,name);
	});
	app.post('/register', function(req, res){
		var name = req.body.name;
		var email = req.body.email;
		var pwd = req.body.pwd;
		console.log(name+':'+email+':'+pwd);
		emails.emails(email,res);
		register.loginUp(res,name,email,pwd);
	});
}