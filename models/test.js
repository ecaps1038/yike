var fs = require('fs');
var path = require('path');
var formidable = require('formidable');

var dataDir = __dirname + '/data';
var aaa = path.resolve(__dirname, '..')
var bbb = aaa + '/public/js'
console.log('data'+dataDir);
console.log('bb'+bbb);
var vacationPhotoDir = dataDir + '/vacation-photo';