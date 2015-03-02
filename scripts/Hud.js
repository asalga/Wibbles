/*
	HUD
*/
define('Hud', ['PIXI'], function(PIXI){

	var Hud = function(options){
		var _this = this;
		
		var stage = options.stage;

		var SammyTitle;
		var livesText;
		
		var scoreTitle;
		var scoreValue;

		var setup = function(){

			var font = {font: "2pt Perfect", align: "right"};

			SammyTitle = new PIXI.BitmapText("SAMMY-->  Lives:", font);
			SammyTitle.position.x = 40;
			SammyTitle.position.y = 0;
			stage.addChild(SammyTitle);

			livesText = new PIXI.BitmapText("0", font);
			livesText.position.x = 58;
			livesText.position.y = 0;
			stage.addChild(livesText);

			scoreTitle = new PIXI.BitmapText("SCORE:", font);
			scoreTitle.position.x = 65;
			scoreTitle.position.y = 0;
			stage.addChild(scoreTitle);

			scoreValue = new PIXI.BitmapText("000000", font);
			scoreValue.position.x = 73;
			scoreValue.position.y = 0;
			stage.addChild(scoreValue);
		};

		// Font
		var fontLoader = new PIXI.AssetLoader(['resources/font/font.fnt']);
		fontLoader.onComplete = setup;
		fontLoader.crossorigin = true;
		fontLoader.load();
	};

	return Hud;
});
