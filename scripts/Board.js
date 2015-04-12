/*
	Board
*/
define('Board', ['ImageLevelLoader', 'PIXI', 'settings', 'boardMetaData'], 
	function(ImageLevelLoader, PIXI, settings, boardMetaData) {

	/*
		options
			- done {Function} called once loading is done
			- board boardData
			- stage pixiStage
	*/
	var Board = function(options) {
		var _this = this;

		var stage = options.stage;
		var boardToLoad = options.board;
		var doneCallBack = options.done || function(){};

		// Hold onto the references so we can remove them from the stage when needed.
		var sprites = [];

		var wallTexture = new PIXI.Texture.fromImage('resources/images/sprites/wall.png');
		var boardData = null;
		
		var startingRowColum = {
			row: -1,
			column: -1
		};

		var imageLoaderDone = function(data) {
			boardData = data.slice(0);

			for (var r = 0; r < data.length; r++) {
				for (var c = 0; c < data[r].length; c++) {

					if (data[r][c] === 'wall') {
						var sprite = new PIXI.Sprite(wallTexture);
						sprite.position.x = c;
						sprite.position.y = r;

						stage.addChild(sprite);

						// keep references so we can remove them when we unload the level.
						sprites.push(sprite);
					}
					
					if(data[r][c] === 'player'){
						startingRowColum.row = r;
						startingRowColum.column = c;
					}
				}
			}
			doneCallBack();
		};

		var imageLevelLoader = new ImageLevelLoader();
		imageLevelLoader.load({
			levelPath: boardToLoad,
			done: imageLoaderDone
		});

		this.getStartingPosition = function(){
			return startingRowColum;
		};

		/*
		*/
		this.getCell = function(row, col) {
			if(boardData[row][col] === undefined){
				console.log('row: ' + row);
				console.log('col: ' + col);
			}
			return boardData[row][col];
		};

		this.load = function(options) {
			for(var i = 0; i < sprites.length; i++){
				stage.removeChild(sprites[i]);
			}
			sprites = [];

			imageLevelLoader.load({
				levelPath: options.board,
				done: imageLoaderDone
			});
		};
	};

	return Board;
});
