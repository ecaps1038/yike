var Group = require("./groupsdb.js");

//获取数据添加
exports.insert = function(data){

    var group = new Group(data);

    group.save(function (err, res) {
        if (err) {
            console.log("数据添加失败" + err);
        }
        else {
            console.log("数据添加成功");
        }
    });
};