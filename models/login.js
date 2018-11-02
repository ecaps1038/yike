exports.up = function(email,pswd,res){
	console.log('现在的邮箱'+email+'密码'+pswd);
	res.redirect('/');
}