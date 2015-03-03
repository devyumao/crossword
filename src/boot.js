/**
 * @file 启动
 * @author yumao [zhangyu38@baidu.com]
 * @create 2015-01-25
 */

define(function (require) {
    
    return {
        create: function () {
            // 场景设置
            this.game.stage.backgroundColor = require('common/color').get('bg');

            // 比例设置
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // 保持高宽比铺屏
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            // this.scale.setScreenSize(true); // 铺屏

            // 初始化转场
            var StateTransition = require('common/stateTransition');
            this.game.stateTransition = new StateTransition(this.game);

            this.state.start('preload');
        }
    };

});
