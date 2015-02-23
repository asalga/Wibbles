/*
	Main
*/
require(['PIXI', 'Game', 'settings'], function(PIXI, Game, settings) {

	var lastTime = Date.now(), now;

	var viewWidth = settings.blockSize * settings.boardColumns;
	var viewHeight = settings.blockSize * settings.boardRows;

	var stage = new PIXI.Stage(settings.bgColor);

	var renderer = PIXI.autoDetectRenderer(viewWidth, viewHeight, null, false, false);
	document.body.appendChild(renderer.view);

	var game = new Game({stage: stage});

	/*
		Make sure the entire canvas is always visible
	*/
	var resize = function(){

		// ie) 48/80
		var aspectRatio = settings.boardRows / settings.boardColumns;

		// too narrow
		if(clientAspectRatio > aspectRatio){
			renderer.view.width = window.innerWidth;
			renderer.view.height = aspectRatio * window.innerWidth;

			renderer.width = window.innerWidth;
			renderer.height = renderer.view.height;
		}
		// too short
		else{
			renderer.view.height = window.innerHeight;
			renderer.view.width = (1/aspectRatio) * window.innerHeight;
			
			renderer.height = window.innerHeight;
			renderer.width = renderer.view.width;
		}
	};

	game.init();
	resize();
	requestAnimFrame(animate);

	function animate() {
		now = Date.now();
		var delta = now - lastTime;

		game.update(delta);

		renderer.render(stage);
		requestAnimFrame(animate);

		lastTime = now;
	}

	window.onresize = function(){
		resize();
	};
});
