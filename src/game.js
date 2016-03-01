'use strict';

var _ = require('lodash');
var KeyboardJS = require('KeyboardJS');

var settings = require('./settings');
var Board = require('./board');
var levels = require('./levels')

function Game(opts) {
  this.opts = opts || {};
}

Game.prototype = {
  constructor: Game,

  init: function(opts) {
    console.log('Game init');

    var _this = this;

    this.snakes = [];
    this.board = null;
    this.food = null;
    this.hud;

    this.ready = false;
    this.isPaused = false;

    this.stage = this.opts.stage;

    this.foodEatenInLevel = 0;
    this.currentLevel = 0;

    // hud = new Hud({stage: stage});

    // snake = new Snake({
    //     stage: stage,
    //     length: 10,
    //     game: _this
    // });


    this.board = new Board({
        stage: this.stage,
        done: function(){_this.start();},
        board: levels.levelData[this.currentLevel]
    });

    // food = new Food({stage: stage, score: 0});

    // this.addSnake(snake);
    // this.addFood(food);

    // soundManager = SoundManager.getInstance();

    this.initGameKeys();
  },

  initGameKeys: function() {
    KeyboardJS.on('p', function() {
      this.isPaused = !this.isPaused;
      return false;
    });
  },

  update: function(delta) {
    // if (ready === false) {
    //   return;
    // }

    if (this.isPaused) {
      return;
    }

    // _.each(snakes, function(s) {
    //   s.update(delta);

    // });

    // snake.setVisible(false);

    // checkWallCollisions();
    // checkSnakeEatFood();
  },

  /*
            Called when board has been loaded
*/
  start: function() {
    this.ready = true;
    this.isPaused = false;

    var startingPosition = this.board.getStartingPosition();

    // console.log(startingPosition);
    // snake.setBirthLocation(startingPosition.row, startingPosition.column);
    // snake.setDir('right');
    // setFoodRandomPos();
  },

  getIsPaused: function() {
    return isPaused;
  },

  addSnake: function(s) {
    snakes.push(s);
  },

  addFood: function(f) {
    food = f;
  },
}

module.exports = Game;


/*
    Game

define('Game', ['underscore', 'Board', 'Snake', 'Hud', 'Food', 'settings', 'SoundManager', 'KeyboardJS', 'levels'],
       function(_, Board, Snake, Hud, Food, settings, SoundManager, KeyboardJS, levels) {

    var Game = function(options) {
        var _this = this;

        var snakes = [];
        var board = null;
        var food = null;
        var hud;

        var ready = false;
        var isPaused = false;

        var stage = options.stage;
        var soundManager;

        var foodEatenInLevel = 0;
        var currentLevel = 0;




        this.init = function(){

            hud = new Hud({stage: stage});

            snake = new Snake({
                stage: stage,
                length: 10,
                game: _this
            });

            board = new Board({
                stage: stage,
                done: function(){_this.start();},
                board: levels.levelData[currentLevel]
            });

            food = new Food({stage: stage, score: 0});

            this.addSnake(snake);
            this.addFood(food);

            soundManager = SoundManager.getInstance();

            this.initGameKeys();
        };




        /*

        this.resetLevel = function() {
            _this.start();
        };

        /*
            After updating the snake position, check if the
            snake head has overlapped with the food.

            TODO: change to return Boolean?

        var checkSnakeEatFood = function(){

            // TODO: why are we checking for snakes.length?
            if(food === null || snakes.length === 0){
                return;
            }

            var snakeHeadCol = snakes[0].getHeadCellX();
            var snakeHeadRow = snakes[0].getHeadCellY();

            // TODO: fix getCellX => getCellCol
            // We totally ate some food.
            if(snakeHeadCol === food.getColumn() && snakeHeadRow === food.getRow()){

                foodEatenInLevel++;
                soundManager.play('eat');
                snake.score += food.score;
                hud.setScore(snake.score);

                /// We just found out the snake ate something.
                // - play sound
                // - check if next level needs to load
                // - update hud
                // - fire event?

                if(foodEatenInLevel < settings.foodPerLevel){
                    setFoodRandomPos();

                    // TODO: what should this be?
                    snake.grow(4);
                }
                else{
                    loadNextLevel();
                }
            }
        };

        /*


        var loadNextLevel = function(){
            currentLevel++;
            if(currentLevel > levels.levelData.length-1){
                currentLevel = 0;
            }

            foodEatenInLevel = 0;

            snake.reset();
            snake.setVisible(false);

            isPaused = true;

            board.load({
                board: levels.levelData[currentLevel],
                done: function(){
                    game.start();

                    //isPaused = false;
                }
            });
        };

        /*
            @return true if the given row and column overlaps
            with any part of the snake.

        var doesOverlapWithSnake = function(row, col){
            var iter = snake.getPositionIterator();

            while(iter.hasNext()){
                var i = iter.getNext();

                if(i.x === col && i.y === row){
                    return true;
                }
            }

            return false;
        };

        /*
            When finding a random position for the food,
            make sure we don't place it on top of a wall.

        var doesOverlapWithWalls = function(row, col){
            return board.getCell(row, col) === 'wall';
        };

        /*
            TODO: move to a utils class

        var getRandomInt = function(min, max){
            return Math.floor(Math.random() * (max - min) + min);
        };

        /*
            Find a place on the board that isn't a wall,
            or part of the snake

        var setFoodRandomPos = function(){

            var col, row;
            var overlapsWithSnake;
            var overlapsWithWall;

            do{
                // 0,1 is hud area, 2 is the top of the board border
                // [min, max)
                row = getRandomInt(3, settings.boardRows - 1);
                col = getRandomInt(0, settings.boardColumns);

                overlapsWithSnake = doesOverlapWithSnake(row, col);
                overlapsWithWall = doesOverlapWithWalls(row, col);
            } while(overlapsWithSnake === true || overlapsWithWall === true);

            food.setGridPosition(col, row);
            food.score += 100;
        };

        /*

        var checkWallCollisions = function() {

            if(snakes.length === 0){
                return;
            }

            var snakeHeadCol = snakes[0].getHeadCellX();
            var snakeHeadRow = snakes[0].getHeadCellY();

            if (board.getCell(snakeHeadRow, snakeHeadCol) === 'wall') {
                _this.resetLevel();
            }
        };
    };

    return Game;
});*/
