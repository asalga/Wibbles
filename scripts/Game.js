/*
	Manages the game state

	TODO: 
		- Add wall collision check for each snake
*/
define('Game', ['underscore', 'Board'], function(_, Board) {

	var Game = function() {
		var _this = this;

		var snakes = [];
		var board = null;
		var ready = false;




		this.update = function(delta) {
			if (ready === false) {
				return;
			}

			_.each(snakes, function(s) {
				s.update(delta);
			});

			checkWallCollisions();
		};

		this.addSnake = function(s) {
			snakes.push(s);
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
