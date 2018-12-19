var User = require("./userdb.js");
var userdb = require("./userdbserver.js");
var Friend = require("./friendsdb.js");
var date = require('./date.js');

//根据id查找对象
exports.findUser = function(req,res,id){
    var admin;
    var userid = req.session.userId;
    if(id==userid){
        admin=1;
        var id = {'_id':id};
        var out = {'pwd':0};
        User.find(id, out, function(err, ress){
            if (err) {
                console.log("查询失败：" + err);
            }
            else {
                var context = {
                vacation : ress.map(function(ver){
                    return {
                        id : ver._id,
                        name: ver.name,
                        email: ver.email,
                        explain: function(){
                            if(ver.explain){
                                return ver.explain;
                            }else{
                                return '不签名是我的个性之一'
                            }
                        },
                        sex: function(){
                            if(ver.sex){
                                if(ver.sex=='male'){return '男';}
                                else{return '女';}
                            }else{return '不知';}
                        },
                        imgurl: function(){
                            if(ver.imgurl){
                                return ver.imgurl;
                            }else{
                                return 'user.jpg';
                            }
                        },
                        birth: function(){
                            if(ver.birth){
                                return date.DateSimple(ver.birth);
                            }else{
                                return '未知';
                            }
                        },
                        registerdate: date.DateDetail(ver.registerdate),
                        online: ver.online,
                        admin:admin,
                    }
                })
            };
            res.render('user-detail',context);
            }
        });
    }else{
        admin=null;
        var query = Friend.find({});
        //根据userID查询
        query.where({'friendID':id,'userID':userid});
        //查出friendID的user对象
        query.populate('friendID');
        //查询结果
        query.exec().then(function(result){
            var context = {
                vacation : result.map(function(ver){
                    return {
                        markname: ver.name,
                        id: id,
                        name: ver.friendID.name,
                        email: ver.friendID.email,
                        explain: function(){
                            if(ver.friendID.explain){
                                return ver.friendID.explain;
                            }else{
                                return '不签名是我的个性之一'
                            }
                        },
                        sex: function(){
                            if(ver.friendID.sex){
                                if(ver.friendID.sex=='male'){return '男';}
                                else{return '女';}
                            }else{return '不知';}
                        },
                        imgurl: function(){
                            if(ver.friendID.imgurl){
                                return ver.friendID.imgurl;
                            }else{
                                return 'user.jpg';
                            }
                        },
                        birth: function(){
                            if(ver.friendID.birth){
                                return date.DateSimple(ver.friendID.birth);
                            }else{
                                return '未知';
                            }
                        },
                        registerdate: date.DateDetail(ver.friendID.registerdate),
                        online: ver.friendID.online,
                        admin:admin,
                    }
                })           
            };
            res.render('user-detail',context);
        }).catch(function(err){
            console.log(err);
        });   
    }
};

//修改朋友备注名
exports.markName = function(res,cont,id,usid){
    var wherestr = {'friendID':id,'userID':usid};
    var updatestr = {'name': cont}; 
    
    Friend.updateOne(wherestr, updatestr, function(err, rest){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            res.send({success:true});
        }
    });
};

//搜索用户自己
exports.findMy = function(req,res,id){
    var id = {'_id':id};
    var out = {};
    User.find(id, out, function(err, ress){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            var context = {
            vacation : ress.map(function(ver){
                //console.log(ver);
                return {
                    name: ver.name,
                    pwd: ver.pwd,
                    email: ver.email,
                    explain: ver.explain,
                    sex: ver.sex,
                    birth: date.DateSimple(ver.birth),
                    imgurl: function(){
                        if(ver.imgurl){
                            return ver.imgurl;
                        }else{
                            return 'user.jpg';
                        }
                    },
                    //registerdate: date.DateDetail(ver.registerdate),
                }
            })
        };
        res.render('install',context);
        }
    });
};

//跟新用户资料
exports.upUser = function(req,res,id){
	var updatestr={
		'name' : req.body.name,
		'explain' : req.body.explain,
		'sex' : req.body.sex,
		'birth' : req.body.birth
	}
	//console.log(updatestr);
	userdb.update(id,updatestr);
	res.send({success:true});
}