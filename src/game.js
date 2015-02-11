/*
	Manages the collisions between snakes and board/walls

	.restartLevel();
	.killSnake();
	.nextLevel();
	.gameOver();
*/
WIBBLES.Game = (function(){
	'use strict';

	var Game = function(){
		var that = this;

		var snakes = [];
		var board = null;
		var ready = false;

		this.update = function(delta){
			if(ready === false){
				return;
			}

			_.each(snakes, function(s){
				s.update(delta);
			});

			checkWallCollisions();
		};

		this.addSnake = function(s){
			snakes.push(s);
		};

		this.setBoard = function(b){
			board = b;

			board.loaded = function(){
				start();
			};
		};

		var start = function(){
			ready = true;
		};

		var resetLevel = function(){
			snakes[0].setGridPosition(20, 15);
		};

		/*
		*/
		var checkWallCollisions = function(){

			var snakeHeadX = snakes[0].getHeadCellX();
			var snakeHeadY = snakes[0].getHeadCellY();

			// note, we are using columns, so Y is first.
			var cell = board.getCell(snakeHeadY, snakeHeadX);

			if(cell === 1){
				resetLevel();
			}
		};
	};

	return Game;

}());
