var userdbserver = require('./userdbserver.js');
var bcrypt = require('bcryptjs');
var User = require("./userdb.js");
var date = require('./date.js');

exports.showUser = function(req,res,id){
    var email = {};
    // var out = {'name':1,'pwd':1,'email':1,'online':1};
    var out = {};
    User.find(email, out, function(err, ress){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            var context = {
            vacation : ress.map(function(ver){
                var admin;
                if(ver._id==id){
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
                        if(!ver.sex){
                            return 'asexual';
                        }else{return ver.sex;}
                    },
                    imgurl: function(){
                        if(ver.imgurl){
                            return ver.imgurl;
                        }else{
                            return 'user.jpg';
                        }
                    },
                    birth: date.DateSimple(ver.birth),
                    registerdate: date.DateDetail(ver.registerdate),
                    online: ver.online,
                    admin:admin,
                }
            })
        };
        res.render('showUser',context);
        }
    });
};

exports.logout = function(req,res){
    var id = req.session.userId;
    userdbserver.update(id,{'online':0});
    delete req.session.userId;
    return res.redirect('/');
};

exports.logIn = function(email,pwd,req,res){
    var email = {'email':email};
    var out = {'name':1,'pwd':1,'email':1,'online':1,'imgurl':1};
    User.find(email, out, function(err, ress){
        if (err) {
            console.log("查询失败：" + err);
            return res.redirect('/');
        }
        else {
            if(ress==''){return res.render('home',{return:'无结果'});}
            ress.map(function(ver){
                const pwdMatchFlag =bcrypt.compareSync(pwd, ver.pwd);
                if(pwdMatchFlag){
                    res.cookie('id',ver._id,{signed:true, maxAge: 1000});
                    res.cookie('username',ver.name,{signed:true, maxAge: 1000});
                    if(ver.imgurl){
                        res.cookie('imgurl',ver.imgurl,{signed:true, maxAge: 1000}); 
                   }else{
                        res.cookie('imgurl','user.jpg',{signed:true, maxAge: 1000});
                   }
                    
                    console.log('匹配成功！');
                    if(ver.online==0){
                        userdbserver.update(ver._id,{'online':1});
                    }
                    //console.log(ver);
                    //res.render('test',{title:ver.id});
                    //showUser(res);
                   return res.redirect('/showUser');
                }else{
                    console.log('匹配失败！');
                    return res.redirect('/');
                }            
            })
        }
    })
};


//对密码加密测试
exports.bcrypts = function(pswd,res){
	console.log('原密码：'+pswd);

	//生成salt的迭代次数
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    var hash = bcrypt.hashSync(pswd, salt);
     //把hash值赋值给password变量
    pswd = hash;
    console.log('转译后的密码：'+pswd);
    myp = '123456';
    //看myp是否与pswd匹配
    const pwdMatchFlag =bcrypt.compareSync(myp, pswd);
    if(pwdMatchFlag){
            console.log('匹配成功！')
        }else{
            console.log('匹配失败！')
        }

}