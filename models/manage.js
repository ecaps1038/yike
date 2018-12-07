var userdbserver = require('./userdbserver.js');
var User = require("./userdb.js");

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
            	res.render('manage');
            }else{
				res.redirect('/');
            }
        }
    });
};
