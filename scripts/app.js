
requirejs.config({

	baseUrl: './scripts',
	paths: {
		//app: 'main',
		PIXI: '../libs/pixi',
		jquery:  '../libs/jquery',
		KeyboardJS: '../libs/keyboardjs',
		underscore : '../libs/underscore'
	},
	shim: {
		"underscore": {
			exports: "_"
		}
	}
});

requirejs(['./main']);
