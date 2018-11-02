var login = require('../models/login');

module.exports = function(app){
	app.get('/', function(req, res){
	  res.render('home');
	});
	app.get('/register', function(req, res){
	  res.render('register');
	});
	app.get('/login',function(req,res){
		res.render('register');
	})
	app.post('/login',function(req,res){
		var email = req.body.email;
		var pswd = req.body.pswd;
		if(pswd=='123'){
			login.up(email,pswd,res);
		}else{
			res.redirect('/');
		}
	})


}
