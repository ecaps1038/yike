module.exports = function(app){
	app.post('/register', function(req, res){
		var email = req.body.email;
		var pswd = req.body.pswd;
		var rppswd = req.body.rppswd;
		console.log(pswd);
	    res.render('register');
	});
}