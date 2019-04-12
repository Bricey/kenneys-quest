	var RPG = RPG || {};

var t = RPG.GameState;
var lt;

RPG.npcFunctions = {
	tween: '',
	boss:{},
	targTalks : function(targ) {
		targ.animations.stop();
		t.initDialogue(targ.data,true,false);
	},
	intro : function() {
		t.dialogueUp = true;
		Player.body.collideWorldBounds = false;
		Player.y = -60;
		this.introBrian = new RPG.NPC(t,t.world.centerX+150,450,{ 'character' : 'Brian Jean','key' : 'npc', 'name' : 'npc_brian_jean', 'type' : 'npc','dialogueIndex':0, 'static':true });
		this.introRick = new RPG.NPC(t,t.world.centerX-160,380,{ 'character' : 'Rick McIver','key' : 'npc', 'name' : 'npc_rick_mciver', 'type' : 'npc', 'dialogueIndex' : 0,'static':true });
		//this.introBrian.static = true;
		//this.introRick.static = true;
		t.npcs.add(this.introBrian);
		t.npcs.add(this.introRick);
		Player.animations.play('walkFwd');
		this.tween = t.add.tween(Player).to({y: 360},4000,null,true);
		this.tween.onComplete.add(function() {
			Player.frame = 0;
			this.targTalks(Player);
		},this);
	},
	intro_rick_01 : function() {
		t.dialogueUp = true;
		this.introRick.animations.play('walkSide');
		this.tween = t.add.tween(this.introRick).to({x:t.world.centerX-80},1500,null).start();
		this.tween.onComplete.add(function() {
			this.targTalks(this.introRick);
		},this);
	},
	intro_brian_01 : function() {
		t.dialogueUp = true;
		this.introBrian.scale.setTo(-1,1);
		this.introBrian.animations.play('walkSide');
		this.tween = t.add.tween(this.introBrian).to({x:t.world.centerX + 100,y:380},1500,null).start();
		this.tween.onComplete.add(function() {
			this.targTalks(this.introBrian);
		},this);
	},
	intro_kenney_02 : function() {
		t.dialogueUp = true;
		t.initDialogue(Player.data,true,false);
	},
	intro_rick_02 : function() {
		t.dialogueUp = true;
		t.initDialogue(this.introRick.data,true,false);
	},
	intro_kenney_03 : function() {
		t.dialogueUp = true;
		t.initDialogue(Player.data,true,false);
	},
	intro_rick_03 : function() {
		t.dialogueUp = true;
		t.initDialogue(this.introRick.data,true,false);
	},
	intro_brian_02 : function() {
		t.dialogueUp = true;
		this.introRick.scale.setTo(-1,1);
		this.introRick.animations.play('walkFwd');
		this.tween = t.add.tween(this.introRick).to({y: t.game.camera.y + t.game.height + 60},2800,null).start();
		this.tween.onComplete.add(function() {
			this.introRick.destroy();
			this.targTalks(this.introBrian);
		},this);
	},
	intro_kenney_04 : function() {
		t.dialogueUp = true;
		t.initDialogue(Player.data,true,false);
	},
	intro_brian_03 : function() {
		t.dialogueUp = true;
		t.initDialogue(this.introBrian.data,true,false);
	},
	intro_kenney_05 : function() {
		t.dialogueUp = true;
		this.introBrian.scale.setTo(1);
		this.introBrian.animations.play('walkFwd');
		this.tween = t.add.tween(this.introBrian).to({y: t.game.camera.y + t.game.height + 60},3000,null).start();
		this.tween.onComplete.add(function() {
			this.introBrian.destroy();
			t.initDialogue(Player.data,true,false);
		},this);
	},
	carl_01 : function() { // EXAMPLE ITEM ACQUISITION AND SUPPORT WIN FUNCTION
		t.showSupport(2,3);
		RPG.game.sound.play('music_success');
		t.acquire([['item','healthPotion'],['quest','q_pc_a']]);
	},
	destroy_crates : function() {
		t.initDialogue({ 'character':'Detonator','dialogueIndex':0,'key':'npc','name':'door','type':'npc' },false,true);
	},
	boss_klein_door : function() {
		if (Player.checkForItem('iron_key')) {
			var targItem = Player.data.items.indexOf('iron_key');
			Player.data.items.splice(targItem,1);
			t.game.sound.play('key');
			var index = t.retrieveJSONIndex('klein_boss_door');
			t.removeJSONEnemy(index); // remove door open trigger
			t.removeTiles([480,481,482,483],1,true);
		} else {
			Player.body.velocity.setTo(0);
			t.initDialogue(['This door requires a key.']);
		}
	},
	boss_klein : function() {
		console.log(RPG.GameState.continue);
		if (!t.continue) {t.removeJSONEnemy(2);};  //remove trigger switch
		if (t.continue && !RPG.instrBools.boss) { t.callInstruction('boss'); }
		console.log('BOSS TRIGGERED');
		Player.canAttack = false;
		Player.body.velocity.setTo(0);
		Player.frame = 23;
		Player.animations.play('battleBwd');
		t.camera.follow(null);
		t.dialogueUp = true;
		this.tween = t.add.tween(t.camera).to({x:t.world.width/4.2,y:t.world.height/2.5},2000,null).start();
		this.tween.onComplete.add(function() {
			this.tween = t.add.tween(Player).to({x:t.world.width/2,y:890},1800,null).start();
			this.tween.onComplete.add(function() {
				Player.frame = 23;
				Player.animations.stop();
				t.initDialogue(t.enemies.children[0].data,false,true);
			},this);
		},this);
	},
	boss_klein_end : function() {
		var that = this;
		t.dialogueUp = true;
		setTimeout(function() {
			t.initDialogue({'character':'Peter Lougheed','dialogueIndex':2,'name':'npc_peter_lougheed','portrait':true},true,false);
		},1500);
	},
	final_boss : function() {

		if (!t.continue) {
			///t.removeJSONEnemy(0);
			RPG.final_boss_continue = JSON.stringify(RPG.game.cache.getTilemapData('final_boss').data);

		}; //remove trigger switch
		t.inventoryBtn.destroy();
		Player.canAttack = false;
		Player.body.velocity.setTo(0);
		Player.frame = 23;
		Player.animations.play('battleBwd');
		t.camera.follow(null);
		t.dialogueUp = true;
		this.tween = t.add.tween(t.camera).to({x:t.world.width/4.2,y:t.world.height/2.8},1600,null).start();
		this.tween.onComplete.add(function() {
			this.tween = t.add.tween(Player).to({x:t.world.width/2,y:830},1400,null).start();
			this.tween.onComplete.add(function() {
				Player.frame = 23;
				Player.animations.stop();
				var index=2;
				for (var i=0;t.npcs.children.length>i;i++) {
					if (t.npcs.children[i].key === 'npc_richard_starke') {
						index = i;
					}
				}
				t.initDialogue(t.npcs.children[index].data,true,true); //target Richard Starke. May change
			},this);
		},this);
	},
	final_boss_begin: function() {
		RPG.eventQueue = [function() {RPG.npcFunctions.set_final_boss()}];
		RPG.GameState.removeJSONEnemy(8);
		RPG.GameState.removeJSONEnemy(7); //Remove Rick McIver NPC
		RPG.GameState.removeJSONEnemy(6);
		RPG.GameState.removeJSONEnemy(5);
		RPG.GameState.removeJSONEnemy(4);
		RPG.GameState.removeJSONEnemy(3);
		RPG.GameState.removeJSONEnemy(2);
		RPG.GameState.removeJSONEnemy(1);
		RPG.GameState.removeJSONEnemy(0);
		RPG.GameState.removeTiles([178,179,180,181,182,183,184,185,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,186,187,188,189,190,191,192,193,210,211,212,213,214,215,216,217],1,true);
	},
	set_final_boss: function() {
		t.dialogueUp = true;
		t.inventoryBtn.destroy();
		this.bg = t.add.graphics(0,0);
		this.bg.beginFill(0xffd730);
		this.bg.drawRect(0,0,t.game.width,t.game.height);
		this.bg.fixedToCamera = true;
		var that = this;
		var candidateGroup = t.add.group();
		var truckArr = ['blue','orange','green','yellow','black'];
		var truckStr = 'truck_';
		var truckI = 0;
		this.truck = t.game.add.sprite(t.game.width+600,t.game.world.centerY+120,truckStr+truckArr[truckI]);
		this.truck.anchor.setTo(0.5);
		//this.truck.y = t.game.world.centerY;
		callTruck();

			function callTruck() {
				console.log('TRUCK FIRED!');
				if (truckI < 3) {
					if (truckI%2===0) {
						that.truck.x = -600;
						that.truck.scale.setTo(-1,1);
					} else {
						that.truck.x = t.game.width+600;
						that.truck.scale.setTo(1);
					}
					that.truck.loadTexture(truckStr+truckArr[truckI]);
					that.truck.alpha = 1;
					t.game.sound.play('sfx_engine',0.6);
					that.tween = t.add.tween(that.truck).to({x:t.game.world.centerX},300,"Quad.easeOut").start();
					console.log(that.truck);
					that.tween.onComplete.add(function() {
						var then = that;
						setTimeout(function() {
							then.tween = t.add.tween(then.truck).to({alpha:0},300,null).start();
							then.tween.onComplete.add(function() {
								truckI++;
								callTruck();
							},then);
						},400);
					},that);
				} else {
					assemble();
				}
			}

		function assemble() {
			var light = t.add.image(t.game.world.centerX,t.game.world.centerY+120,'giga_light');
			light.anchor.setTo(0.5);
			light.alpha = 0;
			var nelson = t.add.sprite(t.camera.x+t.camera.width+300,t.camera.y,'p_npc_byron_nelson');
			//var glans = t.add.sprite(t.camera.x+t.camera.width+300,t.camera.y+t.camera.height/1.4,'p_npc_donna_glans');
			var starke = t.add.sprite(t.camera.x,t.camera.y,'p_npc_richard_starke');
			//var nelson = t.add.sprite(t.camera.x+t.camera.width+300,t.camera.y,'p_npc_byron_nelson');
			var khan = t.add.sprite(t.camera.x+t.camera.width/2,t.camera.y+t.camera.height+300,'p_npc_stephen_khan');
			//console.log(glans);
			khan.anchor.setTo(0.5,1);
			nelson.anchor.setTo(1,0);
			starke.anchor.setTo(0,0);
			//jansen.anchor.setTo(1,0);
			//glans.anchor.setTo(1,1);
			//jansen.scale.setTo(0.8);
			//glans.scale.setTo(0.8);
			khan.scale.setTo(0.9);
			starke.scale.setTo(-0.9,0.9);
			nelson.scale.setTo(0.9);
			candidateGroup.add(light);
			//candidateGroup.add(jansen);
			//candidateGroup.add(glans);
			candidateGroup.add(starke);
			candidateGroup.add(nelson);
			candidateGroup.add(khan);
			t.add.tween(light).to({alpha:0.9},4000,null).start();
			this.tween = t.add.tween(nelson).to({x:t.camera.x+t.camera.width},600,"Quad.easeOut").start();
			//t.add.tween(glans).to({x:t.camera.x+t.camera.width},600,"Quad.easeOut").start();
			t.add.tween(starke).to({x:t.camera.x+230},600,"Quad.easeOut").start();
			t.add.tween(khan).to({y:t.camera.y+t.camera.height/1.4},600,"Quad.easeOut").start();
			//this.tween = t.add.tween(nelson).to({x:t.camera.x+t.camera.width},600,"Quad.easeOut").start();
			t.initDialogue({'character':'All','dialogueIndex':0},false,false,null,3200);
			this.tween.onComplete.add(function() {
				var that = this;
				setTimeout(function() {
					t.camera.fade(0xffffff,1000);
					t.camera.onFadeComplete.add(goGiga,that);
					t.dialogueUp = true;
				},3000);
			},this)

			function goGiga() {
				console.log('goGiga fired!');
			if (!this.boss_defeated) {
				console.log('goGiga 2 fired!');
					that.bg.destroy();
					candidateGroup.destroy();
				//},that);
				// create shadow
				shadow = t.game.add.sprite(t.world.centerX,740,'shadow');
				shadow.anchor.setTo(0.5,0.2);
				t.enemies.add(shadow);
				console.log('goGiga 3 fired!');
				RPG.npcFunctions.boss = new RPG.Final_boss(t,t.world.centerX,740,{ 'character' : 'Giga Candidate','key' : 'final_boss', 'name' : 'giga_candidate', 'type' : 'boss','dialogueIndex':0, 'static':true, "hasDialogue":true, "isShooter":true });
				//t.add.existing(RPG.npcFunctions.boss)
				t.enemies.add(RPG.npcFunctions.boss);
				t.camera.follow(null);
				t.camera.x = t.world.width/4.2;
				t.camera.y = t.world.height/2.8;
				t.camera.flash(0xffffff,1000);
				t.camera.onFadeComplete.removeAll();
				t.initDialogue(RPG.npcFunctions.boss.data,false,true);
				Player.speed = 170;
				}
			}
			//that.tween = t.add.tween(that.bg).to({alpha:0},1000,null).start();
			//that.tween.onComplete.add(function() {
		}

	},
	// goGiga_continue: function() {
	// 			shadow = t.game.add.sprite(t.world.centerX,740,'shadow');
	// 			shadow.anchor.setTo(0.5,0.2);
	// 			t.enemies.add(shadow);
	// 			RPG.npcFunctions.boss = new RPG.Final_boss(t,t.world.centerX,740,{ 'character' : 'Giga Candidate','key' : 'final_boss', 'name' : 'giga_candidate', 'type' : 'boss','dialogueIndex':0, 'static':true, "hasDialogue":true, "isShooter":true });
	// 			t.enemies.add(RPG.npcFunctions.boss);
	// 			t.camera.follow(null);
	// 			t.camera.x = t.world.width/4.2;
	// 			t.camera.y = t.world.height/2.8;
	// 			t.camera.flash(0xffffff,1000);
	// 			t.camera.onFadeComplete.removeAll();
	// 			t.initDialogue(RPG.npcFunctions.boss.data,false,true);
	// 			Player.speed = 170;
				
	// },
	final_boss_defeat: function() {
				var that = this;
				this.boss_defeated = true;
				RPG.GameState.dialogueUp = true;
				Player.frame = 23;
				if (Player.healthAlert.isPlaying) {
					Player.healthAlert.stop();
				}
				//this.introBrian = new RPG.NPC(t,this.boss.x,this.boss.y,{ 'character' : 'Sandra Jansen','key' : 'npc', 'name' : 'npc_sandra_jansen', 'type' : 'npc', 'dialogueIndex' : 5,'static':true });
				//var endGlans = new RPG.NPC(t,this.boss.x,this.boss.y,{ 'character' : 'Donna Glans','key' : 'npc', 'name' : 'npc_donna_glans', 'type' : 'npc', 'dialogueIndex' : 5,'static':true });
				var endNelson = new RPG.NPC(t,this.boss.x,this.boss.y,{ 'character' : 'Nelson','key' : 'npc', 'name' : 'npc_byron_nelson', 'type' : 'npc', 'dialogueIndex' : 5,'static':true });
				var endStarke = new RPG.NPC(t,this.boss.x,this.boss.y,{ 'character' : 'Nelson','key' : 'npc', 'name' : 'npc_richard_starke', 'type' : 'npc', 'dialogueIndex' : 5,'static':true });
				var endKhan = new RPG.NPC(t,this.boss.x,this.boss.y,{ 'character' : 'Khan','key' : 'npc', 'name' : 'npc_stephen_khan', 'type' : 'npc', 'dialogueIndex' : 1,'static':true });
				//t.npcs.add(this.introBrian);
				//t.npcs.add(endGlans);
				t.npcs.add(endNelson);
				t.npcs.add(endStarke);
				t.npcs.add(endKhan);
				RPG.game.world.bringToTop(t.npcs);
				//t.add.tween(this.introBrian).to({y: 1600},3000,null).start();
				//t.add.tween(endGlans).to({x: t.game.world.centerX-300,y: 1600},3000,null,false,500).start();
				t.add.tween(endNelson).to({x: t.game.world.centerX+220,y: 1600},3000,null,false,200).start();
				t.add.tween(endStarke).to({x: t.game.world.centerX-110,y: 1600},3000,null,false,250).start();
				t.add.tween(endKhan).to({x: t.game.world.centerX-130,y: 1600},3000,null,false,600).start();
				//this.introBrian.animations.play('wlkFwd');
				setTimeout(function() {
					t.npcs.children = [];
					RPG.game.sound.play('rumbling');
					t.camera.fade(0xffffff,2000);
					t.camera.onFadeComplete.add(function() {
						clearInterval(RPG.npcFunctions.boss.explosionInterval);
						RPG.npcFunctions.boss.rechargeAudio.stop();
						RPG.npcFunctions.boss.destroy();
						var crater = t.game.add.sprite(this.boss.x,this.boss.y,'crater');
						crater.anchor.setTo(0.5);
						crater.scale.setTo(1.25);
						t.npcs.add(crater);
						RPG.game.world.bringToTop(Player);
						shadow.destroy();
						t.camera.flash(0xffffff,3000);
						setTimeout(function() {
							Player.animations.play('celebrate');
							t.music.stop();
							t.music = t.game.add.audio('music_mainTheme',0.6,true).play();
							t.initDialogue({'character':'Jason Kenney','dialogueIndex':5},false,false);
						},3400);

					},that);
				},2400);
	},
	q_wr_a_harper: function() {
		t.droppedItems.destroy();
		t.dialogueUp = true;
		Player.body.velocity.setTo(0);
		Player.animations.stop();
		Player.animations.play('wlkFwd');
		t.add.tween(Player).to({x:t.world.centerX, y:t.game.height/2},1800).start();
		RPG.GameState.enemies.destroy();
		t.camera.follow(null);
		this.tween = t.add.tween(t.camera).to({x:RPG.game.world.centerX-(t.game.width/2),y:0},1800).start();
		this.tween.onComplete.add(function() {
				Player.animations.stop();
				Player.frame = 23;
				t.game.sound.play('ascension',0.5);
				var harperLight = t.game.add.sprite(t.world.centerX,0,'light');
				harperLight.anchor.setTo(0.5,0);
				harperLight.scale.setTo(0,0.2);
				harperLight.alpha = 0;
				t.game.world.bringToTop(Player);
				var harperSprite = t.game.add.sprite(t.world.centerX,0,'npc_stephen_harper');
				harperSprite.anchor.setTo(0.5);
				harperSprite.frame = 1;
				t.npcs.add(harperSprite);
				t.game.add.tween(harperLight.scale).to({x:1,y:0.65},2400,"Quad.easeOut").start();
				this.tween = t.game.add.tween(harperLight).to({alpha:0.65},2400,"Quad.easeOut").start();
				this.harperDescends = t.game.add.tween(harperSprite).to({y:t.game.height/3},4000,"Quad.easeOut").start();
				this.harperDescends.onComplete.add(function() {
					harperSprite.frame = 0;
					t.initDialogue({'character' : 'Stephen Harper','key' : 'npc', 'name' : 'npc_stephen_harper', 'type' : 'npc', 'dialogueIndex' : 0,'static':true},true,true);
				},this);
		},this);
	},
	harperDown: function() {

	},
	end_harper_ascends: function() {
		t.game.sound.play('ascension',0.5);
		var harperLight = t.game.add.sprite(t.world.centerX,t.camera.y,'light');
		harperLight.anchor.setTo(0.5,0);
		harperLight.scale.setTo(0,0.2);
		harperLight.alpha = 0;
		t.npcs.add(harperLight);
		t.game.world.bringToTop(Player);
		var harperSprite = t.game.add.sprite(t.world.centerX,t.camera.y-60,'npc_stephen_harper');
		harperSprite.anchor.setTo(0.5);
		harperSprite.frame = 1;
		t.npcs.add(harperSprite);
		t.game.add.tween(harperLight.scale).to({x:1,y:0.65},2400,"Quad.easeOut").start();
		this.tween = t.game.add.tween(harperLight).to({alpha:0.65},2400,"Quad.easeOut").start();
		this.harperDescends = t.game.add.tween(harperSprite).to({y:t.camera.y +t.game.height/3},4000,"Quad.easeOut").start();
		this.harperDescends.onComplete.add(function() {
			harperSprite.frame = 0;
			t.initDialogue({'character' : 'Stephen Harper','key' : 'npc', 'name' : 'npc_stephen_harper', 'type' : 'npc', 'dialogueIndex' : 1,'static':true},true,true);
		},this);
	},
	end_rick_mciver: function() {
		var endRick = new RPG.NPC(t,t.game.world.centerX-180,t.camera.y-30,{ 'character' : 'Rick McIver','key' : 'npc', 'name' : 'npc_rick_mciver', 'type' : 'npc', 'dialogueIndex' : 10,'static':true });
		t.npcs.add(endRick);
		endRick.animations.play('walkFwd');
		this.tween = t.game.add.tween(endRick).to({y:t.camera.y+t.game.height/3.2},2000).start();
		this.tween.onComplete.add(function() {
			endRick.animations.stop();
			t.initDialogue(endRick.data,true,false);
		},this);
	},
	end_brian_jean: function() {
		var endBrian = new RPG.NPC(t,t.game.world.centerX+180,t.camera.y-30,{ 'character' : 'Brian Jean','key' : 'npc', 'name' : 'npc_brian_jean', 'type' : 'npc', 'dialogueIndex' : 3,'static':true });
		endBrian.animations.play('walkFwd');
		t.npcs.add(endBrian);
		this.tween = t.game.add.tween(endBrian).to({y:t.camera.y+t.game.height/3.2},2000).start();
		this.tween.onComplete.add(function() {
			endBrian.animations.stop();
			t.initDialogue(endBrian.data,true,false);
		},this);
	},
	end_kenney_dialogue_a: function() {
		var targSprite = t.npcs.children.length-1;
		this.tween = t.game.add.tween(t.npcs.children[targSprite]).to({y:t.camera.y-30},2000).start();
		t.npcs.children[targSprite].animations.play('walkBwd');
		this.tween.onComplete.add(function() {
			t.npcs.children[targSprite].destroy();
		},this);
		Player.data.dialogueIndex = 6;
		t.initDialogue(Player.data,true,false);
	},
	end_other_characters: function() {
		var quests = Player.data.quests;
		this.endQueue = []; //object-wide accessible array to hold list of final characters to come out and speak with Jason
		this.endQueueIndex = 0;

		quests.forEach(function(targ) { // search completed quests and add Redford and Bovina to queue if true
			if (targ[1] === 'q_wr_b' && targ[2]===1) {
				this.endQueue.push(function(){ RPG.npcFunctions.end_bovina(); });
			}
			if (targ[1] === 'q_wr_a' && targ[2]===1) {
				this.endQueue.push(function(){ RPG.npcFunctions.end_redford(); });
			}
			if (targ[1] === 'q_pcwr_b' && targ[2]===1) {
				this.endQueue.push(function(){ RPG.npcFunctions.end_nenshi(); });
			}
		},this);
		//if (RPG.continueData.fbData.trudeau===1) this.endQueue.push(function(){ RPG.npcFunctions.end_trudeau(); });
		this.endQueue.push(function(){ RPG.npcFunctions.end_notley(); })
		if (this.endQueue.length>0) {
		this.endQueue[this.endQueueIndex]();
	} else {
		this.finale_begin();
	}

	},
	end_notley: function() {
		t.dialogueUp = true;
		t.game.sound.play('roar')
			var notley = t.add.sprite(t.game.world.centerX,t.camera.y-210,'notley_dragon');
			notley.anchor.setTo(0.5,0);
			t.npcs.add(notley);
			var tween = t.add.tween(notley).to({y:t.camera.y},3000,"Quad.easeOut",true,500);
			tween.onComplete.add(function() {
				t.initDialogue({'character':'Rachel Notley','dialogueIndex':0,'name':'npc_rachel_notley'},true,true);
			},this);
	},
	end_nenshi: function() {
		t.dialogueUp = true;
		var nenshi = t.add.sprite(t.game.world.centerX+260,t.camera.y-60,'npc_naheed_nenshi');
		//nenshi.animations.play('walkFwd');
		t.npcs.add(nenshi);
		nenshi.anchor.setTo(0.5);
		var tween = t.add.tween(nenshi).to({y:t.camera.y+t.game.height/4.5},1800).start();
		tween.onComplete.add(function() {
			nenshi.animations.stop();
			nenshi.frame = 0;
			t.initDialogue({'character':'Naheed Nenshi','name':'npc_naheed_nenshi','dialogueIndex':25,'portrait':true},true,false);
		},this);
	},
	end_redford: function() {
		t.dialogueUp = true;
		var redford = t.add.sprite(t.game.world.centerX-360,t.camera.y-60,'npc_alison_redford');
		redford.animations.play('walkFwd');
		t.npcs.add(redford);
		redford.anchor.setTo(0.5);
		var tween = t.add.tween(redford).to({y:t.camera.y+t.game.height/4.5},1800).start();
		tween.onComplete.add(function() {
			redford.animations.stop();
			redford.frame = 0;
			t.initDialogue({'character':'Alison Redford','name':'npc_alison_redford','dialogueIndex':9,'portrait':true},true,false);
		},this);
	},
	end_bovina: function() {
		t.dialogueUp = true;
		var bovina = new RPG.NPC(RPG.GameState,t.game.world.centerX+150,t.camera.y-60,{'character':'Empress Bovina','name':'npc_bovina','dialogueIndex':29,'portrait':true,"static":true});
		bovina.animations.play('walkFwd');
		t.npcs.add(bovina);
		bovina.anchor.setTo(0.5,0.5);
		var tween = t.add.tween(bovina).to({y:t.camera.y+t.game.height/4.5},1800).start();
		tween.onComplete.add(function() {
			bovina.animations.stop();
			bovina.frame = 0;
			t.initDialogue(bovina.data,true,false);
		},this);
	},
	end_trudeau: function() {
		t.dialogueUp = true;
		var trudeau = new RPG.NPC(RPG.GameState,t.camera.x-60,t.camera.y+t.game.height/1.6,{'character':'Justin Trudeau','name':'npc_cow','dialogueIndex':11,'portrait':true,"static":true});
		trudeau.animations.add('walk',[0,5],6,true);
		trudeau.animation.play('walk');
		t.npcs.add(trudeau);
		trudeau.anchor.setTo(0.5);
		var tween = t.add.tween(trudeau).to({x:t.camera.x+t.game.width/5},1200).start();
		tween.onComplete(function() {
			trudeau.animations.stop();
			trudeau.frame = 1;
			t.game.sound.play('sword_shine');
			setTimeout(function() {
				t.initDialogue(bovina.data,true,false);
			},1600)
		},this);
	},
	end_scenes: function() {
		this.endQueueIndex++;
		console.log(this.endQueue.length);
		console.log(this.endQueueIndex);
		if (this.endQueueIndex>=this.endQueue.length) {
			this.finale_begin();
		} else {
			this.endQueue[this.endQueueIndex]();
		}
	},
	tent_pc_scene: function() {
		if (!t.checkQuest('q_pc_final')) {
			RPG.GameState.removeJSONEnemy(9);
			t.updateJSONWaypoint('s_pc_01','camp',null,true);
			t.dialogueUp = true;
			//t.camera.follow(null);
			t.add.tween(Player).to({x:t.game.world.centerX},200).start();
			Player.frame = 23;
			this.tween = t.add.tween(t.camera).to({x:t.game.world.centerX-(t.game.width/2),y:t.game.world.centerY-(t.game.height/1.6)},1200).start();
			this.tween.onComplete.add(function() {
				t.initDialogue(t.npcs.children[1].data,true,true);
			},this);
		}
	},
	q_pcwr_a_init: function() {
		Player.body.velocity.setTo(0);
		Player.frame = 6;
		//this.tween = t.add.tween(t.camera).to({x:t.game.world.centerX+t.camera.width/2,y:t.game.world.centerY+t.camera.height/2})
		//t.initDialogue(t.npcs.children[0].data,true,true);
		t.acquire([['quest','q_pcwr_a']]);
		t.updateJSONWaypoint('q_pcwr_a','forest_a',null,null,true);
		t.updateJSONWaypoint('q_pcwr_a','q_pcwr_aa',null,null,true);
	},
	initQuiz: function() {
		t.dialogueUp = true;
		t.score = 0;
		t.camera.follow(null);
		t.add.tween(t.camera).to({x:t.game.world.centerX-t.camera.width/2,y:t.game.world.centerY-t.camera.height/2-60},1200).start();
		this.tween = t.add.tween(Player).to({y:410,x:t.game.world.centerX},2000).start();
		Player.animations.play('walkBwd');
		this.tween.onComplete.add(function() {
			Player.animations.stop();
			Player.frame = 0;
			var light = t.game.add.sprite(t.world.centerX,t.camera.y,'light');
			light.anchor.setTo(0.5,0);
			light.scale.setTo(1,0.65);
			light.alpha = 0.5;
			t.npcs.add(light);
			t.game.world.bringToTop(Player);
			t.nextDialogue(false,[],false);
			t.initDialogue(t.npcs.children[0].data,true,true);
			for (var i=1;t.npcs.children.length>i;i++) {
				t.npcs.children[i].frame = 3;
			}
		},this);
	},
	calculateQuiz: function() {
		t.camera.follow(Player);
		var dI = t.score>=3?18:19;
		t.npcs.children[0].data.dialogueIndex = dI;
		t.initDialogue(t.npcs.children[0].data,true,true);
	},
	q_pcwr_a_parade: function() { //15 seconds?
		t.music.stop();
		t.music = t.game.add.audio('music_mainTheme',0.6,true).play();
		t.dialogueUp = true;
		t.camera.follow(null);
		t.camera.x = t.game.world.centerX - t.game.width/2;
		Player.body.collideWorldBounds = false;
		Player.y = -60;
		Player.x = t.game.world.centerX;
		t.soldiersWalkGroup = t.add.group();
		var soldierWalk1 = t.game.add.sprite(t.world.centerX-80,-60,'npc_09');
		var soldierWalk2 = t.game.add.sprite(t.world.centerX,-60,'npc_11');
		var soldierWalk3 = t.game.add.sprite(t.world.centerX-180,-60,'npc_08');
		var soldierWalk4 = t.game.add.sprite(t.world.centerX+60,-60,'npc_12');
		var npcPlacement = [[t.world.centerX-210,470],[t.world.centerX-300,380],[t.world.centerX+180,420],[t.world.centerX+240,510]]
		var i = 0; 
		t.npcs.forEach(function(targ) {
			targ.animations.play('celebrate');
			if (targ.data.index < 4) {
				targ.data.static = true;
				targ.position.setTo(npcPlacement[i][0],npcPlacement[i][1]);
				i++;
			}
		},this);
		t.soldiersWalkGroup.add(soldierWalk1);t.soldiersWalkGroup.add(soldierWalk2);t.soldiersWalkGroup.add(soldierWalk3);t.soldiersWalkGroup.add(soldierWalk4);
		t.soldiersWalkGroup.forEach(function(targ) {
			targ.animations.add('walk',[0,1,0,2],8,true);
			targ.animations.play('walk');
			var randStart = Rnd.integer(2000,5500);
			t.add.tween(targ).to({y:t.camera.height+t.camera.height/3},15000,null,true,randStart).start();
		},this);
		this.tween = t.add.tween(Player).to({y:t.camera.height+t.camera.height/3},14700).start();
		Player.animations.play('walkFwd');
		//trucks!
		var truck1 = t.game.add.sprite(t.world.centerX-90,-240,'trucks');
		truck1.frame = 5;
		t.soldiersWalkGroup.add(truck1);
		var truck2 = t.game.add.sprite(t.world.centerX-90,-240,'trucks');
		truck2.frame = 4;
		t.soldiersWalkGroup.add(truck2);
		//var truck3 = t.game.add.sprite(t.world.centerX-90,-240,'trucks');
		//truck3.frame = 6;
		//t.soldiersWalkGroup.add(truck3);
		t.add.tween(t.soldiersWalkGroup.children[4]).to({y:t.camera.height},15000,null,true,6500).start();
		t.add.tween(t.soldiersWalkGroup.children[5]).to({y:t.camera.height},15000,null,true,12000).start();
		//t.add.tween(t.soldiersWalkGroup.children[6]).to({y:t.camera.height},15000,null,true,14500).start();
		this.tween.onComplete.add(function() {
			RPG.eventQueue = [function() {RPG.npcFunctions.parade_end()}];
			t.tweens.removeAll();
			t.changeLevel(Player,{'targetMap':'camp','targetPosition':[t.game.world.centerX,t.game.world.centerY]});
		},this);

	},
	parade_end: function() {
			t.camera.follow(Player);
			t.dialogueUp = true;
			t.setJSONDialogueIndex('Benjamin',4);
			t.updateJSONWaypoint('q_pcwr_a','forest_a',null,true);
		setTimeout(function() {
			var tallie = new RPG.NPC(RPG.GameState,t.camera.x+t.game.width/2+60,t.camera.y+t.game.height+60,{'character':'Tallie','key':'npc','dialogueIndex':7,'name':'npc_08','static':true});
			RPG.GameState.npcs.add(tallie);
			tallie.animations.play('walkBwd');
			this.tween = t.add.tween(tallie).to({y: Player.y,x:Player.x+70},2300).start();
			this.tween.onComplete.add(function() {
				tallie.animations.stop();
				tallie.frame = 7;
				tallie.scale.setTo(-1,1);
				t.initDialogue(tallie.data,false,true);
			},this);
		},400);	
	},
	q_wr_b_brianLeave: function() {
		RPG.eventQueue = [function() {RPG.npcFunctions.q_wr_b_bovinaIntro()}];
		this.create_bovina();
		t.dialogueUp = true;
		RPG.GameState.acquire([['quest','q_wr_b']]);
		t.updateJSONWaypoint('q_wr_b','camp',[1050,1340]);
		var brian = t.npcs.children[0];
		var guard1 = t.npcs.children[1];
		var guard2 = t.npcs.children[2];

		var guardTween1 = t.add.tween(guard1).to({y:670},2800).start();
		var guardTween2 = t.add.tween(guard2).to({y:670},2800).start();
		guard1.animations.play('walkFwd');
		guard2.animations.play('walkFwd');

		guardTween1.onComplete.add(function() {
			guard1.animations.play('walkSide');
			guardTween1 = t.add.tween(guard1).to({x:570},1400).start();
			guardTween1.onComplete.add(function() {
				guard1.animations.play('walkFwd');
				guard1.scale.setTo(1);
				guardTween1 = t.add.tween(guard1).to({y:800},600).start();
				guardTween1.onComplete.add(function() {
					guard1.destroy();
					t.dialogueUp = false;
				},this);
			},this);
		},this);

		guardTween2.onComplete.add(function() {
			guard2.animations.play('walkSide');
			guard2.scale.setTo(-1,1);
			guardTween2 = t.add.tween(guard2).to({x:690},1400).start();
			guardTween2.onComplete.add(function() {
				guard2.animations.play('walkFwd');
				guardTween2 = t.add.tween(guard2).to({y:800},600).start();
				guardTween2.onComplete.add(function() {
					guard2.destroy();
				},this);
			},this);
		},this);

		this.tween = t.add.tween(brian).to({y:800},2600).start();
		brian.animations.play('walkFwd');
		this.tween.onComplete.add(function() {
			brian.destroy();
			t.removeJSONEnemy(4);
			t.removeJSONEnemy(3);
			t.removeJSONEnemy(2);
		},this);
	},
	create_bovina: function() {
		console.log('BOVINA CREATED!!!!!');
		var bovina = t.retrieveJSONIndex('Cow','camp');
		console.log(bovina);
		console.log(t.cache.getTilemapData('camp').data.layers[2].objects[bovina].properties.character);
		t.cache.getTilemapData('camp').data.layers[2].objects[bovina].properties.character = 'Empress Bovina'; // bovina index currently 18
		t.cache.getTilemapData('camp').data.layers[2].objects[bovina].properties.name = 'npc_bovina';
		t.cache.getTilemapData('camp').data.layers[2].objects[bovina].x = 1800;
		t.cache.getTilemapData('camp').data.layers[2].objects[bovina].y = 640;
		var index = t.retrieveJSONIndex('First Road Sentry','camp');
		t.setJSONDialogueIndex(index,2,'camp');
	},
	q_wr_b_bovinaIntro: function() {
		t.dialogueUp = true;
		var npc;
		t.npcs.children.forEach(function(targ) {
			if (targ.data.name==="npc_bovina") {
				npc = targ;
			}
		},this);
		var that = this;
		setTimeout(function() {
			//t.camera.follow(null);
			//t.tween = t.add.tween(t.camera).to({x: t.camera.x+300},1400).start();
			//t.tween.onComplete.add(function() {
				t.initDialogue(npc.data,true,true);
			//},that);
					//},this);
		},800);
		//},this);
	},
	q_wr_b_bovinaExit: function() {
		t.dialogueUp = true;
		var npc;
		t.npcs.children.forEach(function(targ) {
			if (targ.data.name==="npc_bovina") {
				npc = targ;
			}
		},this);
		this.tween = t.add.tween(npc).to({alpha:0},1200,null,true,1000).start();
		this.tween.onComplete.add(function() {
			var index = t.retrieveJSONIndex('Empress Bovina');
			t.removeJSONEnemy(index);
			index = t.retrieveJSONIndex('First Road Sentry');
			t.setJSONDialogueIndex(index,2,'camp');
			RPG.eventQueue = [function() { RPG.npcFunctions.q_wr_b_pathOpen(); }];
			RPG.GameState.removeTiles([43,36,36,36,36,36,36,36,44],1,true);
		},this);
	},
	q_wr_b_pathOpen: function() {
		t.dialogueUp = false;
		setTimeout(function() {
			Player.data.dialogueIndex = 7;
			t.initDialogue(Player.data,true,false);
		},800)
	},
	q_wr_b_bovinaMoon: function() {
		t.camera.follow(null);
		t.npcs.children[0].frame = 0;
		t.updateJSONWaypoint('q_wr_b','q_wr_ba',[1640,130]);
		Player.frame = 9;
		t.game.sound.play('key');
		this.tween = t.add.tween(t.npcs.children[0]).to({y: t.camera.y-200},800).start();
		t.add.tween(Player).to({y: t.camera.y-800},1000).start();
		RPG.eventQueue = [function() { RPG.npcFunctions.q_wr_b_moonIntro(); }];
		this.tween.onComplete.add(function() {
			Player.kill();
			t.changeLevel(Player,{'targetMap':'moon','targetPosition':[t.game.world.centerX,t.game.world.centerY]});
		},this);
	},
	q_wr_b_moonIntro: function() {
		t.dialogueUp = true;
		t.camera.follow(Player);
		Player.position.setTo(t.game.world.centerX,t.game.world.centerY);
		t.npcs.children[0].data.name = 'npc_bovina';
		t.npcs.children[1].data.name = 'npc_angus_steersworth';
		t.npcs.children[2].data.name = 'npc_princess_brahman';
		setTimeout(function() {
			t.initDialogue(t.npcs.children[0].data,true,true);
		},1000);
	},
	trudeau_scene: function() {
		t.removeJSONEnemy(2);
		t.dialogueUp = true;
		Player.animations.play('walkBwd');
		Player.data.fbData.trudeau = 1;
		RPG.continueData.fbData.trudeau = 1;
		var fbRef = RPG.firebase.database();
		fbRef = fbRef.ref('/Data');
		var existingData = fbRef.child(RPG.continueData.fbKey);
		existingData.update(RPG.continueData.fbData);
		this.tween = t.add.tween(Player).to({y:580},1000).start();
		this.tween.onComplete.add(function() {
			Player.frame = 6;
			t.initDialogue(t.npcs.children[0].data,true,true);
		},this);
	},
	q_wr_b_herding: function() {

	},
	moonWalk_a: function() {
		t.dialogueUp = true;
		Player.animations.play('walkBwd');
		this.tween = t.add.tween(Player).to({y:320,x:t.game.world.centerX-50},1600).start();
		t.npcs.children[0].animations.play('walkBwd');
		t.add.tween(t.npcs.children[0]).to({y: 300},1600).start();
		this.tween.onComplete.add(function() {
			Player.animations.stop();
			t.npcs.children[0].animations.stop();
			t.npcs.children[0].scale.setTo(-1,1);
			t.npcs.children[0].frame = 8;
			t.initDialogue(t.npcs.children[0].data,true,true);
		},this);
	},
	moonReflection: function() {
		t.dialogueUp = true;
		Player.animations.play('walkFwd');
		this.tween = t.add.tween(Player).to({y:400},1200).start();
		this.tween.onComplete.add(function() {
			Player.animations.stop();
			Player.frame = 0;
			Player.data.dialogueIndex = 8;
			t.initDialogue(Player.data,true,false);
		},this);
	},
	moonExit: function() {
		t.dialogueUp = true;
		Player.frame = 9;
		t.camera.follow(null);
		this.tween = t.add.tween(Player).to({y:-400},1200).start();
		t.game.sound.play('key');
		this.tween.onComplete.add(function() {
			Player.kill();
			RPG.eventQueue = [function() {RPG.npcFunctions.setMoonReturn()}];
			t.changeLevel(Player,{'targetMap':'q_wr_ba','targetPosition':[1630,300]});
		},this);
	},
	setMoonReturn: function() {
		t.npcs.children[0].destroy();
		t.npcs.children[0].destroy();
		t.npcs.children[0].destroy();
		var index = t.retrieveJSONIndex('Empress Bovina','q_wr_ba');
		t.removeJSONEnemy(index);
		index = t.retrieveJSONIndex('Cow','q_wr_ba');
		t.removeJSONEnemy(index);
		index = t.retrieveJSONIndex('Cow','q_wr_ba');
		t.removeJSONEnemy(index);
	},
	q_wr_herding: function() {
		t.dialogueUp = true;
		t.droppedItems.children[0].destroy();
		t.removeJSONEnemy(15);
		var that = this;
		setTimeout(function() {
			Player.animations.play('walkBwd');
			that.tween = t.add.tween(Player).to({y:1090,x:810},2400).start();
			that.tween.onComplete.add(function() {
				Player.animations.stop();
				Player.frame = 6;
				t.npcs.children[8].data.dialogueIndex = 17;
				t.initDialogue(t.npcs.children[8].data,true,true);
			},this);
		},200);
	},
	q_wr_bb_herdIntro: function() {
		var brian = t.npcs.children[8];
		t.dialogueUp = true;
		Player.animations.play('walkBwd');
		this.tween = t.add.tween(Player).to({y:760,x:710},2200).start();
		t.add.tween(brian).to({y: 760,x:780},2200).start();
		brian.animations.play('walkBwd');
		this.tween.onComplete.add(function() {
			Player.animations.stop();
			brian.animations.stop();
			t.initDialogue(brian.data,true,true);
		},this);
	},
	q_wr_bb_herd_b: function() {
		var brian = t.npcs.children[8];
		t.dialogueUp = true;
		Player.animations.play(t.rgt);
		Player.scale.setTo(-1,1);
		brian.animations.play('walkSide');
		this.tween = t.add.tween(Player).to({x:420},1800).start();
		t.add.tween(brian).to({x:1060},1800).start();
		this.tween.onComplete.add(function() {
			brian.animations.stop();
			brian.frame = 3;
			Player.scale.setTo(1);
			Player.animations.stop();
			Player.frame = 6;
			Player.data.dialogueIndex = 11;
			t.initDialogue(Player.data,true,false);
		},this);
	},
	herdFailing: function() {
		t.dialogueUp = true;
		Player.frame = 6;
		t.camera.follow(null);
		this.tween = t.add.tween(t.camera).to({y:t.camera.y+140},1000).start();
		this.tween.onComplete.add(function() {
			Player.frame = 6;
			t.initDialogue(t.npcs.children[12].data,true,false);
		},this);
	},
	herdSuccess: function() {
		t.dialogueUp = true;
		var cow1 = RPG.GameState.npcs.children[0];
		var cow2 = RPG.GameState.npcs.children[1];
		var cow3 = RPG.GameState.npcs.children[2];
		var cow4 = RPG.GameState.npcs.children[3];
		cow1.animations.play('walkBwd');
		cow2.animations.play('walkBwd');
		cow3.animations.play('walkBwd');
		cow4.animations.play('walkBwd');
		t.camera.follow(RPG.GameState.npcs.children[0]);
		var cow1Tween = t.add.tween(cow1).to({y:-200},9000).start();
		var cow2Tween = t.add.tween(cow2).to({y:-200},10000,null,true,2000).start();
		t.add.tween(cow2).to({x:cow2.x-140},1200,null,true,800).start();
		var cow3Tween = t.add.tween(cow3).to({y:-200},10000,null,true,2600).start();
		var cow4Tween = t.add.tween(cow4).to({y:-200},10000,null,true,4300).start();
		t.add.tween(cow3).to({x:cow3.x-140},2000,null,true,4300).start();
		t.add.tween(Player).to({x:940},5000,null,true,9500).start();
		Player.animations.play('walkSide');
		cow1Tween.onComplete.add(function() {
			t.camera.follow(null);
			cow1.destroy();
		},this);
		cow2Tween.onComplete.add(function() {
			cow2.destroy();
			cow3.destroy();
			cow4.destroy();
			var brian = t.npcs.children[4];
			RPG.GameState.npcs.children[0].x = RPG.GameState.npcs.children[0].x;
			RPG.GameState.npcs.children[0].y = RPG.GameState.npcs.children[0].y+60;
			RPG.GameState.npcs.children[0].scale.setTo(-1,-1);
			RPG.GameState.npcs.children[0].frame = 8;
			RPG.GameState.npcs.children[3].y = RPG.GameState.npcs.children[3].y+60;
			RPG.GameState.npcs.children[3].x = RPG.GameState.npcs.children[3].x-100;
			RPG.GameState.npcs.children[3].frame = 4;
			RPG.GameState.npcs.children[1].frame = 8;
			RPG.GameState.npcs.children[1].y = RPG.GameState.npcs.children[1].y-30;
			RPG.GameState.npcs.children[1].x = RPG.GameState.npcs.children[1].x+30;
			this.tween = t.add.tween(t.camera).to({x:470,y:460},2000).start();
			this.tween.onComplete.add(function() {
				Player.animations.stop();
				//RPG.GameState.npcs.children[0].y = RPG.GameState.npcs.children[0].y+30
				RPG.GameState.npcs.children[2].scale.setTo(-1,1);
				RPG.GameState.npcs.children[2].animations.play('walkSide');
				t.add.tween(RPG.GameState.npcs.children[2]).to({x:100},8000).start();
				t.camera.follow(Player);
				setTimeout(function() {
					brian.data.dialogueIndex = 20;
					t.initDialogue(brian.data,true,false);
				},2000);
			},this);
		},this);
		// cow3Tween.onComplete.add(function() {
		// 	cow3.destroy();
		// },this);
		// cow4Tween.onComplete.add(function() {
		// 	cow4.destroy();
		// },this);

	},
	jeanExit: function() {
		t.dialogueUp = true;
		t.updateJSONWaypoint('q_wr_a','q_wr_ba',null,true);
		t.updateJSONWaypoint('q_wr_a','camp',null,true);
		var brian = t.npcs.children[4];
		this.tween = t.add.tween(brian).to({y:t.camera.y+ t.game.height+60,x:brian.x-280},4000).start();
		t.npcs.children[5].animations.play('walkFwd');
		t.npcs.children[6].animations.play('walkFwd');
		t.npcs.children[9].animations.play('walkFwd');
		t.add.tween(t.npcs.children[5]).to({y:t.camera.y+ t.game.height+60,x:brian.x-280},5000,null,true,800).start();
		t.add.tween(t.npcs.children[6]).to({y:t.camera.y+ t.game.height+60,x:brian.x-220},5000,null,true,1000).start();
		t.add.tween(t.npcs.children[9]).to({y:t.camera.y+ t.game.height+80,x:brian.x-220},4000).start();
		brian.animations.play('walkFwd');
		this.tween.onComplete.add(function() {
			t.npcs.children[10].destroy();
			t.npcs.children[9].destroy();
			t.npcs.children[6].destroy();
			t.npcs.children[5].destroy();
			brian.destroy();
			t.npcs.children[2].destroy();
			t.showSupport(0,2);
			t.removeQuest('q_wr_b');
			var index = RPG.GameState.retrieveJSONIndex('q_wr_b','camp');
			RPG.GameState.removeJSONEnemy(index,'camp');
			t.npcs.children[3].data.dialogueIndex = 1;
			t.npcs.children[4].data.dialogueIndex = 22;
			var objArr = t.cache.getTilemapData(t.currentLevel).data.layers[2].objects;
			console.log(objArr);
			for (var i = 0;objArr.length-1>i;i++){
				t.removeJSONEnemy(i);
			};
			RPG.eventQueue = [function() {RPG.npcFunctions.q_wr_bb_removeAccess()}];
			t.dialogueUp = false;
		},this);
	},
	cowResponse: function(targCow,num) {
		this.tween = t.add.tween(t.camera).to({y:targCow.y-t.game.height/2},300).start();
		this.tween.onComplete.add(function() {
			targCow.data.dialogueIndex = num;
			t.initDialogue(targCow.data,true,false);
		},this);
	},
	herdJean: function() {
		t.dialogueUp = true;
		Player.frame = 6;
		var brian = t.npcs.children[8];
		this.tween = t.add.tween(t.camera).to({x:t.camera.x+600,y:t.camera.y-140},2000).start();
		brian.animations.play('walkSide');
		t.add.tween(brian).to({x:brian.x+100},1200).start();
		this.tween.onComplete.add(function() {
			brian.animations.play('walkSide');
			brian.scale.setTo(-1,1);
			this.runInterval = false;
			runLeft();
			var that = this;
			function runLeft() {
				this.tween = t.add.tween(brian).to({x:brian.x-180},1500).start();
				this.tween.onComplete.add(function() {
					brian.scale.setTo(1);
					if (!that.runInterval) runRight();
				},this);
			};
			function runRight() {
				var tweenRight = t.add.tween(brian).to({x:brian.x+200},1500).start();
				tweenRight.onComplete.add(function() {
					brian.scale.setTo(-1,1);
					if (!that.runInterval) runLeft();
				},this);
			};
			t.initDialogue(brian.data,true,false);
		},this);
	},
	herdJasonReturn: function() {
		t.dialogueUp = true;
		var brian = t.npcs.children[8];
		brian.scale.setTo(1);
		brian.animations.stop();
		brian.frame = 3;
		this.tween= t.add.tween(t.camera).to({x:Player.x-t.game.width/2},2400).start();
		this.tween.onComplete.add(function() {
			Player.frame = 6;
			t.initDialogue(Player.data,true,false);
		},this);
	},
	q_wr_bb_removeAccess: function() {
		var index = t.retrieveJSONIndex('q_wr_b_mapChange');
		t.removeJSONEnemy(index);
		t.stages.children[2].destroy();
	},
	goalAchieved: function() {
		console.log('GOAL ACHIEVED CALLED!');
		t.dialogueUp = true;
		var messenger = new RPG.NPC(RPG.GameState,t.camera.x+t.game.height/2,t.camera.y+t.camera.height+60,{'character':'Messenger','name':'npc_14','dialogueIndex':0,'type':'npc','key':'npc','static':true});
		t.npcs.add(messenger);
		messenger.animations.play('walkBwd');
		var messengerArrive = t.add.tween(messenger).to({y:Player.y+70,x:Player.x},2200,null,true,300).start();
		messengerArrive.onComplete.add(function() {
			t.nextDialogue(false,[],false);
			Player.frame = t.startFrame;
			messenger.animations.stop();
			messenger.frame = 3;
			t.initDialogue(messenger.data,false,true);
		},this);
	},
	final_boss_tent_travel: function() {
		// RPG.eventQueue = [function() {RPG.npcFunctions.clearTent()}];
		Player.data.health = 10;
		t.changeLevel(Player,{'targetMap':'camp_pc_01','targetPosition':[630,580]});
	},
	clearTent: function() {
		console.log('CLEAR TENT FIRED!!!');
		// t.removeJSONEnemy(11);
		// t.removeJSONEnemy(10);
		t.removeJSONEnemy(9);
		t.removeJSONEnemy(8);
		t.removeJSONEnemy(7);
		t.removeJSONEnemy(6);
		t.removeJSONEnemy(5);
		t.removeJSONEnemy(3);
		t.removeJSONEnemy(1);
		t.removeJSONEnemy(0);
		// t.npcs.children[7].destroy();
		// t.npcs.children[6].destroy();
		if (t.npcs.children[5]!=null) t.npcs.children[5].destroy();
		t.npcs.children[4].destroy();
		t.npcs.children[3].destroy();
		t.npcs.children[2].destroy();
		t.npcs.children[0].destroy();
		t.stages.children[1].destroy();
		t.stages.children[0].destroy();
		// t.npcs.children[0].data.dialogueIndex(12);
		t.setJSONDialogueIndex('Rick McIver',12);
	},
	q_pcwr_b_nenshi: function() {
		t.dialogueUp = true;
		Player.body.velocity.setTo(0);
		t.initDialogue(t.npcs.children[0].data,true,true);
	},
	q_pcwr_b_init: function() {
		t.acquire([['quest','q_pcwr_b']]);
	},
	q_wr_a_end: function() {
		t.dialogueUp = true;
		t.npcs.children[0].data.dialogueIndex = 1;
		setTimeout(function() {
			t.initDialogue(t.npcs.children[0].data,false,true);
		},800);
	},
	healthRestored: function() {
		Player.data.health = 10;
		t.initDialogue(['Health restored!']);
		Player.frame = 9;
		t.game.sound.play('life_refill');
	},
	finale_begin: function() {
		t.dialogueUp = true;
		setTimeout(function() {
			Player.data.dialogueIndex = 15;
			t.initDialogue(Player.data,true,false);
		},800);
	},
	finale_musical: function() {
		var camX = t.camera.x;
		var camY = t.camera.y;
		this.tween = t.add.tween(t.music).to({volume:0},600).start();
		this.tween.onComplete.add(function() {
			t.music.stop();
			t.music = t.game.add.audio('music_finale',1,true).play();
			Player.attackActive = true;
			Player.animations.play(t.lft);
			var jasonTween = t.add.tween(Player).to({x:t.game.world.centerX-35},600).start();
			jasonTween.onComplete.add(function() {
				Player.animations.play('attackFwd');
			},this);

			var harper;
			// all npcs down to Kenney level
			t.npcs.children.forEach(function(npc) {
				if (npc.key !== 'crater') {
					if (npc.key === 'npc_bovina') {
						var tween = t.add.tween(npc).to({y:Player.y,x:npc.x},1400,null,true,200);
					} else if (npc.key === 'npc_stephen_harper') {
						harper = npc;
					}
					else {
						var tween = t.add.tween(npc).to({y:Player.y},1400,null,true,200);
					}
				}
			},this);
			//tween stephen harper
			//var harper = t.npcs.children[5];
			var harperTween = t.add.tween(harper).to({y:Player.y,x:t.game.world.centerX+35},800).start();
			harperTween.onComplete.add(function() {
				harper.animations.add('celebrate',[0,1],2,true);
				harper.animations.play('celebrate');
			},this);

			//set up two groups for chorus on left and right of stage
			t.chorusLft = t.add.group();
			t.chorusRgt = t.add.group();
			var chorusNum = Math.floor((t.game.width/2)/60);
			console.log('CHORUSNUM IS '+ chorusNum);
			//setup chorus into groups
			for (var i=0;chorusNum>i;i++) {
				var npc = 'npc_0'+ Rnd.integer(7,10);
				var chorister = new RPG.NPC(t,camX-60,camY+t.game.height/2.45,{'character':'Chorister','name':npc,"dialogueIndex":0,'key':'npc','static':true});
				chorister.animations.play('walkFwd');
				t.chorusLft.add(chorister);
			}
			for (var i=0;chorusNum>i;i++) {
				var npc = 'npc_0'+ Rnd.integer(7,10);
				var chorister = new RPG.NPC(t,camX+t.game.width+60,camY+t.game.height/2.45,{'character':'Chorister','name':npc,"dialogueIndex":0,'key':'npc','static':true});
				chorister.animations.play('walkFwd');
				chorister.scale.setTo(-1,1);
				t.chorusRgt.add(chorister);
			}
			for (var i=0;chorusNum>i;i++) {
				//left chorus
				var chorister = t.chorusLft.children[i];
				console.log(chorister.x+', '+chorister.y);
				t.add.tween(chorister).to({x:camX+(t.game.width/2)-((i+1)*60)},3600-((i+1)*400),null,true,(i+1)*400).start();
				chorister.animations.play('walkFwd');
					
				//right chorus
				var choristra = t.chorusRgt.children[i];
				t.add.tween(choristra).to({x:camX+t.game.width-(t.game.width/2)+((i+1)*60)},3600-((i+1)*400),null,true,(i+1)*400).start();
				
				//set to walk forward at specific timeout interval
				// setTimeout(function() {
				// 	choristra.animations.play('walkFwd');
				// 	chorister.animations.play('walkFwd');
				// 	choristra.scale.setTo(1);
				// },3600-((i+1)*400));
			}

			// flags appear
			setTimeout(function() {
				var flagLft = t.add.sprite(camX+60,camY-155,'soldier_flag');
				var flagRgt = t.add.sprite(camX+t.game.width-60,camY-155,'soldier_flag');
				flagRgt.scale.setTo(-1,1);
				flagLft.animations.add('move',[0,1,0,2],8,true);
				flagLft.animations.play('move');
				flagRgt.animations.add('move',[0,1,0,2],8,true);
				flagRgt.animations.play('move');
				t.add.tween(flagLft).to({y:camY+20},2300).start();
				t.add.tween(flagRgt).to({y:camY+20},2300).start();
				// flagLftTween.onComplete.add(function() {
				// 	flagLft.animations.stop();
				// 	flagRgt.animations.stop();
				// },this);
			},4500);

			// bring out bosses
			setTimeout(function() {
				var giga = t.add.sprite(t.game.world.centerX-100,-200,'giga_candidate');
				giga.scale.setTo(0.8);
				giga.anchor.setTo(0.5,0);
				t.npcs.add(giga);
				var klein = t.add.sprite(t.game.world.centerX+100,-200,'boss_klein');
				klein.scale.setTo(0.8);
				klein.anchor.setTo(0.5,0);
				t.npcs.add(klein);
				giga.animations.add('walk',[0,1,2,1,0,3,4,3],8,true);
				giga.animations.play('walk');
				klein.animations.add('walk',[0,0,2,2],4,true);
				klein.animations.play('walk');
				t.add.tween(giga).to({y:camY+20},5000).start();
				t.add.tween(klein).to({y:camY+20},5000).start();
			},6500);

			t.npcs.children.forEach(function(targ) {
				if (targ.animations._anims.walkFwd) {
					targ.animations.play('walkFwd');
				}
			},this);

			setTimeout(function() {
				localStorage.clear();
				t.initDialogue({'character':'All','dialogueIndex':1},false,false,null,3800);
			},1000);

			t.music.onLoop.add(function() {
				t.music.onLoop.removeAll();
				var time = 4000;
				setTimeout(function() {
					t.black = t.add.group();
					t.black.add(t.screenA);
					t.game.world.bringToTop(t.screenA);
					t.screenA.alpha=1;
					t.endText = t.add.text(t.game.world.centerX,camY+t.game.height/2-20,'A National Post game',RPG.textStyle);
					t.endText.anchor.setTo(0.5);
					t.endText.wordWrapWidth = t.game.width-200;
					setTimeout(function() {
						t.endText.setText('Written by');
						t.endText_b = t.add.text(t.game.world.centerX,camY+t.game.height/2+20,'Brice Hall and Tristin Hopper',RPG.textStyle);
						t.endText_b.anchor.setTo(0.5);
						t.endText_b.wordWrapWidth = t.game.width-200;
						setTimeout(function() {
							t.endText.setText('Concept, Art, Design, Music');
							t.endText_b.setText('Brice Hall');
							setTimeout(function() {
								t.endText.setText('Select art from');
								t.endText_b.setText('OpenGameArt.org');
							setTimeout(function() {
								t.endText.setText('Ending song adapted from \'The Soldiers of Our Queen\'');
								t.endText_b.setText('by William Gilbert and Arthur Sullivan');
							setTimeout(function(){
								t.endText.setText('Special thanks to');
								t.endText_b.setText('Jen Gerson');
								setTimeout(function() {
									var logo = t.add.image(t.game.world.centerX,camY+10,'kq_logo');
									logo.anchor.setTo(0.5,0);
									logo.scale.setTo(0.5);
									logo.alpha = 0;
									t.add.tween(logo).to({alpha:1},2400,'Quad.easeOut').start();
									t.endText.setText('To be continued...');
									t.endText_b.destroy();
									var tween = t.add.tween(t.music).to({volume:0},3200).start();
									tween.onComplete.add(function() {
										t.music.stop();
									},this);
									//t.bg.events.onInputDown.removeAll();
									t.npcs.destroy();
									Player.destroy();
									t.chorusRgt.destroy();
									t.chorusLft.destroy();
								},time);
							},time);
							},time);
						},time);
						},time);
					},time);
				},800);
			},this);
		},this);
	}

}