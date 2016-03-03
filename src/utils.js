'use strict';

var Utils = {
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },

  /*
      in:  123
      out: "000123"
  */
  addLeadingZeros: function(value, leadingZeros) {
    var strValue = value.toString();

    while (strValue.length < leadingZeros) {
      strValue = '0' + strValue;
    }

    return strValue;
  }
};

module.exports = Utils;
