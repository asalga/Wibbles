/*
	Manages the game state

	TODO: 
		- Add wall collision check for each snake
*/
define('Game', ['underscore', 'Board', 'Snake', 'Food', 'settings'], function(_, Board, Snake, Food, settings) {

	var Game = function(options) {
		var _this = this;

		var snakes = [];
		var board = null;
		var food = null;

		var ready = false;
		
		var stage = options.stage;

		this.init = function(){
			snake = new Snake({stage: stage, length: 10});
			board = new Board({stage: stage, done: function(){game.start();}});
			food = new Food({stage:stage});

			this.addSnake(snake);
			this.setBoard(board);
			this.addFood(food);
		};

		this.update = function(delta) {
			if (ready === false) {
				return;
			}

			_.each(snakes, function(s) {
				s.update(delta);
			});

			checkWallCollisions();
			checkSnakeEatFood();
		};

		this.addSnake = function(s) {
			snakes.push(s);
		};

		this.addFood = function(f){
			food = f;
		};

		this.setBoard = function(b) {
			board = b;

			board.loaded = function() {
				_this.start();
			};
		};

		this.start = function() {
			ready = true;
		};

		var resetLevel = function() {
			snakes[0].setGridPosition(20, 15);
		};

		var checkSnakeEatFood = function(){
			if(food === null){
				return;
			}

			var snakeHeadX = snakes[0].getHeadCellX();
			var snakeHeadY = snakes[0].getHeadCellY();

			if(snakeHeadX === food.getCellX() && snakeHeadY === food.getCellY()){
				
				var rx = Math.floor((Math.random() * (settings.boardColumns - 2)) + 1);
				var ry = Math.floor((Math.random() * (settings.boardRows - 2)) + 1);

				food.setGridPosition(rx, ry);

				snake.grow(4);
			}
		};

		/*
		 */
		var checkWallCollisions = function() {

			var snakeHeadX = snakes[0].getHeadCellX();
			var snakeHeadY = snakes[0].getHeadCellY();

			// note, we are using columns, so Y is first.
			var cell = board.getCell(snakeHeadY, snakeHeadX);

			if (cell === 1) {
				resetLevel();
			}
		};
	};

	return Game;
});
