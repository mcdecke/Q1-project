var SpaceShooter = SpaceShooter || {};

SpaceShooter.PlayerBullet = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'bullet');

  //some default values
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
};

SpaceShooter.PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);
SpaceShooter.PlayerBullet.prototype.constructor = SpaceShooter.PlayerBullet;
