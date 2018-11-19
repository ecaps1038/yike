var mongoose = require('./db.js'),
    Schema = mongoose.Schema;
    mongoose.Promise = Promise;

var FriendSchema = new Schema({          
    friendID : {type:Schema.Types.ObjectId,ref:'User'},         //朋友id
    userID: {type:Schema.Types.ObjectId,ref:'User'},            //用户id
    name: {type: String},					   					//备注昵称
    time: {type: Date},  										//创建时间
    lasttime: {type: Date}                      				//最后通话时间
});

module.exports = mongoose.model('Friend',FriendSchema);