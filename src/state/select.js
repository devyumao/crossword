/**
 * @file 选择关卡
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-02-03
 */

define(function (require) {

    var global = require('../common/global');

    var game;

    function initLevels(options, state) {
        var totalCol = options.totalCol;
        var totalRow = options.totalRow;
        var totalPage = options.totalPage;
        var levelSize = 84;
        var margin = 20;
        var top = 100;
        var pageWidth = game.width;
        var left = (pageWidth - totalCol * levelSize - (totalCol - 1) * margin) / 2;
        var level = 1;

        var levelGroup = game.add.group();
        var unlocked = global.getUnlocked();

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
                            'level',
                            onClick,
                            null,
                            1, 0, 1
                        );
                        levelGroup.add(button);

                        var text = game.add.text(
                            x + button.width / 2,
                            y + button.height / 2,
                            level,
                            {font: 'bold 30px Arial', fill: '#f8f7f2'}
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

    function Pager(options) {
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
        var width = 74;
        var margin = 15;
        var top = game.height - 130;
        var me = this;
        this.last = game.add.button(
            game.width / 2 - width - margin,
            top,
            'last',
            function () {
                me.back();
            }
        );
        this.next = game.add.button(
            game.width / 2 + margin,
            top,
            'next',
            function () {
                me.forward();
            }
        );
        this._updateButtons();
    };

    Pager.prototype._initIndicators = function () {
        var size = 16;
        var margin = 18;
        var left = (game.width - (size + margin) * this.totalPage + margin) * 0.5;
        var top = game.height - 180;
        for (var i = 0, x = left; i < this.totalPage; ++i, x += size + margin) {
            var indicator = game.add.image(x, top, i === this.page - 1 ? 'dot-current' : 'dot');
            this.indicators.push(indicator);
        }
    };

    Pager.prototype._adjustPage = function () {
        this.levels.x -= this.pageWidth * (this.page - 1);
    };

    Pager.prototype._translate = function (offset) {
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
        this.lastDisabled = true;
    };

    Pager.prototype._activateLast = function () {
        this.last.alpha = 1;
        this.lastDisabled = false;
    };

    Pager.prototype._disableNext = function () {
        this.next.alpha = 0.5;
        this.nextDisabled = true;
    };

    Pager.prototype._activateNext = function () {
        this.next.alpha = 1;
        this.nextDisabled = false;
    };

    
    return {
        create: function () {
            var me = this;
            game = this.game;

            game.add.image(0, 0, 'bg');

            var backBtn = game.add.button(10, 10, 'back', function () {
                me.state.start('menu');
            });

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

            new Pager({
                page: Math.floor(global.getUnlocked() / (totalCol * totalRow)) + 1, // 初始为最近解锁关卡所在页
                totalPage: totalPage,
                levels: levels,
                pageWidth: game.width
            });

            // var toucher = game.add.image(left, top, 'null');
            // toucher.scale.set(
            //     (levelSize + margin) * totalCol - margin,
            //     (levelSize + margin) * totalRow - margin
            // );
            // toucher.alpha = 0.5;
            // toucher.inputEnabled = true;
            // toucher.input.enableDrag();
            // toucher.input.allowVerticalDrag = false;

            // var listenSwipe = require('../common/swipe');
            // listenSwipe(game);
        }
    };

});
