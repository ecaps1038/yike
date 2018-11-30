var mongoose = require('./db.js'),
    Schema = mongoose.Schema;
    mongoose.Promise = Promise;

//群表
var GroupSchema = new Schema({          
    adminID: {type:Schema.Types.ObjectId,ref:'User'},           //创建者id
    name: {type: String},					   					//群名称
    intro: {type: String},					   					//群简介
    icon: {type: String},					   					//群图标
    time: {type: Date},  										//创建时间
});

//群成员表
var GroupuserSchema = new Schema({          
    groupID: {type:Schema.Types.ObjectId,ref:'Group'},          //群id
    userID: {type:Schema.Types.ObjectId,ref:'User'},            //用户id
    name: {type: String},					   					//群内名称
    time: {type: Date},  										//加入时间
    status: {type: Number},  									//未读消息数
    lasttime: {type: Date},                      				//最后通话时间
    shield: {type: Number}     									//是否屏蔽（0,1,2）
});

//群消息表
var GroupmsgSchema = new Schema({          
    groupID: {type:Schema.Types.ObjectId,ref:'Group'},          //群id
    fromID: {type:Schema.Types.ObjectId,ref:'User'},            //发送者id
    content: {type: String},					   			    //消息内容
    time: {type: Date},  										//发送时间
    fromname: {type: String},  									//发送者昵称
});

module.exports = mongoose.model('Group',GroupSchema);
module.exports = mongoose.model('Groupuser',GroupuserSchema);
module.exports = mongoose.model('Groupmsg',GroupmsgSchema);