const validator = require('validator');
const isNull = require('lodash/isNull');

const setError = (errorObject, errorMessage) => {
  let result = {};
  result.error = true;
  result.errorMessage = errorMessage;
  return result;
};

export default (db) => (req, res) => {
  const {
    query: {
      startDate,
      endDate,
      company,
      domain,
      searchEngine,
    },
  } = req;

  let errorObject = {
    error: false,
    errorMessage: '',
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
  const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
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

  const ifCompanyExistQuery = company ? `AND cn.name = "${company}"` : '';
  const ifDateExistQuery = startDate || endDate ? `AND logDate between date('${startDate}') and date('${endDate}')` : ``;
  const searchEngineQuery = searchEngine ? `INNER JOIN searchengines se ON se.value = "${searchEngine}" AND se.id = r.searchEngineId` : 'RIGHT JOIN searchengines se ON se.id = r.searchEngineId';

  const query = `SELECT r.rank, cn.name, r.logDate, k.keyword, se.value as searchEngine
   FROM ranks r
   INNER JOIN keywords k ON r.keywordId = k.id
   INNER JOIN domains d ON k.domain_id = d.id
   INNER JOIN companynames cn ON cn.id = companyId ${ifCompanyExistQuery}
   ${searchEngineQuery}
   WHERE domain = "${domain}"
   ${ifDateExistQuery}
   ORDER BY logDate
   `;

  //WHERE
  console.log(query);

  db.query(query, (error, result) => {
    if (error) {
      return res.json({
        success: false,
        error,
      });
    }
    res.json({
      success: true,
      domain,
      result
    });
  });
}
