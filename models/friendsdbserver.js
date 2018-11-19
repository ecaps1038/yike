var Friend = require("./friendsdb.js");

function insert1(data) {
	//手动添加
    var friend = new Friend({
        friendID : '5be04644092be8033dc07c5c',                    			
	    userID: '5bdf164348705b04254a2b9b',                       		
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
