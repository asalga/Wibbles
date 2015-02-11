/*
    Snake
*/

var WIBBLES = {};

WIBBLES.undef/*left undefined*/;

var BLOCK_SIZE = 6;

/*

*/
function start() {
    var undef /*left undefined*/;
    
    var viewWidth = BLOCK_SIZE * 80;// WIBBLES.Settings.cols;
    var viewHeight = BLOCK_SIZE * 48;//WIBBLES.Settings.rows;

    var renderer = null,
        stage = null;

    var lastTime = Date.now(),
        delta = 0,
        now;

    var game,
        board,
        snake;
    
    renderer = PIXI.autoDetectRenderer(viewWidth, viewHeight);
    document.body.appendChild(renderer.view);
    
    stage = new PIXI.Stage(0x0000AA);    

    board = new WIBBLES.Board({stage: stage, level: WIBBLES.levels[0]});
    snake = new WIBBLES.Snake({stage: stage, length: 10});
    
    game = new WIBBLES.Game();
    
    game.setBoard(board);
    game.addSnake(snake);
    
    requestAnimFrame(animate);

    /*
    */    
    function update(delta) {
        game.update(delta);
    }
    
    function animate() {
        now = Date.now();
        delta = now - lastTime;

        update(delta);

        renderer.render(stage);
        requestAnimFrame(animate);

        lastTime = now;
    }
}
