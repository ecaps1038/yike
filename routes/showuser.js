var login = require('../models/login');
module.exports = function(app){
	app.get('/showUser',function(req,res){
		if(req.signedCookies.id){
			req.session.userId = req.signedCookies.id;
			req.session.username = req.signedCookies.username;
			var id = req.session.userId;
			login.showUser(req,res,id);
		}else if(req.session.userId){
			var id = req.session.userId;
			login.showUser(req,res,id);
		}else{
			res.redirect('/');
		}
	});
app.get('/logout', function(req,res) {
     delete req.session.userId;
     return res.redirect('/');
})
};