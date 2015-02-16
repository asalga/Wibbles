/*
	Manages the game state
*/
define('Game', ['underscore', 'Board', 'Snake', 'Food', 'settings', 'SoundManager', 'KeyboardJS'], function(_, Board, Snake, Food, settings, SoundManager, KeyboardJS) {

	var Game = function(options) {
		var _this = this;

		var snakes = [];
		var board = null;
		var food = null;

		var ready = false;
		var isPaused = false;
		var isMuted = true;
		
		var stage = options.stage;
		var soundManager;
	
		this.initGameKeys = function(){
			KeyboardJS.on('p', function() {
				isPaused = !isPaused;
				return false;
			});
		};

		this.init = function(){
			snake = new Snake({stage: stage, length: 10});
			board = new Board({stage: stage, done: function(){game.start();}});
			food = new Food({stage:stage});

			this.addSnake(snake);
			this.setBoard(board);
			this.addFood(food);

			soundManager = SoundManager.getInstance();

			this.initGameKeys();
		};
	

		this.update = function(delta) {
			if (ready === false) {
				return;
			}

			if(isPaused){
				return;
			}

			_.each(snakes, function(s) {
				s.update(delta);
			});

			checkWallCollisions();
			checkSnakeEatFood();
		};

		this.getIsPaused = function(){
			return isPaused;
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

			if(snakes === null){
				return;
			}

			var snakeHeadX = snakes[0].getHeadCellX();
			var snakeHeadY = snakes[0].getHeadCellY();

			if(snakeHeadX === food.getCellX() && snakeHeadY === food.getCellY()){
				
				generateFood();
				soundManager.play('eat');
				snake.grow(4);
			}
		};

		var doesOverlapWithSnake = function(row, col){
			var iter = snake.getPositionIterator();

			while(iter.hasNext()){
				var i = iter.getNext();

				if(i.x === col && i.y === row){
					return true;
				}
			}

			return false;
		};

		var doesOverlapWithWalls = function(row, col){
			return board.getCell(row, col) !== 0;
		};

		/*
			Find a place on the board that isn't a wall, 
			or part of the snake
		*/
		var generateFood = function(){

			var col, row;
			var overlapsWithSnake;
			var overlapsWithWall;

			do{
				row = Math.floor((Math.random() * (settings.boardRows - 2)) + 1);
				col = Math.floor((Math.random() * (settings.boardColumns - 2)) + 1);

				overlapsWithSnake = doesOverlapWithSnake(row, col);
				overlapsWithWall = doesOverlapWithWalls(row, col);

			}while(overlapsWithSnake === true || overlapsWithWall === true);

			food.setGridPosition(col, row);
		};

		/*
		 */
		var checkWallCollisions = function() {

			if(snakes.length === 0){
				return;
			}

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
