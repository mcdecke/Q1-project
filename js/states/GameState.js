var SpaceShooter = SpaceShooter || {};

SpaceShooter.GameState = {

  // initiate game settings
  init: function(currentLevel) {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.PLAYER_SPEED = 200;
    this.BULLET_SPEED = -1000;

    //levels
    this.numLevels = 3;
    this.currentLevel = currentLevel ? currentLevel : 1;

  },

  // load the game assets before the game starts
  preload: function() {
    this.load.image('space', 'assets/images/space.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('enemyParticle', 'assets/images/enemyParticle.png');
    this.load.spritesheet('yellowEnemy', 'assets/images/yellow_enemy.png', 50, 46, 3, 1, 1);
    this.load.spritesheet('redEnemy', 'assets/images/red_enemy.png', 50, 46, 3, 1, 1);
    this.load.spritesheet('greenEnemy', 'assets/images/green_enemy.png', 50, 46, 3, 1, 1);

    //load level data
    this.load.text('level1', 'assets/data/level1.json')
    this.load.text('level2', 'assets/data/level2.json')
    this.load.text('level3', 'assets/data/level3.json')

    //load sound
    this.load.audio('orchestra', ['assets/audio/8bit-orchestra.mp3', 'assets/audio/8bit-orchestra.oog'])
  },


  // executed after everything is loaded
  create: function() {
    //background
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space')
    this.background.autoScroll(0, 30);

    //player
    this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 50, 'player');
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    //create bullets
    this.initBullets();
    this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND / 5, this.createPlayerBullet, this);

    //create enemy
    this.initEnemies();

    //load level
    this.loadLevel();

    //load sound
    this.orchestra = this.add.audio('orchestra');
    this.orchestra.play();

    //pause event
    // Create a label to use as a button
    pause_label = this.game.add.text(this.game.world.centerX - 100, 20, 'Pause!', {
      font: '24px Arial',
      fill: '#fff'
    });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function() {
      //pauses
      pause_label.kill();
      this.game.paused = true;
    }, this);

    // //scoring
    let levelScore;

    if (levelScore > 0) {
      score = levelScore;
    } else {
      score = 0;
    }

    score_label = this.game.add.text(this.game.world.centerX + 10, 20, "Score: " + score, {
      font: '24px Arial',
      fill: '#fff'
    });

    //high scoring

    if (!localStorage.getItem('High Score')) {
      highScore = 0;
    } else {
      highScore = (localStorage.getItem('High Score'));
    }

    highScore_label = this.game.add.text(this.game.world.centerX + 10, 80, "High Score: " + highScore, {
      font: '24px Arial',
      fill: '#fff'
    });
    //starts the game paused
    this.game.paused = true;
    pause_label.kill();

    level_label = this.game.add.text(this.game.world.centerX, this.game.world.centerY, `Level ${this.currentLevel} \nSTART!`, {
      font: '24px Arial',
      fill: '#fff'
    });
    level_label.inputEnabled = true;
    level_label.events.onInputUp.add(function() {
      //commits sudoku
      level_label.kill();
      start_label.kill();
      pause_label.revive();
      this.game.paused = false;
    }, this);

  },

  update: function() {

    this.game.physics.arcade.overlap(this.playerBullets, this.enemies, this.damageEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.killPlayer, null, this);
    //velocity is zero is nothing is pressed
    this.player.body.velocity.x = 0;
    //moves left or right depending on where the screen is touched
    if (this.game.input.activePointer.isDown) {
      var targetX = this.game.input.activePointer.position.x;
      var direction = targetX >= this.game.world.centerX ? 1 : -1;
      this.player.body.velocity.x = direction * this.PLAYER_SPEED;
    }

    //update score_label
    score_label.text = "Score: " + score;
  },

  paused: function() {

    // Then adds the start button
    start_label = this.game.add.text(this.game.world.centerX - 100, 80, 'Start!', {
      font: '24px Arial',
      fill: '#fff'
    });

    start_label.inputEnabled = true;
    start_label.events.onInputUp.add(function() {
      //starts game
      this.game.paused = false;
      start_label.kill();
      pause_label.revive();

    }, this);
  },

  win: function() {
    if (this.currentLevel > this.numLevels) {
      console.log('you won');
      this.game.paused = true;
            start_label.kill();

      win_label = this.game.add.text(this.game.world.centerX - 30, this.game.world.centerY - 30, `You Won!\nScore: ${score}\nClick to\nPlay Again`, {
        font: '24px Arial',
        fill: '#fff'
      });



      win_label.inputEnabled = true;
      win_label.events.onInputUp.add(function() {
        //starts game

        this.game.paused = false;
        SpaceShooter.game.state.start('GameState', true, true, this.currentLevel = 1);
      }, this)
    }
  },

  initBullets: function() {
    this.playerBullets = this.add.group();
    this.playerBullets.enableBody = true;
  },

  createPlayerBullet: function() {
    var bullet = this.playerBullets.getFirstExists(false);

    if (!bullet) {
      bullet = new SpaceShooter.PlayerBullet(this.game, this.player.x + 20, this.player.top);
      this.playerBullets.add(bullet)
    } else {
      //reset pos
      bullet.reset(this.player.x + 20, this.player.top);
    }
    //set velocity
    bullet.body.velocity.y = this.BULLET_SPEED;
  },

  initEnemies: function() {
    this.enemies = this.add.group();
    this.enemies.enableBody = true;
    this.enemyBullets = this.add.group();
    this.enemyBullets.enableBody = true;
  },

  damageEnemy: function(bullet, enemy) {
    enemy.damage(1);
    score += 1;
    bullet.kill();
  },

  killPlayer: function() {
    if (score > highScore || isNaN(highScore)) {
      localStorage.setItem('High Score', score);
    }
    this.player.kill();
    this.orchestra.stop();
    console.log(score);

    //params 1 & 2 tell Phaser whether or not to clear the game world and cache
    //anything after is passed to the states init function.

    this.game.state.start('GameOver', true, false, score);

  },

  createEnemy: function(x, y, health, key, scale, speedX, speedY) {
    var enemy = this.enemies.getFirstExists(false);
    if (!enemy) {
      enemy = new SpaceShooter.Enemy(this.game, x, y, key, health, this.enemyBullets);
      this.enemies.add(enemy);
    }
    enemy.reset(x, y, health, key, scale, speedX, speedY);
  },

  loadLevel: function() {
    this.currentEnemyIndex = 0;

    console.log(this.currentLevel);

    this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));
    //end of the level timer
    this.endOfLevelTimer = this.game.time.events.add(this.levelData.duration * 1000, function() {
      //stop music on new level
      this.orchestra.stop();
      if (this.currentLevel <= this.numLevels) {
        this.currentLevel++;
      } else {
        this.currentLevel = 1;
      }
      if (score > highScore || isNaN(highScore)) {
        localStorage.setItem('High Score', score);
      }
      levelScore = score;

      this.win();

      this.game.state.start('GameState', true, false, this.currentLevel);
    }, this);


    this.scheduleNextEnemy();

  },

  scheduleNextEnemy: function() {
    var nextEnemy = this.levelData.enemies[this.currentEnemyIndex];

    if (nextEnemy) {
      var nextTime = 1000 * (nextEnemy.time - (this.currentEnemyIndex == 0 ? 0 : this.levelData.enemies[this.currentEnemyIndex - 1].time));

      this.nextEnemyTimer = this.game.time.events.add(nextTime, function() {
        this.createEnemy(nextEnemy.x * this.game.world.width, -100, nextEnemy.health, nextEnemy.key, nextEnemy.scale, nextEnemy.speedX, nextEnemy.speedY);
        this.currentEnemyIndex++;
        this.scheduleNextEnemy();
      }, this);
    }
  }

};



// SpaceShooter.GameState = (function() {

//   function init(currentLevel) {
//     this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//     this.game.physics.startSystem(Phaser.Physics.ARCADE);
//     this.PLAYER_SPEED = 200;
//     this.BULLET_SPEED = -1000;
//
//     //levels
//     this.numLevels = 3;
//     this.currentLevel = currentLevel ? currentLevel : 1;
//   }
//
//   function preload() {
//     this.load.image('space', 'assets/images/space.png');
//     this.load.image('player', 'assets/images/player.png');
//     this.load.image('bullet', 'assets/images/bullet.png');
//     this.load.image('enemyParticle', 'assets/images/enemyParticle.png');
//     this.load.spritesheet('yellowEnemy', 'assets/images/yellow_enemy.png', 50, 46, 3, 1, 1);
//     this.load.spritesheet('redEnemy', 'assets/images/red_enemy.png', 50, 46, 3, 1, 1);
//     this.load.spritesheet('greenEnemy', 'assets/images/green_enemy.png', 50, 46, 3, 1, 1);
//
//     //load level data
//     this.load.text('level1', 'assets/data/level1.json')
//     this.load.text('level2', 'assets/data/level2.json')
//     this.load.text('level3', 'assets/data/level3.json')
//
//     //load sound
//     this.load.audio('orchestra', ['assets/audio/8bit-orchestra.mp3', 'assets/audio/8bit-orchestra.oog'])
//   }
//
//   function create() {
//     //background
//     this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space')
//     this.background.autoScroll(0, 30);
//
//     //player
//     this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 50, 'player');
//     this.game.physics.arcade.enable(this.player);
//     this.player.body.collideWorldBounds = true;
//
//     //create bullets
//     this.initBullets();
//     this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND / 5, this.createPlayerBullet, this);
//
//     //create enemy
//     this.initEnemies();
//
//     //load level
//     this.loadLevel();
//
//     //load sound
//     this.orchestra = this.add.audio('orchestra');
//     this.orchestra.play();
//
//   }
//
//   function update() {
//     this.game.physics.arcade.overlap(this.playerBullets, this.enemies, this.damageEnemy, null, this);
//     this.game.physics.arcade.overlap(this.enemyBullets, this.player, this.killPlayer, null, this);
//
//     //velocity is zero is nothing is pressed
//     this.player.body.velocity.x = 0;
//     //moves left or right depending on where the screen is touched
//     if (this.game.input.activePointer.isDown) {
//       var targetX = this.game.input.activePointer.position.x;
//
//       var direction = targetX >= this.game.world.centerX ? 1 : -1;
//
//       this.player.body.velocity.x = direction * this.PLAYER_SPEED;
//     }
//   }
//
//   function initBullets() {
//     this.playerBullets = this.add.group();
//     this.playerBullets.enableBody = true;
//   }
//
//   function createPlayerBullet() {
//     var bullet = this.playerBullets.getFirstExists(false);
//
//     if (!bullet) {
//       bullet = new SpaceShooter.PlayerBullet(this.game, this.player.x + 20, this.player.top);
//       this.playerBullets.add(bullet)
//     } else {
//       //reset pos
//       bullet.reset(this.player.x + 20, this.player.top);
//     }
//     //set velocity
//     bullet.body.velocity.y = this.BULLET_SPEED;
//   }
//
//
//   function initEnemies() {
//
//     this.enemies = this.add.group();
//     this.enemies.enableBody = true;
//
//     this.enemyBullets = this.add.group();
//     this.enemyBullets.enableBody = true;
//
//   }
//
//   function damageEnemy(bullet, enemy) {
//     enemy.damage(1);
//     bullet.kill();
//   }
//
//   function killPlayer() {
//     this.player.kill();
//     this.orchestra.stop();
//     this.game.state.start('GameState');
//   }
//
//   function createEnemy(x, y, health, key, scale, speedX, speedY) {
//     var enemy = this.enemies.getFirstExists(false);
//     if (!enemy) {
//       enemy = new SpaceShooter.Enemy(this.game, x, y, key, health, this.enemyBullets);
//       this.enemies.add(enemy);
//     }
//     enemy.reset(x, y, health, key, scale, speedX, speedY);
//   }
//
//
//   function loadLevel() {
//     this.currentEnemyIndex = 0;
//     this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));
//     console.log(JSON.parse(this.game.cache.getText('level1')));
//     //end of the level timer
//     this.endOfLevelTimer = this.game.time.events.add(this.levelData.duration * 1000, function() {
//       //stop music on new level
//       this.orchestra.stop();
//       if (this.currentLevel < this.numLevels) {
//         this.currentLevel++;
//       } else {
//         this.currentLevel = 1;
//       }
//       console.log(this.currentLevel);
//       this.game.state.start('GameState', true, false, this.currentLevel);
//       console.log('here');
//     }, this);
//     this.scheduleNextEnemy();
//   }
//
//   function scheduleNextEnemy() {
//     var nextEnemy = this.levelData.enemies[this.currentEnemyIndex];
//
//     if (nextEnemy) {
//       var nextTime = 1000 * (nextEnemy.time - (this.currentEnemyIndex == 0 ? 0 : this.levelData.enemies[this.currentEnemyIndex - 1].time));
//
//       this.nextEnemyTimer = this.game.time.events.add(nextTime, function() {
//         this.createEnemy(nextEnemy.x * this.game.world.width, -100, nextEnemy.health, nextEnemy.key, nextEnemy.scale, nextEnemy.speedX, nextEnemy.speedY);
//         this.currentEnemyIndex++;
//         this.scheduleNextEnemy();
//       }, this);
//     }
//   }
//
//   return ({
//     init: init,
//     preload: preload,
//     create: create,
//     update: update,
//     initBullets: initBullets,
//     createPlayerBullet: createPlayerBullet,
//     initEnemies: initEnemies,
//     damageEnemy: damageEnemy,
//     killPlayer: killPlayer,
//     createEnemy: createEnemy,
//     loadLevel: loadLevel,
//     scheduleNextEnemy: scheduleNextEnemy
//   });
// })()
