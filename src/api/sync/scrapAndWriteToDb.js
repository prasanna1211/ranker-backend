const scrap = require('../../helpers/index.js');
const forEach = require('lodash/forEach');

const map = require('lodash/map');
const findIndex = require('lodash/findIndex');
const merge = require('lodash/merge');

const Promise = require('bluebird');
const appConstants = require('../../helpers/appConstants.js');
const moment = require('moment');

export default (db) => (req, res) => {
  const start = new Date().getTime();
  res.json({
    started: true,
  });
  let hasErrorOccured = false;
  // query DB for all keywords
  const keywordQuery = 'SELECT id, keyword from keywords';
  const companyQuery = 'SELECT id, name, url from companies';
  const domainQuery = 'SELECT'
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
        // recreate all domains here
        Promise.mapSeries(keywords, (word) => {
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

                const currentDate = moment().startOf('day').format('YYYY-MM-DD');
                const keywordQuery = 'KEYWORD QUERY';

                forEach(rankData, ({ url, rank, name, id, keywordId }) => {
                  let dbQuery = `INSERT INTO ranks (rank, logDate, companyId, keywordId, searchEngineId)
                    VALUES (${rank !== -1 ? rank+1 : rank}, "${currentDate}", ${id}, ${keywordId}, 1);
                  `;
                  db.query(dbQuery, (error, result) => {
                    if (error) throw error;
                  });
                });
              } else if (scrap.error) {
                hasErrorOccured = true;
                let dbQuery = `INSERT INTO errors (error) VALUE ${error.errorMessage}`
                db.query(dbQuery, (error, result) => {
                  if (error) throw error;
                  console.log(error);
                });
              }
            })
          });
        }).then(() => {
          const status = hasErrorOccured ? 'ERROR occured' : 'No Error Occured';
          let dbQuery = `INSERT INTO statuses (status) VALUE ("${status}")`;
          db.query(dbQuery, (error, result) => {
            if (error) throw error;
            const end = new Date().getTime();
            console.log('finished ', (end - start) / 1000);
          });
        });
    });

  });


  // For all scrap data

  // Once scrapped write in the db

}
