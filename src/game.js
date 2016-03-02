'use strict';

var _ = require('lodash');
var KeyboardJS = require('keyboardJS');

var settings = require('./settings');
var Board = require('./board');
var Snake = require('./snake');
var Hud = require('./hud');
var Food = require('./food');
var Utils = require('./utils');
var SoundManager = require('./soundManager').instance;

function Game(opts) {
  this.opts = opts || {};
  _.defaults(this, opts);
}

Game.prototype = {
  constructor: Game,

  init: function(opts) {
    console.log('Game init');

    this.snakes = [];
    this.board = null;
    this.food = null;

    this.ready = false;
    this.isPaused = false;

    this.foodEatenInLevel = 0;
    this.currentLevel = 0;

    this.hud = new Hud({
      stage: this.stage
    });
    this.hud.init();

    this.snake = new Snake({
      stage: this.stage,
      length: 10,
      game: this
    });

    this.board = new Board({
      stage: this.stage,
      done: function() {
        this.boardLoaded();
      }.bind(this),
      board: settings.levelData[this.currentLevel]
    });

    this.food = new Food({
      stage: this.stage,
      score: 0
    });
    this.addSnake(this.snake);
    this.addFood(this.food);

    this.initGameKeys();
    this.setupControls();
  },

  setupControls: function() {
    KeyboardJS.on('g', function(e) {
      settings.godMode = !settings.godMode;

      if (settings.godMode) {
        var invertFilter = new PIXI.filters.InvertFilter();
        this.stage.filters = [invertFilter];
        document.body.style.backgroundColor = '#FFFF00';
        this.renderer.backgroundColor = 0xFFFF44;
      } else {
        document.body.style.backgroundColor = settings.bgColorHTML;
        this.renderer.backgroundColor = settings.bgColor;
        this.stage.filters = null;
      }
      return false;
    }.bind(this));
  },

  initGameKeys: function() {
    KeyboardJS.on('p', function() {
      this.isPaused = !this.isPaused;
      return false;
    }.bind(this));
  },

  update: function(delta) {
    if (this.ready === false) {
      return;
    }

    if (this.isPaused) {
      return;
    }

    _.each(this.snakes, function(s) {
      s.update(delta);
    });

    this.snake.setVisible(false);

    this.checkWallCollisions();
    this.checkSnakeEatFood();
  },

  resetLevel: function() {
    this.boardLoaded();
  },

  /*
    Called when board has been loaded
  */
  boardLoaded: function() {
    this.ready = true;
    this.isPaused = false;

    var startingPosition = this.board.getStartingPosition();
    this.snake.setBirthLocation(startingPosition.row, startingPosition.column);
    this.snake.setDir('right');
    this.setFoodRandomPos();
  },

  getIsPaused: function() {
    return isPaused;
  },

  addSnake: function(s) {
    this.snakes.push(s);
  },

  addFood: function(f) {
    this.food = f;
  },

  checkWallCollisions: function() {

    if (settings.godMode) {
      return;
    }

    if (this.snakes.length === 0) {
      return;
    }

    var snakeHeadCol = this.snakes[0].getHeadCellX();
    var snakeHeadRow = this.snakes[0].getHeadCellY();

    if (this.board.getCell(snakeHeadRow, snakeHeadCol) === 'wall') {
      this.resetLevel();
    }
  },

  /*
      After updating the snake position, check if the
      snake head has overlapped with the food.

      TODO: change to return Boolean?
  */
  checkSnakeEatFood: function() {

    // TODO: why are we checking for snakes.length?
    if (this.food === null || this.snakes.length === 0) {
      return;
    }

    var snakeHeadCol = this.snakes[0].getHeadCellX();
    var snakeHeadRow = this.snakes[0].getHeadCellY();

    // TODO: fix getCellX => getCellCol
    // We totally ate some food.
    if (snakeHeadCol === this.food.getColumn() && snakeHeadRow === this.food.getRow()) {

      this.foodEatenInLevel++;
      SoundManager.play('eat');
      this.snake.score += this.food.score;
      this.hud.setScore(this.snake.score);

      // We just found out the snake ate something.
      // - play sound
      // - check if next level needs to load
      // - update hud
      // - fire event?
      if (this.foodEatenInLevel < settings.foodPerLevel) {
        this.setFoodRandomPos();

        // TODO: what should this be?
        this.snake.grow(4);
      } else {
        this.loadNextLevel();
      }
    }
  },

  /*
      When finding a random position for the food,
      make sure we don't place it on top of a wall.
  */
  doesOverlapWithWalls: function(row, col) {
    return this.board.getCell(row, col) === 'wall';
  },

  /*
      @return true if the given row and column overlaps
      with any part of the snake.
  */
  doesOverlapWithSnake: function(row, col) {
    var iter = this.snake.getPositionIterator();

    while (iter.hasNext()) {
      var i = iter.getNext();

      if (i.x === col && i.y === row) {
        return true;
      }
    }

    return false;
  },

  loadNextLevel: function() {
    this.currentLevel++;
    if (this.currentLevel > settings.levelData.length - 1) {
      this.currentLevel = 0;
    }

    this.foodEatenInLevel = 0;

    this.snake.reset();
    this.snake.setVisible(false);

    this.isPaused = true;

    this.board.load({
      board: settings.levelData[this.currentLevel],
      done: function() {
        game.boardLoaded();
        //isPaused = false;
      }
    });
  },

  /*
      Find a place on the board that isn't a wall,
      or part of the snake
  */
  setFoodRandomPos: function() {

    var col, row;
    var overlapsWithSnake;
    var overlapsWithWall;

    do {
      // 0,1 is hud area, 2 is the top of the board border
      // [min, max)
      row = Utils.getRandomInt(3, settings.boardRows - 1);
      col = Utils.getRandomInt(0, settings.boardColumns);

      overlapsWithSnake = this.doesOverlapWithSnake(row, col);
      overlapsWithWall = this.doesOverlapWithWalls(row, col);
    } while (overlapsWithSnake === true || overlapsWithWall === true);

    this.food.setGridPosition(col, row);
    this.food.score += 100;
  }
}

module.exports = Game;
