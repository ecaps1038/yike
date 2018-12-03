var groupdbs = require("./groupdbserver.js");
var groupdb = require("./groupsdb.js");
var Group = groupdb.model('Group');
var Groupuser = groupdb.model('Groupuser');
var Groupmsg = groupdb.model('Groupmsg');

exports.addgroup1 = function(req,res){
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
	//groupdbs.insertGroup(groupData);


};
exports.addgroupuser = function(req,res){
	var adminid = req.session.userId;
	var name = req.body.groupName;
	var user = req.body.user;
	Group.find({'adminID':adminid,'name':name},{'_id':1},function(err, rest){
		if (err) {
            console.log("查询群失败：" + err);
            return res.redirect('/');
        }else{rest.map(function(ids){
        	user.map(function(ver){
        		var guserData = {
        			groupID: ids._id,
        			userID: ver,
					time: new Date()
        		}
        		console.log(guserData);
        	})
        })
        }
	})
};

//添加群及群成员数据
exports.addgroup = function(req,res){
	var adminid = req.session.userId;
	var name = req.body.groupName;
	var user = req.body.user;
	var groupData = {
		adminID: adminid,
		name: name,
		icon: req.body.icon,
		time: new Date()
	}
	var group = new Group(groupData);

    group.save(function (err, res) {
        if (err) {
            console.log("群添加失败" + err);
        }
        else {
            Group.find({'adminID':adminid,'name':name},{'_id':1},function(err, rest){
				if (err) {
		            console.log("查询群失败：" + err);
		            return res.redirect('/');
		        }else{rest.map(function(ids){
		        	user.map(function(ver){
		        		var guserData = {
		        			groupID: ids._id,
		        			userID: ver,
							time: new Date()
		        		}
		        		console.log(guserData);
		        		groupdbs.insertGroupUser(guserData);
		        	})
		        })
		        }
			})
        }
    });
};

//查询用户对应的群
exports.showGroup = function(req,res,id){
    var myimgurl = req.session.imgurl;
    var myname = req.session.username;
    var query = Groupuser.find({});
    //根据userID查询
    query.where('userID',id);
    //查出friendID的user对象
    query.populate('groupID');
    //按照最后会话时间倒序排列
    query.sort({'lasttime':-1});
    //查询结果
    query.exec().then(function(result){
        //console.log(result);
        var context1 = {
            vacation1 : result.map(function(ver){
                return {
                    markname: ver.name,
                    id : ver.groupID._id,
                    name: ver.groupID.name,
                    intro: ver.groupID.intro,
                    icon: ver.groupID.icon,
                }
            })           
        };
       // res.render('yike',context1,);
    }).catch(function(err){
        console.log(err);
    });   
};