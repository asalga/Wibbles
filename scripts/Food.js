/*
	Food
*/
define('Food', ['PIXI', 'settings'], function(PIXI, settings){

	var Food = function(options){
		var _this = this;
		var cellPosition = {x: -1, y: -1};
		var stage = options.stage;

		var foodTexture = new PIXI.Texture.fromImage('resources/images/sprites/food.jpg');
		var sprite = new PIXI.Sprite(foodTexture);

		this.setGridPosition = function(x, y){
			cellPosition.x = x;
			cellPosition.y = y;

			sprite.position.x = cellPosition.x;
			sprite.position.y = cellPosition.y;
		};

		this.setGridPosition(20, 20);

		stage.addChild(sprite);

		this.getCellX = function(){
			return cellPosition.x;
		};

		this.getCellY = function(){
			return cellPosition.y;
		};
	};

	return Food;
});
