'use strict';

var PIXI = require('pixi.js');
var _ = require('lodash');

var settings = require('./settings');

function Food(opts) {
  _.defaults(this, opts);

  this.cellPosition = {
    column: -1,
    row: -1
  };

  this.score = opts.score || 0;

  var foodTexture = new PIXI.Texture.fromImage('assets/images/sprites/food.jpg');
  this.sprite = new PIXI.Sprite(foodTexture);

  this.setGridPosition(20, 20);

  this.stage.addChild(this.sprite);
}

Food.prototype = {
  constructor: Food,

  setGridPosition: function(x, y) {
    this.cellPosition.column = x;
    this.cellPosition.row = y;

    this.sprite.position.x = this.cellPosition.column;
    this.sprite.position.y = this.cellPosition.row;
  },

  getColumn: function() {
    return this.cellPosition.column;
  },

  getRow: function() {
    return this.cellPosition.row;
  }
};

module.exports = Food;
