/*
	This is Main, yo.
*/
require(['PIXI', 'Snake', 'Board', 'Game'], function(PIXI, Snake, Board, Game) {

    var lastTime = Date.now(),
	    delta = 0,
	    now;

    var renderer = null,
        stage = null;

	var BLOCK_SIZE = 4;
    var viewWidth = BLOCK_SIZE * 80;// WIBBLES.Settings.cols;
    var viewHeight = BLOCK_SIZE * 48;//WIBBLES.Settings.rows;

	renderer = PIXI.autoDetectRenderer(viewWidth, viewHeight);
	document.body.appendChild(renderer.view);

	stage = new PIXI.Stage(0x0000AA);

	requestAnimFrame(animate);

	var game = new Game();

	var snake = new Snake({stage: stage, length: 10});
	var board = new Board({stage: stage, done: function(){game.start();}});

	game.addSnake(snake);
	game.setBoard(board);

    function animate() {
        now = Date.now();
        delta = now - lastTime;

    	game.update(delta);

        renderer.render(stage);
        requestAnimFrame(animate);

        lastTime = now;
    }
});
