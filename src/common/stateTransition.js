/**
 * @file 转场
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-04
 */

define(function (require) {

    function stateTransition(game) {
        this.screenWidth = game.width;
        this.transition = game.plugins.add(Phaser.Plugin.StateTransition);
    }

    stateTransition.prototype._to = function (properties, state, clearWorld, clearCache, parameter) {
        var transition = this.transition;
        transition.configure({
            duration: 300,
            ease: Phaser.Easing.Exponential.In,
            properties: properties
        });
        transition.to(state, clearWorld, clearCache, parameter); // WARN: 注意一下会不会内存泄露
    };

    stateTransition.prototype.forward = function (state, clearWorld, clearCache, parameter) {
        this._to(
            {
                cameraOffset: {
                    x: -this.screenWidth * 0.5,
                }
            },
            state, clearWorld, clearCache, parameter
        );
    };

    stateTransition.prototype.back = function (state, clearWorld, clearCache, parameter) {
        this._to(
            {
                cameraOffset: {
                    x: this.screenWidth * 1.5,
                }
            },
            state, clearWorld, clearCache, parameter
        );
    };

    return stateTransition;

});
