/**
 * @file 场景标题
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-03-04
 */


define(function (require) {

    var global = require('common/global');

    function Title(game, options) {
        this.game = game;
        this.text = options.text;
        this._init();
    }

    Title.prototype._init = function () {
        var game = this.game;
        var title = game.add.text(
            game.width * 0.5, 20,
            this.text,
            global.titleStyle
        );
        title.anchor.set(0.5, 0);
    };

    return Title;

});
