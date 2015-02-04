/**
 * @file 主程序
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-01-25
 */

define(function (require) {

    return {
        init: function () {
            var game = new Phaser.Game(480, 800, Phaser.AUTO, '');

            game.state.add('boot', require('./state/boot'));
            game.state.add('preload', require('./state/preload'));
            game.state.add('menu', require('./state/menu'));
            game.state.add('select', require('./state/select'));
            game.state.add('level', require('./state/level'));

            game.state.start('boot');
        }
    };

});
