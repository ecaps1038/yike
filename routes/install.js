var install = require('../models/install');
var fileServe = require('../models/file.js');

module.exports = function(app){
	//朋友添加备注名
	app.post('/detail/markname',function(req,res){
		var cont = req.body.cont;
		var id = req.body.id;
		var usid = req.session.userId;
		//console.log(cont+';'+id+';'+usid);
		install.markName(res,cont,id,usid);
	});
	//修改用户名
	app.post('/detail/changepwd',function(req,res){
		var old = req.body.old;
		var news = req.body.news;
		var id = req.session.userId;
		install.changePwd(res,old,news,id);
	});

	app.get('/install',function(req,res){
		var id = req.session.userId;
		if(id){
			install.findMy(req,res,id);
		}else{
			res.redirect('/');
		}
	});
	//修改资料
	app.post('/install',function(req,res){
		var id = req.session.userId;
		install.upUser(req,res,id);
	});
};