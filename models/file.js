var fs = require('fs');
var formidable = require('formidable');

var dataDir = __dirname + '/data';
var vacationPhotoDir = dataDir + '/vacation-photo';
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
fs.existsSync(vacationPhotoDir) || fs.mkdirSync(vacationPhotoDir);

exports.form = function(req,res){
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
			return res.redirect(303, '/contest/vacation-photo');
			}
		var photo = files.photo;
		console.log(photo.name);
		var dir = vacationPhotoDir + '/' + Date.now();
		var pathh = dir + '/' + photo.name;
		fs.mkdirSync(dir);
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
		return res.redirect(303, '/');
		});
	}