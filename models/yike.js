var User = require("./userdb.js");
var friend = require("./friendsdb.js");
var userdb = require("./userdbserver.js");
var frienddb = require("./friendsdbserver.js");
var date = require('./date.js');

exports.search = function(req,res,cont,id){
    var search = {'explain': {$regex : cont}};
    var out = {'name':1,'email':1,'imgurl':1};
    User.find(search, out, function(err, ress){
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
	                    imgurl: function(){
	                        if(ver.imgurl){
	                            return ver.imgurl;
	                        }else{
	                            return 'user.jpg';
	                        }
	                    },
	                }
	            })
	        };
        res.send({success:true,context});
        }
    });
};
