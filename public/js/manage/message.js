;(function($,window){
    msg(1);
    function nowpages(){
    	$('.page ul span li').eq(0).addClass('select').siblings('li').removeClass('select');
    	var now = msg(1);
    }
    $(document).ready(function(){
        training1.init('/yike/manage/msg/msgCount','/yike/manage/msg/delete','/yike/manage/msg/msgTable');
    })
    window.training1 = training1;

}(jQuery,window));