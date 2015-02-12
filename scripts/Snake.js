/*
	Snake

	TODO:
		- fix timer
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

				sprites.xCells.push(8);
				sprites.yCells.push(8);

				sprites.piecesOfSnake[i].scale.x = settings.blockSize;
				sprites.piecesOfSnake[i].scale.y = settings.blockSize;

				stage.addChild(sprites.piecesOfSnake[i]);
			}
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

			});

			KeyboardJS.on('a', function() {
				_this.addPiece();
			});

			KeyboardJS.on('space', function() {
				_this.addPieces(4);
			});
		};

		init(options.length || 1);
		this.setupControls();


		/*
		 */
		this.addPieces = function(numToAdd) {
			if (numToAdd < 1) {
				return;
			}

			var lastIndex = numPieces - 1;

			for (var i = 0; i < numToAdd; i++) {
				var newTail = new PIXI.Sprite(nibbleTexture);
				stage.addChild(newTail);

				sprites.piecesOfSnake.push(newTail);
				newTail.position.x = sprites.xCells[lastIndex] * settings.blockSize;
				newTail.position.y = sprites.yCells[lastIndex] * settings.blockSize;

				newTail.scale.x = settings.blockSize;
				newTail.scale.y = settings.blockSize;

				sprites.xCells.push(sprites.xCells[lastIndex]);
				sprites.yCells.push(sprites.yCells[lastIndex]);
			}

			numPieces += numToAdd;

			hasNewTail = true;
		};

		this.getHeadCellX = function() {
			return sprites.xCells[0];
		};

		this.getHeadCellY = function() {
			return sprites.yCells[0];
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
				sprites.piecesOfSnake[i].position.x = sprites.xCells[i] * settings.blockSize;
				sprites.piecesOfSnake[i].position.y = sprites.yCells[i] * settings.blockSize;
			}
		};

		this.update = function(delta) {

			timer += delta;
			if (timer < 100) {
				return;
			}

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
