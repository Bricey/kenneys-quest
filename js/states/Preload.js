var RPG=RPG||{},Player={};RPG.PreloadState={preload:function(){this.logo=this.add.sprite(this.game.world.centerX,this.game.world.centerY-60,"logo"),this.logo.anchor.setTo(.5),this.logo.scale.setTo(.5),this.preloadBar=this.add.sprite(this.game.world.centerX-50,this.game.world.centerY,"bar"),this.preloadBar.anchor.setTo(0,.5),this.preloadBar.scale.setTo(.73,.5),this.load.setPreloadSprite(this.preloadBar),this.load.spritesheet("player","assets/images/player_sprite.png",60,60,36),this.load.spritesheet("npc_01","assets/images/npc_01.png",60,60),this.load.spritesheet("npc_02","assets/images/npc_02.png",60,60),this.load.spritesheet("npc_03","assets/images/npc_03.png",60,60),this.load.spritesheet("npc_04","assets/images/npc_04.png",60,60),this.load.spritesheet("npc_05","assets/images/npc_05.png",60,60),this.load.spritesheet("npc_06","assets/images/npc_06.png",60,60),this.load.spritesheet("npc_07","assets/images/npc_07.png",60,60),this.load.spritesheet("npc_08","assets/images/npc_08.png",60,60),this.load.spritesheet("npc_09","assets/images/npc_09.png",60,60),this.load.spritesheet("npc_10","assets/images/npc_10.png",60,60),this.load.spritesheet("npc_11","assets/images/npc_11.png",60,60),this.load.spritesheet("npc_12","assets/images/npc_12.png",60,60),this.load.spritesheet("npc_14","assets/images/npc_14.png",60,60),this.load.spritesheet("npc_cow","assets/images/npc_cow.png",160,160),this.load.spritesheet("npc_bovina","assets/images/npc_bovina.png",160,160),this.load.spritesheet("npc_brian_jean","assets/images/npc_brian_jean.png",60,80),this.load.spritesheet("npc_rick_mciver","assets/images/npc_rick_mciver.png",60,60),this.load.spritesheet("npc_alison_redford","assets/images/npc_alison_redford.png",60,60),this.load.spritesheet("goblin","assets/images/goblin.png",60,60),this.load.spritesheet("orc","assets/images/orc.png",80,80),this.load.spritesheet("npc_dark_kenney","assets/images/dark_kenney.png",60,60),this.load.spritesheet("nextBtn","assets/images/nextBtn.png",60,60),this.load.spritesheet("hearts","assets/images/hearts.png",36,36),this.load.spritesheet("explosion","assets/images/explosion.png",80,80),this.load.image("mapChange","assets/images/mapChange.png"),this.load.image("bullet","assets/images/bullet.png"),this.load.spritesheet("questMenuBtn","assets/images/questsMenuBtn.png",120,80),this.load.spritesheet("invMenuBtn","assets/images/invMenuBtn.png",120,80),this.load.spritesheet("closeMenuBtn","assets/images/closeMenuBtn.png",120,80),this.load.spritesheet("partyLogos","assets/images/party_logos.png",90,60),this.load.spritesheet("invBtn","assets/images/invBtn.png",96,100),this.load.spritesheet("items","assets/images/items.png",100,100),this.load.spritesheet("boss_klein","assets/images/boss_klein.png",180,240),this.load.spritesheet("boss_klein_blast","assets/images/boss_klein_blast.png",40,40),this.load.spritesheet("giga_candidate","assets/images/giga_candidate.png",220,240),this.load.spritesheet("missile","assets/images/missile.png",60,60),this.load.image("p_npc_brian_jean","assets/images/p_npc_brian_jean.png"),this.load.image("p_npc_stephen_khan","assets/images/p_npc_stephen_khan.png"),this.load.image("p_npc_jason_kenney","assets/images/p_npc_jason_kenney.png"),this.load.image("p_npc_rick_mciver","assets/images/p_npc_rick_mciver.png"),this.load.image("p_npc_jim_prentice","assets/images/p_npc_jim_prentice.png"),this.load.image("p_orc","assets/images/p_orc.png"),this.load.image("p_npc_alison_redford","assets/images/p_npc_alison_redford.png"),this.load.image("p_npc_naheed_nenshi","assets/images/p_npc_naheed_nenshi.png"),this.load.image("p_npc_dark_kenney","assets/images/p_npc_dark_kenney.png"),this.load.image("p_npc_jim_prentice","assets/images/p_npc_jim_prentice.png"),this.load.image("p_npc_justin_trudeau","assets/images/p_npc_justin_trudeau.png"),this.load.image("p_npc_donna_glans","assets/images/p_npc_donna_glans.png"),this.load.image("p_npc_cow","assets/images/p_npc_cow.png"),this.load.image("p_npc_bovina","assets/images/p_npc_bovina.png"),this.load.image("p_npc_angus_steersworth","assets/images/p_npc_angus_steersworth.png"),this.load.image("p_npc_princess_brahman","assets/images/p_npc_princess_brahman.png"),this.load.image("p_npc_peter_lougheed","assets/images/p_npc_peter_lougheed.png"),this.load.image("p_npc_richard_starke","assets/images/p_npc_richard_starke.png"),this.load.image("p_npc_byron_nelson","assets/images/p_npc_byron_nelson.png"),this.load.image("p_npc_sandra_jansen","assets/images/p_npc_sandra_jansen.png"),this.load.image("p_npc_stephen_harper","assets/images/p_npc_stephen_harper.png"),this.load.image("p_npc_rachel_notley","assets/images/p_npc_rachel_notley.png"),this.load.image("shadow","assets/images/shadow.png"),this.load.image("crater","assets/images/crater.png"),this.load.image("light","assets/images/light.png"),this.load.spritesheet("iron_key","assets/images/iron_key.png",100,100),this.load.spritesheet("static_npcs","assets/images/static_npcs.png",60,60),this.load.image("door","assets/images/door.png"),this.load.image("sword","assets/images/sword.png"),this.load.image("kq_logo","assets/images/logo.png"),this.load.spritesheet("npc_stephen_harper","assets/images/npc_stephen_harper.png",60,60),this.load.spritesheet('trucks','assets/images/trucks_spritesheet.png',120,240),this.load.spritesheet("intro_wall","assets/images/intro_wall.png",60,120),this.load.spritesheet("intro_truck","assets/images/intro_truck.png",240,150),this.load.spritesheet("intro_ground","assets/images/intro_ground.png",60,120),this.load.spritesheet("npc_sandra_jansen","assets/images/npc_sandra_jansen.png",60,60),this.load.spritesheet("npc_naheed_nenshi","assets/images/npc_naheed_nenshi.png",60,60),this.load.spritesheet("npc_byron_nelson","assets/images/npc_byron_nelson.png",60,60),this.load.spritesheet("npc_donna_glans","assets/images/npc_donna_glans.png",60,60),this.load.spritesheet("npc_richard_starke","assets/images/npc_richard_starke.png",60,60),this.load.spritesheet("npc_justin_trudeau","assets/images/npc_justin_trudeau.png",60,80),this.load.image("mountain","assets/images/intro_bg_mountain.png"),this.load.image("truck_black","assets/images/truck_black.png"),this.load.image("truck_blue","assets/images/truck_blue.png"),this.load.image("truck_yellow","assets/images/truck_yellow.png"),this.load.image("truck_orange","assets/images/truck_orange.png"),this.load.image("truck_green","assets/images/truck_green.png"),this.load.image("giga_light","assets/images/giga_light.png"),this.load.image("notley_dragon","assets/images/notley_dragon.png"),this.load.spritesheet("fire","assets/images/fire.png",60,60),this.load.spritesheet("npc_peter_lougheed","assets/images/npc_peter_lougheed.png",90,90),this.load.spritesheet("npc_bbq","assets/images/npc_bbq.png",60,60),this.load.spritesheet("soldier_flag","assets/images/soldier_flag.png",140,155),this.load.spritesheet("waypoint","assets/images/waypoints.png",40,60),this.load.spritesheet("npc_stephen_khan","assets/images/npc_stephen_khan.png",60,60),this.load.audio("sfx_engine","assets/audio/sfx/sfx_engine.mp3"),this.load.audio("dialogue_up","assets/audio/sfx/sfx_dialogue_up.mp3"),this.load.audio("dialogue_next","assets/audio/sfx/sfx_dialogue_next.mp3"),this.load.audio("player_hit","assets/audio/sfx/sfx_player_hit.mp3"),this.load.audio("enemy_hit","assets/audio/sfx/sfx_enemy_hit.mp3"),this.load.audio("projectile","assets/audio/sfx/sfx_projectile.mp3"),this.load.audio("heart","assets/audio/sfx/sfx_heart.mp3"),this.load.audio("enemy_death","assets/audio/sfx/sfx_enemy_death.mp3"),this.load.audio("player_walking","assets/audio/sfx/sfx_player_walk.mp3"),this.load.audio("music_dungeon","assets/audio/music/music_dungeon.mp3"),this.load.audio("music_camp","assets/audio/music/music_camp.mp3"),this.load.audio("music_pastoral","assets/audio/music/music_pastoral.mp3"),this.load.audio("music_gameOver","assets/audio/music/music_gameOver.mp3"),this.load.audio("music_acquired","assets/audio/music/music_acquired.mp3"),this.load.audio("music_success","assets/audio/music/music_success.mp3"),this.load.audio("music_boss","assets/audio/music/music_boss.mp3"),this.load.audio("music_spooky","assets/audio/music/music_spooky.mp3"),this.load.audio("music_mainTheme","assets/audio/music/music_mainTheme.mp3"),this.load.audio("music_intro","assets/audio/music/music_intro.mp3"),this.load.audio("life_refill","assets/audio/sfx/sfx_life_refill.mp3"),this.load.audio("orc_attack","assets/audio/sfx/sfx_orc_attack.mp3"),this.load.audio("ice_blast","assets/audio/sfx/sfx_ice_blast.mp3"),this.load.audio("break","assets/audio/sfx/sfx_break.mp3"),this.load.audio("boss_hit","assets/audio/sfx/sfx_boss_hit.mp3"),this.load.audio("boss_death","assets/audio/sfx/sfx_boss_death.mp3"),this.load.audio("freeze","assets/audio/sfx/sfx_freeze.mp3"),this.load.audio("recharge","assets/audio/sfx/sfx_recharge.mp3"),this.load.audio("power_down","assets/audio/sfx/sfx_power_down.mp3"),this.load.audio("explosion","assets/audio/sfx/sfx_explosion.mp3"),this.load.audio("missile_explode","assets/audio/sfx/sfx_missile_explode.mp3"),this.load.audio("rumbling","assets/audio/sfx/sfx_rumbling.mp3"),this.load.audio("music_boss_assemble","assets/audio/music/music_boss_assemble.mp3"),this.load.audio("ascension","assets/audio/sfx/sfx_ascension.mp3"),this.load.audio("death","assets/audio/sfx/sfx_death.mp3"),this.load.audio("low_hp","assets/audio/sfx/sfx_lowhp.mp3"),this.load.audio("start_game","assets/audio/sfx/sfx_start_game.mp3"),this.load.audio("sword_shine","assets/audio/sfx/sfx_sword_shine.mp3"),this.load.audio("key","assets/audio/sfx/sfx_key.mp3"),this.load.audio("music_finale","assets/audio/music/music_finale.mp3"),this.load.audio("roar","assets/audio/sfx/sfx_roar.mp3"),this.load.tilemap("camp","assets/levels/camp.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("forest_a","assets/levels/forest_a.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("mountain_a","assets/levels/mountain_a.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("q_wr_a","assets/levels/q_wr_a.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("q_pc_b","assets/levels/q_pc_b.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("q_pcwr_aa","assets/levels/q_pcwr_aa.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("q_pcwr_ab","assets/levels/q_pcwr_ab.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("q_pcwr_ab_hut","assets/levels/q_pcwr_ab_hut.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("q_pc_b_cave","assets/levels/q_pc_b_cave.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("camp_pc_01","assets/levels/camp_pc_01.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("camp_wr_01","assets/levels/camp_wr_01.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("final_boss","assets/levels/final_boss.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("q_pcwr_b","assets/levels/q_pcwr_b.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("q_wr_ba","assets/levels/q_wr_ba.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("q_wr_bb","assets/levels/q_wr_bb.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("trudeau_hut","assets/levels/trudeau_hut.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("moon","assets/levels/moon.json",null,Phaser.Tilemap.TILED_JSON),this.load.tilemap("camp_wr_04","assets/levels/camp_wr_04.json",null,Phaser.Tilemap.TILED_JSON),this.load.image("camp_tiles","assets/levels/mainCamp_tileset.png"),this.load.script("webfont","//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js")},create:function(){this.tilemaps=[,"camp","forest_a","mountain_a","q_wr_a","q_pc_b","q_pcwr_aa","q_pcwr_ab","q_pcwr_ab_hut","q_pc_b_cave","camp_pc_01","camp_wr_01","final_boss","q_pcwr_b","q_wr_ba","q_wr_bb","trudeau_hut","moon","camp_wr_04"],RPG.completedStyle={font:"bold 32px VT323",fill:"#4b4b4b"},RPG.quests={q_pc_b:"Head west to oil sands to use the iron key.",q_wr_a:"Locate Alison Redford in the mountains.",q_wr_b:"Defeat Wildrose's leader in cowboy contest.",q_pcwr_b:"Prove to Albertans you're not just a carpetbagger.",q_pcwr_a:"Locate and aid lost PC and Wildrose soldiers.",q_pc_final:"Head to the PC leadership convention."},RPG.continueMusic=!1,RPG.crystal={key:"crystal",name:"boss_klein_blast",type:"crystal",dialogueIndex:0,isShooter:!1,alertRange:0,static:!0},RPG.itemsList={iron_key:["Iron key","A rusted iron key given to you by Peter Lougheed's statue for a secret door located in the oil sands."],sword:["Sacred Sword","Forged at the time of the great uniting of the federal conservative parties, I will use this sacred weapon to lead the right here at home."]},RPG.levelType=["camp","camp_pc_01","camp_wr_01","q_pcwr_b","moon","q_wr_bb","camp_wr_04"],RPG.instrBools={intro:!1,attack:!1,boss:!1,selection:!1},this.playerData={items:["sword"],quests:[],health:10,maxHealth:10,attack:10,defense:1,pcSupport:0,wrSupport:0,maxSupport:3,character:"Jason Kenney",dialogueIndex:0,name:"npc_jason_kenney",continue:!1,fbKey:"",fbData:{start:0,continue:0,final_boss:0,quests:"",trudeau:1,continues:{regular:0,klein:0,final:0}}},RPG.eventQueue=[],RPG.eventQueue=[function(){RPG.npcFunctions.intro()}],RPG.GameState.stageStartX=1090,RPG.GameState.stageStartY=140,this.state.start("Intro")}};