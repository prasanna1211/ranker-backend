const forEach = require('lodash/forEach');

module.exports = {
  check: (batch, maxCount) => {
    let result = true;
    let maxValue = 0;
    forEach(batch, (value) => {
      let count = 0;
      forEach(batch, (inner) => {
        count += (inner === value);
      });
      result &= (count <= maxCount);
      maxValue = (count >= maxValue) ? count : maxValue;

    });
    // console.log('maxValue', maxValue, result);
    return result;
  }
};
