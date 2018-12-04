var express = require('express');
//添加post请求插件
var bodyparser = require('body-parser');
//添加文件传输插件
var formidable = require('formidable');
//添加凭证文件
var credentials = require('./models/credentials');

/*引入.hbs后缀文件格式*/
var handlebars = require('express-handlebars').create({
	defaultLayout: 'main',
    extname: '.hbs',
	helpers: {
	       section: function(name, options){
	            if(!this._sections) this._sections = {};
	            this._sections[name] = options.fn(this);
	            return null;
	       }
	    }
});

var app = express();

//处理附件内容字节数太大
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));



//设置handlebars视图引擎
app.engine('hbs',handlebars.engine);
app.set('view engine', 'hbs');

//添加static中间价
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/data'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//socket.io引入
var http = require('http').Server(app);
var io = require('socket.io')(http,{
	pingInterval: 10000,
  	pingTimeout: 5000,
});
require('./models/socket.js')(io);

//添加cookie中间件和session
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
	name: 'yike',
	secret: 'abdef',
	resave: true,
	//cookie: {maxAge:60*1000,httpOnly:true}
}));

//汇总路由文件routes.js
require('./routes/home.js')(app);
require('./routes/yike.js')(app);
require('./routes/register.js')(app);
require('./routes/showuser.js')(app);
require('./routes/install.js')(app);
require('./routes/group.js')(app);
require('./routes/chart.js')(app,io);
require('./routes/groupchart.js')(app,io);

//定制404页面
app.use(function(req,res,next){
	res.status(404);
	res.render('404');
});

//定制500页面
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.set('port',process.env.PORT || 3000);
http.listen(app.get('port'),function(){
	console.log('监听. http://localhost:' + app.get('port'));
});