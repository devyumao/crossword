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
                        msg: '您的金币不足啦',
                        btns: [
                            {
                                text: '知 道 啦'
                            }
                        ]
                    });
                    dialog.show();
                    return;
                }

                var me = this;
                options.input(function () {
                    var selected = options.matrix.getSelected();
                    if (!selected || !selected.isActive()) {
                        return;
                    }

                    var showWordRender = options.showWordRender;
                    selected.showWord(showWordRender);
                    selected.plus();
                    selected.check(showWordRender);
                    me.disable();

                    global.setCoins(coins);
                    me.coinText.setText(coins);
                });
            },
            this,
            0, 0, 1
        );

        this.coinCard = game.add.button(
            options.coinsX,
            options.coinsY,
            'coincard',
            function () {

            },
            this
        );

        this.coinText = game.add.text(
            this.coinCard.x + 41,
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
