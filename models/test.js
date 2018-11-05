function test() {
    var timeOut = Math.random() * 2;
    //log('set timeout to: ' + timeOut + ' seconds.');
    setTimeout(function () {
        if (timeOut < 1) {
            console.log('小于');
        }
        else {
            console.log('大于');
        }
    }, timeOut * 1000);
}

var p1 = new Promise(test);
var p2 = p1.then(function (result) {
    console.log('成功：' + result);
});
var p3 = p2.catch(function (reason) {
    console.log('失败：' + reason);
});