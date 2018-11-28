var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var userdbserver = require("./userdbserver.js");

var yikeDir = path.resolve(__dirname, '..')
var dataDir = yikeDir + '/data';
var vacationPhotoDir = dataDir + '/vacation-photo';
var groupPhotoDir = dataDir + '/group-photo';
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
fs.existsSync(vacationPhotoDir) || fs.mkdirSync(vacationPhotoDir);
fs.existsSync(groupPhotoDir) || fs.mkdirSync(groupPhotoDir);

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
exports.fileUp = function(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir = '/tmp';
	form.parse(req, function(err, fields, files){
		if(err) {return res.redirect(303, '/error');}
		var name = fields.name;
		var user = fields.user;
		console.log(user);
		console.log(fields);
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
			var photo = 'group.jpg';
		}
		
		return res.redirect(303, '/yike');
	});
}