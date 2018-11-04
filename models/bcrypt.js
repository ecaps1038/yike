//对密码加密
var bcrypt = require('bcryptjs');
exports.bcrypts = function(pwd){

	//生成salt的迭代次数
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    var hash = bcrypt.hashSync(pwd, salt);
     //把hash值赋值给password变量
    pwd = hash;
    return pwd;
}