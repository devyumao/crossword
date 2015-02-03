/**
 * @file 预加载
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-01-25
 */

define(function () {

    return {
        preload: function () {
            var game = this.game;

            game.load.image('level', 'asset/img/level.png');

            game.load.image('grid', 'asset/img/grid.png');
            game.load.image('grid-disabled', 'asset/img/grid-disabled.png');
            game.load.image('grid-selected', 'asset/img/grid-selected.png');
            game.load.image('grid-adjacent', 'asset/img/grid-adjacent.png');
            game.load.image('key', 'asset/img/key.png');
            game.load.image('clue', 'asset/img/clue.png');
            game.load.image('back', 'asset/img/back.png');
        },
        create: function () {
            this.state.start('select');
        }
    };

});
