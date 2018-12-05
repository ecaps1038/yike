var groupdb = require("./groupsdb.js");
var Group = groupdb.model('Group');
var Groupuser = groupdb.model('Groupuser');
var Groupmsg = groupdb.model('Groupmsg');

//获取数据添加群表
exports.insertGroup = function(data){

    var group = new Group(data);

    group.save(function (err, res) {
        if (err) {
            console.log("群添加失败" + err);
        }
        else {
            console.log("群添加成功");
        }
    });
};

//获取数据添加群成员表
exports.insertGroupUser = function(data){

    var groupuser = new Groupuser(data);

    groupuser.save(function (err, res) {
        if (err) {
            console.log("数据添加失败" + err);
        }
        else {
            console.log("数据添加成功");
        }
    });
};

//存储群消息到数据库
exports.insertGroupMsg = function(data){

    var groupmsg = new Groupmsg(data);

    groupmsg.save(function (err, res) {
        if (err) {
            console.log("数据群消息失败" + err);
        }
        else {
            console.log("数据群消息成功");
        }
    });
};

//更新群用户消息最后时间
exports.updateTime = function(groupid){
    var wherestr = {'groupID':groupid};
    var updatestr = {'lasttime': new Date(),$inc: {'status': 1} };
    Groupuser.updateMany(wherestr, updatestr, function(err, res){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            console.log("数据修改成功！");
        }
    });
}

//进入群时复位群消息数
exports.updateStatus = function(groupid,userid){
    var wherestr = {'groupID':groupid,'userID':userid};
    var updatestr = {'status': 0};
    Groupuser.updateMany(wherestr, updatestr, function(err, res){
        if (err) {
            console.log("复位群消息数失败：" + err);
        }
        else {
            console.log("复位群消息数成功！");
        }
    });
}