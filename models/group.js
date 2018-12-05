var groupdbs = require("./groupdbserver.js");
var groupdb = require("./groupsdb.js");
var Group = groupdb.model('Group');
var Groupuser = groupdb.model('Groupuser');
var Groupmsg = groupdb.model('Groupmsg');
var date = require('./date.js');

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
		        }else{
		        	//添加朋友入群
		        	rest.map(function(ids){
			        	user.map(function(ver){
			        		var guserData = {
			        			groupID: ids._id,
			        			userID: ver,
								time: new Date(),
                                lasttime: new Date()
			        		}
			        		console.log(guserData);
			        		groupdbs.insertGroupUser(guserData);
			        	});
                        //添加自己入群
                        userData = {
                            groupID: ids._id,
                            userID: adminid,
                            time: new Date(),
                            lasttime: new Date()
                        }
                        groupdbs.insertGroupUser(userData);
			        });
		        }
			})
        }
    });
};

//查询用户对应的群
exports.showGroup = function(req,res,id){
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
        var context = {
            vacation : result.map(function(ver){
                return {
                    markname: ver.name,
                    lasttime: ver.lasttime.getTime(),
                    id : ver.groupID._id,
                    name: ver.groupID.name,
                    intro: ver.groupID.intro,
                    icon: ver.groupID.icon,
                }
            })           
        };
        res.send({success:true,result:context});
    }).catch(function(err){
        console.log(err);
    });   
};

//进入群聊天页
exports.findGroup = function(req,res,id){
    var myid = req.session.userId;
    var myimgurl = req.session.imgurl;
    var myname = req.session.username;

    //复位群未读消息数
    groupdbs.updateStatus(id,myid);

    var id = {'_id':id};
    var out = {'name':1,'icon':1,'adminID':1};
    Group.find(id, out, function(err, ress){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
        	
            var context = {
	            vacation : ress.map(function(ver){
	            	var admin;
	                if(ver.adminID==myid){
	                    admin=1;
	                }else{admin=null;}
	                return {
	                    id: ver._id,
	                    name: ver.name,
	                    icon: ver.icon,
	                    online: ver.online,
	                    myid: myid,
	                    myimgurl: myimgurl,
	                    myname: myname,
	                    admin: admin,
	                }
	            })
	        };
	        res.render('groupchart',context);
        }
    });
};

//查询群消息
exports.showGroupMessage = function(req,res,id){
	var query = Groupmsg.find({});
    //根据userID查询
    query.where('groupID',id);
    //查出friendID的user对象
    query.populate('fromID');
    //按照最后会话时间倒序排列
    //query.sort({'time':-1});
    //查询结果
    query.exec().then(function(result){
        //console.log(result);
        var context = {
            vacation : result.map(function(ver){
            	if(ver.fromID.imgurl){
                    var imgurl = ver.fromID.imgurl;
                }else{
                    var imgurl = 'user.jpg';
                } 
                return {
                    content: ver.content,
                    id : ver.fromID._id,
                    name: ver.fromID.name,
                    imgurl: imgurl,
                    dateTime: date.DateDetail(ver.time), 
                    timeInt: ver.time.getTime(),                
                }
            })           
        };
        res.send({success:true,result:context});
    }).catch(function(err){
        console.log(err);
    });   
}

//查询群对应的群成员
exports.showUser = function(req,res,id){
	var query = Groupuser.find({});
    //根据userID查询
    query.where('groupID',id);
    //查出friendID的user对象
    query.populate('userID');
    //按照最后会话时间倒序排列
    query.sort({'time':-1});
    //查询结果
    query.exec().then(function(result){
        //console.log(result);
        var context = {
            vacation : result.map(function(ver){
            	if(ver.userID.imgurl){
                    var imgurl = ver.userID.imgurl;
                }else{
                    var imgurl = 'user.jpg';
                } 
                return {
                    markname: ver.name,
                    id : ver.userID._id,
                    name: ver.userID.name,
                    imgurl: imgurl,
                }
            })           
        };
        res.send({success:true,result:context});
    }).catch(function(err){
        console.log(err);
    });   
}
