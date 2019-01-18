var login = require('../models/login');
var emails = require('../models/email');

module.exports = function(app){
	app.get('/', function(req, res){
		var id = req.session.userId;
		if(id){
			res.redirect('/yike');
		}else{
	    	res.render('home');
		}
	});
	app.get('/register', function(req, res){
	  res.render('register');
	});
	app.get('/login',function(req,res){
		res.render('register');
	});	
	app.post('/login',function(req,res){
		var email = req.body.email;
		var pswd = req.body.pswd;
		login.logIn(email,pswd,req,res);
	});
	app.get('/logout', function(req,res) {
        login.logout(req,res);
	});
	//忘记密码
	app.post('/forget',function(req,res){
		var date = req.body.date;
		var email = req.body.email;
		emails.forget(res,date,email);
	});
	//忘记密码找回
	app.get('/forget',function(res,req){
		var date = req.query.aa;
		res.render('forget',{date:date});
	})
}
