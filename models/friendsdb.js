var mongoose = require('./db.js'),
    Schema = mongoose.Schema;
    mongoose.Promise = Promise;

var FriendSchema = new Schema({          
    friendID : { type: String },               //朋友id
    userID: {type: String},                    //用户id
    name: {type: String},					   //备注昵称
    time: {type: Date},                        //创建时间
});

module.exports = mongoose.model('Friend',FriendSchema);