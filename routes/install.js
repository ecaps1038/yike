var install = require('../models/install');
var fileServe = require('../models/file.js');

module.exports = function(app){
	app.get('/install',function(req,res){
		var ids = req.query.id;
		var id = req.session.userId;
		if(id==ids){
			install.findUser(req,res,id);
		}else if(id != ids){
			install.findOther(req,res,ids);
		}else{
			res.redirect('/');
		}
	});
	//上传修改头像
	app.post('/photoinst',function(req,res){
		var id = req.session.userId;
		fileServe.userPhoto(req,res,id);
	});
	//修改资料
	app.post('/install',function(req,res){
		var id = req.session.userId;
		install.upUser(req,res,id);
	});
};