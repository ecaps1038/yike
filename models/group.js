var groupdbs = require("./groupdbserver.js");
var groupdb = require("./groupsdb.js");
var Group = groupdb.model('Group');
var Groupuser = groupdb.model('Groupuser');
var Groupmsg = groupdb.model('Groupmsg');

exports.addgroup = function(req,res){
	var adminid = req.session.userId;
	var name = req.body.groupName;
	var user = req.body.user;
	var content = req.body;
	console.log(content);
	//console.log(req.body.user);
	req.body.user.map(function(ver){
		console.log(ver);
	});
	console.log(req.body.icon);

	var groupData = {
		adminID: adminid,
		name: name,
		icon: req.body.icon,
		time: new Date()
	}
	groupdbs.insertGroup(groupData);

	Group.find({'adminID':adminid,'name':name},{'_id':1},function(err, rest){
		if (err) {
            console.log("查询群失败：" + err);
            return res.redirect('/');
        }else{user.map(function(ids){
        	user.map(function(ver){
        		var guserData = {
        			groupID: ids._id,
        			userID: ver,
					time: new Date()
        		}
        	})
        })
        }
	})
};