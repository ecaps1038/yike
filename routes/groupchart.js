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
		var groupid = req.body.toid;
		group.showUser(req,res,groupid);
	})
	//查询数据库信息
	app.post('/showMessage',function(req,res){
		var from = req.body.fromid;
		var to = req.body.toid;
		chart.showMessage(req,res,from,to);
		//res.send({success:true});
	});
}
