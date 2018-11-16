var login = require('../models/login');
var chart = require('../models/chart');
var socket = require('../models/socket');
module.exports = function(app,io){
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
     login.logout(req,res);
});
app.get('/chart', function(req,res) {
	var id = req.query.id;
    chart.findUser(req,res,id);
    //socket.socket(req,res,io);
});
};