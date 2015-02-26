/*
	Snake
*/
define('Snake', ['settings', 'PIXI', 'KeyboardJS'], function(settings, PIXI, KeyboardJS) {

	var Snake = function(options) {
		var _this = this;

		var stage = options.stage;

		var directions = {
			'up': 'up',
			'down': 'down',
			'left': 'left',
			'right': 'right'
		};

		var nibbleTexture = new PIXI.Texture.fromImage('resources/images/sprites/nibble.jpg');

		var sprites = {
			xCells: [],
			yCells: [],
			piecesOfSnake: []
		};

		var timer = 0;

		var numPieces = 1;
		var hasNewTail = false;

		this.direction = directions.right;

		/*
		 */
		var init = function(initialLength) {

			numPieces = initialLength;

			for (var i = 0; i < initialLength; i++) {
				sprites.piecesOfSnake.push(new PIXI.Sprite(nibbleTexture));

				// TODO: comment where does the sprite get assigned its position?
				sprites.xCells.push(0);
				sprites.yCells.push(0);

				stage.addChild(sprites.piecesOfSnake[i]);
			}
		};

		/*
			Where snake will start from
		*/
		this.setBirthLocation = function(row, column){
			for(var i = 0; i < numPieces; i++){
				sprites.yCells[i] = row;
				sprites.xCells[i] = column;
			}		
		};

		/*
			Each time we load a new level, the snake length needs to be reset.
		*/
		this.reset = function(){
			for(var i = 0; i < sprites.piecesOfSnake.length; i++){
				stage.removeChild(sprites.piecesOfSnake[i]);
			}

			sprites.piecesOfSnake = [];
			sprites.xCells = [];
			sprites.yCells = [];

			init(2);
		};

		/*
		    Will have to change this for 2 players....
		*/
		this.setupControls = function() {

			KeyboardJS.on('up', function() {
				if (_this.direction !== directions.down) {
					_this.direction = 'up';
				}
				return false;
			});

			KeyboardJS.on('down', function() {
				if (_this.direction !== directions.up) {
					_this.direction = 'down';
				}
				return false;
			});

			KeyboardJS.on('left', function() {
				if (_this.direction !== directions.right) {
					_this.direction = 'left';
				}
				return false;
			});

			KeyboardJS.on('right', function() {
				if (_this.direction !== directions.left) {
					_this.direction = 'right';
				}
				return false;
			});

			KeyboardJS.on('space', function() {
				if(settings.debugOn){
					_this.grow(4);
				}
				return false;
			});
		};

		init(options.length || 1);
		this.setupControls();

		/*
		 */
		this.grow = function(numToAdd) {
			if (numToAdd < 1) {
				return;
			}

			var lastIndex = numPieces - 1;

			for (var i = 0; i < numToAdd; i++) {
				var newTail = new PIXI.Sprite(nibbleTexture);
				stage.addChild(newTail);

				sprites.piecesOfSnake.push(newTail);
				newTail.position.x = sprites.xCells[lastIndex];
				newTail.position.y = sprites.yCells[lastIndex];

				sprites.xCells.push(sprites.xCells[lastIndex]);
				sprites.yCells.push(sprites.yCells[lastIndex]);
			}

			numPieces += numToAdd;

			hasNewTail = true;
		};

		/*
		*/
		this.getPositionIterator = function(){

			var Iterator = (function() {
				var Iterator = function() {

					var i = -1;

					// TODO: fix. No need to create new object literal
					retVal = {
						x: null,
						y: null
					};
					var max = sprites.xCells.length;

					this.hasNext = function(){
						return i+1 < max;
					};

					this.getNext = function() {
						i++;
						
						retVal = {
							x: sprites.xCells[i],
							y: sprites.yCells[i]
						};

						return retVal;
					};
				};

				return Iterator;
			}());

			return new Iterator();
		};

		this.getHeadCellX = function() {
			return sprites.xCells[0];
		};

		this.getHeadCellY = function() {
			return sprites.yCells[0];
		};

		this.setDir = function(d){
			this.direction = directions[d];
		};

		this.setGridPosition = function(y, x) {
			sprites.xCells[0] = x;
			sprites.yCells[0] = y;
		};

		var moveHoriz = function(dir) {

			// add a new element to the head
			sprites.xCells.unshift(sprites.xCells[0] + dir);
			sprites.yCells.unshift(sprites.yCells[0]);

			// cut off the end
			sprites.xCells.length = numPieces;
			sprites.yCells.length = numPieces;

			hasNewTail = false;
		};

		/*
		 */
		var moveVert = function(dir) {
			// add a new element to the head
			sprites.xCells.unshift(sprites.xCells[0]);
			sprites.yCells.unshift(sprites.yCells[0] + dir);

			// cut off the end
			sprites.xCells.length = numPieces;
			sprites.yCells.length = numPieces;

			hasNewTail = false;
		};

		/*
		    update the pixi sprite
		*/
		var updateSpritePos = function() {
			for (var i = 0; i < numPieces; i++) {
				sprites.piecesOfSnake[i].position.x = sprites.xCells[i];
				sprites.piecesOfSnake[i].position.y = sprites.yCells[i];
			}
		};

		this.update = function(delta) {

			timer += delta;

			if (timer < (1000.0/settings.blocksPerSecond) ){
				return;
			}
			//alert(timer/settings.blocksPerSecond);

			timer = 0;

			switch (this.direction) {
				case 'left':
					moveHoriz(-1);
					updateSpritePos();
					break;

				case 'right':
					moveHoriz(1);
					updateSpritePos();
					break;

				case 'down':
					moveVert(1);
					updateSpritePos();
					break;

				case 'up':
					moveVert(-1);
					updateSpritePos();
					break;
			}
		};
	};

	return Snake;
});
