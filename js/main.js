document.oncontextmenu=function(){return!1};var RPG=RPG||{};RPG.dim=RPG.getGameLandscapeDimensions(940,600),RPG.game=new Phaser.Game(RPG.dim.w,RPG.dim.h,Phaser.CANVAS),RPG.game.state.add("Boot",RPG.BootState),RPG.game.state.add("Init",RPG.InitState),RPG.game.state.add("Preload",RPG.PreloadState),RPG.game.state.add("Intro",RPG.IntroState),RPG.game.state.add("Game",RPG.GameState),RPG.game.state.start("Boot");