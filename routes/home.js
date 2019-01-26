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
	app.get('/register', function(req,res){
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
		emails.forget(req,res,date,email);
	});
	//忘记密码找回页面
	app.get('/forget',function(req,res){
		var date = req.query.date;
		var email = req.query.email;
		if(date && email){
			res.render('forget',{date:date,email:email});
		}else{
			res.redirect('/');
		}
	});
	app.post('/forget/init',function(req,res){
		login.forget(req,res);
	});
	//密码修改
	app.post('/forget/changepwd',function(req,res){
		login.changePwd(req,res);
	})
}
