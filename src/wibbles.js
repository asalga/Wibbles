/*
    Snake
*/
"use strict";

var WIBBLES = {};

var BLOCK_SIZE = 8;


/*

*/
function start() {
    var undef /*left undefined*/;
    
    var viewWidth = 200;
    var viewHeight = 200;
    var renderer = null;
    var stage = null;

    var lastTime = Date.now();
    var delta = 0;
    var now;
    
    renderer = PIXI.autoDetectRenderer(viewWidth, viewHeight);
    document.body.appendChild(renderer.view);
    
    stage = new PIXI.Stage(0x0000AA);    

    //var game = new Game();
    //game.setSpeed() -> snake

    //game.setBoard(board);
    //game.addSnake(snake):

    //var board = new Board(100, 100);

    var snake = new Snake(stage);
    snake.init(30);

    requestAnimFrame(animate);
    
    function update(delta) {
        snake.update(delta);
    }
    
    function animate() {
        now = Date.now();
        delta = now - lastTime;

        update(delta);

        //checkColisions();
        renderer.render(stage);
        requestAnimFrame(animate);

        lastTime = now;
    }
}
