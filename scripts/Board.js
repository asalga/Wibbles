/*
	Board
*/
define('Board', ['ImageLevelLoader', 'PIXI', 'settings', 'boardMetaData'], 
	function(ImageLevelLoader, PIXI, settings, boardMetaData) {

	var Board = function(options) {
		var _this = this;

		var stage = options.stage;

		var wallTexture = new PIXI.Texture.fromImage('resources/images/sprites/wall.png');
		var boardData = null;
		var boardToLoad = options.board;

		var startingRowColum = {
			row: -1,
			column: -1
		};

		var done = function(data) {
			boardData = data.slice(0);

			for (var r = 0; r < data.length; r++) {
				for (var c = 0; c < data[r].length; c++) {

					if (data[r][c] === 'wall') {
						var sprite = new PIXI.Sprite(wallTexture);
						sprite.position.x = c;
						sprite.position.y = r;

						stage.addChild(sprite);
					}
					
					if(data[r][c] === 'player'){
						startingRowColum.row = r;
						startingRowColum.column = c;
					}
				}
			}
			_this.loaded();
		};

		var imageLevelLoader = new ImageLevelLoader();
		imageLevelLoader.load({
			levelPath: boardToLoad,
			done: done
		});

		this.getStartingPosition = function(){
			return startingRowColum;
		};

		this.getCell = function(row, col) {
			return boardData[row][col];
		};
	};

	return Board;
});
