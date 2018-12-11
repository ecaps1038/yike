
var training1 = {
    init : function(counturl,dturl,tburl){
        this._msgCount(counturl);
        this._handleChose();
        this._handlechoseAll();
        this._handlesChose();
        this._addMission();
        //this._msg(1,tburl);
        this._flag = false ; //用于标志是否勾选了全选
        this._page = 0;
        this._dturl = dturl;
        this._tburl = tburl;
        this._counturl = counturl;
        this.heightArr = [];
        var _this = this;

    },
   
    // 用户数据
    _msgCount : function(counturl){
    	var $count =$('.count');
    	var html = '';
    	var that = this;
    	$.ajax({
			url: counturl,
			type: 'POST',
			data: '',
			success: function(data){
				if(data.success){
					var aa = data.context;
					var num = 0;
					$count.html(aa.i);
					aa.vacation.map(function(ver){
						if(ver){
							num += ver.j;
							html +='<li><div class="li-inner"><span>'+ver.j+'</span><i style="height:'+ver.j*2+'px"></i><span class="inst-date">'+ver.d+'</span></div></li>';
						}
					});
					var lastlth = aa.i-num;
					html += '<li><div class="li-inner"><span>'+lastlth+'</span><i style="height:'+lastlth*2+'px"></i><span class="inst-date">'+aa.ld+'</span></div></li>';
					$('.detial-count ul').html(html);

					//处理翻页
					var page = Math.ceil(aa.i/8);
					pages(page);
				}
				else{
				console.log('返回数据失败');
				}
			},
			error: function(){
				console.log('出现问题');
			}
		});
    },

		// 翻页选择
    _handleChose:function(){
    	var that = this;
        $('body').on('click','.page ul span li',function(){
        	var length = $('.page ul span li').length-1;
        	var lasthtml = $('.page ul span li').eq(length).html();
        	var lastnum = parseInt(lasthtml);
            $(this).addClass('select').siblings('li').removeClass('select');
            var num = parseInt($(this).html());
            //保存当前页面
            that._num = num;
            var index = $(this).index();
            var html ='';
            acpage(num,lastnum,html);
            //that._msg(num,that._tburl);
            msg(num);
        })
    },
		
    // 页面复选框全部
    _handlechoseAll : function(){
        var that = this;
        $('body').on('click','table tr th i',function(){
            //alert('aaa');
            if($(this).hasClass('selects')){
                that._flag = false;
                $(this).removeClass('selects').parents('tr').siblings('tr').find('i').removeClass('selects');
            }else{
                that._flag = true;
                $(this).addClass('selects').parents('tr').siblings('tr').find('i').addClass('selects');
            }
        })
    },
    // 页面单选择
    _handlesChose:function(){
        var that = this;
        $('body').on('click','table tr td i',function(){
            if($(this).hasClass('selects')){
                that._flag = false;
                $(this).removeClass('selects');
                $('table tr th i').removeClass('selects');
            }else{
                $(this).addClass('selects');
            }
        })
    },
    // 根据选择获取选项成数数组进行
    _sureBtn : function(){
        // 进行逐一判断
        var selected = [];
        var i = 0;
        var that = this;
        $('table tr td').each(function(){
        	var $thisi = $(this).find('i');
        	var iattr = $thisi.attr('data-id');
        	if($thisi.hasClass('selects')){
        		selected[i] = iattr;
        		i++;
        	}
        })
        return selected;
    },

    //删除选择项
    _deleteSelect : function(d){
    	var that = this;
    	$.ajax({
			url: that._dturl,
			type: 'POST',
			data: {d:d},
			success: function(data){
				if(data.success){
					console.log('成功');
				}
				else{
				console.log('返回数据失败');
				}
			},
			error: function(){
				console.log('出现问题');
			}
		});
    },
    _nowpages: function(){
    	var that = this;
		$('.page ul span li').eq(0).addClass('select').siblings('li').removeClass('select');
		//that._msg(1,that._tburl);
		msg(1);
	},

		// 添加任务按钮、
    _addMission : function(){
        var that = this;
        var html = '';
        $('body').on('click','.button .delete' ,function(){
        	
            var $content = $('.outer-delete');
            var mf = layer.open({
                type: 1,
                title: '操作',
                fix: false,
                resize:false,
                closeBtn:1,
                btn : ['确定','取消'],
                shade: 0,
                move : false,
                area: ['280px', '152px'],
                content: $content,
                yes : function(){
                    layer.close(mf);
                    that._deleteSelect(that._sureBtn());
                    that._nowpages();
                    that._msgCount(that._counturl);
                },
                btn2 : function(){
                    layer.close(mf);
                }
            });
        })
        
    },

 // 群数据
_msg: function(num,tburl,html){
	//var html = '';
	$.ajax({
		url: tburl,
		type: 'POST',
		data: {num:num},
		success: function(data){
			if(data.success){
				var aa = data.context.vacation;
				html +='<tr><th><i></i><span>序号</span></th>'+
		'<th>内容</th><th>是否查收</th><th>发送者</th><th>接收者</th>'+
		'<th>发送时间</th><th>操作</th></tr>';
				//console.log(aa);
				aa.map(function(ver){
				html += '<tr><td><i data-id="'+ver.id+'"></i><span>'+ver.d+'</span></td>'+
				'<td>'+ver.postMessages+'</td>'+
				'<td>'+ver.status+'</td>'+
				'<td>'+ver.fromUser+'</td>'+
				'<td>'+ver.toUser+'</td>'+
				'<td>'+ver.dateTime+'</td>'+
				'<td><span class="td-delete">删除</span></td>';
				html +='</tr>';
				})
				$('.user-table table').html(html);
				}
				else{
				console.log('返回数据失败');
				}
			},
			error: function(){
				console.log('出现问题');
			}
		});
	}
}
//现在位置


// $(document).ready(function(){
//     training.init();
//     // /yike/manage/msg/msgTable   /yike/manage/msg/msgTable   /yike/manage/msg/msgTable
// })

// window.training = training;
