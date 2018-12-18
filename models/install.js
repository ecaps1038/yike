var User = require("./userdb.js");
var userdb = require("./userdbserver.js");
var date = require('./date.js');

exports.findUser = function(req,res,id){
    var id = {'_id':id};
    var out = {};
    User.find(id, out, function(err, ress){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            var context = {
            vacation : ress.map(function(ver){
            	var admin;
            	var myid = req.session.userId;
                if(ver._id==myid){
                    admin=1;
                }else{admin=null;}
                //console.log(ver);
                return {
                    id : ver._id,
                    name: ver.name,
                    pwd: ver.pwd,
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
                    //birth: date.DateSimple(ver.birth),
                    registerdate: date.DateDetail(ver.registerdate),
                    online: ver.online,
                    admin:admin,
                }
            })
        };
        res.render('user-detail',context);
        }
    });
};
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