var DevilPace = DevilPace || {};

(function () {

    var cloud1;
    var cloud2;
    var cloud3;
    var cloud4;
    var cloud5;
    var bigCloud;

    DevilPace.play = {
        preload: function () {
        },

        create: function () {
            var game = this.game;

            game.world.setBounds(0, -800, 480, 1600);

            cloud1 = game.add.sprite(150, -650, 'cloud');
            cloud2 = game.add.sprite(-150, -180, 'sym-cloud');
            cloud3 = game.add.sprite(180, 60, 'cloud');
            cloud3.scale.set(0.6);
            cloud4 = game.add.sprite(340, 160, 'sym-cloud');
            cloud4.scale.set(0.65);
            cloud5 = game.add.sprite(-20, 330, 'cloud');
            cloud5.scale.set(0.7);

            var view = game.add.sprite(0, 580, 'view');
            var shortTree = game.add.sprite(300, 560, 'short-tree');
            var tree = game.add.sprite(414, 495, 'tree');

            var dude = game.add.sprite(330, 530, 'dude');
            game.camera.follow(dude);
            // for debug
            var upDuration = 10;
            var upDelay = 0;
            var tweenDudeUp = game.add.tween(dude).to({y: -500}, upDuration, Phaser.Easing.Quadratic.InOut, false, upDelay);
            var tweenDude = game.add.tween(dude).to({y: '30'}, 1500, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);

            var balloon = game.add.sprite(-60, -960, 'balloon');
            var tweenBalloon = game.add.tween(balloon).to({y: '20'}, 1800, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);

            bigCloud = game.add.sprite(0, -850, 'big-cloud');

            var dialog1 = game.add.sprite(345, -313, 'dialog-1');
            dialog1.scale.set(0);
            dialog1.alpha = 0.6;
            dialog1.anchor.set(1, 0.3);
            var tweenDialog1 = game.add.tween(dialog1.scale).to({x: 1, y: 1}, 600, Phaser.Easing.Back.Out, false, 200);

            var dlg1Style = {font: '14pt Arial', fill: '#333'};
            var dlg1Content = 'I’ve been wanting to meet you.\nDo you agree to be my friend?';
            var dlg1Text = game.add.text(55, -320, '', dlg1Style);
            dlg1Text.lineSpacing = 15;
            dlg1Text.alpha = 0.6;

            var dialog2 = game.add.sprite(160, -490, 'dialog-2');
            // dialog2.scale.set(0);
            dialog2.alpha = 0.6;
            dialog2.anchor.set(0, 1);
            var tweenDialog2 = game.add.tween(dialog2.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Back.Out, false, 200);

            var button1 = game.add.button(195, -650, 'button-1', null, this, 1, 0, 1);
            button1.alpha = 0.8;

            var button2 = game.add.button(195, -580, 'button-2', null, this, 1, 0, 1);
            button2.alpha = 0.8;
            
            // tweens
            tweenDudeUp.chain(tweenDude);
            tweenDudeUp.onComplete.add(function () {
                tweenDialog1.start();
            });

            var index = 0;
            var length = dlg1Content.length;
            tweenDialog1.onComplete.add(function () {
                game.time.events.repeat(80, length, function () {
                    dlg1Text.setText(dlg1Content.substr(0, ++index));
                    if (index === length) {
                        tweenDialog2.start();
                    }
                });
            });
            tweenDudeUp.start();
            tweenBalloon.start();
        },

        update: function () {
            this.moveCloud(cloud1, 0.1, 10);
            this.moveCloud(cloud2, 0.2, 10);

            this.moveCloud(cloud3, 0.1);
            this.moveCloud(cloud4, 0.15);
            this.moveCloud(cloud5, 0.18);

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
