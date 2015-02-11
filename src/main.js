/**
 * @file 主程序
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-01-25
 */

define(function (require) {

    return {
        init: function () {
            var game = new Phaser.Game(480, 800, Phaser.AUTO, '');

            game.state.add('boot', require('boot'));
            game.state.add('preload', require('preload'));
            game.state.add('menu', require('menu/menu'));
            game.state.add('select', require('select/select'));
            game.state.add('level', require('level/level'));

            game.state.start('boot');

            require('weixin');
        }
    };

});
