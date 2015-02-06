/**
 * @file 对话框
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-06
 */


define(function (require) {

    var color = require('../common/color');

    function Dialog(game, options) {
        this.game = game;
        this.buttons = [];

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
            left,
            top + 275 - 320,
            msgText,
            {
                font: 'bold 24px Arial',
                fill: color.get('dark-green'),
                align: 'center'
            }
        );
        msg.anchor.set(0.5);
        this.msg = msg;

        this.group = game.add.group();
        this.group.add(body);
        this.group.add(msg);
    };

    Dialog.prototype._initBtns = function (btns) {
        var me = this;
        var game = this.game;
        var left = game.width * 0.5;
        var top = 400 - 320 - 173;
        btns.forEach(function (btnData, index) {
            var button = game.add.button(
                left,
                top + 100 * index,
                'dialog-btn',
                btnData.onClick
                    ? btnData.onClick
                    : function () {
                        me.hide();
                    }
            );
            button.anchor.set(0.5);
            me.group.add(button);

            var text = game.add.text(
                left,
                top - 3 + 100 * index,
                btnData.text,
                {
                    font: 'bold 30px Arial',
                    fill: color.get('dark-green'),
                    strokeThickness: 5,
                    stroke: color.get('white')
                }
            );
            text.anchor.set(0.5);
            me.group.add(text);

            me.buttons.push({
                button: button,
                text: text
            });
        });
    };

    Dialog.prototype.show = function () {
        var game = this.game;

        var tweenMask = game.add.tween(this.mask)
            .to({alpha: 0.7}, 500, Phaser.Easing.Quadratic.InOut);

        var tweenEntity = game.add.tween(this.group)
            .to({y: '+500'}, 500, Phaser.Easing.Back.Out);

        tweenMask.chain(tweenEntity);
        tweenMask.start();
    };

    Dialog.prototype.hide = function () {
        var game = this.game;

        var tweenEntity = game.add.tween(this.group)
            .to({y: '-500'}, 500, Phaser.Easing.Back.In);

        var tweenMask = game.add.tween(this.mask)
            .to({alpha: 0}, 500, Phaser.Easing.Quadratic.InOut);

        tweenEntity.chain(tweenMask);
        tweenEntity.start();

        // TODO: 销毁元素
    };

    return Dialog;

});
