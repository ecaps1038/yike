var chart = require('../models/chart');
var sockets = require('../models/socket');

module.exports = function(app,io){
	app.get('/chart', function(req,res) {
		var id = req.query.id;
	    chart.findUser(req,res,id);
	    //res.render('chart');
	});
}
