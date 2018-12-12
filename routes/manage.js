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
		var num = req.body.num;
		manage.userTable(res,id,num);
	});
	//获取用户id删除
	app.post('/yike/manage/user/delete',function(req,res){
		manage.userDelete(req,res);
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
		var num = req.body.num;
		manage.groupTable(res,num);
	});
	//获取群id删除
	app.post('/yike/manage/group/delete',function(req,res){
		manage.groupDelete(req,res);
	});

	//点信息
	app.get('/yike/manage/msg',function(req,res){
		var id = req.session.userId;
		var adminid = req.session.adminid;
		if(id == adminid){
			//manage.userDet(res,id);
			res.render('manage/message');
		}else{
			res.redirect('/');
		}
	});	
	//获取群建立时间数据
	app.post('/yike/manage/msg/msgCount',function(req,res){
		manage.msgCount(res);
	});
	//获取群列表
	app.post('/yike/manage/msg/msgTable',function(req,res){
		var num = req.body.num;
		manage.msgTable(res,num);
	});
	//删除
	app.post('/yike/manage/msg/delete',function(req,res){
		manage.msgDelete(req,res);
	})

	//群信息
	app.get('/yike/manage/grpmsg',function(req,res){
		var id = req.session.userId;
		var adminid = req.session.adminid;
		if(id == adminid){
			//manage.userDet(res,id);
			res.render('manage/grpmsg');
		}else{
			res.redirect('/');
		}
	});	
	//获取群建立时间数据
	app.post('/yike/manage/grpmsg/msgCount',function(req,res){
		manage.grpmsgCount(res);
	});
	//获取群列表
	app.post('/yike/manage/grpmsg/msgTable',function(req,res){
		var num = req.body.num;
		manage.grpmsgTable(res,num);
	});
	//删除
	app.post('/yike/manage/grpmsg/delete',function(req,res){
		manage.grpmsgDelete(req,res);
	})

	//点对点关系网
	app.get('/yike/manage/friend',function(req,res){
		var id = req.session.userId;
		var adminid = req.session.adminid;
		if(id == adminid){
			//manage.userDet(res,id);
			res.render('manage/friend');
		}else{
			res.redirect('/');
		}
	});	
	//获取群建立时间数据
	app.post('/yike/manage/friend/frdCount',function(req,res){
		manage.frdCount(res);
	});
	//获取群列表
	app.post('/yike/manage/friend/frdTable',function(req,res){
		var num = req.body.num;
		manage.frdTable(res,num);
	});
	//删除
	app.post('/yike/manage/friend/delete',function(req,res){
		manage.frdDelete(req,res);
	})

}