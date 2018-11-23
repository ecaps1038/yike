//日期转换
exports.DateSimple = function(date){
	var d = new Date(date);
	var tiems = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
	// + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
	return tiems;
};
exports.DateDetail = function(date){
	var d = new Date(date);
	var tiems = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
	 + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
	return tiems;
};
exports.NowTime = function(date){
	var d = new Date(date);
	var tiems = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
	return tiems;
}
