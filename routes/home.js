var login = require('../models/login');

module.exports = function(app){
	app.get('/', function(req, res){
	//res.cookie('id','我是id中的松溪',{signed:true, maxAge: 5000});
	  res.render('home');
	});
	app.get('/register', function(req, res){
	  res.render('register');
	});
	app.get('/login',function(req,res){
		res.render('register');
	})	
	app.get('/test',function(req,res){
		res.render('test');
		if(req.session.userId==req.signedCookies.id){
			console.log('相同的');
		}else{
			console.log('不同'+req.session.userId);
		}
		console.log('name'+req.session.username);
	})	
	app.post('/login',function(req,res){
		var email = req.body.email;
		var pswd = req.body.pswd;
		login.logIn(email,pswd,req,res);
	})
}
