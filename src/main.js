var DevilPace = DevilPace || {};

DevilPace.game = new Phaser.Game(480, 800, Phaser.AUTO, '');

DevilPace.game.state.add('boot', DevilPace.boot);
DevilPace.game.state.add('preload', DevilPace.preload);
DevilPace.game.state.add('play', DevilPace.play);

DevilPace.game.state.start('boot');