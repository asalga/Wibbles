/*

*/
WIBBLES.Snake = (function() {

    'use strict';

    var Snake = function(options) {
        var that = this;
        
        var stage = options.stage;

        var directions = {
            'up':       'up',
            'down':     'down',
            'left':     'left',
            'right':    'right'
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

        that.direction = directions.right;

        /*
            Will have to change this for 2 players....
        */
        this.setupControls = function(){
            KeyboardJS.on('up', function() {
                if(that.direction !== directions.down){
                    that.direction = 'up';    
                }
            });

            KeyboardJS.on('down', function() {
                if(that.direction !== directions.up){
                    that.direction = 'down';
                }
            });

            KeyboardJS.on('left', function() {
                if(that.direction !== directions.right){
                    that.direction = 'left';    
                }
            });

            KeyboardJS.on('right', function() {
                if(that.direction !== directions.left){
                    that.direction = 'right';    
                }
            });

            KeyboardJS.on('a', function(){
                that.addPiece(); 
            });

            KeyboardJS.on('space', function() {
                that.addPieces(4);
            });
        };
        /*

        */
        var init = function(initialLength){

            numPieces = initialLength;

            for(var i = 0; i < initialLength; i++){
                sprites.piecesOfSnake.push(new PIXI.Sprite(nibbleTexture));
                
                sprites.xCells.push(8);
                sprites.yCells.push(8);

                sprites.piecesOfSnake[i].scale.x = BLOCK_SIZE;
                sprites.piecesOfSnake[i].scale.y = BLOCK_SIZE;

                stage.addChild(sprites.piecesOfSnake[i]);
            }

            that.setupControls();
        };

        init(options.length || 1);

        /*
        */
        this.addPieces = function(numToAdd) {
            if(numToAdd < 1){
                return;
            }

            var lastIndex = numPieces - 1;

            for(var i = 0; i < numToAdd; i++){
                var newTail = new PIXI.Sprite(nibbleTexture);
                stage.addChild(newTail);

                sprites.piecesOfSnake.push( newTail );
                newTail.position.x = sprites.xCells[lastIndex] * BLOCK_SIZE;
                newTail.position.y = sprites.yCells[lastIndex] * BLOCK_SIZE;

                newTail.scale.x = BLOCK_SIZE;
                newTail.scale.y = BLOCK_SIZE;

                sprites.xCells.push( sprites.xCells[lastIndex] );
                sprites.yCells.push( sprites.yCells[lastIndex] );
            }

            numPieces += numToAdd;

            hasNewTail = true;
        };

        this.getHeadCellX = function(){
            return sprites.xCells[0];
        };

        this.getHeadCellY = function(){
            return sprites.yCells[0];
        };

        this.setGridPosition = function(y, x){
            sprites.xCells[0] = x;
            sprites.yCells[0] = y;
        };

        var moveHoriz = function(dir){

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
        var moveVert = function(dir){
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
        var updateSpritePos = function(){
            for(var i = 0; i < numPieces; i++){
                sprites.piecesOfSnake[i].position.x = sprites.xCells[i] * BLOCK_SIZE;
                sprites.piecesOfSnake[i].position.y = sprites.yCells[i] * BLOCK_SIZE;
            }
        };
        
        this.update = function(delta) {

            timer += delta;
            if(timer < 100){
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
})();
