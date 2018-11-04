var userdbserver = require('./userdbserver.js');
var bcrypt = require('./bcrypt.js');
//添加数据库
exports.loginUp = function(name,email,pwd){
	var pwd = bcrypt.bcrypts(pwd);
	var data = {
		name : name,                    			//用户账号
	    pwd: pwd,                       		//密码
	    email: email,
	    registerdate : new Date(),					//注册时间   
	    online: 1  
	}
	userdbserver.insert(data);
}