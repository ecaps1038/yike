var User = require("./userdb.js");

/**
 * 插入
 */

function insert1(data) {
	//手动添加
    // var user = new User({
    //     name : '张飞',                    			//用户账号
	   //  pwd: '123456',                       		//密码
	   //  email: '13243765654@qq.com',				//邮箱
	   //  explain: '个性飞扬，就是这么强',				//说明
	   //  sex: '男',									//性别
	   //  birth: '1994-03-12',                        //生日日期
	   //  // imgurl: {type: String},					//头像路径 
	   //  registerdate : new Date(),					//注册时间   
	   //  online: 1                                   //是否在线
    // });

    var user = new User(data);

    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}
exports.insert = function(data){

    var user = new User(data);

    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}
// insert();