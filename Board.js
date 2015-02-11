/*
	Board

	TODO:
		- Fix block_size
*/
define(['ImageLevelLoader', 'PIXI'], function(ImageLevelLoader, PIXI){
	
	var Boardr = function(options){
		var _this = this;
		var BLOCK_SIZE = 4;

		var stage = options.stage;
	
		var wallTexture = new PIXI.Texture.fromImage('resources/images/sprites/wall.png');
		var boardData = null;

	   	var done = function(data){
	    	boardData = data.slice(0);

	        for(var y = 0; y < data.length; y++){
	            for(var x = 0; x < data[y].length; x++){

	                if(data[y][x] === 1){
	                    var sprite = new PIXI.Sprite(wallTexture);
	                    sprite.position.x = x * BLOCK_SIZE;
	                    sprite.position.y = y * BLOCK_SIZE;
	                    
	                    sprite.scale.x = BLOCK_SIZE;
	                    sprite.scale.y = BLOCK_SIZE;

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

	    this.getCell = function(y, x){
	    	return boardData[y][x];
	    };
	};

	return Boardr;
});
