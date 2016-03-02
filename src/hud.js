'use strict';

var PIXI = require('pixi.js');

function Hud(opts) {
  this.stage = opts.stage;
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
      }.bind(this)).load();
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
    this.scoreText.position = new PIXI.Point(73,0);
    stage.addChild(this.scoreText);
  },

  /*
      TODO: fix, allow settings score for more than snake
  */
  setScore: function(value) {
    this.scoreText.text = this.formatScore(value);
    this.scoreText.dirty = true;
  },

  /*
      in:  123
      out: "000123"

      TODO:   fix literal 6 move to utils
  */
  formatScore: function(value) {
    var strValue = value.toString();

    while (strValue.length < 6) {
      strValue = '0' + strValue;
    }

    return strValue;
  }
};

module.exports = Hud;
