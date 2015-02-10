/**
 * @file 选择关卡
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-03
 */

define(function (require) {

    var global = require('common/global');
    var color = require('common/color');

    var game;

    function initLevels(options, state) {
        var totalCol = options.totalCol;
        var totalRow = options.totalRow;
        var totalPage = options.totalPage;
        var levelSize = 84;
        var margin = 20;
        var top = 100;
        var pageWidth = game.width;
        var left = (pageWidth - totalCol * levelSize - (totalCol - 1) * margin) * 0.5;
        var level = 1;

        var levelGroup = game.add.group();

        var unlocked = global.getUnlocked();
        var solveds = global.getSolveds();

        var onClick = function () {
            state.start('level', true, false, this.data.level);
        };

        for (var page = 0; page < totalPage; ++page) {
            for (var i = 0, y = top; i < totalRow; ++i, y += levelSize + margin) {
                for (var j = 0, x = page * pageWidth + left; j < totalCol; ++j, x += levelSize + margin, ++level) {
                    var button;
                    if (level <= unlocked) {
                        button = game.add.button(
                            x, y,
                            solveds[level] ? 'level-solved' : 'level',
                            onClick,
                            null,
                            1, 0, 1
                        );
                        levelGroup.add(button);

                        var text = game.add.text(
                            x + button.width * 0.5,
                            y + button.height * 0.5,
                            level,
                            {
                                font: 'bold 30px ' + global.enFont,
                                fill: color.get('bg')
                            }
                        );
                        text.anchor.set(0.5);
                        levelGroup.add(text);
                    }
                    else {
                        button = game.add.button(
                            x, y,
                            'level-locked'
                        );
                        levelGroup.add(button);
                    }

                    button.data = {
                        level: level
                    };
                }
            }
        }

        return levelGroup;
    }
    
    return {
        create: function () {
            var me = this;
            game = this.game;

            game.add.image(0, 0, 'bg');

            var title = game.add.text(
                game.width * 0.5, 8,
                '选 择 关 卡',
                global.titleStyle
            );
            title.anchor.set(0.5, 0);

            var backBtn = game.add.button(
                10, 10,
                'back',
                function () {
                    this.state.start('menu');
                },
                this,
                0, 0, 1
            );

            var totalPage = 5;
            var totalCol = 4;
            var totalRow = 5;

            var levels = initLevels(
                {
                    totalCol: totalCol,
                    totalRow: totalRow,
                    totalPage: totalPage
                },
                this.state
            );

            var Pager = require('./Pager');
            new Pager(game, {
                page: Math.floor(global.getUnlocked() / (totalCol * totalRow)) + 1, // 初始为最近解锁关卡所在页
                totalPage: totalPage,
                levels: levels,
                pageWidth: game.width
            });
        }
    };

});