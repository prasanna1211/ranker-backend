'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (db) {
  return function (req, res) {
    var query = 'SELECT * from companynames';
    db.query(query, function (error, result) {
      res.json(result);
    });
  };
};
//# sourceMappingURL=getAllCompanies.js.map