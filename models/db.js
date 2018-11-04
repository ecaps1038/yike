var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/yike';

/**
 * 连接
 */
mongoose.connect(DB_URL, { useNewUrlParser: true }, function(err){
	if(err){
		console.log('数据库连接失败');
	}else{
		console.log('数据库连接成功！')
	}
});

/**
 * 连接断开
 */
// mongoose.connection.on('disconnected', function () {    
//     console.log('数据库断开链接！');  
// });   

module.exports = mongoose; 
