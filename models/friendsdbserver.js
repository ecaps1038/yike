var Friend = require("./friendsdb.js");

function insert1(data) {
	//手动添加
    var friend = new Friend({
        friendID : '5bdfadf1561a5f24bca85715',                    			
	    userID: '5be4117dcd6ca75754b5e8bf',                       		
	    time: new Date(),							
	    lasttime: new Date() 				
    });
    friend.save(function(err,res){
    	if(err){
    		console.log('error');
    	}else{
    		console.log('ok');
    	}
    });
}
//insert1();
//获取数据添加
exports.insert = function(data){

    var friend = new Friend(data);

    friend.save(function (err, res) {
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
    
    Friend.countDocuments(wherestr, function(err, res){
        if (err) {
            console.log("数据统计失败：" + err);
        }
        else {
            console.log("数据统计成功！" + res);
            return res;
        }
    });
};

//根据条件删除
exports.delOne = function(userid,friendid){
    var wherestr = {'userID':userid,'friendID':friendid};
    Friend.deleteOne(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log('删除朋友成功');
        }
    })
};

//修改最后  Model.findByIdAndUpdate(id, [update], [options], [callback])
exports.updateTime = function(friendid,userid){
     var wherestr = {'friendID':friendid,'userID':userid};
     var updatestr = {'lasttime': new Date()};
    
    
    Friend.updateOne(wherestr, updatestr, function(err, res){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            console.log("数据修改成功！");
        }
    });
};

