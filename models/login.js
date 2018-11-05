var userdbserver = require('./userdbserver.js');
var bcrypt = require('bcryptjs');

exports.logIn = function(email,pwd,res){
	var email = {'email': email}
	var out = {'name':1,'pwd':1,'email':1,'online':1};
	var result = userdbserver.findUser(email,out);
    console.log(result);
    res.redirect('/');
	// if(result){
	// 	const pwdMatchFlag =bcrypt.compareSync(pwd, result.pwd);
	// 	if(pwdMatchFlag){
 //            console.log('匹配成功！');
 //            res.render('test',{title:'验证成功'+result})
 //        }else{
 //            console.log('匹配失败！');
 //            res.redirect('/');
 //        }
	// }else{
	// 	console.log('没有搜索结果');
	// 	res.redirect('/');
	// }
};

//对密码加密测试
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