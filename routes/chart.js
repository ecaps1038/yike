var chart = require('../models/chart');
var sockets = require('../models/socket');

module.exports = function(app,io){
	app.get('/chart', function(req,res) {
		var id = req.query.id;
		var usid = req.session.userId;
		if(usid){
	    	chart.findUser(req,res,id);
	    }else{
	    	res.redirect('/');
	    }
	    //res.render('chart');
	});

	//查询数据库信息
	app.post('/showMessage',function(req,res){
		var from = req.body.fromid;
		var to = req.body.toid;
		chart.showMessage(req,res,from,to);
		//res.send({success:true});
	});
}
