;(function($,window){

    tab(1,'user');
    var types = 'user';
    $(document).ready(function(){
        training1.init('/yike/manage/user/userRegist','/yike/manage/user/delete','/yike/manage/user/userTable');
    })
    window.training1 = training1;

}(jQuery,window));