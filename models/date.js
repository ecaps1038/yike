//日期转换
exports.DateDetail1 = function(date){
	var d = new Date(date);
	var tiems = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
	 + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
	return tiems;
};

exports.DateSimple = function(date){
	var d = new Date(date);
	var Y = d.getFullYear();
	var M = d.getMonth() + 1;
	var D = d.getDate();
	if(M<10){
		M = '0'+M;
	}
	if(D<10){
		D = '0'+D;
	}
	var tiems = Y+'-'+M+'-'+D;
	return tiems;
};

exports.DateSimples = function(date){
	var d = new Date(date);
	var Y = d.getFullYear();
	var M = d.getMonth() + 1;
	var D = d.getDate();
	if(M<10){
		M = '0'+M;
	}
	if(D<10){
		D = '0'+D;
	}
	var tiems =M+'-'+D;
	return tiems;
};

exports.DateDetail = function(date){
	var d = new Date(date);
	var Y = d.getFullYear();
	var M = d.getMonth() + 1;
	var D = d.getDate();
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();

	if(M<10){
		M = '0'+M;
	}
	if(D<10){
		D = '0'+D;
	}
	if(h<10){
		h = '0'+h;
	}
	if(m<10){
		m = '0'+m;
	}
	if(s<10){
		s = '0'+s;
	}
	var tiems = Y+'-'+M+'-'+D+' '+h+':'+m;
	return tiems;
};
exports.DateHouse = function(date){
	var d = new Date(date);
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();

	if(h<10){
		h = '0'+h;
	}
	if(m<10){
		m = '0'+m;
	}
	if(s<10){
		s = '0'+s;
	}
	var tiems = h+':'+m;	
	return tiems;
}

//计算年月日和
exports.DateAdd = function(date){
	var d = new Date(date);
	var Y = d.getFullYear();
	var M = d.getMonth() + 1;
	var D = d.getDate();
	
	var tiems = Y+M+D;
	return tiems;
};

