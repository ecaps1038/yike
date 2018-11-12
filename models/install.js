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
                //console.log(ver);
                return {
                    name: ver.name,
                    pwd: ver.pwd,
                    email: ver.email,
                    explain: ver.explain,
                    sex: ver.sex,
                    birth: date.DateSimple(ver.birth),
                    imgurl:ver.imgurl,
                    registerdate: date.DateDetail(ver.registerdate),
                }
            })
        };
        res.render('install',context);
        }
    });
};
exports.findOther = function(req,res,id){
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
                    imgurl:ver.imgurl,
                    registerdate: date.DateDetail(ver.registerdate),
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
	console.log(updatestr);
	userdb.update(id,updatestr);
	res.send({success:true});
}