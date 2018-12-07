var manage = require('../models/manage');

module.exports = function(app){
	// app.get('/', function(req, res){
	// 	var id = req.session.userId;
	// 	if(id){
	// 		res.redirect('/showuser');
	// 	}else{
	//     	res.render('home');
	// 	}
	// });
	app.get('/yikemanageh', function(req, res){
		var id = req.session.userId;
		manage.allow(req,res,id);
	});
	// app.get('/login',function(req,res){
	// 	res.render('register');
	// });	
	// app.post('/login',function(req,res){
	// 	var email = req.body.email;
	// 	var pswd = req.body.pswd;
	// 	login.logIn(email,pswd,req,res);
	// });
	// app.get('/logout', function(req,res) {
 //        login.logout(req,res);
	// });
}