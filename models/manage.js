var userdbserver = require('./userdbserver.js');
var User = require("./userdb.js");
var groupdb = require("./groupsdb.js");
var Group = groupdb.model('Group');
var Groupuser = groupdb.model('Groupuser');
var Groupmsg = groupdb.model('Groupmsg');
var Message = require("./messagesdb.js");

var date = require('./date.js');

//匹配管理
exports.allow = function(req,res,id){
    var wherestr = {'_id': id};
    var out = {'grade':1};
    User.findOne(wherestr, out, function(err, rest){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            if(rest.grade==1){
                req.session.adminid = id;
                var img = req.session.imgurl;
            	res.render('manage',{img:img});
            }else{
				res.redirect('/');
            }
        }
    });
};

//查询所有用户
exports.findUser = function(res){
    var wherestr = {};
    var out = {'sex':1};
    var i = 0,m = 0,f = 0 , n = 0;
    User.find(wherestr, out, function(err, rest){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            rest.map(function(ver){
                i++;
                if(ver.sex=='male'){
                    m++;
                }else if(ver.sex == 'female'){
                    f++;
                }else{
                    n++;
                }
            });
            var context = {i:i,m:m,f:f,n:n};
            res.send({success:true,context});
        }
    });
}

//查询所有群
exports.findGroup = function(res){
    var wherestr = {};
    Group.countDocuments(wherestr, function(err, rest){
        if (err) {
            console.log("数据统计失败：" + err);
        }
        else {
            res.send({success:true,rest:rest});
        }
    });
}

//查询单点信息数据
exports.findMsg = function(res){
var wherestr = {};
    var out = {};
    var i = 0;
    Message.find(wherestr, out, function(err, rest){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            var d = Buffer.byteLength(JSON.stringify(rest));
            rest.map(function(ver){
                i++;
            });
            var context = {i:i,d:d};
            res.send({success:true,context});
        }
    });
}

//查询所有群信息数据
exports.findGrpmsg = function(res){
var wherestr = {};
    var out = {};
    var i = 0;
    Groupmsg.find(wherestr, out, function(err, rest){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            var d = Buffer.byteLength(JSON.stringify(rest));
            rest.map(function(ver){
                i++;
            });
            var context = {i:i,d:d};
            res.send({success:true,context});
        }
    });
}

//user
//查询用户细节
exports.userRegist = function(res){
    var wherestr = {};
    var out = {'registerdate':1};
    var i = 0,b = 1,j = 0;
    var dates = {};
    User.find(wherestr, out, function(err, rest){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            var context = {
            vacation : rest.map(function(ver){
                var d=date.DateSimples(ver.registerdate);
                i++;
                dates[i] = d;
                if(dates[i]!=dates[i-1]){
                    j=b;
                    b=1;
                    if(i>1){
	                    return {
	                        d:dates[i-1],
	                        j:j,
	                    }
	                }
                }else{
                    b++;
                }
                
            }),
            i:i,
            ld:dates[i],
        };
        res.send({success:true,context});
        }
    });
}
//分页查询
exports.userTable = function(res,id,nowPage){
    
    var pageSize = 5;                   //一页多少条
    //var currentPage = 1;                //当前第几页
    var sort = {'lregisterdate':-1};        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (nowPage - 1) * pageSize;   //跳过数
    var d = skipnum;
    
    User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, rest) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            var context = {
                vacation : rest.map(function(ver){
                    var admin;
                    if(ver._id==id){
                        admin=1;
                    }else{admin=null;}
                    if(!ver.sex){
                                var sex = 'asexual';
                    }else{var sex = ver.sex;}
                    if(ver.imgurl){
                        var imgurl = ver.imgurl;
                    }else{
                        var imgurl = 'user.jpg';
                    }
                    return {
                        d:++d,
                        id : ver._id,
                        name: ver.name,
                        email: ver.email,
                        sex: sex,
                        imgurl: imgurl,
                        birth: date.DateSimple(ver.birth),
                        registerdate: date.DateDetail(ver.registerdate),
                        online: ver.online,
                        admin:admin,
                    }
                }),
            };
            //res.render('manage/user',context);
            res.send({success:true,context});
        }
    })
}

//group
//查询用户细节
exports.groupRegist = function(res){
    var wherestr = {};
    var out = {'time':1};
    var i = 0,b = 1,j = 0;
    var dates = {};
    Group.find(wherestr, out, function(err, rest){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            var context = {
            vacation : rest.map(function(ver){
                var d=date.DateSimples(ver.time);
                i++;
                dates[i] = d;
                if(dates[i]!=dates[i-1]){
                    j=b;
                    b=1;
                    if(i>1){
	                    return {
	                        d:dates[i-1],
	                        j:j,
	                    }
	                }
                }else{
                    b++;
                }
                
            }),
            i:i,
            ld:dates[i],
        };
        res.send({success:true,context});
        }
    });
}
//分页查询
exports.groupTable = function(res,nowPage){
    
    var pageSize = 8;                   //一页多少条
    //var currentPage = 1;                //当前第几页
    var sort = {'lregisterdate':-1};        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (nowPage - 1) * pageSize;   //跳过数
    var d = skipnum;

    var query = Group.find({});
    //根据userID查询
    query.where();
    //查出friendID的user对象
    query.populate('adminID');
    //按照最后会话时间倒序排列
    query.sort({'time':-1});
    //跳过数
    query.skip(skipnum);
    //一页多少条
    query.limit(pageSize);
    //查询结果
    query.exec().then(function(result){
        var context = {
            vacation : result.map(function(ver){
                if(ver.icon){
                    var icon = ver.icon;
                }else{
                    var icon = 'group.png';
                }
                return {
                    d:++d,
                    id: ver._id,
                    name: ver.name,
                    admin: ver.adminID.name,
                    intro: ver.intro,
                    icon: icon,
                    time: date.DateDetail(ver.time),
                }
            }),
        };
        //res.render('manage/user',context);
        res.send({success:true,context});
    })
}

//message
//查询点消息
exports.msgCount = function(res){
    var wherestr = {};
    var out = {'dateTime':1};
    var i = 0,b = 1,j = 0;
    var dates = {};
    Message.find(wherestr, out, function(err, rest){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            var context = {
            vacation : rest.map(function(ver){
                var d=date.DateSimples(ver.dateTime);
                i++;
                dates[i] = d;
                if(dates[i]!=dates[i-1]){
                    j=b;
                    b=1;
                    if(i>1){
	                    return {
	                        d:dates[i-1],
	                        j:j,
	                    }
	                }
                }else{
                    b++;
                }
                
            }),
            i:i,
            ld:dates[i],
        };
        res.send({success:true,context});
        }
    });
}


exports.msgTable = function(res,nowPage){

    var pageSize = 8;                   //一页多少条
    //var currentPage = 1;                //当前第几页
    //var sort = {'lregisterdate':-1};        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (nowPage - 1) * pageSize;   //跳过数
    var d = skipnum;

    var query = Message.find({});
    //根据userID查询
    query.where();
    //查出friendID的user对象
    query.populate('fromUserID');
    query.populate('toUserID');
    //按照最后会话时间倒序排列
    query.sort({'lasttime':-1});
    //跳过数
    query.skip(skipnum);
    //一页多少条
    query.limit(pageSize);
    //查询结果
    query.exec().then(function(result){
        //console.log(result);
        var context = {
            vacation : result.map(function(ver){
                return {
                	d:++d,
                	id: ver._id,
                    postMessages: ver.postMessages,
                    status: ver.status,
                    fromUser: ver.fromUserID.name,
                    toUser: ver.toUserID.name,
                    dateTime: date.DateDetail(ver.dateTime),
                }
            }), 
        };
        //console.log(context);
        res.send({success:true,context});
    }).catch(function(err){
        console.log(err);
    });   
};