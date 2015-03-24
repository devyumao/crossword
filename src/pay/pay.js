/**
 * @file 支付
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-03-03
 */

define(function () {

    var global = require('common/global');
    var color = require('common/color');

    var game;
    var levelNo;

    function initPanels() {
        var left = 20;
        var top = 80;
        var panelImage = game.cache.getImage('pay-panel');
        var panelMargin = 10;

        var panelsData = [
            {
                coins: 200, // 0
                money: 6
            },
            {
                coins: 500, // 3
                money: 12
            },
            {
                coins: 1200, // 11
                money: 25
            },
            {
                coins: 2500, // 25
                money: 50
            }
        ];

        panelsData.forEach(function (data, index) {
            var panel = game.add.image(left, top + (panelImage.height + panelMargin) * index, 'pay-panel');
            var panelMidY = panel.y + panel.height * 0.5;

            var coin = game.add.image(panel.x + 60, panelMidY - 3, 'coin');
            coin.anchor.set(0.5);
            coin.scale.set(0.8);

            var multip = game.add.text(
                panel.x + 142,
                panelMidY,
                '+ ' + data.coins,
                {
                    font: 'bold 32px ' + global.enFont,
                    fill: color.get('dark-green')
                }
            );
            multip.anchor.set(0.5);

            var buy = game.add.button(
                game.width - 124,
                panelMidY - 2,
                'dialog-btn',
                function () {

                },
                this,
                0, 0, 1
            );
            buy.anchor.set(0.5);
            buy.scale.set(0.6, 0.75);

            var money = game.add.text(
                buy.x + 3,
                panelMidY + 3,
                '￥ ' + data.money,
                {
                    font: 'bold 26px ' + global.chFont,
                    fill: color.get('dark-green'),
                    strokeThickness: 5,
                    stroke: color.get('white')
                }
            );
            money.anchor.set(0.6);
        });
    }

    function initInfo () {
        var top = game.height - 155;

        var info = game.add.text(
            game.width * 0.5,
            top,
            '您现在拥有 ' + global.getCoins() + ' 枚   ', // 末尾连续空格留给 coin, 较简便地使二者组合居中
            {
                font: '28px ' + global.chFont,
                fill: color.get('dark-glaze')
            }
        );
        info.anchor.set(0.5);

        var coin = game.add.image(info.x + info.width * 0.5, top - 1, 'coin');
        coin.anchor.set(0.5);
        coin.scale.set(0.6);
    }

    return {
        init: function (level) {
            levelNo = level;
            // levelNo = 1;
        },

        create: function () {
            game = this.game;

            game.add.image(0, 0, 'bg');

            var Title = require('common/ui/Title');
            new Title(game, {text: '获 取 金 币'});

            var Back = require('common/ui/Back');
            new Back(game, {
                state: 'level',
                stateParam: levelNo
            });

            initPanels();
            initInfo();
        }
    };

});
