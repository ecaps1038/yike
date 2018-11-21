var mongoose = require('./db.js'),
    Schema = mongoose.Schema;
    mongoose.Promise = Promise;

var MessageSchema = new Schema({
	postMessages : {type: String},									//消息内容
	status : {type: Number},         								//消息状态
    fromUserID : {type:Schema.Types.ObjectId,ref:'User'},           //发送者id
    toUserID: {type:Schema.Types.ObjectId,ref:'User'},            	//接收者id
    dateTime: {type: Date},  										//发送时间
});

module.exports = mongoose.model('Message',MessageSchema);