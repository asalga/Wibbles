'use strict';

var domready = require('detect-dom-ready');
var Main = require('./src/main');

domready(function() {
  var main = new Main();
});
