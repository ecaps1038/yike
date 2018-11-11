var install = require('../models/install');
var fileServe = require('../models/file.js');

module.exports = function(app){
	app.get('/install',function(req,res){
		var name = req.query.name;
		var id = req.session.userId;
		if(id){
			install.findUser(req,res,id);
		}else{
			res.redirect('/');
		}
	});
	app.post('/photoinst',function(req,res){
		var id = req.session.userId;
		fileServe.userPhoto(req,res,id);
	})
};