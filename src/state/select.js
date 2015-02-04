/**
 * @file 选择关卡
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-04
 */

define(function () {
    
    return {
        create: function () {
            var me = this;
            var game = this.game;

            game.add.image(0, 0, 'bg');

            var backBtn = game.add.button(10, 10, 'back', function () {
                me.state.start('menu');
            });

            var totalCol = 4;
            var totalRow = 5;
            var levelSize = 84;
            var margin = 20;
            var top = 120;
            var left = (game.width - totalCol * levelSize - (totalCol - 1) * margin) / 2;

            var onClick = function () {
                me.state.start('level', true, false, this.data.level);
            };

            for (var i = 0, y = top; i < totalRow; ++i, y += levelSize + margin) {
                for (var j = 0, x = left; j < totalCol; ++j, x += levelSize + margin) {
                    var level = i * totalCol + j + 1;

                    var button = game.add.button(
                        x, y,
                        'level',
                        onClick,
                        null,
                        1, 0, 1
                    );
                    button.data = {
                        level: level
                    };

                    var text = game.add.text(
                        x + button.width / 2,
                        y + button.height / 2,
                        level,
                        {font: 'bold 30px Arial', fill: '#f8f7f2'}
                    );
                    text.anchor.set(0.5);
                }
            }
        }
    };

});
