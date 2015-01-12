var DevilPace = DevilPace || {};

DevilPace.preload = {
    preload: function () {
        var game = this.game;
        game.load.image('dude', 'asset/img/dude.png');
        game.load.image('balloon', 'asset/img/balloon.png');
        game.load.image('view', 'asset/img/view.png');
        game.load.image('tree', 'asset/img/tree.png');
        game.load.image('short-tree', 'asset/img/short-tree.png');
        game.load.image('cloud', 'asset/img/cloud.png');
        game.load.image('big-cloud', 'asset/img/big-cloud.png');
        game.load.image('sym-cloud', 'asset/img/sym-cloud.png');
    },
    create: function () {
        this.state.start('play');
    }
};
