;(function($,window){

    tab(1,'user');
    var types = 'user';
    $(document).ready(function(){
        training1.init('/yike/manage/user/userRegist','/yike/manage/user/delete','/yike/manage/user/userTable');
    })
    window.training1 = training1;

    $('.user-table table').on('click','.cg-psw',function(){
    	var id = $(this).attr('data-id');
    	changePsw(id);
    });
    $('.user-table .select').on('click','.select-tb',function(){
        var select = $('.user-table .select .select-text').val();
        tab(1,'user',select);
    })

}(jQuery,window));