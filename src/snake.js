'use strict';

var KeyboardJS = require('KeyboardJS');
var PIXI = require('pixi.js');
var _ = require('lodash');

var settings = require('./settings');

var directions = {
  'up': 'up',
  'down': 'down',
  'left': 'left',
  'right': 'right'
};

/*
    TODO: should convert all references to x/y to row/col.
*/
function Snake(opts) {
  this.opts = opts || {};
  _.defaults(this, opts);

  this.init(opts.length || 1);
  this.setupControls();
}

Snake.prototype = {
  constructor: Snake,

  init: function(initialLength) {
    console.log('Snake init');
    var _this = this;

    this.direction = directions.right;
    this.requestedDir = this.direction;

    this.nibbleTexture = new PIXI.Texture.fromImage('assets/images/sprites/nibble.jpg');
    this.sprites = {
      xCells: [],
      yCells: [],
      piecesOfSnake: []
    };

    this.score = 0;
    this.timer = 0;
    this.numPieces = 1;
    this.numPieces = initialLength;

    for (var i = 0; i < initialLength; i++) {
      this.sprites.piecesOfSnake.push(new PIXI.Sprite(this.nibbleTexture));

      // TODO: comment where does the sprite get assigned its position?
      this.sprites.xCells.push(0);
      this.sprites.yCells.push(0);

      this.stage.addChild(this.sprites.piecesOfSnake[i]);
    }
  },

  /*
    Each time we load a new level, the snake length needs to be reset.
    TODO: change to resetLength
  */
  reset: function() {
    for (var i = 0; i < this.sprites.piecesOfSnake.length; i++) {
      stage.removeChild(this.sprites.piecesOfSnake[i]);
    }

    this.sprites.piecesOfSnake = [];
    this.sprites.xCells = [];
    this.sprites.yCells = [];

    this.init(2);
  },

  setBirthLocation: function(row, column) {
    for (var i = 0; i < this.numPieces; i++) {
      this.sprites.yCells[i] = row;
      this.sprites.xCells[i] = column;
    }
  },

  getHeadCellX: function() {
    return this.sprites.xCells[0];
  },

  getHeadCellY: function() {
    return this.sprites.yCells[0];
  },

  setDir: function(d) {
    this.direction = directions[d];
  },

  setGridPosition: function(y, x) {
    this.sprites.xCells[0] = x;
    this.sprites.yCells[0] = y;
  },

  setVisible: function(b) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites.piecesOfSnake[i].visible = b;
    }
  },

  update: function(delta) {
    this.timer += delta;

    if (this.timer < (1000.0 / settings.blocksPerSecond)) {
      return;
    }

    this.timer = 0;

    if (this.requestedDir !== null) {
      this.direction = this.requestedDir;
      this.requestedDir = null;
    }

    switch (this.direction) {
      case 'left':
        this.moveHoriz(-1);
        break;

      case 'right':
        this.moveHoriz(1);
        break;

      case 'down':
        this.moveVert(1);
        break;

      case 'up':
        this.moveVert(-1);
        break;
    }

    this.updateSpritePos();
  },

  moveHoriz: function(dir) {
    var sprites = this.sprites;

    if (this.didEatSelf(sprites.yCells[0], sprites.xCells[0] + dir)) {
      this.game.resetLevel();

    } else {
      // add a new element to the head
      sprites.xCells.unshift(sprites.xCells[0] + dir);
      sprites.yCells.unshift(sprites.yCells[0]);

      // cut off the end
      sprites.xCells.length = this.numPieces;
      sprites.yCells.length = this.numPieces;
    }
  },

  moveVert: function(dir) {
    var sprites = this.sprites;

    if (this.didEatSelf(sprites.yCells[0] + dir, sprites.xCells[0])) {
      this.game.resetLevel();
    } else {
      // add a new element to the head
      sprites.xCells.unshift(sprites.xCells[0]);
      sprites.yCells.unshift(sprites.yCells[0] + dir);

      // cut off the end
      sprites.xCells.length = this.numPieces;
      sprites.yCells.length = this.numPieces;
    }
  },

  /*
      Returns true if the head postion has the same position as any
      other part of the snake.
  */
  didEatSelf: function(futureRow, futureCol) {
    var ateSelf = false;

    // don't include the head
    var c = this.sprites.piecesOfSnake.length - 2;
    for (; c > -1; c--) {
      if (this.sprites.yCells[c] === futureRow && this.sprites.xCells[c] === futureCol) {
        ateSelf = true;
      }
    }
    return ateSelf;
  },

  setupControls: function() {
    console.log(this.sprites.piecesOfSnake[0]);

    KeyboardJS.on('up', function(e) {
      if (e.keyCode === 38) {
        if (this.direction !== directions.down) {
          this.requestedDir = 'up';
        }
        return false;
      }
    }.bind(this));

    KeyboardJS.on('down', function(e) {
      if (e.keyCode === 40) {
        if (this.direction !== directions.up) {
          this.requestedDir = 'down';
        }
        return false;
      }
    }.bind(this));

    KeyboardJS.on('left', function(e) {
      if (e.keyCode === 37) {
        if (this.direction !== directions.right) {
          this.requestedDir = 'left';
        }
        return false;
      }
    }.bind(this));

    KeyboardJS.on('right', function(e) {
      if (e.keyCode === 39) {
        if (this.direction !== directions.left) {
          this.requestedDir = 'right';
        }
        return false;
      }
    }.bind(this));

    KeyboardJS.on('space', function() {
      if (settings.debugOn) {
        this.grow(4);
      }
      return false;
    }.bind(this));
  },

  grow: function(numToAdd) {
    var sprites = this.sprites;

    if (numToAdd < 1) {
      return;
    }

    var lastIndex = this.numPieces - 1;

    for (var i = 0; i < numToAdd; i++) {
      var newTail = new PIXI.Sprite(this.nibbleTexture);
      this.stage.addChild(newTail);

      sprites.piecesOfSnake.push(newTail);
      newTail.position.x = sprites.xCells[lastIndex];
      newTail.position.y = sprites.yCells[lastIndex];

      sprites.xCells.push(sprites.xCells[lastIndex]);
      sprites.yCells.push(sprites.yCells[lastIndex]);
    }

    this.numPieces += numToAdd;
  },

  /*
     Will have to change this for 2 players....
  */
  getPositionIterator: function() {

    var _this = this;

    var Iterator = (function() {
      var Iterator = function() {

        var i = -1;

        // TODO: fix. No need to create new object literal
        var retVal = {
          x: null,
          y: null
        };
        var max = _this.sprites.xCells.length;

        this.hasNext = function() {
          return i + 1 < max;
        };

        this.getNext = function() {
          i++;

          retVal = {
            x: _this.sprites.xCells[i],
            y: _this.sprites.yCells[i]
          };

          return retVal;
        };
      };

      return Iterator;
    }());

    return new Iterator();
  },

  /*
      update the pixi sprite
  */
  updateSpritePos: function() {
    for (var i = 0; i < this.numPieces; i++) {
      this.sprites.piecesOfSnake[i].position.x = this.sprites.xCells[i];
      this.sprites.piecesOfSnake[i].position.y = this.sprites.yCells[i];
    }
  }
};

module.exports = Snake;
