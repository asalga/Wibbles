/*
	Board

	TODO:
*/
define('Board', ['ImageLevelLoader', 'PIXI', 'settings'], function(ImageLevelLoader, PIXI, settings) {

	var Board = function(options) {
		var _this = this;

		var stage = options.stage;

		var wallTexture = new PIXI.Texture.fromImage('resources/images/sprites/wall.png');
		var boardData = null;

		var done = function(data) {
			boardData = data.slice(0);

			for (var y = 0; y < data.length; y++) {
				for (var x = 0; x < data[y].length; x++) {

					if (data[y][x] === 1) {
						var sprite = new PIXI.Sprite(wallTexture);
						sprite.position.x = x * settings.blockSize;
						sprite.position.y = y * settings.blockSize;

						sprite.scale.x = settings.blockSize;
						sprite.scale.y = settings.blockSize;

						stage.addChild(sprite);
					}
				}
			}
			_this.loaded();
		};

		var imageLevelLoader = new ImageLevelLoader();
		imageLevelLoader.load({
			levelPath: 'resources/levels/empty.png',
			done: done
		});

		this.getCell = function(y, x) {
			return boardData[y][x];
		};
	};

	return Board;
});
