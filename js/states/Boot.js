var RPG=RPG||{},config={apiKey:"AIzaSyC3K1AvPXXmotMKR6fANw4ZrQ2yN-tggsk",authDomain:"fir-counter-6b984.firebaseapp.com",databaseURL:"https://fir-counter-6b984.firebaseio.com",storageBucket:"fir-counter-6b984.appspot.com",messagingSenderId:"1055237306143"};RPG.firebase=firebase,RPG.firebase.initializeApp(config),RPG.BootState={init:function(){this.game.stage.backgroundColor="#fff",this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,this.scale.pageAlignHorizontally=!0,this.scale.pageAlignVertically=!0,this.game.physics.startSystem(Phaser.Physics.ARCADE),Webfontconfig={active:function(){game.time.events.add(Phaser.Timer.SECOND,createText,this)},google:{families:["VT323"]}}},preload:function(){this.load.image("logo","assets/images/np_logo.jpg"),this.load.image("bar","assets/images/bar.jpg"),this.load.image("kq_logo","assets/images/logo.png");},create:function(){this.state.start("Init")}};