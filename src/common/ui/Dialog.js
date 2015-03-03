/**
 * @file 对话框
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-06
 */


define(function (require) {

    var color = require('common/color');
    var global = require('common/global');

    function Dialog(game, options) {
        this.game = game;
        this._init(options);
    }

    Dialog.prototype._init = function (options) {
        this._initMask();
        this._initBody(options.msg);
        this._initBtns(options.btns);
    };

    Dialog.prototype._initMask = function () {
        var game = this.game;
        var mask = game.add.image(0, 0, 'null');
        mask.scale.set(game.width, game.height);
        mask.alpha = 0;
        mask.inputEnabled = true;
        this.mask = mask;
    };

    Dialog.prototype._initBody = function (msgText) {
        var game = this.game;
        var height = 345;
        var left = game.width * 0.5;
        var top = -height * 0.5;

        var body = game.add.image(left, top, 'dialog');
        body.anchor.set(0.5);
        this.body = body;

        var msg = game.add.text(
            0, 275 - 320,
            msgText,
            {
                font: 'bold 24px ' + global.chFont,
                fill: color.get('dark-green'),
                align: 'center'
            }
        );
        msg.anchor.set(0.5);

        this.body.addChild(msg);
    };

    Dialog.prototype._initBtns = function (btns) {
        var me = this;
        var game = this.game;
        // var left = game.width * 0.5;
        var top = 400 - 320;
        switch (btns.length) {
            case 1:
                var btnData = btns[0];
                var button = game.add.button(
                    0, top,
                    'dialog-btn',
                    btnData.onClick
                        ? btnData.onClick
                        : function () {
                            me.hide();
                        },
                    null,
                    0, 0, 1
                );
                button.anchor.set(0.5);
                me.body.addChild(button);

                var text = game.add.text(
                    0, top - 3,
                    btnData.text,
                    {
                        font: 'bold 28px ' + global.chFont,
                        fill: color.get('dark-green'),
                        strokeThickness: 5,
                        stroke: color.get('white')
                    }
                );
                text.anchor.set(0.5);
                me.body.addChild(text);
                break;
            case 2:
                btns.forEach(function (btnData, index) {
                    var offset = 60;
                    var left = -offset + index * offset * 2;
                    var button = game.add.button(
                        left, top,
                        'dialog-btn-sm',
                        btnData.onClick
                            ? btnData.onClick
                            : function () {
                                me.hide();
                            },
                        null,
                        0, 0, 1
                    );
                    button.anchor.set(0.5);
                    me.body.addChild(button);

                    var text = game.add.text(
                        left - 2, top + 1,
                        btnData.text,
                        {
                            font: 'bold 28px ' + global.chFont,
                            fill: color.get('dark-green'),
                            strokeThickness: 5,
                            stroke: color.get('white')
                        }
                    );
                    text.anchor.set(0.5);
                    me.body.addChild(text);
                });
                break;
        }
    };

    Dialog.prototype._destroy = function () {
        this.mask.destroy();
        this.body.destroy();
    };

    Dialog.prototype.show = function () {
        var game = this.game;

        var tweenMask = game.add.tween(this.mask)
            .to({alpha: 0.7}, 500, Phaser.Easing.Quadratic.InOut);

        var tweenEntity = game.add.tween(this.body)
            .to({y: '+500'}, 500, Phaser.Easing.Back.Out);

        tweenMask.chain(tweenEntity);
        tweenMask.start();
    };

    Dialog.prototype.hide = function () {
        var me = this;
        var game = this.game;

        var tweenEntity = game.add.tween(this.body)
            .to({y: '-500'}, 500, Phaser.Easing.Back.In);

        var tweenMask = game.add.tween(this.mask)
            .to({alpha: 0}, 500, Phaser.Easing.Quadratic.InOut);
        tweenMask.onComplete.add(function () {
            me._destroy();
        });

        tweenEntity.chain(tweenMask);
        tweenEntity.start();
    };

    return Dialog;

});
