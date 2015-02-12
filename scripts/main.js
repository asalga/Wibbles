/*
*/
require(['PIXI', 'Game', 'settings'], function(PIXI, Game, settings) {

    var lastTime = Date.now(), now;

    var viewWidth = settings.blockSize * settings.boardColumns;
    var viewHeight = settings.blockSize * settings.boardRows;

	var stage = new PIXI.Stage(0x0000AA);
	var renderer = PIXI.autoDetectRenderer(viewWidth, viewHeight);
	document.body.appendChild(renderer.view);

	var game = new Game({stage: stage});
	game.init();

	requestAnimFrame(animate);

    function animate() {
        now = Date.now();
        var delta = now - lastTime;

    	game.update(delta);

        renderer.render(stage);
        requestAnimFrame(animate);

        lastTime = now;
    }
});
