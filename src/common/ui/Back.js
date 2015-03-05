/**
 * @file 后退按钮
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-03-04
 */


define(function (require) {

    function Back(game, options) {
        this.game = game;
        this._init(options);
    }

    Back.prototype._init = function (options) {
        var game = this.game;
        this.element = game.add.button(
            10, 20,
            'back',
            function () {
                if (options.hasOwnProperty('stateParam')) {
                    game.stateTransition.back(options.state, true, false, options.stateParam);
                }
                else {
                    game.stateTransition.back(options.state);
                }
            },
            this,
            0, 0, 1
        );
    };

    Back.prototype.getElement = function () {
        return this.element;
    };

    return Back;

});
