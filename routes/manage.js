var manage = require('../models/manage');

module.exports = function(app){
	app.get('/yike/manage', function(req, res){
		if(req.session.userId){
			var id = req.session.userId;
			manage.allow(req,res,id);
		}else{
			res.redirect('/');
		}
	});
	//首页
	app.get('/yike/manage/home',function(req,res){
		var id = req.session.userId;
		var adminid = req.session.adminid;
		if(id == adminid){
			var img = req.session.imgurl;
			var name = req.session.username;
			res.render('manage/home',{img: img,name: name});
		}else{
			res.redirect('/');
		}
	});	
	//获取用户数据
	app.post('/yike/manage/home/findUser',function(req,res){
		manage.findUser(res);
	});
	//获取群数据
	app.post('/yike/manage/home/findGroup',function(req,res){
		manage.findGroup(res);
	});
	//获取点信息数据
	app.post('/yike/manage/home/findMsg',function(req,res){
		manage.findMsg(res);
	});
	//获取群信息数据
	app.post('/yike/manage/home/findGrpmsg',function(req,res){
		manage.findGrpmsg(res);
	});

	//用户页面
	app.get('/yike/manage/user',function(req,res){
		var id = req.session.userId;
		var adminid = req.session.adminid;
		if(id == adminid){
			//manage.userDet(res,id);
			res.render('manage/user');
		}else{
			res.redirect('/');
		}
	});	
	//获取用户加入时间数据
	app.post('/yike/manage/user/userRegist',function(req,res){
		manage.userRegist(res);
	});
	//获取用户列表
	app.post('/yike/manage/user/userTable',function(req,res){
		var id = req.session.userId;
		manage.userTable(res,id);
	});

	//群页面
	app.get('/yike/manage/group',function(req,res){
		var id = req.session.userId;
		var adminid = req.session.adminid;
		if(id == adminid){
			//manage.userDet(res,id);
			res.render('manage/group');
		}else{
			res.redirect('/');
		}
	});	
	//获取群建立时间数据
	app.post('/yike/manage/group/groupRegist',function(req,res){
		manage.groupRegist(res);
	});
	//获取群列表
	app.post('/yike/manage/group/groupTable',function(req,res){
		var id = req.session.userId;
		manage.groupTable(res,id);
	});

}