/**
 * @file 转场
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-04
 */

define(function (require) {

    var transition = null;

    return {
        init: function (game) {
            transition = game.plugins.add(Phaser.Plugin.StateTransition);
        },

        forward: function (state) {
            transition.settings({
                duration: 1000,
                // ease: Phaser.Easing.Exponential.InOut,
                properties: {
                    alpha: 0,
                    scale: {
                        x: 1.5,
                        y: 1.5
                    }
                }
            });
            transition.to(state);
        },

        back: function () {

        }

    };

});
