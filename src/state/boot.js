var DevilPace = DevilPace || {};

DevilPace.boot = {
    preload: function () {

    },
    create: function () {
        // 场景设置
        this.game.stage.backgroundColor = '#FFDEBE';

        // 比例设置
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // 保持高宽比铺屏
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // this.scale.setScreenSize(true); // 铺屏

        this.state.start('preload');
    }
};