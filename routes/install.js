var install = require('../models/install');
module.exports = function(app){
	app.get('/install',function(req,res){
		var name = req.query.name;
		var id = req.session.userId
		if(id){
			install.findUser(req,res,id);
		}else{
			res.redirect('/');
		}
	});
};