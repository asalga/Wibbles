'use strict';

var KeyboardJS = require('KeyboardJS');
var Howl = require('Howler');

function SoundManager() {
  this.muted = false;

  this.audioClips = {
    'eat': new Howl.Howl({
      urls: ['assets/audio/eat.mp3']
    })
  };
  this.init();
}

SoundManager.prototype = {

  constructor: SoundManager,

  init: function() {
    KeyboardJS.on('a', function() {
      this.muted = !this.muted;
      return false;
    }.bind(this));
  },

  play: function(clipName) {
    if (this.muted) {
      return;
    }

    this.audioClips[clipName].play();
  },

  setMute: function(b) {
    muted = b;
  }
};

var instance = new SoundManager();

module.exports = {
  instance: instance
};
