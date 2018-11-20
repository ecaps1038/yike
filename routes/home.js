var login = require('../models/login');

module.exports = function(app){
	app.get('/', function(req, res){
		var id = req.session.userId;
		if(id){
			res.redirect('/showuser');
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
}
