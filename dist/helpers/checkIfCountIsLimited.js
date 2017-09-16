'use strict';

var forEach = require('lodash/forEach');

module.exports = {
  check: function check(batch, maxCount) {
    var result = true;
    var maxValue = 0;
    forEach(batch, function (value) {
      var count = 0;
      forEach(batch, function (inner) {
        count += inner === value;
      });
      result &= count <= maxCount;
      maxValue = count >= maxValue ? count : maxValue;
    });
    // console.log('maxValue', maxValue, result);
    return result;
  }
};
//# sourceMappingURL=checkIfCountIsLimited.js.map