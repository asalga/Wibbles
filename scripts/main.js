/*
	This is Main, yo.
*/
require(['PIXI', 'Snake', 'Board', 'Game', 'settings'], function(PIXI, Snake, Board, Game, settings) {

    var lastTime = Date.now(),
	    delta = 0,
	    now;

    var renderer = null,
        stage = null;

    var viewWidth = settings.blockSize * settings.boardColumns;
    var viewHeight = settings.blockSize * settings.boardRows;

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
