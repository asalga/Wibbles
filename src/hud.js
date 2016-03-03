'use strict';

var PIXI = require('pixi.js');

var Utils = require('./utils');
var emitters = require('./emitters');


function Hud(opts) {
  this.stage = opts.stage;
  this.ready = false;

  // should be here or ask from game?
  this.score = 0;
}

Hud.prototype = {
  constructor: Hud,

  init: function() {

    this.font = {
      font: "2pt Perfect",
      align: "right"
    };

    PIXI.loader.add("Font1", 'assets/font/font.fnt')
      .once("complete", function() {
        this.addText();
        this.ready = true;
      }.bind(this)).load();

    this.setupEvents();
  },

  setupEvents: function() {
    emitters.on('ateFood', function(foodScore) {
      this.addScore(foodScore);
    }.bind(this));
  },

  addText: function() {
    this.sammyText = new PIXI.BitmapText("SAMMY-->  Lives:", this.font);
    this.sammyText.position = new PIXI.Point(40, 0);
    stage.addChild(this.sammyText);

    this.livesText = new PIXI.BitmapText("123", this.font);
    this.livesText.position = new PIXI.Point(58, 0);
    stage.addChild(this.livesText);

    this.scoreText = new PIXI.BitmapText("SCORE:", this.font);
    this.scoreText.position = new PIXI.Point(65, 0);
    stage.addChild(this.scoreText);

    this.scoreText = new PIXI.BitmapText("000000", this.font);
    this.scoreText.position = new PIXI.Point(73, 0);
    stage.addChild(this.scoreText);
  },

  addScore: function(value) {
    this.score += value;
    this.scoreText.text = Utils.addLeadingZeros(this.score, 6);
    // this.sammyText.tint = 0x00FF00;
  },

  update: function(delta) {
    if (!this.ready) {
      return;
    }
    // this.sammyText.tint += 1000000;
    // this.sammyText.tint = _.clamp(this.sammyText.tint, 16777215);
  }
};

module.exports = Hud;
