/*
	Main
*/
require(['PIXI', 'Game', 'settings'], function(PIXI, Game, settings) {

	var lastTime = Date.now(), now;

	var viewWidth = settings.boardColumns;
	var viewHeight = settings.boardRows;

	var stage = new PIXI.Stage(settings.bgColor);

	var renderer = PIXI.autoDetectRenderer(viewWidth, viewHeight, null, false, false);
	document.body.appendChild(renderer.view);

	var game = new Game({stage: stage});
	
	/*
		Borders always need to be visible for proper gameplay, so
		we scale the game board to keep the entire game always visible.
	*/
	var resize = function(){
		// ie) 48/80 (0.6)
		var gameAspectRatio = viewHeight / viewWidth;
		var innerWidth = window.innerWidth;
		var innerHeight = window.innerHeight;
	
		var clientAspectRatio = innerHeight / innerWidth;

		// User made the window too narrow
		if(clientAspectRatio > gameAspectRatio){
			renderer.view.width = innerWidth;
			renderer.view.height = gameAspectRatio * innerWidth;

			renderer.width = innerWidth;
			renderer.height = renderer.view.height;
		}
		// too short (or equal)
		else{
			renderer.view.height = innerHeight;
			renderer.view.width = (1/gameAspectRatio) * innerHeight;
			
			renderer.height = innerHeight;
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
