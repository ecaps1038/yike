var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/yike';

/**
 * 连接
 */
// mongoose.connect(DB_URL, { useNewUrlParser: true }, function(err){
// 	if(err){
// 		console.log('数据库连接失败');
// 	}else{
// 		console.log('数据库连接成功！')
// 	}
// });

mongoose.connect(DB_URL, { useNewUrlParser: true });
/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('数据库连接成功！' + DB_URL);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('数据库连接失败' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('数据库断开连接');  
});     

module.exports = mongoose; 
