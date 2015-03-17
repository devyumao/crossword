/**
 * @file 星级状态
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-03-17
 */

define(function () {

    function StarState(game, options) {
        this.game = game;
        this.emptyStars = [];
        this.solidStars = [];
        this._initComponents(options.starNum);
    }

    StarState.prototype._initComponents = function (starNum) {
        var game = this.game;
        var top = 38;
        for (var s = 0; s < 3; ++s) {
            var left = 70 + s * 36;
            var eStar = game.add.image(left, top, 'star-empty');
            eStar.anchor.set(0.5);
            var sStar = game.add.image(left, top, 'star-solid');
            sStar.anchor.set(0.5);
            if (s < starNum) {
                eStar.scale.set(0);
            }
            else {
                sStar.scale.set(0);
            }
            this.emptyStars.push(eStar);
            this.solidStars.push(sStar);
        }
    };

    StarState.prototype.show = function (num) {
        var game = this.game;
        var index = num - 1;
        var hide = game.add.tween(this.emptyStars[index].scale)
            .to({x: 0, y: 0}, 600, Phaser.Easing.Back.In, false);
        var show = game.add.tween(this.solidStars[index].scale)
            .to({x: 1, y: 1}, 600, Phaser.Easing.Back.Out, false);

        hide.chain(show);
        hide.start();
    };

    return StarState;

});
