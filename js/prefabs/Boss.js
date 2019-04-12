var RPG = RPG || {};

RPG.bossType = {};

RPG.Boss = function(state,x,y,data) {
	Phaser.Sprite.call(this,state.game,x,y,data.name);

	this.state = state;
	this.game = state.game;
	this.data = data;
	this.anchor.setTo(0.5,0.75);
	this.collideWorldBounds = true;
	var that = this;
	this.states = [function(){that.move();},function(){that.recharge();},function(){that.strike();},function(){that.sweep();}];
	this.state = 'hover' //states are: hover, move, pause, hit, strike, sweep, blast, recharge, hit
	this.targetX = 0;
	this.targetY = 0;
	this.isHit = false;
	this.isMoving = false;
	this.isDead = false;
	this.isAttacking = false;
	this.startPos = [x,y];
	this.xBounds = [560,1200];
	this.targetDistance = 90;
	this.health = 32;
	this.moveChance = [0,0,0,1,1,1,1,3,3,2] // move, recharge, special
	this.shootRate = 1.6;
	this.data.attack = 2;
	this.nextMoveFired = false;
	this.invulnerable = true;


	this.shootingTimer = this.game.time.create(false);

	if (this.data.key === 'boss_klein') {
		this.animations.add('hover',[0,0,1,1],2,true);
		this.animations.add('attack',[2],12,true);
		this.animations.add('recharge',[3,4],2,true);
		this.hitSound = 'boss_hit';
	}

	this.game.physics.arcade.enable(this);
	this.enableBody = true;
	this.body.setSize(120,180,30,60);
	this.body.immovable = true;
	this.inputEnabled = true;
	this.input.useHandCursor = true;
	this.body.onCollide = new Phaser.Signal();
	this.events.onInputDown.add(this.playerAttack,this);

	//set up initital state
	//this.hover();
	this.hover();
}

RPG.Boss.prototype = Object.create(Phaser.Sprite.prototype);
RPG.Boss.prototype.constructor = RPG.Boss;

RPG.Boss.prototype.update = function() {
	if (this.state === 'hover') {
		this.nextMoveFired = false;
		console.log('s1');
		return;
	} else if (this.state === 'move') {
		this.invulnerable = true;
		console.log('s2');
		if (this.isMoving) {
			if (this.x >= this.targetX-5 && this.x <= this.targetX+5)  {
				this.shootRate = 1.2;
				this.shootingTimer.stop();
				this.body.velocity.x = 0;
				this.state = 'hover';
				this.isMoving = false;
				if (!this.nextMoveFired) {
					var that = this;
					setTimeout(function() {
						that.selectNextMove();
					},Rnd.integer(100,1500));
				}
				this.nextMoveFired = true;
			} //else {
			//	return;
			//}
		} //else {
		//	this.move();
		//}
	} else if (this.state === 'strike') {
		console.log('s3');
		//if (this.isMoving) {
			if (RPG.game.physics.arcade.distanceToXY(this,this.targetX,this.targetY) <= 80) {
				if (this.body.touching)
				this.body.velocity.setTo(0);
				this.state === 'hover';
				this.isMoving = false;
				var that = this;
				if (!this.nextMoveFired) {
					setTimeout(function() {
						that.reset();
					},400);
				}
				this.nextMoveFired = true;
			}
		// } else {
		// 	return;
		// }
	}
}


RPG.Boss.prototype.hover = function() {
	this.shootingTimer.stop();
	this.state = 'hover';
	this.isMoving = false;
	this.animations.play('hover');
}

RPG.Boss.prototype.selectNextMove = function() {
	if (!this.isDead) {
		//this.nextMovedFired = false;
		var num = this.moveChance[Rnd.integer(10)];
		console.log(num);
		return this.states[num]();
	}
}

RPG.Boss.prototype.move = function() {
	if (!this.isDead) {
		clearInterval(this.hoverLoop);
		this.state = 'move';
		this.isMoving = true;
		this.targetX = Math.floor(Rnd(this.xBounds[0],this.xBounds[1]));
		var direction = this.x>this.targetX?-1:1;
		this.body.velocity.x = 120*direction;
		var that = this;
		if (!this.isDead) {
			setTimeout(function() {
				that.engageShooting();
			},1200);
		}
	}
}

RPG.Boss.prototype.recharge = function() {
	if (!this.isDead) {
		this.invulnerable = false;
		this.shootingTimer.stop();
		this.state = 'hover';
		this.animations.play('recharge');
		var that = this;
		var rechargeSoundLoop = setInterval(function() {
			RPG.game.sound.play('recharge');
		},500)
		setTimeout(function() {
			clearInterval(rechargeSoundLoop);
			that.move();
		},Rnd.integer(2000,4000));
	}
}

RPG.Boss.prototype.strike = function() {
	if (!this.isDead) {
		this.state = 'strike';
		this.shootingTimer.stop();
		console.log('striking');
		this.frame = 2;
		this.isMoving = true;
		this.targetX = Player.x;
		this.targetY = Player.y;
		RPG.game.physics.arcade.moveToXY(this,this.targetX,this.targetY,400);
	}
}

RPG.Boss.prototype.sweep = function() {
	if (!this.isDead) {
		this.state = 'hover';
		this.shootingTimer.stop();
		var tween = t.add.tween(this).to({x:this.xBounds[0],y:this.startPos[1]},800,null).start();
		tween.onComplete.add(function() {
			var that = this;
			setTimeout(function() {
				that.targetX = that.xBounds[1];
				that.targetY = that.y;
				that.state = 'move';
				that.isMoving = true;
				that.shootRate = 0.8;
				that.engageShooting();
				RPG.game.physics.arcade.moveToXY(that,that.targetX,that.targetY,200);
			},600);
		},this);
	}

}

RPG.Boss.prototype.engageShooting = function() {
	if (!this.isDead) {
		this.isAttacking = true;
		this.animations.play('attack');
		this.shootingTimer.start();
		this.scheduleShooting();
	}
}

RPG.Boss.prototype.scheduleShooting = function() {
	this.createEnemyProjectile();
	this.shootingTimer.add(Phaser.Timer.SECOND*this.shootRate,this.scheduleShooting,this);
}

RPG.Boss.prototype.createEnemyProjectile = function() {
	if (!this.isDead) {
		var projectile = RPG.GameState.enemyProjectiles.getFirstExists(false);
		 if (!projectile) {
		 	var projectile = new RPG.Projectile(RPG.GameState,this.x,this.y,"boss_klein_blast");
			RPG.GameState.enemyProjectiles.add(projectile);
		} else {
		 	projectile.reset(this.centerX,this.centerY+30);
		 	projectile.animations.play('fire');
		 	projectile.harmful = true;
		 	projectile.setCrystal();
		 }
		projectile.origin = this;
		RPG.game.sound.play('ice_blast');
		var Xoffset = Rnd.sign() + Rnd.integer(0,41);
		var Yoffset = Rnd.sign() + Rnd.integer(0,21);
		RPG.game.physics.arcade.moveToXY(projectile,Player.x+Xoffset,Player.y+Yoffset,projectile.data.speed);
	}
}

RPG.Boss.prototype.reset = function() {
	this.state = 'hover';
	var tween = t.add.tween(this).to({x:this.startPos[0],y:this.startPos[1]},800,null).start();
	tween.onComplete.add(function() {
		var that = this;
		setTimeout(function() {
			that.move();
		},1000);
	},this);
}

RPG.Boss.prototype.playerAttack = function() {
	RPG.GameState.faceDirection(Player,this.x,this.y);
	Player.attackTarget = this;
}

RPG.Boss.prototype.defeated = function() {
	this.data.dialogueIndex = 1;
	this.animations.play('hover');
	this.shootingTimer.stop();
	RPG.GameState.enemyProjectiles.destroy();
	Player.speed = 150;
	RPG.GameState.music.stop();
	RPG.GameState.dialogueUp = true;
	this.state = 'hover';
	RPG.game.sound.play('boss_death');
	var tween = t.add.tween(this).to({x:this.startPos[0],y:this.startPos[1]},800,null).start();
	tween.onComplete.add(function() {
		RPG.GameState.initDialogue(this.data,false,true);
	},this);

}



// Repeat of Enemy code. Required for projectile strike angle calculation
RPG.Boss.prototype.faceDirection = function(x,y,makeReturn) {
	var targX = x;
	var targY = y;

	var targetAngle = RPG.game.physics.arcade.angleToXY(this,targX,targY);
	this.scale.setTo(1);

	if (targetAngle > -0.785 && targetAngle < 0.785) {
		if (makeReturn) {
			return 'left';
		} else {
			if (this.data.isShooter) {
				this.animations.play('swingSide');
			} else {
				this.animations.play('walkLft');
			}
		}
	} else if (targetAngle > 0.785 && targetAngle < 2.356) {
		if (makeReturn) {
			return 'top';
		} else {
			if (this.data.isShooter) {
				this.animations.play('swingFwd');
			} else {
				this.animations.play('walkFwd');
			}
		}
	} else if (targetAngle > 2.356 || targetAngle < -2.356) {
		if (makeReturn) {
			return 'right';
		} else {
			if (this.data.isShooter) {
				this.animations.play('swingSide');
				this.scale.setTo(-1,1);
			} else {
				this.animations.play('walkRgt');
			}
			//this.scale.setTo(-1,1);
		}
	} else if (targetAngle < -0.785 && targetAngle > -2.356) {
		if (makeReturn) {
			return 'bottom';
		} else {
			if (this.data.isShooter) {
				this.animations.play('swingBwd');
			} else {
				this.animations.play('walkBwd');
			}
		}
	}
}