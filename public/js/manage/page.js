//初始化翻页
    function pages(page){
    	if(page>1&&page<=5){
			var htmls='';
			for(i=1;i<=page;i++){
				htmls+='<li>'+i+'</li>';
			}
			$('.page ul span').html(htmls);
			$('.page ul span li').eq(0).addClass('select');
		}else if(page>5){
			var htmls='';
			for(i=1;i<5;i++){
				htmls+='<li>'+i+'</li>';
			}
			htmls+='<p class="none">...</p>';
			htmls+='<li>'+page+'</li>';
			$('.page ul span').html(htmls);
			$('.page ul span li').eq(0).addClass('select');
		}else{
			$('.page ul').html('');
		}
    }

    //实现翻页
    function acpage(nowpage,allpage,html){
    	if(allpage>5){
		    if(nowpage>3 && nowpage<allpage-2){
		    	html +='<li>1</li>'+'<p class="none">...</p>';
		    	for(i=nowpage-1;i<nowpage+2;i++){
		    		if(i==nowpage){
		    			html+='<li class="select">'+i+'</li>';
		    		}else{
		    			html+='<li>'+i+'</li>';
		    		}
		    	}
		    	html +='<p class="none">...</p>'+'<li>'+allpage+'</li>';
		    	$('.page ul span').html(html);
		    }else if(nowpage<4){
		    	for(i=1;i<5;i++){
		    		if(i==nowpage){
		    			html+='<li class="select">'+i+'</li>';
		    		}else{
		    			html+='<li>'+i+'</li>';
		    		}
		    	}
		   		html +='<p class="none">...</p>'+'<li>'+allpage+'</li>';
		   		$('.page ul span').html(html);
		    }else if(nowpage>allpage-3){
		    	html +='<li>1</li>'+'<p class="none">...</p>';
		    	for(i=allpage-3;i<=allpage;i++){
		    		if(i==nowpage){
		    			html+='<li class="select">'+i+'</li>';
		    		}else{
		    			html+='<li>'+i+'</li>';
		    		}
		    	}
		    	$('.page ul span').html(html);
		    }
		}
    }
