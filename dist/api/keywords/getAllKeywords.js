'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (db) {
  return function (req, res) {
    var query = 'SELECT id, keyword FROM keywords';
    db.query(query, function (error, result) {
      res.json(result);
    });
  };
};
//# sourceMappingURL=getAllKeywords.js.map