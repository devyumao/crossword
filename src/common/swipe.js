/**
 * @file 滑动
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-04
 */

define(function () {

    return function (game, callback, options) {
        var startPoint  = {};
        var endPoint = {};
        var threshold = {
            
        };

        game.input.onDown.add(function (pointer) {
            startPoint.x = pointer.clientX;
            startPoint.y = pointer.clientY;
        }, this);

        game.input.onUp.add(function (pointer) {

        }, this);
    };

});
