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
                    
		        	rest.map(function(ids){
                        //添加自己入群
                        userData = {
                            groupID: ids._id,
                            userID: adminid,
                            time: new Date(),
                            lasttime: new Date()
                        }
                        groupdbs.insertGroupUser(userData);
                        //添加朋友入群
			        	user.map(function(ver){
			        		var guserData = {
			        			groupID: ids._id,
			        			userID: ver,
								time: new Date(),
                                lasttime: new Date()
			        		}
			        		//console.log(guserData)
			        		groupdbs.insertGroupUser(guserData);
			        	});
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
    var out = {'name':1,'icon':1,'adminID':1,'intro':1};
    Group.find(id, out, function(err, ress){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
        	
            var context = {
	            vacation : ress.map(function(ver){
	                return {
	                    id: ver._id,
                        adminid: ver.adminID,
	                    name: ver.name,
	                    icon: ver.icon,
                        intro: ver.intro,
	                    myid: myid,
	                    myimgurl: myimgurl,
	                    myname: myname,
	                }
	            })
	        };
            res.send({success:true,context});
	        //res.render('groupchart',context);
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
    query.sort({'time':1});
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

//获取群最后消息及未读消息数
exports.getgroupcount = function(res,groupid,userid){
	var wherestr = {'groupID':groupid,'userID':userid};
	var out = {'status':1};  
    Groupuser.find(wherestr, out, function(err, rest){
        if (err) {
            console.log("数据统计失败：" + err);
        }
        else {
            res.send({success:true,rest:rest});
        }
    });
}

//查询符合条件的第一条数据
exports.findOne = function(res,groupid){
    var query = Groupmsg.findOne({});
    //根据userID查询
    query.where({'groupID':groupid});
    //查出friendID的user对象
    query.populate('fromID');
    query.sort({'time':-1});
    //查询结果
    query.exec().then(function(result){
        res.send({success:true,result:result});
    }).catch(function(err){
        console.log(err);
    }); 
};

//验证好友是否在群内
exports.isinGroup = function(res,usid,groupid){
    var wherestr = {'groupID':groupid,'userID':usid};
    Groupuser.countDocuments(wherestr, function(err, rest){
        if(err){
            console.log('汇总失败');
        }else{
            res.send({success:true,rest:rest});
        }
    });
};

//加入确定群
exports.joinGroup = function(req,res){
    var grpid = req.body.groupid;
    var user = req.body.user;

    user.map(function(ver){
        var guserData = {
            groupID: grpid,
            userID: ver,
            time: new Date(),
            lasttime: new Date()
        }
        //console.log(guserData);
        groupdbs.insertGroupUser(guserData);
        res.send({success:true});
    });
};
//退出群
exports.quitGroup = function(req,res){
    var grpid = req.body.groupid;
    var userid = req.session.userId;
    var wherestr = {'groupID':grpid,'userID':userid};
    Groupuser.deleteOne(wherestr, function(err, rest){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.send({success:true});
        }    
    })
};
//修改群内名
exports.groupMark = function(req,res){
    var name = req.body.name;
    var grpid = req.body.groupid;
    var userid = req.session.userId;
    var wherestr = {'groupID':grpid,'userID':userid};
    var updatestr = {'name': name};     
    Groupuser.updateOne(wherestr, updatestr, function(err, rest){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            res.send({success:true});
        }
    });
};

//修改群内容信息
exports.updateGroup = function(req,res){
    var name = req.body.name;
    var grpid = req.body.id;
    var intro = req.body.explain;

    var wherestr = {'_id':grpid};
    var updatestr = {'name': name, 'intro':intro};     

    Group.updateOne(wherestr, updatestr, function(err, rest){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            res.send({success:true});
        }
    });
};

//修改群内容信息
exports.updateGroup1 = function(req,res){
    var name = req.body.name;
    var grpid = req.body.id;
    var main = req.body.main;
    var wherestr = {'_id':grpid};
    if(name == "name"){
        var updatestr = {'name': main};     
    }else{
        var updatestr = {'intro': main};
    }
    Group.updateOne(wherestr, updatestr, function(err, rest){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            res.send({success:true});
        }
    });
};

//删除群成员
exports.removeUser = function(req,res){
    var userid = req.body.userid;
    var grpid = req.body.id;
    var wherestr = {'groupID':grpid, 'userID':userid};
    Groupuser.deleteOne(wherestr, function(err, rest){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            res.send({success:true});
        }
    });
};

//移出群
//删除群所有消息
exports.removeAllMsg = function(req,res){
    var grpid = req.body.id;
    var wherestr = {'groupID':grpid};
    Groupmsg.deleteMany(wherestr, function(err, rest){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            console.log('消息删除完成');
            //res.send({success:true});
        }
    });
};
//删除群所有成员
exports.removeAllUser = function(req,res){
    var grpid = req.body.id;
    var wherestr = {'groupID':grpid};
    Groupuser.deleteMany(wherestr, function(err, rest){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            console.log('群成员删除完成');
            //res.send({success:true});
        }
    });
};

//删除群所有成员
exports.removeGroup = function(req,res){
    var grpid = req.body.id;
    var wherestr = {'_id':grpid};
    Group.deleteOne(wherestr, function(err, rest){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            res.send({success:true});
        }
    });
};
