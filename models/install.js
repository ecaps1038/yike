var User = require("./userdb.js");
var userdb = require("./userdbserver.js");
var Friend = require("./friendsdb.js");
var date = require('./date.js');
var bcrypt = require('bcryptjs');
var bcrypt1 = require('./bcrypt.js');

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
                    id: ver._id,
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
    req.session.username = req.body.name;
	userdb.update(id,updatestr);
	res.send({success:true});
}

//修改用户密码
exports.changePwd = function(res,old,news,id){
    var wherestr = {'_id':id};
    var out = {'pwd':1};
    User.find(wherestr, out, function(err, ress){
        if (err) {
            console.log("查询失败：" + err);
            return res.redirect('/');
        }
        else {
            ress.map(function(ver){
                const pwdMatchFlag = bcrypt.compareSync(old, ver.pwd);
                if(pwdMatchFlag){
                    //匹配成功
                    var pwd = bcrypt1.bcrypts(news);
                    var updatestr = {'pwd': pwd};
                    userdb.update(id,updatestr);
                    res.send({success:true,tep:0});
                }else{
                    console.log('原密码错误');
                    res.send({success:true,tep:1});
                }            
            })
        }
    })
};

