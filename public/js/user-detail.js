;(function($,window){

    var training = {
        init : function(){
            this._friendDelete();
            this._markname();
            this._upmarkName();
            this._length = 0;
      },
       
        // 判断用户删除确定弹框
        _friendDelete : function(){
            $('.delete').on('click',function(ev){
                ev = ev || window.event;
                if(confirm("是否删除好友?")){
                    //alert ("点击了确定");
                }else{
                    return false;
                }
            });
        },
        
        //设置备注
        _markname : function(){
            var that = this, _link = '';
            $('body').on('click','.beizhu',function(){
                var vel = $('.beizhu').html();
                if(vel == "设置备注"){
                    $('.beizhu').html('取消');
                    $('.addmark').show();
                }else{
                    $('.beizhu').html('设置备注');
                    $('.addmark').hide();
                }         
            });
        },
        //备注提交
        _upmarkName : function(){
            $('body').on('click','.addmark .upmark',function(){
                var cont  = $('.markname').val();
                if(cont){
                    //异步添加用户备注
                    var _id = $(this).attr('data-id');
                    $.ajax({
                        url: '/detail/markname',
                        type: 'POST',
                        data: {cont:cont,id:_id},
                        success: function(data){
                            if(data.success){
                                //刷新当前页面
                                window.location.reload();
                            }else{
                            console.log('取回数据问题');
                            }
                        },
                        error: function(){
                            console.log('没实现异步');
                        }
                    });
                }
            });
        },
    }

    $(document).ready(function(){
        training.init();
    })

    window.training = training;

}(jQuery,window));