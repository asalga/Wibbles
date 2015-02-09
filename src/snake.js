/*

*/
var Snake = (function() {

    'use strict';

    var Snake = function(pixiStage) {

        var directions = {
            'up':       'up',
            'down':     'down',
            'left':     'left',
            'right':    'right'
        };

        var that = this;
        var stage = pixiStage;
        var nibbleTexture = new PIXI.Texture.fromImage('resources/images/sprites/nibble.jpg');
        
        var piecesOfSnake = [];
        var xPositions = [];
        var yPositions = [];

        var timer = 0;

        var numPieces = 1;
        var hasNewTail = false;

        that.direction = directions.right;

        /*

        */
        this.init = function(initialLength){

            numPieces = initialLength;

            for(var i = 0; i < initialLength; i++){
                piecesOfSnake.push(new PIXI.Sprite(nibbleTexture));
                xPositions.push(50);
                yPositions.push(50);

                stage.addChild(piecesOfSnake[i]);
            }

            this.setupControls();
        };

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
        this.addPieces = function(numToAdd) {
            if(numToAdd < 1){
                return;
            }

            var lastIndex = numPieces - 1;

            for(var i = 0; i < numToAdd; i++){
                var newTail = new PIXI.Sprite(nibbleTexture);
                stage.addChild(newTail);

                piecesOfSnake.push( newTail );
                newTail.position.x = xPositions[lastIndex];
                newTail.position.y = yPositions[lastIndex];

                xPositions.push( xPositions[lastIndex] );
                yPositions.push( yPositions[lastIndex] );
            }

            numPieces += numToAdd;

            hasNewTail = true;
        };

        var moveHoriz = function(dir){

            // add a new element to the head
            xPositions.unshift(xPositions[0] + dir * BLOCK_SIZE);
            yPositions.unshift(yPositions[0]);

            // cut off the end
            xPositions.length = numPieces;
            yPositions.length = numPieces;                
           
            hasNewTail = false;
        };
        
        /*
        */
        var moveVert = function(dir){
            // add a new element to the head
            xPositions.unshift(xPositions[0]);
            yPositions.unshift(yPositions[0] + dir * BLOCK_SIZE);

            // cut off the end
            xPositions.length = numPieces;
            yPositions.length = numPieces;            
           
            hasNewTail = false;     
        };

        /*
            update the pixi sprite
        */
        var updateSpritePos = function(){
            for(var i = 0; i < numPieces; i++){
                piecesOfSnake[i].position.x = xPositions[i];
                piecesOfSnake[i].position.y = yPositions[i];
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
