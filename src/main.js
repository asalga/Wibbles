'use strict';

var PIXI = require('pixi.js');
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

    this.viewWidth = settings.boardColumns;
    this.viewHeight = settings.boardRows;

    var stage = this.stage = new PIXI.Container();

    var renderer = this.renderer = PIXI.autoDetectRenderer(this.viewWidth, this.viewHeight, null, false, false);
    renderer.backgroundColor = settings.bgColor;
    document.body.appendChild(renderer.view);

    this.render = true;

    this.game = new Game({
      stage: stage,
      renderer: renderer
    });

    this.game.init();
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));

    window.onresize = function() {
      this.resize();
    }.bind(this);
  },

  /*
      Borders always need to be visible for proper gameplay, so
      we scale the game board to keep the entire game always visible.
    */
  resize: function() {
    // ie) 48/80 (0.6)
    var gameAspectRatio = this.viewHeight / this.viewWidth;
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;

    var clientAspectRatio = innerHeight / innerWidth;

    // User made the window too narrow
    if (clientAspectRatio > gameAspectRatio) {
      this.renderer.view.width = innerWidth;
      this.renderer.view.height = gameAspectRatio * innerWidth;

      this.renderer.width = innerWidth;
      this.renderer.height = this.renderer.view.height;
    }
    // too short (or equal)
    else {
      this.renderer.view.height = innerHeight;
      this.renderer.view.width = innerHeight / gameAspectRatio;

      this.renderer.height = innerHeight;
      this.renderer.width = this.renderer.view.width;
    }

    PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
    this.renderer.resize(this.renderer.view.width, this.renderer.view.height);

    this.stage.scale = new PIXI.Point(
      this.renderer.width / settings.boardColumns,
      this.renderer.height / settings.boardRows
    );
  },

  animate: function() {
    this.now = Date.now();
    var delta = this.now - this.lastTime;

    this.game.update(delta);

    if (this.render) {
      this.renderer.render(this.stage);
    }
    requestAnimationFrame(this.animate.bind(this));

    this.lastTime = this.now;
  }
};

module.exports = Main;
