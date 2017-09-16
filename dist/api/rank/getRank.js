'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validator = require('validator');
var isNull = require('lodash/isNull');

var setError = function setError(errorObject, errorMessage) {
  var result = {};
  result.error = true;
  result.errorMessage = errorMessage;
  return result;
};

exports.default = function (db) {
  return function (req, res) {
    var _req$query = req.query,
        startDate = _req$query.startDate,
        endDate = _req$query.endDate,
        company = _req$query.company,
        domain = _req$query.domain,
        searchEngine = _req$query.searchEngine;


    var errorObject = {
      error: false,
      errorMessage: ''
    };

    if (!domain) {
      errorObject = setError(errorObject, 'Domain not present');
      return res.json(errorObject);
    }
    if (!validator.isByteLength(domain, {
      min: 1,
      max: undefined
    })) {
      errorObject = setError(errorObject, 'Domain length is 0');
      return res.json(errorObject);
    }
    var dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
    if (startDate) {
      if (isNull(startDate.match(dateRegEx))) {
        errorObject = setError(errorObject, 'Start Date not in YYYY-MM-DD format');
        return res.json(errorObject);
      }
    }

    if (endDate) {
      if (isNull(endDate.match(dateRegEx))) {
        errorObject = setError(errorObject, 'End Date not in YYYY-MM-DD format');
        return res.json(errorObject);
      }
    }

    var ifCompanyExistQuery = company ? 'AND cn.name = "' + company + '"' : '';
    var ifDateExistQuery = startDate || endDate ? 'AND logDate between date(\'' + startDate + '\') and date(\'' + endDate + '\')' : '';
    var searchEngineQuery = searchEngine ? 'INNER JOIN searchengines se ON se.value = "' + searchEngine + '" AND se.id = r.searchEngineId' : 'RIGHT JOIN searchengines se ON se.id = r.searchEngineId';

    var query = 'SELECT r.rank, cn.name, r.logDate, k.keyword, se.value as searchEngine\n   FROM ranks r\n   INNER JOIN keywords k ON r.keywordId = k.id\n   INNER JOIN domains d ON k.domain_id = d.id\n   INNER JOIN companynames cn ON cn.id = companyId ' + ifCompanyExistQuery + '\n   ' + searchEngineQuery + '\n   WHERE domain = "' + domain + '"\n   ' + ifDateExistQuery + '\n   ORDER BY logDate\n   ';

    //WHERE
    console.log(query);

    db.query(query, function (error, result) {
      if (error) {
        return res.json({
          success: false,
          error: error
        });
      }
      res.json({
        success: true,
        domain: domain,
        result: result
      });
    });
  };
};
//# sourceMappingURL=getRank.js.map