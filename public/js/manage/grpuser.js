;(function($,window){
    tab(1,'grpuser');
    var types = 'grpuser';
    $(document).ready(function(){
        training1.init('/yike/manage/grpuser/gpuCount','/yike/manage/grpuser/delete','/yike/manage/grpuser/gpuTable',types);
    })
    window.training1 = training1;

}(jQuery,window));
