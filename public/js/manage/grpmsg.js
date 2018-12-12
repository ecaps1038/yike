;(function($,window){
    tab(1,'grpmsg');
    var types = 'grpmsg';
    $(document).ready(function(){
        training1.init('/yike/manage/grpmsg/msgCount','/yike/manage/grpmsg/delete','/yike/manage/grpmsg/msgTable',types);
    })
    window.training1 = training1;

}(jQuery,window));
