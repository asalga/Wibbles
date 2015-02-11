/*
	The game will query the board to find if the snake collided with the borders
	or any of the walls.

	Change board to only handle board data, no rendering.


*/
WIBBLES.Board = (function(){

	'use strict';
	
	var Board = function(options){
		var that = this;
		
	    var stage = options.stage;
	    var wallTexture = new PIXI.Texture.fromImage('resources/images/sprites/wall.png');
	    var boardData = null;

	    this.loaded = function(){
	    };

	    this.getCell = function(y, x){
	    	return boardData[y][x];
	    };

	    /*

	    */
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
	        that.loaded();
	    };

	    var levelLoader = ImageLevelLoader.getInstance();
	    levelLoader.load({
	        levelPath: options.level,
	        /*translation: {
	            empty: 0,
	            wall: 1,
	            start: 2
	        },*/
	        done: done
	     });
	};

	return Board;

}());