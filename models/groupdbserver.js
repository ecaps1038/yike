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