var group = require('../models/group');
var sockets = require('../models/socket');

module.exports = function(app,io){
	app.get('/groupchart', function(req,res) {
		var id = req.query.id;
	    group.findGroup(req,res,id);
	    //res.render('chart');
	});

	//获取群成员
	app.post('/showUser',function(req,res){
		var groupid = req.body.groupid;
		group.showUser(req,res,groupid);
	})
	//查询群数据库信息
	app.post('/showGroupMessage',function(req,res){
		var groupid = req.body.groupid;
		group.showGroupMessage(req,res,groupid);
		//res.send({success:true});
	});
}
