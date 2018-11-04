var register = require('../models/register');
var emails = require('../models/email');
module.exports = function(app){
	app.post('/register', function(req, res){
		var name = req.body.name;
		var email = req.body.email;
		var pwd = req.body.pwd;
		emails.emails(email,res);
		register.loginUp(name,email,pwd);
	});
}