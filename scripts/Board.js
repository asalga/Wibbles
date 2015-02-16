/*
	Board
*/
define('Board', ['ImageLevelLoader', 'PIXI', 'settings'], function(ImageLevelLoader, PIXI, settings) {

	var Board = function(options) {
		var _this = this;

		var stage = options.stage;

		var wallTexture = new PIXI.Texture.fromImage('resources/images/sprites/wall.png');
		var boardData = null;

		var done = function(data) {
			boardData = data.slice(0);

			for (var r = 0; r < data.length; r++) {
				for (var c = 0; c < data[r].length; c++) {

					if (data[r][c] === 1) {
						var sprite = new PIXI.Sprite(wallTexture);
						sprite.position.x = c;
						sprite.position.y = r;

						stage.addChild(sprite);
					}
				}
			}
			_this.loaded();
		};

		var imageLevelLoader = new ImageLevelLoader();
		imageLevelLoader.load({
			levelPath: 'resources/levels/teeth.png',
			done: done
		});

		this.getCell = function(row, col) {
			return boardData[row][col];
		};
	};

	return Board;
});
