;(function($,window){
   tab(1,'group');
    var types = 'group';
    $(document).ready(function(){
        training1.init('/yike/manage/group/groupRegist','/yike/manage/group/delete','/yike/manage/group/groupTable');
    })
    window.training1 = training1;
}(jQuery,window));