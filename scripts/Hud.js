/*
	HUD
*/
define('Hud', ['PIXI'], function(PIXI){
	"use strict";

	var Hud = function(options){

		if (!(this instanceof Hud)) {
			throw new TypeError("Hud ctor can't be called as a function.");
		}

		var _this = this;
		
		var stage = options.stage;

		var sammyTitle;
		var livesText;
		
		var scoreTitle;
		var scoreValue;

		/*

		*/
		var setup = function(){

			var font = {font: "2pt Perfect", align: "right"};

			sammyTitle = new PIXI.BitmapText("SAMMY-->  Lives:", font);
			sammyTitle.position.x = 40;
			sammyTitle.position.y = 0;
			stage.addChild(sammyTitle);

			livesText = new PIXI.BitmapText("123", font);
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

		/*
			TODO: fix, allow settings score for more than snake
		*/
		this.setScore = function(value){
			scoreValue.text = formatScore(value);
			scoreValue.dirty = true;
		};

		/*
			in:  123
			out: "000123"

			TODO: 	fix literal 6
					move to utils
		*/
		var formatScore = function(value){
			var strValue = value.toString();
			
			while(strValue.length < 6){
				strValue = '0' + strValue;
			}

			return strValue;
		};

		// Font
		var fontLoader = new PIXI.AssetLoader(['resources/font/font.fnt']);
		fontLoader.onComplete = setup;
		fontLoader.crossorigin = true;
		fontLoader.load();
	};

	return Hud;
});
