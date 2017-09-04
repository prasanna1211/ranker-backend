const scrap = require('../../helpers/index.js');
const forEach = require('lodash/forEach');

const map = require('lodash/map');
const findIndex = require('lodash/findIndex');
const merge = require('lodash/merge');

const Promise = require('bluebird');
const appConstants = require('../../helpers/appConstants.js');
const moment = require('moment');

export default (db) => (req, res) => {
  res.json({
    started: true,
  });

  // query DB for all keywords
  const keywordQuery = 'SELECT id, keyword from keywords';
  const companyQuery = 'SELECT id, name, url from companies';
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
          return scrap.scrapeGoogleResult(word.keyword, 'https://www.google.co.in', 5)
          .then((scrap) => {
            if (scrap.success) {
              let rankMapping = companyUrl.map(url => {
                return {
                  url,
                  rank: findIndex(scrap.result, resultUrl => url === resultUrl),
                  keywordId: word.id,
                }
              });
              const rankData = map(rankMapping, (rank, index) => {
                return merge(rank, companies[index]);
              });
              console.log(' rank data ', rankData);
              const currentDate = moment().startOf('day').format('YYYY-MM-DD');
              const keywordQuery = 'KEYWORD QUERY';
              forEach(rankData, ({ url, rank, name, id, keywordId }) => {
                let dbQuery = `INSERT INTO ranks
                  (rank, logDate, companyId, keywordId, searchEngineId)
                  VALUES
                  (
                    ${rank !== -1 ? rank+1 : rank},
                    (${currentDate})
                    (${id})
                    ${keywordId}
                    1
                  );
                `;
                console.log(dbQuery);
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
