/**
 * @file 主程序
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-01-25
 */

define(function (require) {

    function initWeixin() {
        var appId = 'wx06c09a44f6e68fe4';

        var wx = require('dep/jweixin');

        require('common/ajax').get({
            url: require('common/url').GET_SIGNATURE,
            data: {
                url: location.href.split('#')[0]
            },
            success: function (res) {
                res = JSON.parse(res);
                if (res.retcode) {
                    return;
                }
                wx.config({
                    debug: true,
                    appId: appId,
                    timestamp: res.timestamp,
                    nonceStr: 'yiluwan',
                    signature: res.token,
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo'
                    ]
                });
                var link = 'http://static.yiluwan.org/xiaoyouxi/mobile/xyz_abc/crossword/';
                var imgUrl = 'http://static.yiluwan.org/xiaoyouxi/mobile/xyz_abc/crossword/img/icon-200.png';
                wx.onMenuShareTimeline({
                    title: '填字空间 - 挑战最强大脑',
                    link: link,
                    imgUrl: imgUrl
                });
                wx.onMenuShareAppMessage({
                    title: '填字空间',
                    desc: '挑战最强大脑',
                    link: link,
                    imgUrl: imgUrl
                });
            }
        });
    }

    function initStates() {
        var game = new Phaser.Game(480, 800, Phaser.AUTO, '');

        game.state.add('boot', require('boot'));
        game.state.add('preload', require('preload'));
        game.state.add('menu', require('menu/menu'));
        game.state.add('select', require('select/select'));
        game.state.add('level', require('level/level'));
        game.state.add('pay', require('pay/pay'));

        game.state.start('boot');
    }

    return {
        init: function () {
            initWeixin();
            initStates();
        }
    };

});
