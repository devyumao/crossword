/**
 * @file 选择关卡
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-01-25
 */

define(function () {
    
    return {
        preload: function () {

        },
        create: function () {
            var me = this;
            var game = this.game;

            var totalCol = 4;
            var totalRow = 5;
            var levelSize = 80;
            var margin = 20;
            var top = 120;
            var left = (game.width - totalCol * levelSize - (totalCol - 1) * margin) / 2;

            for (var i = 0, y = top; i < totalRow; ++i, y += levelSize + margin) {
                for (var j = 0, x = left; j < totalCol; ++j, x += levelSize + margin) {
                    var level = i * totalCol + j + 1;

                    var button = game.add.button(x, y, 'level', function () {
                        me.state.start('level', true, false, this.data.level);
                    });
                    button.data = {
                        level: level
                    };
                    button.scale.set(levelSize);

                    var text = game.add.text(
                        x + levelSize / 2,
                        y + levelSize / 2,
                        level,
                        {font: '30px Arial', fill: '#c5701b'}
                    );
                    text.anchor.set(0.5);
                }
            }
        }
    };

});
