var RPG = RPG || {};

RPG.InitState = {
	init: function() {
		this.load.script("webfont","//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js");
		RPG.textStyle={font:"bold 32px VT323",fill:"#fff"};

	},
	preload: function() {
		this.load.image("kq_logo","assets/images/logo.png");
	},
	create: function() {
		this.game.stage.backgroundColor = '#000';
		this.logo = this.game.add.sprite(this.game.world.centerX, 10,'kq_logo');
		this.logo.anchor.setTo(0.5,0);
		this.logo.scale.setTo(0.48);
		this.clickBegin = this.add.text(this.game.world.centerX,this.game.world.centerY+40,'Click to begin',RPG.textStyle);
		this.clickBegin.inputEnabled = true;
		this.clickBegin.anchor.setTo(0.5);
		this.clickBegin.input.useHandCursor = true;
		this.clickBegin.events.onInputDown.add(this.onSelect,this);
		this.flash(this.clickBegin);
		this.copyrightInfo = this.add.text(this.game.world.centerX,this.game.height-20,'c. 2016 National Post',RPG.textStyle);
		this.copyrightInfo.scale.setTo(0.75);
		this.copyrightInfo.anchor.setTo(0.5);

	},
	flash: function(targ) {
		var that = this;
		this.j = setTimeout(function() {
			var alpha = targ.alpha===0?1:0;
			targ.alpha = alpha;
		that.flash(targ);
		},600)
	},
	onSelect: function() {
		this.clickBegin.events.onInputDown.removeAll();
		RPG.game.state.start("Preload");
	}

}