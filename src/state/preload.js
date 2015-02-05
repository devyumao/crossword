/**
 * @file 预加载
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-01-25
 */

define(function () {

    return {
        preload: function () {
            var game = this.game;

            game.load.image('bg', 'asset/img/bg.png');
            game.load.image('logo', 'asset/img/logo.png');
            game.load.image('setting', 'asset/img/setting.png');

            game.load.spritesheet('menu-btn', 'asset/img/menu-btn.png');

            // STATE select
            game.load.spritesheet('level', 'asset/img/level.png', 84, 70);
            game.load.image('last', 'asset/img/last.png');
            game.load.image('next', 'asset/img/next.png');
            game.load.image('dot', 'asset/img/dot.png');
            game.load.image('dot-current', 'asset/img/dot-current.png');

            game.load.image('grid', 'asset/img/grid.png');
            game.load.image('grid-disabled', 'asset/img/grid-disabled.png');
            game.load.image('grid-selected', 'asset/img/grid-selected.png');
            game.load.image('grid-adjacent', 'asset/img/grid-adjacent.png');
            game.load.image('key', 'asset/img/key.png');
            game.load.image('clue', 'asset/img/clue.png');

            game.load.image('back', 'asset/img/back.png');
            game.load.image('restart', 'asset/img/restart.png');


            game.load.image('keyboard-shadow', 'asset/img/keyboard-shadow.png');
            game.load.image('puzzle-shadow', 'asset/img/puzzle-shadow.png');
            game.load.image('clue-shadow', 'asset/img/clue-shadow.png');

            game.load.image('null', 'asset/img/null.png');
        },
        create: function () {
            this.state.start('select');
        }
    };

});
