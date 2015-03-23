/*
	TODO:
*/
define('SoundManager', ['Howl', 'KeyboardJS'], function(Howl, KeyboardJS) {

	var instance = null;

	var SoundManager = function(){

		var muted = true;

		var audioClips = {
			'eat': new Howl.Howl({urls: ['resources/audio/eat.mp3']}),
			//'die': new Howl({urls: ['resources/audio/eat.mp3']}),
			//'intro': new Howl({urls: ['resources/audio/eat.mp3']}),
			//'poop': new Howl({urls: ['resources/audio/eat.mp3']})
		};

		// toggle audio
		KeyboardJS.on('a', function() {
			muted = !muted;
			return false;
		});

		/*
		*/
		this.play = function(clipName) {
			if(muted === false){
				audioClips[clipName].play();
			}
		};

		this.setVolume = function(intensity){
			console.log("TODO: setVolume");
		};

		this.setMute = function(b){
			muted = b;
		};
	};

	return {
		getInstance: function(){
			if(instance === null){
				instance = new SoundManager();
			}
			return instance;
		}
	};
});
