'use strict';

var PIXI = require('pixi');

var settings = require('./settings');
var BoardMetaData = require('./boardMetaData');
var ImageLevelLoader = require('./imageLevelLoader');

/*
  options:
    - done {Function} called once loading is done
    - board boardData
    - stage pixiStage
*/
function Board(opts) {
  this.opts = opts || {};
  this.init(opts);
}

Board.prototype = {

  constructor: Board,

  init: function(opts) {
    this.wallTexture = new PIXI.Texture.fromImage('assets/images/sprites/wall.png');
    this.boardData = null;

    this.startingRowColum = {
      row: -1,
      column: -1
    };

    this.stage = opts.stage;
    this.boardToLoad = opts.board;
    this.doneCallBack = opts.done || function() {};

    this.imageLevelLoader = new ImageLevelLoader();
    this.imageLevelLoader.load({
      levelPath: this.boardToLoad,
      /// fix bind
      done: this.imageLoaderDone.bind(this)
    });


    // Hold onto the references so we can remove them from the stage when needed.
    this.sprites = [];
  },

  imageLoaderDone: function(data) {
    console.log('imageLoaderDone');

    this.boardData = data.slice(0);

    for (var r = 0; r < data.length; r++) {
      for (var c = 0; c < data[r].length; c++) {

        if (data[r][c] === 'wall') {

          var sprite = new PIXI.Sprite(this.wallTexture);
          sprite.position.x = c;
          sprite.position.y = r;

          this.stage.addChild(sprite);

          // keep references so we can remove them when we unload the level.
          this.sprites.push(sprite);
        }

        if (data[r][c] === 'player') {
          this.startingRowColum.row = r;
          this.startingRowColum.column = c;
        }
      }
    }
    this.doneCallBack();
  },


  load: function(options) {
    for (var i = 0; i < sprites.length; i++) {
      stage.removeChild(sprites[i]);
    }
    sprites = [];

    imageLevelLoader.load({
      levelPath: options.board,
      done: imageLoaderDone.bind(this)
    });
  },

  /*
    TODO: fix, we're accessing values
    that are out of bounds...
  */
  getCell: function(row, col) {
    if (boardData[row][col] === undefined) {
      console.log('row: ' + row);
      console.log('col: ' + col);
    }
    return boardData[row][col];
  },

  getStartingPosition: function() {
    return this.startingRowColum;
  }
};

module.exports = Board;
