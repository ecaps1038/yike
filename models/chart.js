var User = require("./userdb.js");
var userdb = require("./userdbserver.js");
var date = require('./date.js');

exports.findUser = function(req,res,id){
    var id = {'_id':id};
    var out = {'name':1,'imgurl':1,'online':1,'_id':0};
    User.find(id, out, function(err, ress){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            var context = {
            vacation : ress.map(function(ver){
                return {
                    name: ver.name,
                    imgurl: function(){
                        if(ver.imgurl){
                            return ver.imgurl;
                        }else{
                            return 'user.jpg';
                        }
                    },
                    online: ver.online,
                }
            })
        };
        res.render('chart',context);
        }
    });
};