'use strict';

var PIXI = require('pixi');
var settings = require('./settings');
var Game = require('./game');

function Main() {
  this.init();
}

Main.prototype = {
  constructor: Main,

  init: function() {

    this.lastTime = Date.now();
    this.now = this.lastTime;

    var viewWidth = settings.boardColumns;
    var viewHeight = settings.boardRows;

    var stage = this.stage = new PIXI.Stage(settings.bgColor);

    var renderer = this.renderer = PIXI.autoDetectRenderer(viewWidth, viewHeight, null, false, false);
    document.body.appendChild(renderer.view);

    var render = this.render = true;

    this.game = new Game({stage: stage});

    /*
      Borders always need to be visible for proper gameplay, so
      we scale the game board to keep the entire game always visible.
    */
    var resize = function() {
      // ie) 48/80 (0.6)
      var gameAspectRatio = viewHeight / viewWidth;
      var innerWidth = window.innerWidth;
      var innerHeight = window.innerHeight;

      var clientAspectRatio = innerHeight / innerWidth;

      // User made the window too narrow
      if (clientAspectRatio > gameAspectRatio) {
        renderer.view.width = innerWidth;
        renderer.view.height = gameAspectRatio * innerWidth;

        renderer.width = innerWidth;
        renderer.height = renderer.view.height;
      }
      // too short (or equal)
      else {
        renderer.view.height = innerHeight;
        renderer.view.width = (1 / gameAspectRatio) * innerHeight;

        renderer.height = innerHeight;
        renderer.width = renderer.view.width;
      }
    };

    this.game.init();
    resize();
    window.requestAnimationFrame(this.animate.bind(this));

    window.onresize = function() {
      resize();
    };
  },

  /*

   */
  animate: function() {
    this.now = Date.now();
    var delta = this.now - this.lastTime;

    this.game.update(delta);

    if (this.render) {
      this.renderer.render(this.stage);
    }
    window.requestAnimationFrame(this.animate.bind(this));

    this.lastTime = this.now;
  }
};

module.exports = Main;
