/*
	Game
*/
define('Game', ['underscore', 'Board', 'Snake', 'Food', 'settings', 'SoundManager', 'KeyboardJS', 'levels'], 
	function(_, Board, Snake, Food, settings, SoundManager, KeyboardJS, levels) {

	var Game = function(options) {
		var _this = this;

		var snakes = [];
		var board = null;
		var food = null;

		var ready = false;
		var isPaused = false;
		
		var stage = options.stage;
		var soundManager;

		var foodEatenInLevel = 0;
		var currentLevel = 0;

		/*
		*/
		this.initGameKeys = function(){
			KeyboardJS.on('p', function() {
				isPaused = !isPaused;
				return false;
			});
		};

		/*
		*/
		this.init = function(){

			snake = new Snake({
				stage: stage,
				length: 3
			});

			board = new Board({
				stage: stage, 
				done: function(){_this.start();},
				board: levels.levelData[currentLevel]
			});

			food = new Food({stage:stage});

			this.addSnake(snake);
			this.addFood(food);

			soundManager = SoundManager.getInstance();

			this.initGameKeys();
		};
	
		/*
		*/
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

		/*
			Called when board has been loaded
		*/
		this.start = function() {
			ready = true;

			var startingPosition = board.getStartingPosition();

			snake.setBirthLocation(startingPosition.row, startingPosition.column);
			snake.setDir('right');

			setFoodRandomPos();
		};

		/*
		*/
		var resetLevel = function() {
			_this.start();
		};

		/*
		*/
		var checkSnakeEatFood = function(){
			if(food === null || snakes.length === 0){
				return;
			}

			var snakeHeadCol = snakes[0].getHeadCellX();
			var snakeHeadRow = snakes[0].getHeadCellY();

			if(snakeHeadCol === food.getCellX() && snakeHeadRow === food.getCellY()){
				foodEatenInLevel++;
				soundManager.play('eat');

				if(foodEatenInLevel < settings.foodPerLevel){
					setFoodRandomPos();
					snake.grow(4);
				}
				else{
					loadNextLevel();
				}
			}
		};

		var loadNextLevel = function(){
			currentLevel++;
			if(currentLevel > levels.levelData.length-1){
				currentLevel = 0;
			}

			foodEatenInLevel = 0;

			snake.reset();

			board.load({
				board: levels.levelData[currentLevel], 
				done: function(){game.start();}
			});
		};

		/*
		*/
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
			return board.getCell(row, col) === 'wall';
		};

		/*
			Find a place on the board that isn't a wall, 
			or part of the snake
		*/
		var setFoodRandomPos = function(){

			var col, row;
			var overlapsWithSnake;
			var overlapsWithWall;

			do{
				row = Math.floor((Math.random() * (settings.boardRows - 2)) + 1);
				col = Math.floor((Math.random() * (settings.boardColumns - 2)) + 1);

				overlapsWithSnake = doesOverlapWithSnake(row, col);
				overlapsWithWall = doesOverlapWithWalls(row, col);

			} while(overlapsWithSnake === true || overlapsWithWall === true);

			food.setGridPosition(col, row);
		};

		/*
		 */
		var checkWallCollisions = function() {

			if(snakes.length === 0){
				return;
			}

			var snakeHeadCol = snakes[0].getHeadCellX();
			var snakeHeadRow = snakes[0].getHeadCellY();

			if (board.getCell(snakeHeadRow, snakeHeadCol) === 'wall') {
				resetLevel();
			}
		};
	};

	return Game;
});
