;(function($,window){
    tab(1,'msg');
    var types = 'msg';
    $(document).ready(function(){
        training1.init('/yike/manage/msg/msgCount','/yike/manage/msg/delete','/yike/manage/msg/msgTable',types);
    })
    window.training1 = training1;
    $('.user-table .select').on('click','.select-tb',function(){
        var select = $('.user-table .select .select-text').val();
        tab(1,'msg',select);
    })

}(jQuery,window));