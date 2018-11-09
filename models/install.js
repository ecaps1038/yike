var User = require("./userdb.js");
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
                    birth: ver.birth,
                    imgurl:ver.imgurl,
                    registerdate: date.DateDetail(ver.registerdate),
                }
            })
        };
        res.render('install',context);
        }
    })
}