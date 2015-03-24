/**
 * @file 提示
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-03-02
 */

define(function () {

    var global = require('common/global');
    var color = require('common/color');
    var Dialog = require('common/ui/Dialog');

    function Hint(game, options) {
        this.game = game;
        this.unitCost = 20;
        this._initComponents(options);
        this.disable();
    }

    Hint.prototype._initComponents = function (options) {
        var game = this.game;

        this.button = game.add.button(
            options.buttonX,
            options.buttonY,
            'bulb',
            function () {
                if (!this.active) { // 不可用状态
                    return;
                }

                var coins = global.getCoins() - this.unitCost;
                if (coins < 0) { // 金币不足
                    var dialog = new Dialog(game, {
                        msg: '您的金币不足啦', // + '\n获得一个提示需要20枚金币'
                        btns: [
                            // {
                            //     text: '获取金币',
                            //     onClick: function () {
                            //         game.stateTransition.forward('pay', true, false, options.levelNo);
                            //     }
                            // },
                            {
                                text: '回到游戏'
                            }
                        ]
                    });
                    dialog.show();
                    return;
                }

                var matrix = options.matrix;
                var selected = matrix.getSelected();
                if (!selected || !selected.isActive()) {
                    return;
                }

                var showWordRender = options.showWordRender;
                selected.showWord(showWordRender);
                selected.plus();
                selected.check(showWordRender);
                this.disable();

                global.setCoins(coins);
                this.coinText.setText(coins);

                matrix.store();
            },
            this,
            0, 0, 1
        );

        this.coinCard = game.add.button(
            options.coinsX,
            options.coinsY,
            'coincard',
            function () {
                // game.stateTransition.forward('pay', true, false, options.levelNo);
            },
            this,
            // 0, 0, 1
            0, 0, 0
        );

        this.coinText = game.add.text(
            this.coinCard.x + 53,
            this.coinCard.y + this.coinCard.height * 0.5 + 2,
            global.getCoins() + '',
            {
                font: 'bold 20px ' + global.enFont,
                fill: color.get('dark-green')
            }
        );
        this.coinText.anchor.set(1, 0.5);
    };

    Hint.prototype.disable = function () {
        this.active = false;
        this.button.setFrames(2, 2, 2);
    };

    Hint.prototype.activate = function () {
        this.active = true;
        this.button.setFrames(0, 0, 1);
    };

    return Hint;

});
