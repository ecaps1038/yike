;(function($, window, document, undefined){
    $(document).ready(function(){
    	var chander = {
    		sex : function(){
				$(".sex").each(function(){
					var that = $(this);
					var sex = that.html();
					if(sex == '男'){
						that.addClass('male');
					}else if(sex == '女'){
						that.addClass('female');
					}else{
						that.addClass('asexual');
					}
					alert(that.val());
				})
    		}
    	}
        //chander.sex();
    });
   })(jQuery,window,document);