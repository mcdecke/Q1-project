var SpaceShooter = SpaceShooter || {};

//initiate the Phaser framework
SpaceShooter.game = new Phaser.Game('100%', '100%', Phaser.AUTO);

// SpaceShooter.game.state.add('Preload', SpaceShooter.Preload);
SpaceShooter.game.state.add('GameState', SpaceShooter.GameState);
SpaceShooter.game.state.add('GameOver', SpaceShooter.GameOver);
// console.log(SpaceShooter.game.state.states);
SpaceShooter.game.state.start('GameState');
