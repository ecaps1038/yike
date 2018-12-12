;(function($,window){
    tab(1,'friend');
    var types = 'friend';
    $(document).ready(function(){
        training1.init('/yike/manage/friend/frdCount','/yike/manage/friend/delete','/yike/manage/friend/frdTable',types);
    })
    window.training1 = training1;

}(jQuery,window));
