const scrap = require('../../helpers/index.js');
const forEach = require('lodash/forEach');
const map = require('lodash/map');
const findIndex = require('lodash/findIndex');
const Promise = require('bluebird');
const appConstants = require('../../helpers/appConstants.js');

export default (db) => (req, res) => {
  res.json({
    started: true,
  });

  // query DB for all keywords
  const keywordQuery = 'SELECT keyword from keywords';
  const companyQuery = 'SELECT name, url from companies';
  const rankQuery = 'INSERT INTO ranks'

  let keywords;
  let companies;

  let keywordPromise = db.query(keywordQuery, (error, result) => {
    if (error) throw error;
    keywords = result;
    let companyPromise = db.query(companyQuery, (error, result) => {
      if (error) throw error;
      companies = result;
      const companyUrl = map(companies, ({ url }) => url);
      const allScrappedLinkPromise = Promise.mapSeries(keywords, (word) => {
        return Promise
        .delay(appConstants.delayBetweenKeywords)
        .then(() => {
          return scrap.scrapeGoogleResult(word.keyword, 'https://www.google.com', 5)
          .then((scrap) => {
            if (scrap.success) {
              const rankMapping = companyUrl.map(url => {
                return {
                  url,
                  rank: findIndex(scrap.result, resultUrl => url === resultUrl)
                }
              });
            }
          })
        });
      });
    });
  });




  // For all scrap data

  // Once scrapped write in the db

}
