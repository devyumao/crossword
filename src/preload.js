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
            game.load.image('bg', 'img/bg.png');
            game.load.spritesheet('back', 'img/back.png', 35, 38);
            game.load.image('dialog', 'img/dialog.png');
            game.load.spritesheet('dialog-btn', 'img/dialog-btn.png', 222, 80);

            // STATE menu
            game.load.spritesheet('menu-btn', 'img/menu-btn.png', 234, 80);
            game.load.image('logo', 'img/logo.png');
            game.load.image('setting', 'img/setting.png');

            // STATE select
            game.load.spritesheet('level', 'img/level.png', 84, 70);
            game.load.spritesheet('level-solved', 'img/level-solved.png', 84, 70);
            game.load.image('level-locked', 'img/level-locked.png');
            game.load.spritesheet('last', 'img/last.png', 74, 72);
            game.load.spritesheet('next', 'img/next.png', 74, 72);
            game.load.image('dot', 'img/dot.png');
            game.load.image('dot-current', 'img/dot-current.png');

            // STATE level
            game.load.spritesheet('grid', 'img/grid.png', 46, 46);
            game.load.spritesheet('grid-selected', 'img/grid-selected.png', 46, 46);
            game.load.spritesheet('grid-adjacent', 'img/grid-adjacent.png', 46, 46);
            game.load.image('grid-disabled', 'img/grid-disabled.png');

            game.load.spritesheet('key', 'img/key.png', 49, 49);
            game.load.image('clue', 'img/clue.png');
            game.load.spritesheet('restart', 'img/restart.png', 37, 38);

            game.load.image('keyboard-shadow', 'img/keyboard-shadow.png');
            game.load.image('puzzle-shadow', 'img/puzzle-shadow.png');
            game.load.image('clue-shadow', 'img/clue-shadow.png');

            game.load.image('null', 'img/null.png');
        },
        create: function () {
            this.state.start('menu');
        }
    };

});
