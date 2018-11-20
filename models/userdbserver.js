var User = require("./userdb.js");

/**
 * 插入
 */

function insert1(data) {
	//手动添加
    var user = new User({
        name : '张飞',                    			//用户账号
	    pwd: '123456',                       		//密码
	    email: '13243765654@qq.com',				//邮箱
	    explain: '个性飞扬，就是这么强',				//说明
	    sex: '男',									//性别
	    birth: '1994-03-12',                        //生日日期
	    // imgurl: {type: String},					//头像路径 
	    registerdate : new Date(),					//注册时间   
	    online: 1                                   //是否在线
    });
}

//获取数据添加
exports.insert = function(data){

    var user = new User(data);

    user.save(function (err, res) {
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
    
    User.findByIdAndUpdate(id, updatestr, function(err, res){
        if (err) {
            console.log("数据修改出错：" + err);
        }
        else {
            console.log("数据修改成功！");
        }
    });
};

//根据_id删除项：Model.findByIdAndRemove(id, [options], [callback])　
exports.remove = function(id){
    //var id ={'_id':'5bc852dd89cdd953d0dc0938'};
    
    User.findByIdAndRemove(id, function(err, res){
        if (err) {
            console.log("数据删除失败：" + err);
        }
        else {
            console.log("数据删除成功！");
        }
    });
};

//条件查找: Model.find(conditions, [fields], [options], [callback])第2个参数可以设置要查询输出的字段,1或0
exports.findUser = function(wherestr,out){
    //var wherestr = {'username' : '小黄'};
    //var age = {'userage':{$gte:12,$lte:14}};
    //var out = {'username':1,'userage':1,'_id':0};
    User.find(wherestr, out, function(err, res){
        if (err) {
            console.log("查询失败：" + err);
        }
        else {
            console.log("查询结果：" + res);
        }
    }).then(function(arrys){
        console.log('结果1'+arrys);
    });
};
//条件查找: Model.find(conditions, [fields], [options], [callback])第2个参数可以设置要查询输出的字段,1或0
exports.findUser1 = function(wherestr,out){
    //var wherestr = {'username' : '小黄'};
    //var age = {'userage':{$gte:12,$lte:14}};
    //var out = {'username':1,'userage':1,'_id':0};
   User.find(wherestr, out, function(err, ress){
    console.log(res);
        var context = {
            res: res.map(function(vacation){
                console.log('name'+vacation.name);
                return {
                    name: vacation.name,
                    pwd: vacation.pwd,
                    email: vacation.email,
                    online: vacation.online,
                }
            })
        };
        console.log('aaa:'+context);
        return context;

    });
};

//数量查询Model.count(conditions, [callback])res会输出数量，也可以传入条件做条件查询！
exports.getCount = function(wherestr){
    //var wherestr = {};
    
    User.countDocuments(wherestr, function(err, res){
        if (err) {
            console.log("数据统计失败：" + err);
        }
        else {
            console.log("数据统计成功！" + res);
            return res;
        }
    });
};

//根据_id查询Model.findById(id, [fields], [options], [callback])
exports.getById = function(id){
    //var id = '5bc94f12617b1e22ccd9d757';
    
    User.findById(id, function(err, res){
        if (err) {
            console.log("id未查找到" + err);
        }
        else {
            console.log("id查询成功" + res);
            return res;
        }
    })
}

//分页查询
exports.getByPager = function(pagesize,nowpage){
    
    //var pageSize = 4;                   //一页多少条
    //var currentPage = 1;                //当前第几页
    var sort = {'registerdate':-1};        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数
    
    User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
        if (err) {
            console.log("分页查询出错：" + err);
        }
        else {
            console.log("分页查询成功");
            return res;
        }
    })
}