var fileServe = require('../models/file.js');

module.exports = function(app){
	
	//跳转裁剪页面
	app.get('/photocut',function(req,res){
		var atl = req.query.atl;
		var id = req.query.id;
		res.render('photocut',{atl:atl,id:id});
	});
	
	//创建裁剪用户上传图片
	app.post('/userPhoto',function(req,res){
		fileServe.userPhoto(req,res);
	});

	//创建裁剪群上传图片
	app.post('/groupPhoto',function(req,res){
		fileServe.groupPhoto(req,res);
	});

	//裁剪群修改上传图片
	app.post('/groupCgPhoto',function(req,res){
		fileServe.groupCgPhoto(req,res);
	});
};