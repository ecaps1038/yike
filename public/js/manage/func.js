    function msg(num){
    	var html = '';
    	$.ajax({
			url: '/yike/manage/msg/msgTable',
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