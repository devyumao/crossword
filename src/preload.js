/**
 * @file 预加载
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-01-25
 */

define(function (require) {

    return {
        preload: function () {
            var game = this.game;

            var loading = game.add.text(
                game.width * 0.5, game.height * (1 - 0.618), // 黄金比例
                '载入中...',
                {
                    font: '34px bold ' + require('common/global').chFont,
                    fill: require('common/color').get('dark-glaze')
                }
            );
            loading.anchor.set(0.5);

            // common
            game.load.image('bg', 'asset/img/bg.png');
            game.load.spritesheet('back', 'asset/img/back.png', 35, 38);
            game.load.image('dialog', 'asset/img/dialog.png');
            game.load.spritesheet('dialog-btn', 'asset/img/dialog-btn.png', 222, 80);

            // STATE menu
            game.load.spritesheet('menu-btn', 'asset/img/menu-btn.png', 234, 80);
            game.load.image('logo', 'asset/img/logo.png');
            game.load.image('setting', 'asset/img/setting.png');

            // STATE select
            game.load.spritesheet('level', 'asset/img/level.png', 84, 70);
            game.load.spritesheet('level-solved', 'asset/img/level-solved.png', 84, 70);
            game.load.image('level-locked', 'asset/img/level-locked.png');
            game.load.spritesheet('last', 'asset/img/last.png', 74, 72);
            game.load.spritesheet('next', 'asset/img/next.png', 74, 72);
            game.load.image('dot', 'asset/img/dot.png');
            game.load.image('dot-current', 'asset/img/dot-current.png');

            // STATE level
            game.load.spritesheet('grid', 'asset/img/grid.png', 46, 46);
            game.load.spritesheet('grid-selected', 'asset/img/grid-selected.png', 46, 46);
            game.load.spritesheet('grid-adjacent', 'asset/img/grid-adjacent.png', 46, 46);
            game.load.image('grid-disabled', 'asset/img/grid-disabled.png');

            game.load.spritesheet('key', 'asset/img/key.png', 49, 49);
            game.load.image('clue', 'asset/img/clue.png');
            game.load.spritesheet('restart', 'asset/img/restart.png', 37, 38);

            game.load.image('keyboard-shadow', 'asset/img/keyboard-shadow.png');
            game.load.image('puzzle-shadow', 'asset/img/puzzle-shadow.png');
            game.load.image('clue-shadow', 'asset/img/clue-shadow.png');

            game.load.image('null', 'asset/img/null.png');
        },
        create: function () {
            this.state.start('menu');
        }
    };

});
