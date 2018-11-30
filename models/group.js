var groupdb = require("./groupdbserver.js");

exports.addgroup = function(req,res){
	var content = req.body;
	console.log(content);
	console.log(req.body.user);
	console.log(req.body.icon);
};