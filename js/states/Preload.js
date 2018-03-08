// var SpaceShooter = SpaceShooter || {};
//
// SpaceShooter.GameOver = {
//
//   init: function(score) {
//     finalScore = score;
//   },
//
//   create: function(score) {
//
//     // initiate game settings
//     init: function(currentLevel) {
//       this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//       this.game.physics.startSystem(Phaser.Physics.ARCADE);
//       this.PLAYER_SPEED = 200;
//       this.BULLET_SPEED = -1000;
//
//       //levels
//       this.numLevels = 3;
//       this.currentLevel = currentLevel ? currentLevel : 1;
//
//     },
//
//     // load the game assets before the game starts
//     preload: function() {
//       this.load.image('space', 'assets/images/space.png');
//       this.load.image('player', 'assets/images/player.png');
//       this.load.image('bullet', 'assets/images/bullet.png');
//       this.load.image('enemyParticle', 'assets/images/enemyParticle.png');
//       this.load.spritesheet('yellowEnemy', 'assets/images/yellow_enemy.png', 50, 46, 3, 1, 1);
//       this.load.spritesheet('redEnemy', 'assets/images/red_enemy.png', 50, 46, 3, 1, 1);
//       this.load.spritesheet('greenEnemy', 'assets/images/green_enemy.png', 50, 46, 3, 1, 1);
//
//       //load level data
//       this.load.text('level1', 'assets/data/level1.json')
//       this.load.text('level2', 'assets/data/level2.json')
//       this.load.text('level3', 'assets/data/level3.json')
//
//       //load sound
//       this.load.audio('orchestra', ['assets/audio/8bit-orchestra.mp3', 'assets/audio/8bit-orchestra.oog'])
//     },
//
//
//   }
// };
