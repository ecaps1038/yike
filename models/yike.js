var User = require("./userdb.js");
var friend = require("./friendsdb.js");
var userdb = require("./userdbserver.js");
var frienddb = require("./friendsdbserver.js");
var date = require('./date.js');

exports.search = function(req,res,cont,id){
    var search = {'name': {$regex : cont}};
    var out = {'name':1,'email':1,'imgurl':1};
    User.find(search, out, function(err, ress){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            var context = {
	            vacation : ress.map(function(ver){
	            	if(ver.imgurl){var img = ver.imgurl}
	            		else{var img = 'user.jpg'}
	                return {
	                    id : ver._id,
	                    name: ver.name,
	                    email: ver.email,
	                    imgurl: img,    
	                }
	            })
	        };
        res.send({success:true,context});
        }
    });
};

exports.findUser = function(req,res,id){
	var userid = req.session.userId;
	var wherestr = {'userID':userid,'friendID':id};
	friend.countDocuments(wherestr, function(err, count){
		if (err) {
            console.log("数据统计失败：" + err);
        }
        else {
            var ids = {'_id':id};
			var out = {'pwd':0};
			User.find(ids, out, function(err, ress){
			    if (err) {
			        console.log("查询失败：" + err);
			    }
			    else {
			        var context = {
			        vacation : ress.map(function(ver){
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
			                mgurl: function(){
			                    if(ver.imgurl){
			                        return ver.imgurl;
			                    }else{
			                        return 'user.jpg';
			                    }
			                },
			                birth: date.DateSimple(ver.birth),
			                registerdate: date.DateDetail(ver.registerdate),
			                count: count,
			            }
			        })
			    };
			    res.render('search-detail',context);
			    }
			});
        }
	});
};

exports.addfriend = function(res,friendid,userid){
	var data1 = {
		friendID : friendid,                    			
	    userID: userid,                       		
	    time: new Date(),							
	    lasttime: new Date()  
	};
	var data2 = {
		friendID : userid,
		userID: friendid,                       		
	    time: new Date(),							
	    lasttime: new Date()  
	};
	frienddb.insert(data1);
	frienddb.insert(data2);
	return res.redirect('/yike');
}
exports.deletefriend = function(res,friendid,userid){
	frienddb.delOne(friendid,userid);
	frienddb.delOne(userid,friendid);
	return res.redirect('/yike');
}
