/*
	Allows us to load a level based on an image.

	Note: make sure to pass in PNG's since they are lossless.
*/
define('ImageLevelLoader', ['boardMetaData'], function(boardMetaData) {

	var ImageLevelLoader = function() {

		/*
			options:
				levelPath
		*/
		this.load = function(options) {

			var img = new Image();
			img.src = options.levelPath;

			img.onload = function() {
				var canvas = document.createElement('canvas');

				canvas.width = this.width;
				canvas.height = this.height;

				var numCols = this.width;
				var numRows = this.height;

				var context = canvas.getContext('2d');
				context.drawImage(this, 0, 0);

				//
				var returnedData = new Array(this.height);

				for (var i = 0; i < this.height; i++) {
					returnedData[i] = new Array(this.width);
				}

				// order is RGBA
				// clampedUint8  [255, 64, 64, 255,      255, 64, ......]
				var rawDataFlat = context.getImageData(0, 0, this.width, this.height).data;

				var y = 0;
				var x = 0;
				for (var colIdx = 0; colIdx < rawDataFlat.length; colIdx += 4, x++) {

					// if we reached the edge of the 'image width'
					if (colIdx !== 0 && colIdx % (numCols * 4) === 0) {
						y++;
						x = 0;
					}

					var r = rawDataFlat[colIdx + 0];
					var g = rawDataFlat[colIdx + 1];
					var b = rawDataFlat[colIdx + 2];
					// alpha is not used

					// TODO: fix
					if (isWall(r, g, b)) {
						returnedData[y][x] = 'wall';
					}
					else if(isPlayer(r, g, b)){
						returnedData[y][x] = 'player';
					}
					else{
						returnedData[y][x] = 'empty';
					}
				}

				options.done(returnedData);
			};
		};

		var isColor = function(r1, g1, b1, r2, g2, b2 ){
			return (r1 === r2 && g1 === g2 && b1 === b2);
		};

		var isWall = function(r, g, b) {
			var wallColor = boardMetaData.wall;
			return isColor(r, g, b, wallColor.r, wallColor.g, wallColor.b );
		};

		var isPlayer = function(r, g, b) {
			var playerColor = boardMetaData.player;
			return isColor(r, g, b, playerColor.r, playerColor.g, playerColor.b );
		};
	};

	return ImageLevelLoader;
});
