/*
	Food
*/
define('Food', ['PIXI', 'settings'], function(PIXI, settings){

	var Food = function(options){
		var _this = this;
		var cellPosition = {column: -1, row: -1};
		var stage = options.stage;
		this.score = options.score || 0;

		var foodTexture = new PIXI.Texture.fromImage('resources/images/sprites/food.jpg');
		var sprite = new PIXI.Sprite(foodTexture);

		this.setGridPosition = function(x, y){
			cellPosition.column = x;
			cellPosition.row = y;

			sprite.position.x = cellPosition.column;
			sprite.position.y = cellPosition.row;
		};

		this.setGridPosition(20, 20);

		stage.addChild(sprite);

		this.getColumn = function(){
			return cellPosition.column;
		};

		this.getRow = function(){
			return cellPosition.row;
		};
	};

	return Food;
});
