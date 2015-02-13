/**
 * @file 分页
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-05
 */

define(function () {

    function Pager(game, options) {
        this.game = game;
        this.page = options.page ? options.page : 1;
        this.totalPage = options.totalPage;
        this.lastDisabled = false;
        this.nextDisabled = false;
        this.levels = options.levels;
        this.pageWidth = options.pageWidth;
        this.indicators = [];
        
        this._initButtons();
        this._initIndicators();
        this._adjustPage();
    }

    Pager.prototype._initButtons = function () {
        var game = this.game;
        var width = 74;
        var margin = 15;
        var top = game.height - 120;
        this.last = game.add.button(
            game.width / 2 - width - margin,
            top,
            'last',
            function () {
                this.back();
            },
            this,
            0, 0, 1
        );
        this.next = game.add.button(
            game.width / 2 + margin,
            top,
            'next',
            function () {
                this.forward();
            },
            this,
            0, 0, 1
        );
        this._updateButtons();
    };

    Pager.prototype._initIndicators = function () {
        var game = this.game;
        var size = 16;
        var margin = 18;
        var left = (game.width - (size + margin) * this.totalPage + margin) * 0.5;
        var top = game.height - 175;
        for (var i = 0, x = left; i < this.totalPage; ++i, x += size + margin) {
            var indicator = game.add.image(x, top, i === this.page - 1 ? 'dot-current' : 'dot');
            this.indicators.push(indicator);
        }
    };

    Pager.prototype._adjustPage = function () {
        this.levels.x -= this.pageWidth * (this.page - 1);
    };

    Pager.prototype._translate = function (offset) {
        var game = this.game;
        if (typeof offset === 'number') {
            offset = (offset >= 0 ? '+' : '') + offset;
        }
        var tween = game.add.tween(this.levels).to(
            {x: offset},
            500,
            Phaser.Easing.Sinusoidal.InOut
        );
        var me = this;
        tween.onStart.add(function () {
            me.lastDisabled = true;
            me.nextDisabled = true;
        });
        tween.onComplete.add(function () {
            me.lastDisabled = false;
            me.nextDisabled = false;
            me._updateIndicators(me.page, (+offset < 0 ? ++me.page : --me.page));
            me._updateButtons();
        });
        tween.start();
    };

    Pager.prototype.back = function () {
        if (this.lastDisabled) {
            return;
        }
        this._translate(this.pageWidth);
    };

    Pager.prototype.forward = function () {
        if (this.nextDisabled) {
            return;
        }
        this._translate(-this.pageWidth);
    };

    Pager.prototype._updateButtons = function () {
        var last = this.last;
        var next = this.next;
        switch (this.page) {
            case 1:
                this._disableLast();
                this._activateNext();
                break;
            case this.totalPage:
                this._activateLast();
                this._disableNext();
                break;
            default:
                this._activateLast();
                this._activateNext();
        }
    };

    Pager.prototype._updateIndicators = function (oldPage, newPage) {
        this.indicators[oldPage - 1].loadTexture('dot');
        this.indicators[newPage - 1].loadTexture('dot-current');
    };

    Pager.prototype._disableLast = function () {
        this.last.alpha = 0.5;
        this.last.setFrames(0, 0, 0);
        this.lastDisabled = true;
    };

    Pager.prototype._activateLast = function () {
        this.last.alpha = 1;
        this.last.setFrames(0, 0, 1);
        this.lastDisabled = false;
    };

    Pager.prototype._disableNext = function () {
        this.next.alpha = 0.5;
        this.next.setFrames(0, 0, 0);
        this.nextDisabled = true;
    };

    Pager.prototype._activateNext = function () {
        this.next.alpha = 1;
        this.next.setFrames(0, 0, 1);
        this.nextDisabled = false;
    };

    return Pager;

});