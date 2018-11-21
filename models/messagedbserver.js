var Message = require("./messagesdb.js");

exports.insert = function(data){

    var message = new Message(data);

    message.save(function (err, res) {
        if (err) {
            console.log("数据添加失败" + err);
        }
        else {
            console.log("数据添加成功");
        }
    });
};

//数量查询Model.count(conditions, [callback])res会输出数量，也可以传入条件做条件查询！
exports.getCount = function(userid,friendid){
    var wherestr = {'userID':userid,'friendID':friendid};
    
    Message.countDocuments(wherestr, function(err, res){
        if (err) {
            console.log("数据统计失败：" + err);
        }
        else {
            console.log("数据统计成功！" + res);
            return res;
        }
    });
};

//根据_id更新： Model.findByIdAndUpdate(id, [update], [options], [callback])
exports.update = function(id,updatestr){
    // var id = '5bc852dd89cdd953d0dc0938';
    // var updatestr = {'username': '逸刻'};
    
    Message.findByIdAndUpdate(id, updatestr, function(err, res){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            console.log("数据修改成功！");
        }
    });
};
