var RPG = RPG || {};

//RPG.continueData = {};
//RPG.continueData.continue = false;

RPG.GameState = {

  init: function(currentLevel) {
    //keep track of the current level
    //this.currentLevel = currentLevel ? currentLevel : 'camp';
    this.currentLevel = currentLevel || 'camp';

    //setup if game continued from previous session 

    if (RPG.continueData.continue) {
      RPG.instrBools.attack = true;
      this.currentLevel = RPG.continueData.level;
      RPG.GameState.stageStartX = RPG.continueData.x
      RPG.GameState.stageStartY = RPG.continueData.y;
      if (this.currentLevel === 'q_pc_b_cave') {
        this.setJSONDialogueIndex('Ralph Klein',0);
        RPG.eventQueue = [function() { RPG.npcFunctions.boss_klein(); }];
        RPG.continueData.fbData.continues.klein++;
      } else if (this.currentLevel === 'final_boss') {
        RPG.eventQueue = [function() { RPG.npcFunctions.final_boss(); }];
      }
    }
    //this.levelType = (this.currentLevel === 'camp' || this.currentLevel === 'prentice_home') ? true : false;
    this.levelType = this.checkLevelType(this.currentLevel);
    //constants
    this.Player_SPEED = 150;
    //this.Player_FR = 12;
    
    //no gravity in a top-down game
    this.game.physics.arcade.gravity.y = 0;
 
  //key booleans
  this.dialogueUp = false;
  this.inventoryUp = false;

    //keyboard cursors
    //this.cursors = this.game.input.keyboard.createCursorKeys();

    // set up fade in screen

  },
  create: function() {
    this.loadLevel();
  },
  update: function() {
    this.game.physics.arcade.collide(Player,this.collisionLayer);
    this.game.physics.arcade.collide(Player,this.npcs);
    // this.game.physics.arcade.collide(this.npcs,this.enemies);
    // this.game.physics.arcade.collide(this.enemies);
    this.game.physics.arcade.collide(Player,this.enemies,this.stopEnemy,null,this);
    this.game.physics.arcade.overlap(this.enemyProjectiles,Player,this.projectileHit,null,this);
    this.game.physics.arcade.overlap(this.droppedItems,Player,this.collectItem,null,this);
    this.game.physics.arcade.collide(this.droppedItems,this.collisionLayer);
    //this.game.physics.arcade.collide(Player,Player.attackTarget,PlayerAttack,null,this);
    this.game.physics.arcade.collide(this.npcs,this.collisionLayer);
    this.game.physics.arcade.collide(this.enemies,this.collisionLayer);

    this.game.physics.arcade.overlap(Player, this.stages, this.changeLevel, null, this);
    if (Player.attackActive) {
      return;
    }
    if (Object.keys(Player.attackTarget).length !== 0) {
      Player.isAttacking = true;
    } else {
      Player.isAttacking = false;
    }
    if (Player.isAttacking && Player.canAttack && !Player.attackTarget.isDead) {
      this.physics.arcade.moveToObject(Player,Player.attackTarget,this.Player_SPEED);
      Player.targX = Player.attackTarget.world.x;
      Player.targY = Player.attackTarget.world.y;
      if (RPG.game.physics.arcade.distanceBetween(Player,Player.attackTarget) <= Player.attackTarget.targetDistance && Player.canAttack) {
        Player.attackActive = true;
        this.playerAttack();
      }
    }
    else if (RPG.game.physics.arcade.distanceToXY(Player,Player.targX,Player.targY) <= 5 && !Player.isHit && !Player.engageDialogue) {
      Player.body.velocity.setTo(0,0);
      Player.animations.play(this.fwd).stop(true);
      Player.scale.setTo(1);
   }

  // if ((Player.body.velocity.x > 0 || Player.body.velocity.y > 0 ) && !this.walkingSfx.isPlaying) { // POTENTIAL WALKING SFX CODE FOR LATER
  //    this.walkingSfx.play();
  // }
   // else if (RPG.game.physics.arcade.distanceBetween(Player,Player.attackTarget) <= 60 && Player.isAttacking) {
   //    Player.body.velocity.setTo(0);
   //    Player.isAttacking = false;
   //    PlayerAttack();
   // }
  },
  stopEnemy: function(el,targ) {
    if (targ.data.type === 'boss' && (targ.state === 'strike' || targ.state === 'jump')) {
      if (targ.data.key === 'final_boss' && targ.invulnerable) {
        this.playerHit(targ.data.attack,targ.faceDirection(Player.world.x,Player.world.y,true));
      } else {
        console.log('STOPENEMY STRUCK!');
        setTimeout(function() {
          Player.body.velocity.setTo(0);
        },200);
      }
    } else {
      if (targ.data.type !== 'boss') {
        this.enemies.forEach(function(element) {
          if (this.physics.arcade.distanceBetween(element,Player) <= element.targetDistance) {
            element.body.velocity.setTo(0);
          }
        },this);
      }
    };
  },
  loadLevel: function(){
    //load world
    if (RPG.continueData.continue) RPG.continueData.continue = false;
    this.camera.onFadeComplete.removeAll();
    RPG.game.physics.arcade.isPaused = false;
    this.map = this.add.tilemap(this.currentLevel);
    this.map.addTilesetImage("mainCamp_tileset","camp_tiles");
    // if (this.currentLevel === 'camp') {
    //   this.map.addTilesetImage("trucks_spritesheet","trucks_tiles");
    // }
    // create tile layers
    this.groundLayer = this.map.createLayer("ground");
    this.collisionLayer = this.map.createLayer("collision");
    this.map.setCollisionBetween(0,600,true,"collision");
    this.game.physics.arcade.enable(this.collisionLayer);
    this.groundLayer.sendToBack();
    this.groundLayer.resizeWorld();
    this.groundLayer.wrap = true;

    // create objects
    // this.objectsGroup = this.add.group();
    // this.loadCollisionItems();

    // create map change objects
    var stagesArr = this.findObjectsByType('mapChange',this.map,'objects');
    this.stages = this.add.group();
    stagesArr.forEach(function(element) {
      var stageChange = this.add.sprite(element.x,element.y,element.properties.key);
      stageChange.targetMap = element.properties.stage;
      stageChange.targetPosition = element.properties.coords;
      if (element.properties.function != undefined) stageChange.function = element.properties.function;
      this.stages.add(stageChange);
    },this);

    this.game.physics.arcade.enable(this.stages);

    // initialize player movement
    this.bg = this.add.sprite(0,0);
    this.bg.fixedToCamera = true;
    this.bg.scale.setTo(this.game.width, this.game.height);
    this.bg.inputEnabled = true;
    this.bg.input.priorityID = 0; // lower priority

    //create player 
      Player = new RPG.Player(this,this.stageStartX,this.stageStartY,RPG.PreloadState.playerData);
      this.add.existing(Player);
      Player.body.setSize(30, 45, 15, 15);
      this.startX = Player.x;
      this.startY = Player.y;

    // movement animations for player character based on whether player is in camp or dungeon map
    if (this.levelType) {
      this.fwd = 'walkFwd';
      this.bwd = 'walkBwd';
      this.lft = 'walkSide';
      this.rgt = 'walkSide';
    } else {
      this.fwd = 'battleFwd';
      this.bwd = 'battleBwd';
      this.lft = 'battleLft';
      this.rgt = 'battleRgt';
    }
    this.startFrame = this.levelType ? 0 : 11;
    Player.frame = this.startFrame;

    // create NPCs
    this.npcs = this.add.group();
    this.createNPCs();


    // create enemies
    this.enemies = this.add.group();
    this.createEnemies();

    if (!this.levelType) {
      this.enemyProjectiles = this.add.group();
      this.enemyProjectiles.enableBody = true;
    }


    this.droppedItems = this.add.group();
    this.createKeyObjects();

    Player.bringToTop();

    // create waypoints
    this.waypoints = this.add.group();
    this.createWaypoints();

    if (this.currentLevel === 'q_pc_b_cave') { //if a boss level, find and create boss object
        var bossArr = this.findObjectsByType('boss',this.map,'objects');
        bossArr.forEach(function(element) {
          var boss = new RPG.Boss(this,element.x,element.y,element.properties);
          boss.bringToTop();
          this.enemies.add(boss);
        },this);
      }

      var triggerArr = this.findObjectsByType('trigger',this.map,'objects');
      if (triggerArr.length>0) {
        triggerArr.forEach(function(element) {
          console.log("THERE IS A TRIGGER");
          var trigger = this.add.sprite(element.x,element.y,element.properties.key);
          trigger.targetFunction = element.properties.name;
          trigger.game.physics.arcade.enable(trigger);
          trigger.enableBody = true;
          this.droppedItems.add(trigger);
        },this);
      }
    

    this.foregroundLayer = this.map.createLayer("foreground");


    // create health hearts
      //this.supportPanel = this.add.group();
      //this.hearts = this.add.group();

      if (!this.levelType) {
        this.showHealth(Player.data.health);
      } else {
        this.showSupport(0,0);
      }

      //set stage music
      if (!RPG.continueMusic) {
        var currMusic = "music_"+(this.levelType?'camp':'dungeon');
        if (this.levelType) {
          currMusic = "music_"+((this.currentLevel === 'prentice_home')?'pastoral':'camp');
        } else {
          currMusic = "music_"+((this.currentLevel === 'q_pc_b_cave' || this.currentLevel === 'q_wr_a')?'spooky':'dungeon');
        }
        this.music = this.game.add.audio(currMusic,0.5,true).play();
      }
      RPG.continueMusic = false;
      //this.music.loop = true;


    //this.initInventory();
    this.inventoryBtn = this.add.button(this.game.width-116,20,'invBtn',this.callMenu,this,1,0);
    this.inventoryBtn.fixedToCamera = true;
    this.inventoryBtn.input.priorityID = 1;

    //this.camera.follow(Player);
    // setup resusable objects and kill them for later use
        this.kenneyPortrait = this.game.add.sprite(0,(this.game.height/3*2)-2,'p_npc_jason_kenney');
        this.kenneyPortrait.anchor.setTo(0,1);
        this.kenneyPortrait.fixedToCamera = true;
        this.kenneyPortrait.kill();
        this.targPortrait = this.game.add.sprite(this.game.width-300,(this.game.height/3*2)-2,'p_npc_rick_mciver');
        this.targPortrait.anchor.setTo(0,1);
        this.targPortrait.fixedToCamera = true;
        this.targPortrait.kill();
        this.nameLabel = this.game.add.text(0,0,'',RPG.textStyle);
        this.nameLabel.anchor.setTo(0.5);
        this.nameLabel.setShadow(0,0,'rgba(0,0,0,0.8)',10);
        this.nameLabel.kill();

      //this.walkingSfx = this.game.add.audio('player_walking');

    //initialize anything in set events queue
    if (RPG.eventQueue.length>0) {
      RPG.eventQueue[0]();
      RPG.eventQueue = [];
    }
    // black screen fades in to level
    this.screenA = this.add.graphics(0,0);
    this.screenA.beginFill('#000');
    this.screenA.drawRect(0,0,this.game.width,this.game.height);
    this.screenA.fixedToCamera = true;
    this.add.tween(this.screenA).to({alpha:0},800,null).start();
    this.inventoryBtn.bringToTop();
    this.kenneyPortrait.bringToTop();
    this.targPortrait.bringToTop();
    this.continue = false;
    this.bg.events.onInputDown.add(this.movePlayer,this);

    if (!RPG.instrBools.attack && !this.levelType) {
      Player.data.dialogueIndex = 16;
      this.initDialogue(Player.data,true,false);
    }

    //save game code
    if (typeof(Storage) !== 'undefined') this.saveGame();

  },
  saveGame: function() {
    Player.data.fbData.continue = RPG.continueData.fbData.continue;
    RPG.continueData = Player.data;
    Player.data.level = this.currentLevel;
    Player.data.x = this.startX;
    Player.data.y = this.startY;
    RPG.playerSavedData = Player.data;
    localStorage.setItem('data',JSON.stringify(RPG.playerSavedData));

    RPG.PreloadState.tilemaps.forEach(function(targ) {
      localStorage.setItem(targ,JSON.stringify(this.cache.getTilemapData(targ)));
    },this);
  },
  showSupport: function(pc,wr) {
    var currPc = Player.data.pcSupport;
    var currWr = Player.data.wrSupport;
    Player.data.pcSupport = Player.data.pcSupport + pc;
    Player.data.wrSupport = Player.data.wrSupport + wr;
    if (Player.data.pcSupport > Player.data.maxSupport) {
      Player.data.pcSupport = Player.data.maxSupport;
    }
    if (Player.data.wrSupport > Player.data.maxSupport) {
      Player.data.wrSupport = Player.data.maxSupport;
    }
    if (currPc === Player.data.maxSupport) {
      pc = 0;
    }
    if (currWr === Player.data.maxSupport) {
      wr = 0;
    }
    if (pc > 0 || wr > 0) {
        this.game.sound.play('music_success');
        Player.animations.play('celebrate');
    }
    if (Player.data.pcSupport === 3 && Player.data.wrSupport === 3) {
      if (!this.checkQuest('q_pc_final')) {
        setTimeout(function() {
          RPG.npcFunctions.goalAchieved();
        },500);
      }
    }
    for (var i=0;i<Player.data.maxSupport;i++) {
      if (i+1 <= Player.data.pcSupport) {
        this.supportMonitor['pcLogos'][i].frame = 0;
        if (pc > 0 && i+1 <= currPc+pc) {
          this.supportMonitor['pcLogos'][i].animations.play('flash');
        }
      } else {
        this.supportMonitor['pcLogos'][i].frame = 2;
      }
      if (i+1 <= Player.data.wrSupport) {
        this.supportMonitor['wrLogos'][i].frame = 1;
        if (wr > 0 && i+1 <= currWr+wr) {
          this.supportMonitor['wrLogos'][i].animations.play('flash');
        }
      } else {
        this.supportMonitor['wrLogos'][i].frame = 3;
      }
      this.supportMonitor['pcLogos'][i].bringToTop();
      this.supportMonitor['wrLogos'][i].bringToTop();
    }
  },
  acquire: function(arr) {
    this.acquiredQueue = [];
    arr.forEach(function(eachItem) {
      if (eachItem[0] === 'item') {
        for (var el in RPG.itemsList) {
          if (eachItem[1]===el) {
            Player.data.items.push(eachItem[1]);
            this.acquiredQueue.push(RPG.itemsList[el][0] + ' acquired!');
            //this.cache.getTilemapData(this.currentLevel).data.layers[2].objects;
            if (eachItem[1] === 'golf_balls' && this.cache.getTilemapData('prentice_home').data.layers[2].objects[0].properties.dialogueIndex!=7 ) { // conditionals to fire for quest item acquisition
              this.cache.getTilemapData('prentice_home').data.layers[2].objects[0].properties.dialogueIndex=14;
            }
            Player.newItems = Player.newItems+1;
          }
        }
      } else if (eachItem[0] === 'quest') {
        var newQuest = [];
        newQuest.push(RPG.quests[eachItem[1]]);
        newQuest.push(eachItem[1]);
        newQuest.push(0);
        Player.data.quests.push(newQuest);
        this.acquiredQueue.push('New quest acquired!');
        Player.newQuests = Player.newQuests+1;
        this.updateWaypoint(newQuest[1]);
      }
      // new acquisiton alert
    },this);
      // this.callAlert(this.acquiredQueue);
      this.game.sound.play('music_acquired');
      Player.frame = 9; // 'success' pose for player
      this.isAlert = true;
      this.displayInvAlert(this.acquiredQueue.length);
      this.initDialogue(this.acquiredQueue);
  },
  movePlayer: function(bg,pointer) {
    if (!this.inventoryUp) {
    if (!this.levelType) {
      Player.attackTarget = {};
    }
  if (!this.dialogueUp) {
      this.npcs.forEach(function(element) {
        element.dialogueEngaged = false;
        element.body.onCollide.removeAll();
      });
    Player.attackActive = false;
    Player.canAttack = true;
    Player.engageDialogue = false;
    console.log(Player.engageDialogue);
      //sprite.rotation = game.physics.arcade.angleToPointer(sprite, pointer);    
      //  300 = 300 pixels per second = the speed the sprite will move at, regardless of the distance it has to travel    
      // if (!Player.isAttacking) {
        Player.targX = this.input.activePointer.positionDown.x + this.camera.x;
        Player.targY = this.input.activePointer.positionDown.y + this.camera.y;
      //}
      var playerWalk = this.physics.arcade.moveToXY(Player,Player.targX,Player.targY,Player.speed);
      this.faceDirection(Player,Player.targX,Player.targY);
      // var targetAngle = RPG.game.physics.arcade.angleToXY(Player,Player.targX,Player.targY);
      // Player.scale.setTo(1);
      // if (targetAngle > -0.785 && targetAngle < 0.785) {
      //   Player.animations.play(this.rgt);
      // } else if (targetAngle > 0.785 && targetAngle < 2.356) {
      //   Player.animations.play(this.fwd);
      // } else if (targetAngle > 2.356 || targetAngle < -2.356) {
      //   Player.animations.play(this.lft);
      //   if (this.levelType) {
      //     Player.scale.setTo(-1,1);
      //   }
      // } else if (targetAngle < -0.785 && targetAngle > -2.356) {
      //   Player.animations.play(this.bwd);
      // }
    }
  }
  },
  updateJSONWaypoint: function(key,tilemap,coords,type,activateOnly) { //type - null to update, true to destroy 
    var targMap = tilemap==null?this.currentLevel:tilemap;
    var mapData = this.cache.getTilemapData(targMap).data.layers[2].objects;
      for (var i=0;mapData.length>i;i++) {
        if (mapData[i].properties.quest===key) {
          console.log(mapData);
          console.log(mapData[i]);
          if (key == 's_pc_01') {
            this.removeJSONEnemy(i,'camp');
            return;
           }
           if (activateOnly) {
            mapData[i].properties.active = true;
            return;
           }
          if (!type || type==null) {
            mapData[i].properties.updateKey++;
            mapData[i].properties.active = true;
            mapData[i].x = coords[0];
            mapData[i].y = coords[1];
            console.log(mapData[i]);
          } else {
            //this.removeJSONEnemy(i,'camp');
          }
        }
      }
  },
  updateWaypoint: function(key,tilemap) {
    // update on map
    //update in JSON
    var waypoint;
    this.waypoints.forEach(function(element) {
      if (element.questKey === key) {
        console.log('SELECTED WAY POINT UNDER UPDATEWAYPOINT!!!!!');
        waypoint = element;
        waypoint.active = true;
        waypoint.updateKey++;
        if (waypoint.updateArray.length > 0) {
          var coordsKey = waypoint.updateKey>waypoint.updateArray.length?waypoint.updateKey-2:waypoint.updateKey-1;
          console.log(waypoint.updateKey);
          console.log(waypoint.updateKey>waypoint.updateArray.length?true:false);
          console.log(waypoint.updateArray[coordsKey]);
          console.log(waypoint.coords);
          waypoint.coords = waypoint.updateArray[coordsKey];
          waypoint.x = waypoint.coords[0];
          waypoint.y = waypoint.coords[1];
        }
        waypoint.activate();
        this.updateJSONWaypoint(key,this.currentLevel,waypoint.coords);
      }
    },this);

  },
  createWaypoints: function() {
    var waypointsArr = this.findObjectsByType('waypoint',this.map,'objects');
    var waypoint;
    var completedQuests;

    waypointsArr.forEach(function(element) {
          var exists = false;
          waypoint = new RPG.Waypoint(this,element.x,element.y,element.properties);
          if (element[1] === waypoint.questKey) {
            exists = true;
          }
          if (!exists) {
            this.waypoints.add(waypoint);
          }
    },this);
  },
  createNPCs: function() {
      var npcArr = this.findObjectsByType('npc',this.map,'objects');
      var npc;
    
      npcArr.forEach(function(element) {
        npc = new RPG.NPC(this,element.x,element.y,element.properties);
        this.npcs.add(npc);
      },this);
  },
  createEnemies: function() {
    var enemiesArr = this.findObjectsByType('enemy',this.map,'objects');
    var enemy;
    enemiesArr.forEach(function(element) {
      enemy = new RPG.Enemy(this,element.x,element.y,element.properties);
      this.enemies.add(enemy);
    },this);
  },
  createKeyObjects: function() { // Handles important items left behind so they're not lost to player. Instead added to map JSON for later retrieval if missed
    var keyObjs = ['golf_balls'];
    keyObjs.forEach(function(obj) {
      var objList = this.findObjectsByType(obj,this.map,'objects');
      var keyObject;
      objList.forEach(function(keyEl) {
        keyObject = new RPG.Item(this,keyEl.x,keyEl.y,keyEl.properties.type);
        this.droppedItems.add(keyObject);
      },this);
    },this);
  },
  findObjectsByType: function(targetType, tilemap, layer){
    var result = [];
    tilemap.objects[layer].forEach(function(element){
      if(element.properties.type == targetType) {
        element.y -= tilemap.tileHeight;
        element.x += tilemap.tileWidth;
        element.properties.index = tilemap.objects[layer].indexOf(element);
        result.push(element);
      }
    }, this);
    
    return result;
  },
  showHealth: function(health) {
    if (health<0) return;
    console.log('PLAYER HEALTH IS ' + health);
    var currentFull = Player.data.maxHealth - health;

    if (currentFull <= 0) {
      currentFull = Player.data.maxHealth;
      Player.data.health = Player.data.maxHealth;
    } else {
      currentFull = Player.data.maxHealth-currentFull;
    }
    //console.log(Player.data.health);
    var isOdd = currentFull % 2 === 0 ? false : true;
    currentFull = Math.floor(currentFull/2);
    console.log(isOdd);
    console.log('CURRENTFULL: ' + currentFull);

    for (var i=0;i<this.healthMonitor.length;i++) {
      this.healthMonitor[i].bringToTop();
      if (i<currentFull) {
      this.healthMonitor[i].frame = 2;
      } else {
        this.healthMonitor[i].frame = 0;
      }
    }
    if (health>0) {
      if (isOdd) {
        this.healthMonitor[currentFull].frame = 1;
      }

      if (health<=2) {
        Player.healthAlert.play();
      } else if (Player.healthAlert.isPlaying) {
        Player.healthAlert.stop();
      }
    }

  },
  changeLevel: function(player, targStage){
    Player.body.velocity.setTo(0,0);
    Player.frame = this.startFrame;
    Player.scale.setTo(1);
    var screenB = this.add.graphics(0,0);
    screenB.beginFill('#000');
    screenB.drawRect(0,0,this.game.world.width,this.game.world.height);
    screenB.alpha = 0;
    if (Player.healthAlert.isPlaying) Player.healthAlert.stop();
    var tweenA = this.add.tween(screenB).to({alpha:1},800,null).start();
    tweenA.onComplete.add(function() {
      if (!RPG.continueMusic) {
        this.music.stop();
      }
      this.stageStartX = targStage.targetPosition[0];
      this.stageStartY = targStage.targetPosition[1];
      if (targStage['function'] != undefined) RPG.eventQueue = [function() {RPG.npcFunctions[targStage['function']]()}];
     RPG.GameState.game.state.start('Game', true, false, targStage.targetMap);
    },this);
  },
  initDialogue: function(char,hasPortrait,dual,targetSpeaker,killTimer) {
    Player.animations.stop();
    Player.body.velocity.setTo(0);
    this.targetSpeaker = targetSpeaker;
    var charDialogue = false;
    var instr = false;
      this.dialogueUp = true;
      this.lineKey = 0;
    if ( Object.prototype.toString.call( char ) === '[object Array]' ) {
        this.dialogueLength = char.length;
        instr = hasPortrait==null?false:true;
        hasPortrait = false;
    } else if (Object.prototype.toString.call( char ) === '[object Object]') {
      console.log(char);
      charDialogue = true;
      this.currentCharacter = char;
      this.dialogueLength = npcDialogue[this.currentCharacter.character][this.currentCharacter.dialogueIndex][0].length;
      if (dual) {
        this.first = npcDialogue[this.currentCharacter.character][this.currentCharacter.dialogueIndex][1] === 0 ? this.currentCharacter.character : "Kenney";
        this.second = (this.first === this.currentCharacter.character) ? 'Jason Kenney' : this.currentCharacter.character;
      } else {
        this.first = this.second = this.currentCharacter.character;
      }
    }
    //create dialogue window
    var winW = this.game.width-2;
    var winH = this.game.height/3;
    var btnW = 60;
    var btnH  = 60;
    var bgColor = instr?'0x871a12':'0x000000';
    console.log('BG IS '+bgColor);
    //if (!this.talkWindow) {
      this.talkWindow = this.add.graphics(this.game.width/2,this.game.height - (winH/2+1)); //this.game.height/5.55
      this.talkWindow.lineStyle(2,0xffffff,1);
      this.talkWindow.beginFill(bgColor,1);
      this.talkWindow.drawRoundedRect(-(this.game.width-2)/2,-winH/2,winW,winH,15);
      this.talkWindow.fixedToCamera = true;
    // } else {
    //   this.talkWindow.reset(this.game.width/2,this.game.height - (winH/2+1));
    // }

    this.talkWindow.scale.setTo(0);
    this.game.sound.play('dialogue_up');
    //var that = this;
    var windowTween = this.add.tween(this.talkWindow.scale).to({x:1,y:1},200,"Quad.easeOut").start();
    windowTween.onComplete.add(function() {
      if (hasPortrait) this.charPic(char.name,dual);
      // if (!this.text) {
        this.text = this.add.text(charDialogue?40:this.game.width/2,charDialogue?(this.game.height - this.game.height/3+10):(this.game.height-(winH/2+18)),charDialogue?(this.first + ': ' + npcDialogue[this.currentCharacter.character][this.currentCharacter.dialogueIndex][0][0]):char[0],RPG.textStyle);
        this.text.lineSpacing = -7;
        this.text.wordWrap = true;
        this.text.wordWrapWidth = this.game.width-80;
        this.text.fixedToCamera = true;
      // } else {
      //   this.text.x = charDialogue?40:this.game.width/2;
      //   this.text.y = charDialogue?(this.game.height - this.game.height/3+10):(this.game.height-(winH/2+18));
      //   this.text.setText(charDialogue?(this.first + ': ' + npcDialogue[this.currentCharacter.character][this.currentCharacter.dialogueIndex][0][0]):char[0]);
      //   this.text.reset(charDialogue?40:this.game.width/2,charDialogue?(this.game.height - this.game.height/3+10):(this.game.height-(winH/2+18)));
      // }
      if (!charDialogue) {
        this.text.anchor.setTo(0.5);
      }

      if (!killTimer) {
      // generate next button
      this.nextBtn = new RPG.NextBtn(this,this.game.width - 60,this.game.height - 60);
      this.add.existing(this.nextBtn);
      this.nextBtn.events.onInputDown.add(function() {this.nextDialogue(charDialogue,char,hasPortrait)},this);
    } else {
      var that = this;
      setTimeout(function() {
        that.nextDialogue(charDialogue,char,hasPortrait);
      },killTimer);
    }
    // Pause game
    RPG.game.physics.arcade.isPaused = true;
    },this);
  },
  nextDialogue: function(charDialogueBool,alertArr,hasPortrait) {
    var dialogueKey;
    if (charDialogueBool) {
      dialogueKey = npcDialogue[this.currentCharacter.character][this.currentCharacter.dialogueIndex][0]; //make the 0 here an object-specific property. Keep active index for dialogue in object
      var speaker = this.lineKey % 2 ? this.first : this.second;
    } else {
      dialogueKey = alertArr;
    }//typeof dialogueKey == 'string' || dialogueKey instanceof String
    this.lineKey++;
    if (this.dialogueLength > this.lineKey) {
      if (typeof dialogueKey[this.lineKey] == 'string' || dialogueKey[this.lineKey]  instanceof String) {
        this.text.setText((charDialogueBool?(speaker + ': '):'') + dialogueKey[this.lineKey]);
      } else { // function or selectable text
        // console.log(typeof dialogueKey[this.lineKey]);
        if (typeof dialogueKey[this.lineKey][0] === 'function') { //check if function
          console.log(dialogueKey[this.lineKey][0]());          
          this.parseSelectableText([dialogueKey[this.lineKey][0]()]);
          this.nextBtn.inputEnabled = false;
          this.nextBtn.alpha = 0;
        } else { // if not function, then selectable text
      //parse array into selectable options
      console.log('ARRAY FIRED');
      var functionHold = npcDialogue[this.currentCharacter.character][this.currentCharacter.dialogueIndex][3]!==undefined?npcDialogue[this.currentCharacter.character][this.currentCharacter.dialogueIndex][3]:null;
      console.log(functionHold);
      console.log(npcDialogue[this.currentCharacter.character][this.currentCharacter.dialogueIndex][3]);
      this.parseSelectableText(dialogueKey[this.lineKey],functionHold);
      this.nextBtn.inputEnabled = false;
      this.nextBtn.alpha = 0;
    }
      }
      this.game.sound.play('dialogue_next');
    } else {
      if (charDialogueBool) {
        if (npcDialogue[this.currentCharacter.character][this.currentCharacter.dialogueIndex][3] != null) {
          var functionHold = npcDialogue[this.currentCharacter.character][this.currentCharacter.dialogueIndex][3];
        }
        this.currentCharacter.dialogueIndex = npcDialogue[this.currentCharacter.character][this.currentCharacter.dialogueIndex][2];

      };
      this.currentCharacter = null;
      this.dialogueUp = false;
      this.talkWindow.destroy();
      this.text.destroy();
      this.nextBtn.destroy();
      if (hasPortrait) {
        this.kenneyPortrait.kill();
        if (this.targPortrait) this.targPortrait.kill();
      }
      this.npcs.forEach(function(element) {
          element.isMoving = false;
          element.movePause = false;
          element.dialogueEngaged = false;
      },this);
      if (functionHold != undefined) {
        functionHold();
      }
      this.targetSpeaker = null;
      RPG.game.physics.arcade.isPaused = false;
      if (this.isAlert) {
        //this.initDialogue(this.acquiredQueue);
        //this.acquiredQueue = [];
        this.isAlert = false;
        Player.frame = this.startFrame;
      } else {
        Player.frame = this.startFrame;
      }
   }
   //}
  },
  parseSelectableText: function(arr,functionHold) {
    console.log(functionHold);
    this.text.kill();
    this.selectableTextGroup = this.add.group();
    var yPos = 42;
    var i = 1;
    //var functionHold = functionHold;
    arr.forEach(function(element) {
      var optionText = this.add.text(40,(this.game.height - this.game.height/2.6) + (yPos*i),'< ' + element[0] + ' >',RPG.textStyle);
      optionText.wordWrap = true;
      optionText.wordWrapWidth = this.game.width - 100;
      optionText.fixedToCamera = true;
      optionText.toIndex = element[1];
      optionText.inputEnabled = true;
      optionText.input.useHandCursor = true;
      optionText.fixedToCamera = true;
      optionText.function = functionHold!==null?functionHold:null;
      optionText.events.onInputDown.add(this.selectTextOption,this);
      this.selectableTextGroup.add(optionText);
      i++;
    },this);
  },
  selectTextOption: function(optionText) {
    this.text.reset();
    this.currentCharacter.dialogueIndex = optionText.toIndex;
    this.dialogueLength = npcDialogue[this.currentCharacter.character][this.currentCharacter.dialogueIndex][0].length;
    this.lineKey = -1;
    this.selectableTextGroup.destroy();
    this.nextBtn.inputEnabled = true;
    this.nextBtn.alpha = 1;
    this.nextDialogue(true);
    // init dialogue index's function ([3]) if exists
    if (optionText.function !== null) optionText.function();
  },
  charPic : function(charName,dual) {
    var that = this;
    portraitSetup(charName);
    if (dual) {
      charName = 'npc_jason_kenney';
      portraitSetup();
    }
    function portraitSetup() {
      var picName = 'p_' + charName;
      var picXPos = 0;
      if (charName === 'npc_jason_kenney') {
        // if (!that.kenneyPortrait) {
        //   that.kenneyPortrait = that.game.add.sprite(picXPos,(that.game.height/3*2)-2,picName);
        //   that.kenneyPortrait.anchor.setTo(0,1);
        //   that.kenneyPortrait.fixedToCamera = true;
        //   //that.portraits.add(that.kenneyPortrait);
        // }
        that.kenneyPortrait.reset(that);
      } else {
        picXPos = that.game.width-300;
        // if (!that.targPortrait) {
        //   that.targPortrait = that.game.add.sprite(picXPos,(that.game.height/3*2)-2,picName);
        //   that.targPortrait.anchor.setTo(0,1);
        //   that.targPortrait.fixedToCamera = true;
        //   //that.portraits.add(that.targPortrait);
        // }
      that.targPortrait.loadTexture(picName);
      that.targPortrait.reset(that);
      }
    }
  },
  projectileHit: function(player,projectile) {
    if (projectile.harmful) this.playerHit(projectile.data.dmg,projectile.origin.faceDirection(Player.world.x,Player.world.y,true));
    if (projectile.data.type === 'boss_klein_blast') {
      projectile.body.velocity.setTo(0);
      var anim = projectile.animations.play('explode');
      clearTimeout(projectile.crystalTimer);
      anim.onComplete.add(function() {
        projectile.kill();
      },this);
      return;
    }
    projectile.kill();
  },
  playerHit: function(dmg,hitAngle) {
    console.log("HIT ANGLE IS " + hitAngle);
    if (!Player.isHit) {
      Player.isHit = true;
      this.game.sound.play('player_hit');
      Player.data.health = Player.data.health - dmg;
      console.log("PLAYER HEALTH IS " + Player.data.health);
      this.showHealth(Player.data.health);
      if (Player.data.health <= 0) {
        //this.music.stop();
        this.game.sound.play('music_gameOver');
        this.gameOver();
      }
      if (hitAngle === 'top') {
        Player.body.velocity.y = 400;
      } else if (hitAngle === 'bottom') {
        Player.body.velocity.y = -400;
      } else if (hitAngle ==='right') {
        Player.body.velocity.x = -400;
      } else if (hitAngle === 'left') {
        Player.body.velocity.x = 400;
      }
      Player.tint = 0xffaaaa;
      var that = this;
      setTimeout(function() {
        Player.body.velocity.setTo(0);
        Player.tint = 0xffffff;
      },200);
      setTimeout(function() {
        Player.isHit = false;
      },1200);
    }
  },
  playerAttack: function() {
    console.log("STEP A");
    Player.body.velocity.setTo(0);
    if (Player.canAttack && !Player.attackTarget.isDead) {
      console.log("STEP B");
      Player.canAttack = false;
    Player.attackDirection = this.faceDirection(Player,Player.targX,Player.targY,true);
    var anim = Player.animations.play(Player.attackDirection);
    console.log("STEP C");
    if (!Player.attackTarget.invulnerable) {
      this.enemyHit();
    } else {
      if (Player.attackTarget.state === 'move') {
        //console.log('STRIKING');
        //Player.attackTarget.strike();
      }
    }
    //anim.onComplete.add(this.attackComplete,this);
    } else {
      Player.attackActive = false;
    }
  },
  enemyHit: function() {
    console.log(Player.attackTarget);
    if (!Player.attackTarget.isDead && Player.attackTarget !== null) {
        var el = Player.attackTarget;
    console.log("STEP D");
        el.isHit = true;
        this.game.sound.play(el.hitSound);
        el.health--;
        var that = this;
        el.tint = 0xffaaaa;
        if ((el.data.key === 'goblin' || el.data.key ==='dark_kenney')  && el !== null) {
          if (Player.attackDirection === 'attackFwd') {
            el.body.velocity.y = 400;
          } else if (Player.attackDirection === 'attackBwd') {
            el.body.velocity.y = -400;
          } else if (Player.attackDirection ==='attackLft') {
            el.body.velocity.x = -400;
          } else if (Player.attackDirection === 'attackRgt') {
            el.body.velocity.x = 400;
          }
        }
        if (el.data.isShooter) {
          el.data.isShooter = false;
          el.isAttacking = false;
          el.shootingTimer.stop();
        }
        if (el.health <= 0) {
          if (el.data.type === 'boss' && !el.isDead) {
                      el.isDead = true;
                      el.tint = 0xffffff;
                      el.defeated();
                      return;
          } else if (el.data.type === 'boss' && el.isDead) {
                      return;
          }
          if (el.data.key === 'orc' || el.data.key === 'goblin') {
            this.game.sound.play('enemy_death');
          }
          el.animations.play('death');
          if (el.data.key === 'crystal') {
            clearTimeout(el.deathTimer);
          }
          if ('item' in el.data) {
            droppedItem = new RPG.Item(this,el.x,el.y,el.data.item);
            this.droppedItems.add(droppedItem);
          } else if (Rnd.bit(0.4)) {
            droppedItem = new RPG.Item(this,el.x,el.y,'hearts');
            this.droppedItems.add(droppedItem);
          }
          if (el.data.isShooter) {
            el.shootingTimer.stop();
          }
          if (el.data.key !== 'crystal') this.removeJSONEnemy(el.data.index);
          this.enemies.forEach(function(targ) {
            if (targ.data.index > el.data.index) targ.data.index--;
          },this);
        }
        Player.attackActive = false;
        Player.attackTarget = {};
        Player.isAttacking = false;
        Player.canAttack = true;
        var that = this;
        setTimeout(function() {
          if (el !== null) {
            el.body.velocity.setTo(0);
          }
          if (el.health <= 0 && el.data.type !== 'boss') {
            el.isDead = true;
            //Player.attackTarget.isDead = true;
            var deathTween = that.add.tween(el).to({alpha:0},100,null).start();
            deathTween.onComplete.add(function() {
              el.destroy();
              });
          } else {
            el.tint = 0xffffff;
            el.isHit = false;
            if (el.data.type === 'boss' && el.state !== 'hover') {
              el.strike();
            }
          }
        },120);
        }
  },
  // removeJSONQuestLink(targ,tilemap) {
  //   var file = this.cache.getTilemapData(tilemap).data.layers[2].objects;
  //   file.splice(targ,1);
  // },
  removeJSONEnemy: function(targ,tilemap) { //Remove Enemey data from cached Tiled JSON file
    var targTilemap = tilemap==null?this.currentLevel:tilemap;
    var file = this.cache.getTilemapData(targTilemap).data.layers[2].objects;
    file.splice(targ,1);
  },
  // loadCollisionItems: function() {
  //   var elementsArr = this.findObjectsByType('gid',this.map,'collision');
  //   var elementsObj;

  //   elementsArr.forEach(function(element) {
  //     //console.log(element.gid);
  //     elementObj = new RPG.CollisionItem(this,element.x,element.y,element,element);
  //     console.log(elementObj);
  //     this.collisionItems.add(elementObj);
  //   },this);
  // },
  // checkCollision: function() {
  //   this.game.physics.arcade.overlap(Player,this.collisionItems,function() {
  //     if (this.tween && this.tween.isRunning && this.beginCollided) {
  //       this.tween.stop();
  //       Player.animations.play('walkFwd').stop(true);
  //       Player.scale.setTo(1);
  //       this.beginCollided = false;
  //     }
  //   },null,this);
  // },
 faceDirection: function(target,x,y,makeReturn) {
  var targetAngle = RPG.game.physics.arcade.angleToXY(target,x,y);
  target.scale.setTo(1);
  if (makeReturn) {
    var returnDirection = "";
  }
  if (targetAngle > -0.785 && targetAngle < 0.785) {
    if (makeReturn) {
      return 'attackRgt';
    } else {
      target.animations.play(this.rgt);
    }
  } else if (targetAngle > 0.785 && targetAngle < 2.356) {
    if (makeReturn) {
      return 'attackFwd';
    } else {
      target.animations.play(this.fwd);
    }
  } else if (targetAngle > 2.356 || targetAngle < -2.356) {
    if (makeReturn) {
      return 'attackLft';
    } else {
      target.animations.play(this.lft);
      if (this.levelType) {
        target.scale.setTo(-1,1);
      }
    }
  } else if (targetAngle < -0.785 && targetAngle > -2.356) {
    if (makeReturn) {
      return 'attackBwd';
    } else {
      target.animations.play(this.bwd);
    }
  }
},
// attackEnemy: function() {
//   RPG.GameState.enemies.forEach(function(el) {
//     if (el.isAttacked) {
//       PlayerAttack();
//     }
//   },RPG.GameState);
// },
  mapChangeAnimation: function() {
    Player.body.velocity.setTo(0,0);
    Player.frame = 0;
    Player.scale.setTo(1);
    this.camera.fade('#fff');
    this.camera.onFadeComplete.add(this.changeLevel,this);
    // this.screenA.bringToTop();
    // var tweenA = this.add.tween(this.screenA).to({alpha:1},600,null).start();
    // tweenA.onComplete.add(this.changeLevel);
  },
  collectItem: function(el,targ) {
    // pickup item
    if (targ.targetFunction) {
      RPG.npcFunctions[targ.targetFunction]();
      targ.destroy();
      return;
    }
    targ.removeItem();
    // Player.data.health = Player.data.health + 2;
    // this.game.sound.play('heart'); 
    // this.showHealth();
  },
  initInventory: function() {
    if (this.invAlertGroup != null) {
      this.invAlertGroup.destroy();
    }
    this.inventoryOverlay = this.add.group();
    this.menuGroup = this.add.group();
    var winW = this.game.width-40;
    var winH = this.game.height-this.game.height/4;
    this.invWindow = this.add.graphics(0,0);
    this.invWindow.lineStyle(2,0xffffff,1);
    this.invWindow.beginFill('#000',0.8);
    this.invWindow.drawRoundedRect(20,this.game.height/3.8-20,winW,winH,15);
    this.questBtn = this.add.button(this.game.width-380,28,'questMenuBtn',this.callQuestMenu,this,1,0,0);
    this.invBtn = this.add.button(this.game.width-250,28,'invMenuBtn',this.callInvMenu,this,1,0,0);
    this.invWindow.fixedToCamera = true;
    this.invBtn.fixedToCamera = true;
    this.questBtn.fixedToCamera = true;
    this.inventoryOverlay.add(this.invWindow);
    this.inventoryOverlay.add(this.invBtn);
    this.inventoryOverlay.add(this.questBtn);
    this.inventoryOverlay.add(this.menuGroup);
    if (Player.newItems > 0) {
      console.log('create item icon');
      this.displayInvAlert('items');
    }
    if (Player.newQuests > 0) {
      console.log('create quests icon');
      this.displayInvAlert('quests');
    }
    this.callInvMenu();
  },
  callMenu: function() {
    Player.body.velocity.setTo(0);
    Player.animations.stop(true);
    Player.frame = this.startFrame;

    if (!this.inventoryUp) {
      RPG.game.physics.arcade.isPaused = true;
      this.inventoryUp = true;
      //this.invWindow.alpha = 1;
      this.inventoryBtn.setFrames(2,2,2);
      this.inventoryBtn.bringToTop();
      //var screenUp = this.add.tween(this.screenA).to({alpha:0.35},200,null).start();
      //screenUp.onComplete.add(function() {
        this.screenA.alpha = 0.35;
        this.initInventory();
      //},this);
    } else {
      RPG.game.physics.arcade.isPaused = false;
      this.inventoryUp = false;
      this.screenA.alpha = 0;
      this.inventoryBtn.setFrames(1,0,0);
      this.inventoryOverlay.destroy(true);
      if (this.invAlertGroup != null) {
        this.invAlertGroup.destroy();
      }
      //this.invWindow.destroy();
    }


  },
  callInvMenu: function() {
    this.menuGroup.removeChildren();
    Player.newItems = 0;
    this.questBtn.setFrames(1,0,0);
    this.invBtn.setFrames(1,1,1);
    var items = Player.data.items;
    var xStart = 60;
    var rowW = xStart;
    var Ypos = this.game.height/4+20;
    var Xpos = 110;
    var rows = 0;
    var column = 0;
    var maxW = xStart+(this.game.width/3)*2;
    items.forEach(function(el) {
      rowW = rowW+Xpos;
      if (rowW >= maxW) {
        column = 0;
        rows++;
        rowW = xStart;
      }
      var invItem = this.add.sprite(xStart+(Xpos*column),Ypos+(Xpos*rows),el);
      invItem.fixedToCamera = true;
      invItem.inputEnabled = true;
      invItem.input.useHandCursor = true;
      invItem.events.onInputDown.add(function(){this.itemInfo(el)},this);
      this.menuGroup.add(invItem);
      column++;
    },this);
  },
  itemInfo : function(it) {
    console.log(RPG.itemsList[it][1]);
    if (this.itemText) {
      this.itemText.setText = RPG.itemsList[it][1];
    } else {
      this.itemText = this.add.text(60,this.game.height-(this.game.height/3.2),RPG.itemsList[it][1],RPG.textStyle);
      this.itemText.wordWrap = true;
      this.itemText.wordWrapWidth = this.game.width - 120;
      this.itemText.fixedToCamera = true;
      this.menuGroup.add(this.itemText);
    }
  },
  callQuestMenu: function() {
    this.menuGroup.removeChildren();
    console.log('call Quests');
    Player.newQuests = 0;
    this.questBtn.setFrames(1,1,1);
    this.invBtn.setFrames(1,0,0);
    var quests = Player.data.quests;
    var lineWidth = 40;
    var textY = this.game.height/5 + lineWidth;
    quests.forEach(function(el) {
      console.log(el);
      var questEntry = this.add.text(60,textY,'•  '+el[0],el[2]?RPG.completedStyle:RPG.textStyle);
      questEntry.fixedToCamera = true;
      lineWidth = lineWidth + 50;
      textY = this.game.height/5 + lineWidth;
      this.menuGroup.add(questEntry);
    },this);
  },
  displayInvAlert : function(num) {
    if (this.invAlertGroup == null) {
        this.invAlertGroup = this.add.group();
      }
    var xPos = 0;
    var invInternal = false;
    if (isNaN(num)) {
      invInternal = true;
      if (num === 'items') {
        num = Player.newItems;
        console.log("ITEMS NUM IS " + num);
        xPos = this.game.width-130;
      } else if (num === 'quests') {
        num = Player.newQuests;
        console.log("QUESTS NUM IS " + num);
        xPos = this.game.width-260;
      }
    } else {
      xPos = this.game.width-35;
    }
      var invAlertIcon = this.add.graphics(xPos,20);
      invAlertIcon.beginFill(0xcf3928,1);
      invAlertIcon.drawCircle(0,0,30);
      var alertText = this.add.text(xPos,20,num,RPG.textStyle);
      alertText.scale.setTo(0.55);
      alertText.anchor.setTo(0.5);
      invAlertIcon.fixedToCamera = true;
      alertText.fixedToCamera = true;
      if (!invInternal) {
        this.invAlertGroup.add(invAlertIcon);
        this.invAlertGroup.add(alertText);
      } else {
        this.inventoryOverlay.add(invAlertIcon);
        this.inventoryOverlay.add(alertText);
      }
  },
  removeQuest:function(targ,won) {
    //classify quest data for sending and set quest to complete 
    RPG.continueData.fbData.quests = '';
    var wonMsg = 'Quest lost...';
    if (won==null || won === true) {
      Player.data.quests.forEach(function(i) {
        if (i[1] === targ) {
          i[2] = 1;
        }
      var targQuest = '['+i[1]+','+i[2]+'],';
      var newString = RPG.continueData.fbData.quests.concat(targQuest);
      RPG.continueData.fbData.quests = newString;
    },this);
      wonMsg = 'Quest Completed!';
    }
    this.initDialogue([wonMsg]);


    //var string = RPG.continueData.fbData.quests;
    //RPG.continueData.fbData.quests = string.toString();

    //send data to sever
    var fbRef = RPG.firebase.database();
    fbRef = fbRef.ref('/Data');
    var existingData = fbRef.child(RPG.continueData.fbKey);
    existingData.update(RPG.continueData.fbData);

    // this.updateJSONWaypoint(targ,'camp',)

    this.saveGame();

  },
  checkLevelType: function(currLev) {
    for (var i=0;RPG.levelType.length>i;i++) {
      if (currLev === RPG.levelType[i]) {return true};
    };
    return false;
  },
  removeTiles: function(tileIDs,tileLayer,reset,map,tileSwitch) { //[array of IDs],layer number 1 - collision, 2 - objects 3 - foreground, reset - boolean
    Player.body.velocity.setTo(0);
    Player.animations.stop(true);
    Player.frame = this.startFrame;
    RPG.game.physics.arcade.isPaused = true;
    var targetMap = map==null?this.currentLevel:map;
    var swapTile = tileSwitch==null?0:tileSwitch;
    var targetTile;
    var file = this.cache.getTilemapData(targetMap).data.layers[tileLayer].data;
    for (var i=0;tileIDs.length>i;i++) {
      console.log(tileIDs[i]);
      targetTile = file.indexOf(tileIDs[i]);
      file[targetTile] = swapTile;
    };
    if (reset) {
      this.changeLevel(Player,{targetPosition:[Player.x,Player.y],targetMap:this.currentLevel});
    }
  },
  hasQuest: function(quest) {
    for (var i=0;Player.data.quests.length>i;i++) {
      if (Player.data.quests[i][1]===quest) return true;
    };
    return false;
  },
  setJSONDialogueIndex: function(char,index,tileMap) { // provide character's data.character value, provide desired index, provide target tileMap if not current one
    var targetTileMap = tileMap==null?this.currentLevel:tileMap;
    console.log(targetTileMap);
    var file = this.cache.getTilemapData(targetTileMap).data.layers[2].objects;
    if (isNaN(char)) {
    file.forEach(function(targ) {
          if (targ.properties.character === char) {
            targ.properties.dialogueIndex = index;
          }
        },this);
} else {
          for (var i=0;file.length>i;i++) {
            if (i === char) {
            file[i].properties.dialogueIndex = index;
            }
          }

}
  },
  retrieveJSONIndex : function(char,tileMap) {
    var targetTileMap = tileMap==null?this.currentLevel:tileMap;
    var file = this.cache.getTilemapData(targetTileMap).data.layers[2].objects;
    for (var i=0;file.length>i;i++) {
        if (file[i].properties.character === char) return i;
    }
  },
  checkQuest: function(q,status) { //status: 0:present, 1:present and completed
        var el = Player.data.quests;
        for (var i=0;el.length>i;i++) {
            if (el[i][1] === q ) {
               if (status==null) {
                return true;
            } else if (el[i][2]===status) {
                return true;
            }
            }
        };
        console.log('FALSE!');
        return false;
  },
  callInstruction: function(type) {//intro,attack,boss,selection
    RPG.instrBools[type] = true;
    var instrText = [];
    if (type==='intro') {
      instrText = [
        'Complete quests to win the support of potential PC Alberta and Wildrose supporters. Kenney will need their support during the leadership convention.',
        'The party logos in the top left track your progress. Logos will light up as you win support from a party.',
        'Items collected and quest information can be viewed by clicking/tapping on the Inventory button in the top right.',
        'Move around by clicking/tapping anywhere on the map.',
        'Talk to people by clicking/tapping on them.',
        'Follow red arrows on the screen to new quests. Yellow arrows indicate where to go next in an active quest.'
      ];
    } else if (type==='attack') {
      instrText = ['Attack enemies by clicking/tapping on them repeatedly. Watch that your health doesn\'t empty out.',
                  'If you\'re bested by a foe, you can continue from your current level with full health.',
                  'Restore your health at the bbq stalls in the camp.']
    } else if (type==='boss') {
      instrText = ['Your foe is vulnerable only while he\'s recharging. Attack him then!'];
    } else if (type==='boss_begin') {
      instrText = ['Break the ice formed from your foe\'s freeze blasts to restore health!'];
    } else {
      instrText = ['Make a selection.'];
    }
    this.initDialogue(instrText,true);

  },
  gameOver: function() {
    Player.healthAlert.stop();
    this.enemies.forEach(function(el) {
      if (el.data.isShooter) el.shootingTimer.stop();
    },this);
    if (this.currentLevel === 'final_boss' || this.currentLevel === 'q_pc_b_cave') {
      this.enemies.children[0].state === 'hover';
      this.enemies.children[0].alpha = 0;
      RPG.npcFunctions.boss.isDead = true;
    } else {
      this.enemies.destroy();
    }
    this.enemyProjectiles.destroy();
    this.dialogueUp = true;
    this.camera.follow(null);
    Player.animations.play('death');
    this.game.sound.play('death');
    Player.body.velocity.setTo(0);
    this.inventoryBtn.kill();
    Player.bringToTop();
    this.add.tween(this.music).to({volume:0},800).start();
    var fadeTween = this.add.tween(this.screenA).to({alpha:1},800,null).start();
    fadeTween.onComplete.add(function() {
      var deathTween = this.add.tween(Player).to({y:this.camera.y + this.game.height/2,x:this.camera.x + this.game.width/2},1600,"Quad.easeOut").start();
      deathTween.onComplete.add(function() {
        var gameOverText = this.add.text(this.camera.x + this.game.width/2,this.camera.y + 150,'Game Over',RPG.textStyle);
        gameOverText.scale.setTo(1.2,1.2);
        gameOverText.anchor.setTo(0.5);
        gameOverText.align = 'center';
        gameOverText.anchor.setTo(0.5,0.5);
          Player.animations.stop();
          Player.frame=10;

          if (this.currentLevel === 'final_boss') {
            // var tileSet = JSON.parse(localStorage.getItem('final_boss'));
            // this.cache.getTilemapData('final_boss').data = tileSet.data;
            RPG.npcFunctions.boss.shootingTimer.stop();
            RPG.npcFunctions.boss.isDead = true;
            this.enemies.children[0].alpha = 0;
            RPG.npcFunctions.boss.rechargeAudio.stop();
            RPG.npcFunctions.boss.destroy();
          }

          var continueText = this.add.text(this.camera.x + this.game.width/2,this.camera.y + this.game.height/1.4,'<Continue?>',RPG.textStyle);
          continueText.wordWrap = true;
          continueText.align = 'center';
          continueText.anchor.setTo(0.5);
          continueText.inputEnabled = true;
          continueText.input.useHandCursor = true;
          continueText.events.onInputDown.add(continueGame,this);
        // },500);
      },this);
    },this);

    function continueGame() {
      this.continue = true;
      if (this.currentLevel === 'final_boss') {
          RPG.eventQueue = [function() { RPG.npcFunctions.final_boss(); }];
          // RPG.npcFunctions.boss.shootingTimer.stop();
          RPG.continueData.fbData.continues.final++;
          // restore old tilemap
          var newTilemap = JSON.parse(RPG.final_boss_continue);
          console.log('!!!' + newTilemap);
          //newTilemap = newTilemap.data;
          this.cache.getTilemapData('final_boss').data = newTilemap;

      } else if (this.currentLevel === 'q_pc_b_cave') {
          this.setJSONDialogueIndex('Ralph Klein',0);
          RPG.eventQueue = [function() { RPG.npcFunctions.boss_klein(); }];
          RPG.continueData.fbData.continues.klein++;
      } else {
          RPG.continueData.fbData.continues.regular++;
      }
      Player.data.fbData = RPG.continueData.fbData;
      var fbRef = RPG.firebase.database();
      fbRef = fbRef.ref('/Data').child(RPG.continueData.fbKey);
      fbRef.set(RPG.continueData.fbData);

      Player.data.health = Player.data.maxHealth;
      this.game.sound.play('key');
      this.changeLevel(Player,{'targetMap':this.currentLevel,'targetPosition':[this.startX,this.startY]});

    }
  }
};