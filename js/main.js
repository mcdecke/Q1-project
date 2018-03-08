var SpaceHipster = SpaceHipster || {};

//initiate the Phaser framework
SpaceHipster.game = new Phaser.Game('100%', '100%', Phaser.AUTO);

// SpaceHipster.game.state.add('Preload', SpaceHipster.Preload);
SpaceHipster.game.state.add('GameState', SpaceHipster.GameState);
SpaceHipster.game.state.add('GameOver', SpaceHipster.GameOver);
// console.log(SpaceHipster.game.state.states);
SpaceHipster.game.state.start('GameState');
