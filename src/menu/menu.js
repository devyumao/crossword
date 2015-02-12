/**
 * @file 主菜单
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-04
 */

define(function (require) {

    var color = require('common/color');
    var global = require('common/global');

    return {
        create: function () {
            var game = this.game;

            game.add.image(0, 0, 'bg');
            game.add.image((game.width - 400) / 2,  80, 'logo');
            // game.add.image(20, game.height - 20 - 72, 'setting');

            var btnStyle = {};
            btnStyle.width = 234;
            btnStyle.height = 80;
            btnStyle.left = (game.width - btnStyle.width) / 2;
            btnStyle.top = 300;
            btnStyle.marginBottom = 20;

            var textStyle = {
                font: 'bold 28px ' + global.chFont,
                fill: color.get('dark-green'),
                strokeThickness: 5,
                stroke: color.get('white')
            };

            // TODO: menu buttons 对象化
            var btn1 = game.add.button(
                btnStyle.left,
                btnStyle.top,
                'menu-btn',
                function () {
                    game.stateTransition.forward('select');
                },
                this,
                0, 0, 1
            );
            var text1 = game.add.text(
                btn1.x + btn1.width / 2,
                btn1.y + btn1.height / 2 - 5,
                '开 始 游 戏',
                textStyle
            );
            text1.anchor.set(0.5);

            var btn2 = game.add.button(
                btnStyle.left,
                btnStyle.top + btnStyle.height + btnStyle.marginBottom,
                'menu-btn',
                function () {
                    game.stateTransition.forward('level', true, false, require('common/global').getUnlocked());
                },
                this,
                0, 0, 1
            );
            var text2 = game.add.text(
                btn2.x + btn2.width / 2,
                btn2.y + btn2.height / 2 - 5,
                '继 续 游 戏',
                textStyle
            );
            text2.anchor.set(0.5);
        }
    };

});
