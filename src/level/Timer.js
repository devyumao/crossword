/**
 * @file 计时器
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-03-19
 */

define(function () {

    var global = require('common/global');
    var color = require('common/color');

    function Timer(game) {
        this.game = game;
        this.seconds = 0;
        this._init();
    }

    Timer.prototype._init = function () {
        var game = this.game;
        this.display = game.add.text(
            10, game.height - 30,
            '00:00:00',
            {
                font: '22px ' + global.enFont,
                fill: color.get('dark-glaze')
            }
        );
        var t = game.time.create(false);
        t.loop(1000, this._update, this);
        t.start();
    };

    Timer.prototype._update = function () {
        ++this.seconds;
        var h = '' + Math.floor(this.seconds / 3600);
        h.length === 1 && (h = '0' + h);
        var m = '' + Math.floor(this.seconds / 60);
        m.length === 1 && (m = '0' + m);
        var s = '' +this.seconds % 60;
        s.length === 1 && (s = '0' + s);
        this.display.setText([h, m, s].join(':'));
    };

    return Timer;

});
