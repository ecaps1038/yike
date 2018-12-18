var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var userdbserver = require("./userdbserver.js");

var yikeDir = path.resolve(__dirname, '..');
var dataDir = yikeDir + '/data';
var vacationPhotoDir = dataDir + '/vacation-photo';
var groupPhotoDir = dataDir + '/group-photo';
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
fs.existsSync(vacationPhotoDir) || fs.mkdirSync(vacationPhotoDir);
fs.existsSync(groupPhotoDir) || fs.mkdirSync(groupPhotoDir);

//用户照片上传
exports.userPhoto = function(req,res,id){
	var form = new formidable.IncomingForm();
	form.uploadDir = '/tmp';
	form.parse(req, function(err, fields, files){
		if(err) return res.redirect(303, '/error');
		if(err) {
			res.session.flash = {
				type: 'danger',
				intro: 'Oops!',
				message: 'There was an error processing your submission. ' +
				'Pelase try again.',
			};
		return res.redirect(303, '/install');
		}
	var photo = files.photo;
	console.log(photo.name);
	var photos = photo.name.match(/\.(\w+)/)[0];
	var photoName = id+photos;
	userdbserver.update(id,{'imgurl':photoName});
	var pathh = vacationPhotoDir + '/' + photoName;
	console.log(photoName);
	fs.rename(photo.path, pathh,function(err){
		if(err){
			return console.log(err.message);
		}
	});
	req.session.flash = {
		type: 'success',
		intro: 'Good luck!',
		message: 'You have been entered into the contest.',
	};

	return res.redirect(303, '/install');
	});
}
//群图片
exports.fileUp = function(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir = '/tmp';
	form.parse(req, function(err, fields, files){
		if(err) {return res.redirect(303, '/error');}
		if(files.photo.size>0){
			var photo = files.photo;
			//var dir = groupPhotoDir + '/' + Date.now();
			var photos = photo.name.match(/\.(\w+)/)[0];
			var photoName = Date.now()+photos;
			var pathh = groupPhotoDir + '/' + photoName;
			console.log(photoName);
			fs.rename(photo.path, pathh,function(err){
				if(err){
					return console.log(err.message);
				}
			});
		}else{
			var photo = 'group.png';
		}
		res.cookie('iconname',photoName,{signed:true, maxAge: 60*1000});
		return res.redirect(303, '/create-group');
		//res.render('/create-group');
	});

}

//截取后用户图片
//https://cnodejs.org/topic/4f939c84407edba2143c12f7
exports.userPhoto = function(req,res){
	var imgData = req.body.dataurl;
	var id = req.session.userId;
	//过滤data:URL
	var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');
	// console.log(dataBuffer);

	var photoName = Date.now()+'.png';
	var pathh = vacationPhotoDir + '/' + photoName;
	fs.writeFile(pathh,dataBuffer,function(err){
		if(err){
			return console.log(err.message);
		}
	});
	userdbserver.update(id,{'imgurl':photoName});
	res.send({success:true});
}
//截取后群图片
//https://cnodejs.org/topic/4f939c84407edba2143c12f7
exports.groupPhoto = function(req,res){
	var imgData = req.body.dataurl;
	//过滤data:URL
	var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');
	// console.log(dataBuffer);

	var photoName = Date.now()+'.png';
	var pathh = groupPhotoDir + '/' + photoName;
	fs.writeFile(pathh,dataBuffer,function(err){
		if(err){
			return console.log(err.message);
		}
	});
	res.cookie('iconname',photoName,{signed:true, maxAge: 60*1000});
	res.send({success:true});
}