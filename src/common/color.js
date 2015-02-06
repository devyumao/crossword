/**
 * @file 颜色
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-06
 */

define(function () {

    var colors = {
        'white': '#fff',
        'dark-green': '#283e47',
    };

    return {
        get: function (color) {
            return colors[color];
        }
    };

});
