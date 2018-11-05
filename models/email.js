//添加凭证文件
var credentials = require('./credentials');
//引入邮箱插件
var nodemailer = require('nodemailer');

//创建传输方式
var transporter = nodemailer.createTransport({
	service: 'qq',
	auth: {
		user: credentials.qq.user,
		pass: credentials.qq.pass
	}
});

exports.emails = function(email,res){
	var options = {
		from : '1334785356@qq.com',
		to : email,
		subject : '感谢您在yike注册',
		text : '我们在yike相聚',
		html : '<span>请在这里</span><a href="http://localhost:3000/">点击</a>'
	};
	transporter.sendMail(options,function(err,msg){
		if(err){
			console.log(err);
			res.render('register',{title: '邮件发送错误'});
		}else{
			console.log('ok');
			res.render('test',{title:'邮件发送成功！'+msg.accepted})
		}
	});
};