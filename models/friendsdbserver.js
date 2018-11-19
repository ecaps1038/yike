var Friend = require("./friendsdb.js");


//获取数据添加
exports.insert = function(data){

    var friend = new Friend(data);

    user.save(function (err, res) {
        if (err) {
            console.log("数据添加失败" + err);
        }
        else {
            console.log("数据添加成功");
        }
    });
};