var DevilPace = DevilPace || {};

(function () {
    var cloud1;
    var cloud2;
    var bigCloud;

    DevilPace.play = {
        preload: function () {
        },

        create: function () {
            var game = this.game;

            game.world.setBounds(0, -800, 480, 1600);

            cloud1 = game.add.sprite(150, -650, 'cloud');
            cloud2 = game.add.sprite(-150, -200, 'sym-cloud');

            var view = game.add.sprite(0, 580, 'view');
            var shortTree = game.add.sprite(300, 560, 'short-tree');
            var tree = game.add.sprite(414, 495, 'tree');

            var dude = game.add.sprite(330, 530, 'dude');
            game.camera.follow(dude);
            game.add.tween(dude).to({y: -500}, 100, Phaser.Easing.Quadratic.InOut, false, 0)
                .to({y: '30'}, 1500, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true)
                .start();

            var balloon = game.add.sprite(-60, -960, 'balloon');
            game.add.tween(balloon).to({y: '20'}, 1800, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);

            bigCloud = game.add.sprite(0, -850, 'big-cloud');
        },

        update: function () {
            this.moveCloud(cloud1, 0.1, 10);
            this.moveCloud(cloud2, 0.2, 10);
            this.moveCloud(bigCloud, 0.6);

        },
        
        render: function () {
        },

        moveCloud: function (cloud, pace, interval) {
            interval = interval ? interval : 0;
            cloud.x += pace;
            if (cloud.x >= this.game.width + interval) {
                cloud.x = -cloud.width;
            }
        }
    };
})();
