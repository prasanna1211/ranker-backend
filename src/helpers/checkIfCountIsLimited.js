const forEach = require('lodash/forEach');

module.exports = {
  check: (batch, maxCount) => {
    let result = true;
    forEach(batch, (value) => {
      let count = 0;
      forEach(batch, (inner) => {
        count += inner == value;
      });
      result &= (count <= maxCount);
    });
    return result;
  }
};
