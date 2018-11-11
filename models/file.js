var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var userdbserver = require("./userdbserver.js");

var yikeDir = path.resolve(__dirname, '..')
var dataDir = yikeDir + '/data';
var vacationPhotoDir = dataDir + '/vacation-photo';
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
fs.existsSync(vacationPhotoDir) || fs.mkdirSync(vacationPhotoDir);

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
	exports.fileUp = function(req,res,id){
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
		var dir = vacationPhotoDir + '/' + Date.now();
		var pathh = dir + '/' + photo.name;
		var photos = photo.name.match(/\.(\w+)/)[0];
		var photoName = id+photos;
		console.log(photoName);
		//console.log(pathh);

		//fs.mkdirSync(dir);
		// fs.rename(photo.path, pathh,function(err){
		// 	if(err){
		// 		return console.log(err.message);
		// 	}
		// });
		req.session.flash = {
			type: 'success',
			intro: 'Good luck!',
			message: 'You have been entered into the contest.',
		};
		return res.redirect(303, '/install');
		});
	}