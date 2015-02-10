/**
 * @file 颜色
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-06
 */

define(function () {

    var colors = {
        'bg': '#f8f7f2',
        'white': '#fff',
        'dark-green': '#283e47',
        'glaze': '#dbd6c4',
        'dark-glaze': '#b2a892'
    };

    return {
        get: function (color) {
            return colors[color];
        }
    };

});
