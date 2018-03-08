var SpaceShooter = SpaceShooter || {};

SpaceShooter.GameOver = {

  init: function(score) {
    finalScore = score;
  },

  create: function(score) {

    gameOverLabel = this.game.add.text(this.game.world.centerX, this.game.world.centerY, `GAME OVER: \n You Scored ${finalScore} points \n RETRY?`, {
      font: '24px Arial',
      fill: '#fff'
    });
    gameOverLabel.inputEnabled = true;
    gameOverLabel.events.onInputUp.add(function() {
      //pauses
      gameOverLabel.kill();
      this.game.state.start('GameState');
    }, this);

  }
};
