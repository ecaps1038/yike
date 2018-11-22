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
//根据_id更新： Model.findByIdAndUpdate(id, [update], [options], [callback])
//updateOne,updateMany,
exports.read = function(from,to){
     var wherestr = {'toUserID':to,'fromUserID':from};
     var updatestr = {'status': 1};
    
    Message.updateMany(wherestr, updatestr, {multi: true}, function(err, res){
        if (err) {
            console.log("修改已读失败" + err);
        }
        else {
            console.log("修改已读成功");
        }
    });
};
