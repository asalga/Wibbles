
requirejs.config({

	baseUrl: './scripts',
	paths: {
		//app: 'main',
		PIXI: '../libs/pixi',
		jquery:  '../libs/jquery',
		KeyboardJS: '../libs/KeyboardJS',
		underscore : '../libs/underscore'
	},
	shim: {
		"underscore": {
			exports: "_"
		}
	}
});

requirejs(['./main']);
