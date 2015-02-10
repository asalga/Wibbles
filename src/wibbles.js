/*
    Snake
*/

var WIBBLES = {};

WIBBLES.undef/*left undefined*/;

var BLOCK_SIZE = 8;

/*

*/
function start() {
    var undef /*left undefined*/;
    
    var viewWidth = BLOCK_SIZE * 80;
    var viewHeight = BLOCK_SIZE * 48;
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

    var levelLoader = ImageLevelLoader.getInstance();

    var wallTexture = new PIXI.Texture.fromImage('resources/images/sprites/wall.png');

    /*
    */
    var done = function(data){
        for(var y = 0; y < data.length; y++){
            for(var x = 0; x < data[y].length; x++){

                if(data[y][x] === 1){
                    var sprite = new PIXI.Sprite(wallTexture);
                    sprite.position.x = x * BLOCK_SIZE;
                    sprite.position.y = y * BLOCK_SIZE;
                    stage.addChild(sprite);
                }
            }
        }
    };

    levelLoader.load({
        levelPath: 'resources/levels/level1.png',
        translation: {
            empty: 0,
            wall: 1,
            start: 2
        },
        done: done
     });


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
