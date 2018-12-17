var userdb = require('./userdbserver.js');
var User = require('./userdb.js');
var bcrypt = require('./bcrypt.js');

//搜索email占用情况
exports.searchEmail = function(res,email){
    var wherestr = {'email':email};
    
    User.countDocuments(wherestr, function(err, rest){
        if (err) {
            console.log("数据统计失败：" + err);
        }
        else {
            res.send({success:true,rest:rest});
        }
    });
};
//搜索name占用情况
exports.searchName = function(res,name){
    var wherestr = {'name':name};
    
    User.countDocuments(wherestr, function(err, rest){
        if (err) {
            console.log("数据统计失败：" + err);
        }
        else {
            res.send({success:true,rest:rest});
        }
    });
};

//添加数据库
exports.loginUp = function(res,name,email,pwd){
	var pwd = bcrypt.bcrypts(pwd);
	var data = {
		name : name,                    			//用户账号
	    pwd: pwd,                       		//密码
	    email: email,
	    registerdate : new Date(),					//注册时间   
	    online: 1,
	    //grade: 1,  
	}
	//userdb.insert(data);
	var user = new User(data);

    user.save(function (err, rest) {
        if (err) {
            console.log("数据添加失败" + err);
        }
        else {
            res.send({success:true,rest:email});
            
        }
    });
}