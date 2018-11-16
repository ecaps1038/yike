var io = require('socket.io');
var socket = io();
module.exports = function(app){
	app.post('/chart',function(req,res){
		console.log('chart');
		console.log('chart测试:' + req.body);
		res.send({success:true});
		//socket.emit('message',email);
	});
}
