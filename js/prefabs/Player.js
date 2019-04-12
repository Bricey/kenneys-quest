var RPG=RPG||{};RPG.Player=function(t,a,i,e){Phaser.Sprite.call(this,t.game,a,i,"player"),this.state=t,this.game=t.game,this.data=e,this.anchor.setTo(.5),this.collideWorldBounds=!0,this.isHit=!1,this.isAttacking=!1,this.targX=0,this.targY=0,this.attackTarget={},this.canAttack=!0,this.attackDirection="",this.attackActive=!1,this.newItems=0,this.newQuests=0,this.speed=150,this.healthAlert=RPG.GameState.game.add.audio("low_hp",.5,!0),this.engageDialogue=!1;var s=10;this.animations.add("walkSide",[3,4,3,5],s,!0),this.animations.add("walkFwd",[0,1,0,2],s,!0),this.animations.add("walkBwd",[6,7,6,8],s,!0),this.animations.add("battleRgt",[17,18,17,19],s,!0),this.animations.add("battleLft",[20,21,20,22],s,!0),this.animations.add("battleFwd",[11,12,11,13],s,!0),this.animations.add("battleBwd",[23,24,23,25],s,!0),this.animations.add("attackRgt",[29,30,31],24,!1),this.animations.add("attackLft",[32,33,34],24,!1),this.animations.add("attackFwd",[14,15,16],24,!1),this.animations.add("attackBwd",[26,27,28],24,!1),this.animations.add("success",[9],s,!1),this.animations.add("celebrate",[9,9,0],4,!0),this.animations.add("death",[11,17,23,20],8,!0);var o=40;if(RPG.GameState.levelType){o=60,RPG.GameState.supportMonitor={pcLogos:[],wrLogos:[]};for(var r=0;r<this.data.maxSupport;r++){var h=this.game.add.sprite(o,40,"partyLogos"),d=this.game.add.sprite(o,94,"partyLogos");h.animations.add("flash",[0,2,0,2,0,2,0],3,!1),d.animations.add("flash",[1,3,1,3,1,3,1],3,!1),d.frame=1,h.fixedToCamera=!0,d.fixedToCamera=!0,d.anchor.setTo(.5),d.scale.setTo(.8),h.anchor.setTo(.5),h.scale.setTo(.8),RPG.GameState.supportMonitor.pcLogos.push(h),RPG.GameState.supportMonitor.wrLogos.push(d),o+=80}}else{RPG.GameState.healthMonitor=[];for(var r=0;r<5;r++){var n=this.game.add.sprite(o,40,"hearts");n.anchor.setTo(.5),n.fixedToCamera=!0,RPG.GameState.healthMonitor.push(n),o+=40}}RPG.GameState.camera.follow(this),this.game.physics.arcade.enable(this),this.body.collideWorldBounds=!0},RPG.Player.prototype=Object.create(Phaser.Sprite.prototype),RPG.Player.prototype.constructor=RPG.Player,RPG.Player.prototype.checkForItem=function(t){for(var a=0;a<this.data.items.length;a++)if(this.data.items[a]==t)return!0;return!1};