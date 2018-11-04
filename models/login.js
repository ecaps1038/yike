exports.up = function(email,pswd,res){
	console.log('现在的邮箱'+email+'密码'+pswd);
	res.redirect('/');
}

//对密码加密测试
var bcrypt = require('bcryptjs');
exports.bcrypts = function(pswd,res){
	console.log('原密码：'+pswd);

	//生成salt的迭代次数
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    var hash = bcrypt.hashSync(pswd, salt);
     //把hash值赋值给password变量
    pswd = hash;
    console.log('转译后的密码：'+pswd);
    myp = '123456';
    //看myp是否与pswd匹配
    const pwdMatchFlag =bcrypt.compareSync(myp, pswd);
    if(pwdMatchFlag){
            console.log('匹配成功！')
        }else{
            console.log('匹配失败！')
        }

}