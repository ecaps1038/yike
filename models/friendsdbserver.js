var Friend = require("./friendsdb.js");

function insert1(data) {
	//手动添加
    var friend = new Friend({
        friendID : '5be2da44a83ce75d14422629',                    			
	    userID: '5bdfadf1561a5f24bca85715',                       		
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
