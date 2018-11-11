;(function($, window, document, undefined){
    $(document).ready(function(){
    	var chander = {
    		showsex : function(sex){
    			var html = '';
    			if(sex){
    				if(sex == 'male'){
    					html+='<input type="radio" name="sex" value="male" checked>男'+
		'<input type="radio" name="sex" value="female">女';
    				}else{
    					html+='<input type="radio" name="sex" value="male">男'+
		'<input type="radio" name="sex" value="female" checked>女'
    				}
    			}else{
    				html+='<input type="radio" name="sex" value="male">男'+
		'<input type="radio" name="sex" value="female">女'
    			}
    			return html;
    		}
    	}
    	var sex = $('.sex').val();
    	var aaa = chander.showsex(sex);
    	$('#sex').html(aaa);
    });
   })(jQuery,window,document);